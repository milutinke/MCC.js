import Logger from './Logging/Logger';
import ChatBot from './ChatBot';
import LogLevel from './Logging/LogLevels';

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