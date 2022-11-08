declare class Hash {
    make(plainText: string): Promise<string>;
    verify(plainText: string, hashText: string): Promise<unknown>;
}
declare const _default: Hash;
export default _default;
