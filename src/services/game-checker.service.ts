import { Id } from './../types/id.type';
import { Game } from './../models/game';
import { PriorityList } from './../models/priority-list';
import { PriorityInterface } from './../interfaces/priority.interface';

import { GameChangerService } from './game-changer.service';
import { GameApiService } from './game-api.service';
import { MlbtvManagingService } from './mlbtv-managing.service';

export class GameCheckerService {
    priorities: Array<PriorityInterface>;
    active: boolean;
    mlbService: MlbtvManagingService;
    apiService: GameApiService;

    constructor() {
        PriorityList.setInitialPriorities().then((priorityList) => {
            this.priorities = priorityList;
        });
        this.mlbService = new MlbtvManagingService();
        this.apiService = new GameApiService();

        this.active = true;

        setInterval(() => {
            console.log('Tick');
            if (this.active) {
                console.log('Tock');
                this.updateCurrentGames();
                this.updateCurrentGame();
            }
        }, 10000)

        chrome.tabs.onCreated.addListener(this.checkActive);
        chrome.tabs.onUpdated.addListener(this.checkActive);

        this.checkActive();
    }

    checkActive = (): void => {
        this.mlbService.isMonitorActive().then(isActive => this.active = isActive);
    };

    updateCurrentGames(): void {
        this.apiService.getAllGameData();
    }

    updateCurrentGame(): void {
        this.mlbService.getCurrentGameId().then((gameId) => {
            Game.find(gameId).then((game) => {
                this.apiService.mergeGameData(game, () => {
                    this.checkForGameChange(gameId);
                }); 
            });
        });
    }

    private checkForGameChange(gameId: Id): void {
        Game.findById(gameId).then((game) => {
            this.mlbService.getCurrentGameIds().then((ids) => {
                console.log('ids', ids);
                const gameChanger = new GameChangerService(gameId, ids);
                gameChanger.getNextPriority().then((next) => {
                    console.log('CHANGE TO', next);
                    this.mlbService.changeGame(next.id);
                });
            });
        });         
    }
}
