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
    teamOneScore: number = 0;
    teamTwoScore: number = 0;
    inning: number = 0;

    COMMERCIAL_STATUSES = ["end_of_half_inning", "pitcher_change", "game_over"];

    constructor(gameData: GameInterface) {
        super();
        Object.assign(this, gameData);
    }

    static className(): string {
        return 'game';
    }

    get remainingInnings(): number {
        return 9 - this.inning;
    }

    isBlackedOut(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.getTeams().then((teams) => {
                const blackedOut = teams.filter(team => team).find((team) => {
                   return team.blackout; 
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

    getTeams(): Promise<Array<Team>> {
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
            lastUpdated: this.lastUpdated || new Date(),
            link: this.link
        }
    }
}
