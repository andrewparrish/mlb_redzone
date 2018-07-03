import * as React from 'react';

import { TeamInterface } from './../../interfaces/team.interface';

export class DisplayBlackoutTeam extends React.Component<{ team: TeamInterface }> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="blackout-team__display">{ this.props.team.displayName }</li>
        );
    }
}
