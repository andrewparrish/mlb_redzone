import { SavableModel } from './savable-model';
import { TeamInterface } from '../interfaces/team.interface';

export class Team extends SavableModel {
    constructor(teamData: TeamInterface) {
        super();
        Object.assign(this, teamData);
    }

    static className(): string {
        return 'team';
    }
}
