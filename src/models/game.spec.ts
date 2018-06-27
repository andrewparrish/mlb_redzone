import { Game } from './game';
import { GameInterface } from '../interfaces/game.interface';
import { gameFactory } from '../interfaces/factories/game.factory';
import { teamFactory } from '../interfaces/factories/team.factory';
import * as testChrome from 'sinon-chrome';
import { Team } from './team';
declare const window: any;

describe('Game', () => {
    const gameData: GameInterface = {
        id: 1,
        lastUpdated: new Date(),
        link: ''
    };

    const game = new Game(gameData);
    const teamOne = teamFactory();
    const teamTwo = teamFactory({ id: 2 });
    const teamThree = teamFactory({ id: 3, blackout: true });
    const teamsQueryArray = {
        [Team.uniqueId(teamOne.id)]: teamOne,
        [Team.uniqueId(teamTwo.id)]: teamTwo,
        [Team.uniqueId(teamThree.id)]:  teamThree
    }

    beforeAll(() => {
        window.chrome = testChrome;
    });

    it('is a game', () => {
        expect(true).toBeTruthy();
    });

    it('.uniqueId', () => {
        expect(Game.uniqueId(1)).toEqual('game_1');
    });

    it('#asHash', () => {
        expect(game.asHash()).toEqual(gameData);
    });

    describe('.findById', () => {
        beforeAll(() => {
            testChrome.storage.local.get.yields({ 'game_1': gameData });
        });

        it('finds a stored game', () => {
            Game.findById(1).then((foundGame) => {
                expect(foundGame).toEqual(game);
            });
        });
    });

    describe('#getTeams', () => {
        let gameWithTeams: Game = new Game(gameData);
        
        beforeAll(() => {
            gameWithTeams.teamOne = teamOne.id;
            gameWithTeams.teamTwo = teamTwo.id;
            testChrome.storage.local.get.yields(teamsQueryArray);
            window.chrome = testChrome;
        });

        it('finds teams', () => {
            gameWithTeams.getTeams().then((teams) => {
                expect(teams.length).toEqual(2);
                const team = teams.find((team) => team.asHash() === teamOne);
                expect(team).not.toBeNull();
            });
        });
    });

    describe('#isBlackedOut', () => {
        let gameNotBlackedOut: Game = new Game(gameData);
        let blackedoutGame: Game = new Game(gameData);

        beforeAll(() => {
            gameNotBlackedOut.teamOne = teamOne.id;
            gameNotBlackedOut.teamTwo = teamTwo.id;

            blackedoutGame.teamOne = teamOne.id;
            blackedoutGame.teamTwo = teamThree.id;
            testChrome.storage.local.get.yields(teamsQueryArray);
            window.chrome = testChrome;
        }); 

        it('identifies a non-blacked out game', () => {
            gameNotBlackedOut.isBlackedOut().then((blackedOut) => {
                expect(blackedOut).toBeFalsy();
            });
        });

        it('identifies a blacked out game', () => {
            blackedoutGame.isBlackedOut().then((blackedOut) => {
                expect(blackedOut).toBeTruthy();
            });
        });
    });

    describe('#isInCommercialBreak', () => {
        const commercialBreakStatus = "end_of_half_inning";
        const commercialBreakGame: Game = new Game({  alerts: [{ category: commercialBreakStatus }], ...gameData });
        const nonCommercialBreakGame: Game = new Game(gameData);

        it('identifies a game in commercial break', () => {
            expect(commercialBreakGame.isInCommercialBreak()).toBeTruthy();
        });

        it('identifies a game is not in commercial break', () => {
            expect(nonCommercialBreakGame.isInCommercialBreak()).toBeFalsy();
        });
    });

    describe('#inningsRemaining', () => {
        const unstartedGame = new Game(gameFactory());
        const midGame = new Game(gameFactory({ inning: 3 }));
        const extraInningGame = new Game(gameFactory({ inning: 11 }));

        it('is 9 when unstarted', () => {
            expect(unstartedGame.remainingInnings).toEqual(9); 
        });      
        
        it('is 6 after 3 innings', () => {
            expect(midGame.remainingInnings).toEqual(6);
        });

        it('is negative in extra innings', () => {
            expect(extraInningGame.remainingInnings).toEqual(-2);
        });
    });

    describe('#gameScore', () => {
        
    });
});
