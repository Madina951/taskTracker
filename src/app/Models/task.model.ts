import { FilterStatus } from "./filter.model";
import { User } from "./user.model";

export type Task = {
    id: number;
    title: string;
    description: string;
    deadline: Date;
    priority: FilterStatus;
    executors: string[];
}