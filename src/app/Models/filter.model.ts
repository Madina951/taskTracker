import { User } from "./user.model";

export type Filter = {
    status: 'as planned'|'at risk'|'lagging'|'';
    executors: string[];
    deadline: Date;
}