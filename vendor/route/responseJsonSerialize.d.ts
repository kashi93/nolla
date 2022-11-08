declare class ResponseJsonSerialize {
    serialize(data: any): Promise<any>;
    mysql(data: {
        [key: string]: any;
    }): Promise<any>;
}
declare const _default: ResponseJsonSerialize;
export default _default;
