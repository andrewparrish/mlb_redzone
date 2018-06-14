import { GameInterface } from '../interfaces/game.interface';
import { TeamInterface } from '../interfaces/team.interface';
import { SavableModel } from './savable-model';

export class Game extends SavableModel {
    teamOne: TeamInterface;
    teamTwo: TeamInterface;

    constructor(gameData: GameInterface) {
        super();
        Object.assign(this, gameData);
    }

    static className(): string {
        return 'game';
    }
}