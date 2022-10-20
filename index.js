import MccJsClient from "./dist/index.js";
import ChatBot from "./dist/ChatBot.js";
import LogLevel from "./dist/Logging/LogLevels.js";

class TestChatBot extends ChatBot {
    async OnChatPublic(username, message, rawText) {
        console.log(`${username}: ${message}`);
    }

    async OnChatRaw(text, json) {
        console.log(`${text} - ${json}`);
    }

    async OnGamemodeUpdate(playerName, uuid, gamemode) {
        console.log(`Player "${playerName}" with UUID "${uuid}" has his/her game mode changed to: "${gamemode}"`);
        //this.LogToConsole("This is a test!");
    }

    async OnEventError(event, message) {
        this.info(JSON.stringify(message), " - ", JSON.stringify(message));
    }
}

const client = new MccJsClient({
    host: "127.0.0.1",
    port: 8043,
    password: "wspass12345",
    loggingEnabled: true,
    logLevels: LogLevel.Info | LogLevel.Warn | LogLevel.Error,
    chatBot: new TestChatBot(),
    sessionName: "Test Chat Bot",
});

client.connect();
