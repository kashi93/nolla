export default class Update {
    useTimeStamps?: boolean;
    table?: string;
    params?: string;
    created_at?: any;
    updated_at?: any;
    update(params: {
        [column: string]: any;
    }): Promise<unknown>;
    objToParam2?(obj: {
        [column: string]: any;
    }): Promise<{
        data: any[];
    }>;
    updateTimeStamp?(current_params: any): Promise<any>;
}
