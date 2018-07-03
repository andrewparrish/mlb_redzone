import * as React from 'react';

import { TeamSave } from './team-save';

export class AddBlackoutTeam extends React.Component {
    constructor(props) {
        super(props);
    }

    saveBlackoutTeam = () => {
        console.log('SAVE');
    }

    render() {
        return (
            <div className="black-team__add">
                <TeamSave handleClick={this.saveBlackoutTeam} />
            </div>
        );
    }
}


