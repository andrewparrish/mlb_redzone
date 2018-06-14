import { Game } from './game';
import { GameInterface } from '../interfaces/game.interface';
import * as testChrome from 'sinon-chrome';
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

    it('can generate a unique id', () => {
        expect(Game.uniqueId(1)).toEqual('game_1');
    });

    it('saves with the proper model hash', () => {
        expect(game.asHash()).toEqual(gameData);
    });

    describe('retrieval by id', () => {
        beforeAll(() => {
            testChrome.storage.local.get.yields({ 'game_1': gameData });
        });

        it('finds a stored game', () => {
            Game.findById(1).then((foundGame) => {
                expect(foundGame).toEqual(game);
            });
        });
    });
});
