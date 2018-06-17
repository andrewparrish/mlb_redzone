import { GameInterface } from '../interfaces/game.interface';
import { SavableModel } from './savable-model';
import { Team } from './team';
import { Id } from '../types/id.type';

export class Game extends SavableModel {
    id: Id;
    teamOne: string;
    teamTwo: string;
    link: string;
    lastUpdated: Date | string;

    COMMERCIAL_STATUSES = ["end_of_half_inning"];

    constructor(gameData: GameInterface) {
        super();
        Object.assign(this, gameData);
    }

    static className(): string {
        return 'game';
    }

    getTeams(): Promise {
        return Promise.all([
            Team.findById(this.teamOne),
            Team.findById(this.teamTwo)
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
