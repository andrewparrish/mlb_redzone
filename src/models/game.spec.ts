import { Game } from './game';
import { GameInterface } from '../interfaces/game.interface';
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
        const teamOne = teamFactory();
        const teamTwo = teamFactory({ id: 2 });

        beforeAll(() => {
            gameWithTeams.teamOne = teamOne.id;
            gameWithTeams.teamTwo = teamTwo.id;
            testChrome.storage.local.get.yields(
                {
                    [Team.uniqueId(teamOne.id)]: teamOne,
                    [Team.uniqueId(teamTwo.id)]: teamTwo
                }
            );
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
});
