import { SavableModel } from './savable-model';
import { TeamInterface } from '../interfaces/team.interface';
import { Id } from '../types/id.type';

export class Team extends SavableModel {
    id: Id;
    displayName: string;
    blackout: boolean;

    constructor(teamData: TeamInterface) {
        super();
        Object.assign(this, teamData);
    }

    static className(): string {
        return 'team';
    }

    //TODO: Load all teams from json

    asHash(): any {
        return {
            id: this.id,
            displayName: this.displayName,
            blackout: this.blackout
        }
    }
}
