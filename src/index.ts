// we use .js because TypeScript compiler is dumb
import Options from './Options.js';
import Logger from './Logging/Contract/Logger.js';
import States from './States.js';
import ConsoleLogger from "./Logging/ConsoleLogger.js";
import ChatBot from './ChatBot.js';
import AuthenticateCommand from './Commands/AuthenticateCommand.js';
import ChangeSessionIdCommand from './Commands/ChangeSessionIdCommand.js';
import LogLevel from './Logging/Contract/LogLevels.js';
import WebSocket from 'ws';
import ExitCodes from './DisconnectCodes.js';
import DisconnectCodes from './DisconnectCodes.js';

class MccJsClient {
    private socket: any;
    private state: States = States.DISCONNECTED;
    private loggingEnabled: boolean = false;
    private logLevels: number = 0;
    private logger: Logger;
    private executionTimeout: number;
    private chatBot: ChatBot;
    private lastDisconnectCode: DisconnectCodes = DisconnectCodes.NORMAL;
    private shouldReconnect: boolean;
    private reconnectTimeout: number;
    private reconnectAttempts: number;
    private currentReconnectAttempt: number = 0;
    private wasReconnecting: boolean = false;

    private host: string;
    private port: number;
    private password?: string;
    private sessionName?: string;

    constructor(options: Options) {
        if (options.host.trim().length === 0)
            throw new Error("Please provide a valid non empty host!");

        if (options.port < 0 || options.port > 65535)
            throw new Error("Please provide a valid port! [0-65535]");

        if (options.sessionName) {
            if (options.sessionName.trim().length === 0 || options.sessionName.length > 32) {
                throw new Error("Please provide a valid session name (It can be at minimum 1 character, at maximum 32 characters)!");
            }
        }

        if (options.password && options.password.trim().length === 0)
            throw new Error("Please provide a valid password!");

        if (!options.chatBot || options.chatBot && !(options.chatBot instanceof ChatBot))
            throw new Error("Please provide a valid instance of ChatBot!");

        this.host = options.host;
        this.port = options.port;
        this.password = options.password;
        this.sessionName = options.sessionName;
        this.loggingEnabled = options.loggingEnabled;
        this.logLevels = options.logLevels || LogLevel.Info | LogLevel.Warn | LogLevel.Warn;
        this.logger = options.logger || new ConsoleLogger();
        this.executionTimeout = options.executionTimeout || 5;
        this.chatBot = options.chatBot;
        this.chatBot.setClient(this);
        this.shouldReconnect = options.reconnect || false;
        this.reconnectTimeout = (options.reconnectTimeout || 30) * 1000;
        this.reconnectAttempts = options.reconnectAttempts || 10;

        // Send a disconnection signal so we do not get an exception message from the WebSocketSharp library used by the MCC
        // Currenlty only works for node
        if (global !== undefined && global.process != undefined) {
            process.on('exit', this.handleKillSignal.bind(this));
            process.on('SIGINT', this.handleKillSignal.bind(this));
            process.on('SIGUSR1', this.handleKillSignal.bind(this));
            process.on('SIGUSR2', this.handleKillSignal.bind(this));
        }
    }

    private onOpen(event: any): void {
        this.wasReconnecting = false;
        this.state = States.CONNECTED;
        this.info(`Successfully connected to ${this.host} on port ${this.port}!`);
        this.chatBot.setClient(this);
        this.currentReconnectAttempt = 0;

        if (this.password)
            this.socket.send(new AuthenticateCommand(this.password).getCommandJson());

        if (this.sessionName)
            this.socket.send(new ChangeSessionIdCommand(this.sessionName).getCommandJson());

        this.chatBot.OnInitialize();
    }

    private onMessage(event: any): void {
        if (!event.data)
            return;

        try {
            const parsed = JSON.parse(event.data);
            const data = JSON.parse(parsed.data);
            this.handleEvent(parsed.event, data);
        } catch (e) {
            let message = e instanceof Error ? e.message : String(e);
            this.error(`Error when parsing: '${event.data}' > ${message}`);

            if (this.isMethodPresent("OnEventError"))
                this.chatBot.OnEventError!(event, `Error when parsing: '${event.data}'`);
        }
    }

