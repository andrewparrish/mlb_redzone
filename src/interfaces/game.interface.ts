import { Id } from '../types/id.type';
import { TeamInterface } from './team.interface';

export interface GameInterface {
    id: Id,
    teamOne?: TeamInterface;
    teamTwo?: TeamInterface;
    lastUpdated: string | Date;
    link: string;
}