import { Id } from '../types/id.type';

export interface TeamInterface {
    id: Id;
    displayName: string;
    blackout?: boolean;
}