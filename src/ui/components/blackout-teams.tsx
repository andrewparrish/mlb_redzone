import * as React from 'react';

import { AddBlackoutTeam } from './add-blackout-team';
import { DisplayBlackoutTeam } from './display-blackout-team';

import { TeamInterface } from './../../interfaces/team.interface';
import { Team } from './../../models/team';


export class BlackoutTeams extends React.Component<{}, { allTeams: Array<TeamInterface>, blackoutTeams: Array<TeamInterface> }> {
    constructor(props) {
        super(props);
        this.state = { blackoutTeams: [], allTeams: [] };
    }

    componentDidMount() {
        this.getBlackoutTeams();
    }

    getBlackoutTeams() {
        Team.getAllTeams().then((teams: Array<TeamInterface>) => {
            const ids = teams.map(team => team.id);
            Team.findAllById(ids).then((bOutTeams) => {
                const blackedOutTeams = bOutTeams.filter(t => t.blackout);
                this.setState({ blackoutTeams: blackedOutTeams });
            });
        });
    }

    teamsBlackedOut() {
        return this.state.blackoutTeams.map((team) => {
            return <DisplayBlackoutTeam team={team} />
        });
    }

    addBlackoutTeam = (id) => {
        console.log('ID', id);
    }

    render() {
        return (
            <div className="blackout-teams">
                <AddBlackoutTeam /> 
                <ul>{ this.teamsBlackedOut() }</ul>
            </div>
        );
    }
}
