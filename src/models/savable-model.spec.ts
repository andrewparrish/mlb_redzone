import { SavableModel } from './savable-model';
import * as testChrome from 'sinon-chrome';
declare const window: any;

describe('SavableModel', () => {
    beforeAll(() => {
       window.chrome = testChrome;
    });
    const model = new SavableModel();

    describe('save', () => {
       it('calls chrome local storage', () => {
           model.save((result) => {
               expect(result).not.toBeNull();
           });
       });
    });

    describe('modelHash', () => {
       it('renders the model as an object', () => {
            expect(model.asHash()).toEqual({});
       });
    });
});