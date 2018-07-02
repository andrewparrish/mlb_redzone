import * as React from 'react';
import * as $ from 'jquery';
import { TeamInterface } from './../../interfaces/team.interface';
import { Team } from './../../models/team';

export class TeamDropdown extends React.Component<{}, { teams: Array<TeamInterface> }> {
    constructor(props) {
        super(props);
        this.state = { teams: [] };
    }

    componentDidMount() {
        Team.getAllTeams().then((teams: Array<TeamInterface>) => {
            console.log('TEAMS', teams);
            this.setState({ teams });
        });
    }


    teamOptions() {
        return this.state.teams.map((team) => {
            return <option value={team.id}>{ team.displayName }</option>
        });
    }

    render() {
        return (
            <select>{ this.teamOptions() }</select>
        );
    }
}
