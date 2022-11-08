export default class Create {
    table: string;
    useTimeStamps: boolean;
    private created_at?;
    private updated_at?;
    create(params: {
        [column: string]: string | number | null;
    }): Promise<unknown>;
    private createTimeStamp;
    private objToParam1;
}
