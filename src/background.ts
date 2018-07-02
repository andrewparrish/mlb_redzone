import * as $ from 'jquery';
import { Game } from './models/game';
import { GameCheckerService } from './services/game-checker.service';

import { Team } from './models/team';

$.getJSON("mappings/teams.json", (teams) => {
    let allTeams = [];
    $.each(teams, (val, name) => {
        let blackout = false;
        if (val === "nym" || val === "nyy" ) { blackout = true; }
        let teamInfo = { id: val, displayName: name, blackout };
        const team = new Team(teamInfo);
        allTeams.push(teamInfo);
        team.save(Team.uniqueId(val));
    });  

    Team.saveAllTeams(allTeams);
});

console.log('HEREEREERE');

const gameChecker = new GameCheckerService();
