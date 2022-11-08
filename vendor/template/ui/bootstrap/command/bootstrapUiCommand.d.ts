declare class BootstrapUiCommand {
    handle(): Promise<void>;
    app(): Promise<void>;
    scss(): Promise<void>;
    pack(): Promise<void>;
    webpack(): Promise<void>;
}
declare const _default: BootstrapUiCommand;
export default _default;
