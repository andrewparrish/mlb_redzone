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
    alerts = [];

    COMMERCIAL_STATUSES = ["end_of_half_inning"];

    constructor(gameData: GameInterface) {
        super();
        Object.assign(this, gameData);
    }

    static className(): string {
        return 'game';
    }

    isBlackedOut(): Promise {
        return new Promise((resolve, reject) => {
            this.getTeams().then((teams) => {
                const blackedOut = teams.find((team) => {
                   return !!team.blackout; 
                });

                resolve(!!blackedOut);
            }).catch((err) => {
                console.warn(err);
                reject(err);
            });
        });
    }

    isInCommercialBreak(): boolean {
        return this.alerts.length > 0 && this.COMMERCIAL_STATUSES.indexOf(this.alerts[0].category) !== -1;
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
