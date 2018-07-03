import * as React from 'react';

import { TeamDropdown } from './team-dropdown';

export class TeamSave extends React.Component<any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="team__save">
                <TeamDropdown></TeamDropdown>
                <button onClick={this.props.handleClick}>Save</button>
            </div>
        );
    }
}
