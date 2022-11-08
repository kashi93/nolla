declare class VueUiRollbackCommand {
    handle(): Promise<void>;
    app(): Promise<void>;
    pack(): Promise<void>;
    nodeModules(): Promise<boolean>;
    webpack(): Promise<void>;
    js(): Promise<boolean>;
}
declare const _default: VueUiRollbackCommand;
export default _default;
