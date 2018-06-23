import { BaseApiService } from './base-api.service';

describe('BaseApiService', () => {
    it('has a base url', () => {
        expect(new BaseApiService().BASE_URL).toEqual('https://statsapi.mlb.com');
    });
});
