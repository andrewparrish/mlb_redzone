import { Id } from '../types/id.type';
import { TeamInterface } from './team.interface';

export interface GameInterface {
    id: Id,
    teamOne?: string;
    teamTwo?: string;
    lastUpdated: string | Date;
    link: string;
    alerts?: Array<any>;
    teamOneScore?: number;
    teamTwoScore?: number;
    inning?: number;
}
