import MccJsClient from "./dist/index.js";
import ChatBot from "./dist/ChatBot.js";

class TestChatBot extends ChatBot {
    OnChatRaw(rawJson) {
        this.info(rawJson);
    }
}

const client = new MccJsClient({
    host: "127.0.0.1",
    port: 8043,
    password: "2233",
    loggingEnabled: true,
    chatBot: new TestChatBot(),
    sessionName: "Test Chat Bot",
});

client.connect();
