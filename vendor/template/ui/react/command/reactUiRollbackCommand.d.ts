declare class ReactUiRollbackCommand {
    handle(): Promise<void>;
    app(): Promise<void>;
    nodeModules(): Promise<boolean>;
    pack(): Promise<void>;
    webpack(): Promise<void>;
    js(): Promise<boolean>;
    css(): Promise<boolean>;
}
declare const _default: ReactUiRollbackCommand;
export default _default;
