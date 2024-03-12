import { User } from "./user.model";

export type Task = {
    id: number;
    title: string;
    description: string;
    deadline: Date;
    priority: 'as planned'|'at risk'|'lagging';
    executors: string[];
}