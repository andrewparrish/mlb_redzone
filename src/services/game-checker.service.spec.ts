import { GameCheckerService } from './game-checker.service';
import { PriorityList } from './../models/priority-list';
import * as testChrome from 'sinon-chrome';
declare const window: any;

describe('GameCheckerService', () => {
    let priorityList: PriorityList;
    let checkerService: GameCheckerService;

    beforeAll(() => {
        priorityList = new PriorityList(['a']);
        window.chrome = testChrome;
    });
    

    describe('.new', () => {
        beforeAll(() => {
            testChrome.storage.local.get.yields({ 'priorities': priorityList.priorityArr });
        });

        it('sets its priorities', async() => {
            checkerService = await new GameCheckerService();
            expect(checkerService.priorities).toEqual(['a']);
        });
    }); 
});
