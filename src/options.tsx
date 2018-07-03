import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./ui/hello";
import { BlackoutTeams } from './ui/components/blackout-teams';

ReactDOM.render(
        <BlackoutTeams />,
        document.getElementById("root") as HTMLElement
);
