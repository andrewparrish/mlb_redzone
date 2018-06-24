import { Game } from './../models/game';
import { PriorityList } from './../models/priority-list';
import { PriorityInterface } from './../interfaces/priority.interface';

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

    //checkForGameChange(): void {
    //    this.mlbService.getCurrentGameId().then((gameId) => {
    //        Game.findById(gameId).then((game) => {

    //        });         
    //    });
    //}
}
