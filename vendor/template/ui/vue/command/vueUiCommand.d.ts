declare class VueUiCommand {
    handle(): Promise<void>;
    app(): Promise<void>;
    pack(): Promise<void>;
    webpack(): Promise<void>;
    js(): Promise<void>;
}
declare const _default: VueUiCommand;
export default _default;
