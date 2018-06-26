import * as $ from 'jquery';
import { Game } from './models/game';
import { GameCheckerService } from './services/game-checker.service';

import { Team } from './models/team';

$.getJSON("mappings/teams.json", (teams) => {
    $.each(teams, (val, name) => {
        const team = new Team({ id: val, displayName: name });
        team.save(Team.uniqueId(val));
    });  
});

console.log('HEREEREERE');

const gameChecker = new GameCheckerService();
