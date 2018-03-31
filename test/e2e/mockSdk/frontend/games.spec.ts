
import { MockSdk } from '../../../../src/mockSdk/mock-sdk';

import { basicGame } from '../../../mock-data/Game';

describe('mock-frontend-sdk', () => {
  describe('Game API', () => {
    it(`
      should be able to set a mock Game
      then load it with SDK.Games.readQ()
    `, () => {
      MockSdk.setMockData({
        Games: [basicGame]
      });

      let SDK = new MockSdk('http://zion.tgp.io:313/webservices/');
      
      expect(SDK).toBeDefined();

      SDK.Games.readQ(basicGame._id)
        .then((loadedGame) => {
          expect(loadedGame).toEqual(basicGame);
        }, () => {
          expect('expect this not to be called').toBeUndefined();
        })
    });
  });
});
