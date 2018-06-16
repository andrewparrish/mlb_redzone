import { GameInterface } from '../interfaces/game.interface';
import { TeamInterface } from '../interfaces/team.interface';
import { SavableModel } from './savable-model';
import { Team } from './team';

export class Game extends SavableModel {
    teamOne: string;
    teamTwo: string;

    COMMERCIAL_STATUSES = ["end_of_half_inning"];

    constructor(gameData: GameInterface) {
        super();
        Object.assign(this, gameData);
    }

    static className(): string {
        return 'game';
    }

    getTeams(): Array<Team> {
        return Promise.all([
            Team.findById(this.teamOne);
            Team.findById(this.teamTwo);
        ])
    }

    asHash(): any {
        return {
            id: this.id,
            teamOne: this.teamOne,
            teamTwo: this.teamTwo,
            lastUpdated: this.lastUpdated,
            link: this.link
        }
    }
}
