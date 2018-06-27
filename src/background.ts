import * as $ from 'jquery';
import { Game } from './models/game';
import { GameCheckerService } from './services/game-checker.service';

import { Team } from './models/team';

$.getJSON("mappings/teams.json", (teams) => {
    $.each(teams, (val, name) => {
        let blackout = false;
        if (val === "nym" || val === "nyy" ) { blackout = true; }
        const team = new Team({ id: val, displayName: name, blackout });
        team.save(Team.uniqueId(val));
    });  
});

console.log('HEREEREERE');

const gameChecker = new GameCheckerService();
