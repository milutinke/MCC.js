import Logger from './Logging/Contract/Logger';
import ChatBot from './ChatBot';
import LogLevel from './Logging/Contract/LogLevels';

type Options = {
    host: string,
    port: number,
    password?: string,
    sessionName?: string,
    loggingEnabled: boolean,
    logLevels: LogLevel,
    logger?: Logger,
    executionTimeout?: number,
    chatBot: ChatBot
};

export default Options;