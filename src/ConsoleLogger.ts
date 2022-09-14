import Logger from "./Logger";

enum LogType {
    Info = "info",
    Warn = "warn",
    Error = "error"
}

class ConsoleLogger implements Logger {
    public info(message: string): void {
        this.log(LogType.Info, message);
    }

    public warn(message: string): void {
        this.log(LogType.Warn, message);
    }

    public error(message: string): void {
        this.log(LogType.Error, message);
    }

    private log(type: LogType, message: string): void {
        // @ts-ignore-start
        console[type](`[MCC.JS][${this.capitalize(type)}] ${message}`);
        // @ts-ignore-end
    }

    private capitalize(message: string): string {
        return message.charAt(0).toUpperCase() + message.substring(1).toLowerCase();
    }
}

export default ConsoleLogger;