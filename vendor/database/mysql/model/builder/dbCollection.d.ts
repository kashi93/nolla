declare class DbCollection {
    make(self: any, data: {
        [key: string]: any;
    }): Promise<any>;
    save(): Promise<boolean>;
    dataProxy(target: any): any;
    proxyHandler: {
        get(target: any, name: any, receiver: any): any;
    };
}
declare const _default: DbCollection;
export default _default;
