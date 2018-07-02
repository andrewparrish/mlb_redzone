import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./ui/hello";
import { TeamDropdown } from './ui/components/team-dropdown';

ReactDOM.render(
        <TeamDropdown />,
        document.getElementById("root") as HTMLElement
);
