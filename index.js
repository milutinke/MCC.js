import MccJsClient from "./dist/index.js";
import ChatBot from "./dist/ChatBot.js";
import LogLevel from "./dist/Logging/LogLevels.js";
import LogToConsoleCommand from "./dist/Commands/LogToConsoleCommand.js";

class TestChatBot extends ChatBot {
    OnChatPublic(sender, message, rawText) {
        console.log(`${sender}: ${message}`);
    }

    async OnGamemodeUpdate(playerName, uuid, gamemode) {
        console.log(`Player "${playerName}" with UUID "${uuid}" has his/her game mode changed to: "${gamemode}"`);
        console.log(await this.send(new LogToConsoleCommand("This is a test!")));
    }
}

const client = new MccJsClient({
    host: "127.0.0.1",
    port: 8043,
    password: "2233",
    loggingEnabled: true,
    logLevels: LogLevel.Info | LogLevel.Warn | LogLevel.Error | LogLevel.Debug,
    chatBot: new TestChatBot(),
    sessionName: "Test Chat Bot",
});

client.connect();
