export default class Command {
    private name: string;
    private requestId: string;

    constructor(name: string) {
        this.name = name;
        this.requestId = Command.randomRequestId();
    }

    private getParameters(): Array<any> {
        const parameters: Array<any> = [];

        Object.entries(this).forEach(entry => {
            const properyName: string = entry[0];
            const properyValue: any = entry[1];

            if (properyName === 'name' || properyName === 'requestId')
                return;

            parameters.push(properyValue);
        });

        return parameters;
    }

    public getRequestId(): string {
        return this.requestId;
    }

    public getCommandJson(): string {
        return JSON.stringify({
            command: this.name,
            requestId: this.requestId,
            parameters: this.getParameters()
        });
    }

    private static randomRequestId(): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < 20; i++)
            result += chars.charAt(Math.floor(Math.random() * chars.length));

        return result;
    }
}