declare class ReactUiCommand {
    handle(): Promise<void>;
    app(): Promise<void>;
    pack(): Promise<void>;
    webpack(): Promise<void>;
    css(): Promise<void>;
    js(): Promise<void>;
}
declare const _default: ReactUiCommand;
export default _default;
