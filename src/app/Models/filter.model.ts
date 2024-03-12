export type FilterStatus = 'as planned'|'at risk'|'lagging'|'';

export type Filter = {
    status: FilterStatus;
    executors: string[];
    deadline: Date;
}