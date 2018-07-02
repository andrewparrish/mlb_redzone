import { SavableModel } from './savable-model';
import { TeamInterface } from '../interfaces/team.interface';
import { Id } from '../types/id.type';

export class Team extends SavableModel {
    id: Id;
    displayName: string;
    blackout: boolean;

    constructor(teamData: TeamInterface) {
        super();
        Object.assign(this, teamData);
    }

    static className(): string {
        return 'team';
    }

    static allTeamsKey(): string {
        return 'all_teams';
    }

    static saveAllTeams(teams: Array<TeamInterface>): void {
        chrome.storage.local.set({ [this.allTeamsKey()]: teams });
    }

    static getAllTeams(): Promise<any> {
        const key = this.allTeamsKey();
        return new Promise((resolve, _reject) => {
            chrome.storage.local.get([key], (result) => {
                let data = result[key];
                resolve(data);
            });
        });
    }

    //TODO: Load all teams from json

    asHash(): any {
        return {
            id: this.id,
            displayName: this.displayName,
            blackout: this.blackout
        }
    }
}
