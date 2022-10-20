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

class MccJsClient {
    private socket: any;
    private state: States = States.DISCONNECTED;
    private loggingEnabled: boolean = false;
    private logLevels: number = 0;
    private logger: Logger;
    private executionTimeout: number;
    private chatBot: ChatBot;

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

        // Send a disconnection signal so we do not get an exception message from the WebSocketSharp library used by the MCC
        if (global !== undefined && global.process != undefined) {
            process.on('exit', this.disconnect.bind(this));
            process.on('SIGINT', this.disconnect.bind(this));
            process.on('SIGUSR1', this.disconnect.bind(this));
            process.on('SIGUSR2', this.disconnect.bind(this));
            process.on('uncaughtException', this.disconnect.bind(this));
        }
    }

    private onOpen(event: any): void {
        this.state = States.CONNECTED;
        this.info(`Successfully connected to ${this.host} on port ${this.port}!`);
        this.chatBot.setClient(this);

        if (this.password)
            this.socket.send(new AuthenticateCommand(this.password).getCommandJson());

        if (this.sessionName)
            this.socket.send(new ChangeSessionIdCommand(this.sessionName).getCommandJson());
    }

    private onMessage(event: any): void {
        if (!event.data)
            return;

        try {
            const parsed = JSON.parse(event.data);
            const data = JSON.parse(parsed.data);
            this.handleEvent(parsed.event, data);
        } catch (e) {
            if (this.isMethodPresent("_OnEventError"))
                this.chatBot._OnEventError!(event, `Error when parsing: '${event.data}'`);
        }
    }

    private onClose(event: any): void {
        this.state = States.DISCONNECTED;

        if (event.wasClean)
            this.info("Connection cosed cleanly!");
        else this.warn("Connection died!");
    }

    private onError(error: any): void {
        this.state = States.ERROR;
        this.error(error.message || error);
    }

    public connect(): void {
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

    private handleEvent(event: string, data: any): void {
        if (!event || (event && event.trim().length === 0))
            return;

        // Internal websocket event
        if (event === 'OnWsCommandResponse') {
            if (data.error)
                throw new Error(data.message);

            if (!data.success) {
                this.error(data.message);

                if (data.stackTrace)
                    this.error(data.stackTrace);

                return;
            }

            if (this.isMethodPresent("_OnWsCommandResponse"))
                this.chatBot._OnWsCommandResponse!(data);

            return;
        }

        // Catch unhandled events and call an appropriate callback for it
        // This is useful when the MCC.js hasn't been updated to support all the events from Web Socket Chat Bot
        // or when you want to handle events in a custom way, 
        // or you're using an older version of MCC.js and want to catch new events without updating
        if (!this.isMethodPresent(event)) {
            if (this.isMethodPresent("_OnUnhandledEvent"))
                this.chatBot._OnUnhandledEvent!(event, data);

            return;
        }

        // Handle MCC events
        this.chatBot._OnEvent!(event, data);
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
}

export default MccJsClient;