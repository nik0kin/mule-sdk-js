
import { MockSdk } from '../../../../src/mockSdk/mock-sdk';
import { PlayersMap } from '../../../../src/types/mule';

import { basicGame, anotherBasicGame } from '../../../mock-data/Game';
import { basicUsers } from '../../../mock-data/User';

describe('mock-frontend-sdk', () => {

  function initSDK(): MockSdk {
    return new MockSdk('http://zion.tgp.io:313/webservices/');
  }

  afterEach(() => {
    MockSdk.resetMockData();
  });

  describe('Game API', () => {
    it(`
      should be able to set a couple mock Games
      then load them with SDK.Games.indexQ()
    `, (done) => {
      MockSdk.addMockData({
        Games: [basicGame, anotherBasicGame]
      });
      const SDK = initSDK();

      SDK.Games.indexQ()
        .then((loadedGames) => {
          expect(loadedGames).toEqual([basicGame, anotherBasicGame]);
          done();
        }, () => {
          expect('expect this not to be called').toBeUndefined();
        })
    });

    it(`
      should be able to set a mock Game
      then load it with SDK.Games.readQ()
    `, (done) => {
      MockSdk.addMockData({
        Games: [basicGame]
      });
      const SDK = initSDK();

      SDK.Games.readQ(basicGame._id)
        .then((loadedGame) => {
          expect(loadedGame).toEqual(basicGame);
          done();
        }, () => {
          expect('expect this not to be called').toBeUndefined();
        })
    });

    it(`
      should be able to set a couple mock Games
      then load a users games with SDK.Games.readUsersGamesQ()
    `, (done) => {
      MockSdk.addMockData({
        Games: [anotherBasicGame, basicGame]
      });
      const SDK = initSDK();

      SDK.Games.readUsersGamesQ(basicGame.players['p2'].playerId)
        .then((loadedGames) => {
          expect(loadedGames.length).toEqual(1);
          expect(loadedGames[0]).toEqual(basicGame);
          done();
        }, () => {
          expect('expect this not to be called').toBeUndefined();
        })
    });
    
    it(`
      should be able to set a mock Game and a few Users
      then load a PlayerMap w/ names with SDK.Games.getPlayersMapQ()
    `, (done) => {
      MockSdk.addMockData({
        Users: basicUsers,
        Games: [basicGame]
      });
      const SDK = initSDK();

      SDK.Games.getPlayersMapQ(basicGame)
        .then((playerMap: PlayersMap) => {
          expect(Object.keys(playerMap).length).toEqual(2);
          expect(playerMap['p1'].name).toEqual(basicUsers[1].username);
          done();
        }, () => {
          expect('expect this not to be called').toBeUndefined();
        })
    });
  });
});
