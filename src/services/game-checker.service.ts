import { PriorityList } from './../models/priority-list';
import { PriorityInterface } from './../interfaces/priority.interface';

export class GameCheckerService {
    priorities: Array<PriorityInterface>;
    active: boolean;

    BASE_URL = 'https://statsapi.mlb.com';

    constructor() {
        PriorityList.setInitialPriorities().then((priorityList) => {
            this.priorities = priorityList;
        });

        this.active = true;
    }
}
