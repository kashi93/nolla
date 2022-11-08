export const Migration: Migration;
declare class Migration {
    up(): {
        name: string;
        columns: any[];
    };
    down(): {
        name: string;
    };
}
export {};
