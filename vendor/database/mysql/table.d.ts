export declare let params: Array<string>;
declare class PrivateMethod {
    nullable(): void;
    unique(): void;
}
declare class Table {
    id(column?: string): void;
    bigInt(column: string): PrivateMethod;
    string(column: string, length?: number): PrivateMethod;
    timestamp(column: string): PrivateMethod;
    timestamps(): void;
    custom(statement: string): void;
    resetParams(): void;
}
declare const _default: Table;
export default _default;