    private onClose(event: any): void {
        this.state = States.DISCONNECTED;
        if (this.isMethodPresent("OnDestroy"))
            this.chatBot.OnDestroy();

        this[event.wasClean ? "info" : "warn"](
            event.wasClean ? "Connection closed cleanly!" : "Connection died!");

        if (this.lastDisconnectCode != DisconnectCodes.INVALID_PASSWORD && this.shouldReconnect) {
            if (this.currentReconnectAttempt < this.reconnectAttempts) {
                setTimeout(this.connect.bind(this), this.reconnectTimeout);
                this.currentReconnectAttempt++;

                if (this.wasReconnecting)
                    this.info(`Failed to reconnect, attempting ${(this.reconnectAttempts - this.currentReconnectAttempt) + 1} times more!`);

                this.info(`Reconnecting in ${this.reconnectTimeout / 1000} seconds!`);
                this.wasReconnecting = true;
            } else
                this.info("Maximum reconnect attempts reached. Abandoning reconnection.");
        }
    }

    private onError(error: any): void {
        this.state = States.ERROR;
        this.error("erro: " + error.message || error);
    }

    public connect(): void {
        this.lastDisconnectCode = DisconnectCodes.NORMAL;

        if (this.state == States.CONNECTED) {
            this.info("Reconnect requested, dropping the old connection...");
            if (this.socket) this.socket.close();
            this.info("Reconnecting ...");
        } else this.info(`Connecting to ${this.host} on port ${this.port} ...`);

        this.state = States.CONNECTING;
        this.socket = new WebSocket(`ws://${this.host}:${this.port}/mcc`);

        this.socket.onopen = this.onOpen.bind(this);
        this.socket.onmessage = this.onMessage.bind(this);
        this.socket.onclose = this.onClose.bind(this);
        this.socket.onerror = this.onError.bind(this);
    }

    public disconnect(): void {
        this.state = States.DISCONNECTED;

        if (this.socket)
            this.socket.close();

        this.info("Disconnected!");
    }

    private handleKillSignal(signal: string): void {
        if (typeof signal === "number" && signal === 0)
            return;

        this.info(`Received ${signal}, disconnecting...`);
        this.disconnect();
        process.exit();
    }

    private handleEvent(event: string, data: any): void {
        if (!event || (event && event.trim().length === 0))
            return;

        this.debug(`Got event ("${event}"): ${JSON.stringify(data)}`);

        // Internal websocket event
        if (event === 'OnWsCommandResponse') {
            if (data.error)
                throw new Error(data.message);

            if (!data.success) {
                const message = data.result ? data.result : (data.message ? data.message : JSON.stringify(data));

                if (message.includes('password') && (message.includes('valid') || message.includes('Incorrect'))) {
                    this.error(message);
                    this.lastDisconnectCode = DisconnectCodes.INVALID_PASSWORD;
                    return this.disconnect();
                }

                this.error(JSON.stringify(message));
            }

            if (this.isMethodPresent("OnWsCommandResponse"))
                this.chatBot.OnWsCommandResponse!(data);

            return;
        }

        // Catch unhandled events and call an appropriate callback for it
        // This is useful when the MCC.js hasn't been updated to support all the events from Web Socket Chat Bot
        // or when you want to handle events in a custom way, 
        // or you're using an older version of MCC.js and want to catch new events without updating
        if (!this.isMethodPresent(event)) {
            if (this.isMethodPresent("OnUnhandledEvent"))
                this.chatBot.OnUnhandledEvent!(event, data);

            return;
        }

        // Handle MCC events
        this.chatBot.OnEvent!(event, data);
    }

    private isMethodPresent(methodName: string): boolean {
        const botClass = this.chatBot as { [key: string]: any };
        return typeof botClass[methodName] === 'function';
    }

    public info(message: string): void {
        if (this.loggingEnabled && (this.logLevels & LogLevel.Info))
            this.logger.info!(message);
    }

    public warn(message: string): void {
        if (this.loggingEnabled && (this.logLevels & LogLevel.Warn))
            this.logger.warn!(message);
    }

    public error(message: string): void {
        if (this.loggingEnabled && (this.logLevels & LogLevel.Error))
            this.logger.error!(message);
    }

    public debug(message: string): void {
        if (this.loggingEnabled && (this.logLevels & LogLevel.Debug))
            this.logger.debug!(message);
    }

    public getConnection(): WebSocket {
        return this.socket;
    }

    public getExecutionTimeout(): number {
        return this.executionTimeout;
    }

    public getState(): States {
        return this.state;
    }

    public getLogger(): Logger {
        return this.logger;
    }

    public getLastDisconnectCode(): DisconnectCodes {
        return this.lastDisconnectCode;
    }
}

export default MccJsClient;