export default class Command {
    private name: string;
    private requestId: string;

    constructor(name: string) {
        this.name = name;
        this.requestId = Math.random().toString(16).substring(2, 14);
    }

    private getParameters(): Array<any> {
        const parameters: Array<any> = [];

        // @ts-ignore-start
        Object.entries(this).forEach(entry => {
            const properyName: string = entry[0];
            const properyValue: any = entry[1];

            if (properyName === 'name' || properyName === 'requestId')
                return;

            parameters.push(properyValue);
        });
        // @ts-ignore-end

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
}