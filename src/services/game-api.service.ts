import { BaseApiService } from './base-api.service';

import { Game } from './../models/game';
import { GameInterface } from './../interfaces/game.interface';

export class GameApiService extends BaseApiService {
    getAllGameData() {
        this.getData(this.allGamesUrl(new Date())).then(this.updateGames);
    }

    getGameSpecificData(game: GameInterface): Promise<any> {
        return new Promise((resolve, _reject) => {
            this.getData(game.link).then(specificGameData => resolve(specificGameData));
        });
    }

    parseGamesData(data): Array<GameInterface> {
        return data.dates[0].games.filter(this.activeGame).map((game) => {
            return {
                id: game.gamePk.toString(),
                teamOne: game.teams.away.team.fileCode,
                teamTwo: game.teams.home.team.fileCode,
                status: game.status.detailedState,
                link: game.link
            }
        });
    }

    allGamesUrl(date: Date = new Date()): string {
        const timeObj = this.parseTimeToObject(date);

        return "/api/v1/schedule?language=&sportId=1&date=" + timeObj.month + "/" + timeObj.day + "/" + timeObj.year
        + "&sortBy=gameDate&hydrate=game(content(summary,media(epg))),linescore(runners),flags,team,review";
    }

    activeGame = (gameData): boolean => {
        return gameData.status.detailedState == 'In Progress';
    };

    updateGames = (data) => {
        this.parseGamesData(data).filter(game => !!game.link).map(this.mergeGameData);
    };

    mergeGameData = (gameData: GameInterface, afterSave = null) => {
        this.getGameSpecificData(gameData).then((specificData) => {
            gameData.alerts = specificData.gameData.alerts;
            const game = new Game(gameData);
            game.save(Game.uniqueId(game.id), afterSave);
        });
    }
}
