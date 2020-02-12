import { Message, RichEmbed, Client, Snowflake } from "discord.js";
import { ServiceManager } from "../manager/service";
import { CommandManager } from "../manager/command";

export interface ILoggerMethod {
    (msg: string, ...args: any[]): void
    (obj: object, msg?: string, ...args: any[]): void
}

export interface ILogger {
    debug: ILoggerMethod
    info: ILoggerMethod
    warn: ILoggerMethod
    error: ILoggerMethod
}

export interface IConfig {
    id: string;
    token: string;
    commands: string[];
    game: string;
    userName: string;
    denyAnswer: string;
}

export enum CommandType {
    ADMIN = "admin",
    TEST = "test",
    HELP = "help",
    UTIL = "util"
};

export interface ICommandDescription {
    type: CommandType;
    command: string;
    desc: string;
}

export interface IBot {
    readonly client: Client;
    readonly config: IConfig;
    readonly logger: ILogger;
    readonly serviceManager: IServiceManager;
    readonly commandManager: ICommandManager;

    start(logger: ILogger, config: IConfig): void;
}
export interface ICommand {
    readonly bot: IBot;
    readonly help: ICommandDescription;
    isValid(msg: Message): boolean;
    process(msg: Message): Promise<Boolean>;
}

export interface ICommandManager {
    readonly bot: IBot;
    readonly commands: Array<ICommand>;
    add(path: string): Promise<boolean>;
    load(path: string): Promise<boolean>;
    execute(msg: Message): Promise<Boolean>;
}
export interface IDaemonManager {
    readonly bot: IBot;
    readonly timer: Array<NodeJS.Timeout>;
    add(path: string): Promise<boolean>;
    load(path: string): Promise<boolean>;
    find(name: string): Promise<IDaemon>;
}

export interface IServiceManager {
    readonly bot: IBot;
    readonly service: Array<IService>;
    add(path: string): Promise<boolean>;
    load(path: string): Promise<boolean>;
    find(name: string): Promise<IService>;
}

export interface IUser {
    id: string;
    username: string;
    discriminator: string;
    tag: string;
}

export enum ServiceStatus {
    RUNNING,
    STOP
};


export interface IDaemon {
    readonly name: string;
    readonly id: Array<Snowflake>;
    readonly interval: number;
    addId(arg: Snowflake): void;
    delId(arg: Snowflake): void;
    execute(client: Client): Promise<Boolean>;
}

export interface IService {
    readonly name: string;
    readonly argv: Array<string>;
    readonly status: ServiceStatus;
    addOrSetArgv(arg: string): void;
    removeArgv(arg: string): void;
    execute(msg: Message): Promise<Boolean>;
    start(): ServiceStatus;
    stop(): ServiceStatus;
}

export type MessageColor =
    [number, number, number]
    | number
    | string;


export interface IMessage {
    readonly recvMessage: Message;
    readonly richText: RichEmbed;

    removeRecvMessage(): Promise<Boolean>;
    sendReply(): Promise<(Message | Array<Message>)>;
    sendChannel(): Promise<(Message | Array<Message>)>;
    addField(name: string, value: string): IMessage;
    addBlankField(): IMessage;
    setColor(color: MessageColor): IMessage;
    setDescription(description: string): IMessage;
    setFooter(text: string, icon?: string): IMessage;
    setImage(url: string): IMessage;
    setThumbnail(url: string): IMessage;
    setTitle(title: string): IMessage;
    setURL(url: string): IMessage;
}

//https://github.com/Leopotam/discord-bot/blob/master/src/api.ts 참고