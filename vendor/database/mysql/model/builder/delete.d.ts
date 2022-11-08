export default class Delete {
    table?: string;
    params?: string;
    delete(): Promise<unknown>;
}
