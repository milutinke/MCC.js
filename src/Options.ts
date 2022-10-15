import Logger from './Logger';
import ChatBot from './ChatBot';

type Options = {
    host: string,
    port: number,
    password?: string,
    sessionName?: string,
    loggingEnabled: boolean,
    logger?: Logger,
    executionTimeout?: number,
    chatBot: ChatBot
};

export default Options;