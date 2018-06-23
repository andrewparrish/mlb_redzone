import { Id } from './../types/id.type';

export class MlbtvManagingService {

    getCurrentGameId(): Promise<Id> {
        return this.handleTab('injections/scrape_current_game.js');
    }

    getCurrentGameIds(): Promise<Array<Id>> {
        return this.handleTab('injections/scrape_current_games.js');
    }

    isMonitorActive(): Promise<boolean> {
        return new Promise((resolve, _reject) => {
            this.getCurrentTab().then((tabs) => {
                resolve(!(tabs && tabs.length == 0));
            });
        });
    }

    changeGame(gameId: Id): void {
        this.getCurrentTab().then((tabs) => {
            chrome.tabs.executeScript(tabs[0].id, {
                code: 'var gameToChangeToId = \'' + gameId + '\';'
            }, () => {
                chrome.tabs.executeScript(tabs[0].id, { file: 'injections/change_current_game.js' });
            });
        });
    }

    private handleTab(script): Promise<any> {
        return new Promise((resolve, _reject) => {
            this.getCurrentTab().then((result) => {
                chrome.tabs.executeScript(result[0].id, { file: script }, (idData) => {
                    resolve(idData[0]);
                });
            });
        });
    }

    private getCurrentTab(): Promise<any> {
        return new Promise((resolve, _reject) => {
            chrome.tabs.query({ url: '*://www.mlb.com/tv/*' }, (result) => {
                resolve(result);
            });
        });

    }
}
