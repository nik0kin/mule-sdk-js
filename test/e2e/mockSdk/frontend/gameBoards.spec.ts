import { assign } from 'lodash';

import { MockSdk } from '../../../../src/mockSdk/mock-sdk';
import { GameBoard } from '../../../../src/types/mule';

import { basicGame } from '../../../mock-data/Game';
import { basicGameBoard } from '../../../mock-data/GameBoard';
import { basicUsers } from '../../../mock-data/User';

describe('mock-frontend-sdk', () => {

  function initSDK(): MockSdk {
    return new MockSdk('http://zion.tgp.io:313/webservices/');
  }

  afterEach(() => {
    MockSdk.resetMockData();
  });

  describe('GameBoard API', () => {
    it(`
      should be able to set a couple mock Games
      then load them with SDK.GameBoards.indexQ()
    `, (done) => {
      const anotherBasic: GameBoard = assign({}, basicGameBoard, {_id: 'gameBoardId_2million'});
      MockSdk.addMockData({
        GameBoards: [basicGameBoard, anotherBasic]
      });
      const SDK = initSDK();

      SDK.GameBoards.indexQ()
        .then(
          (loadedGameBoards: GameBoard[]) => {
            expect(loadedGameBoards).toEqual([basicGameBoard, anotherBasic]);
            done();
          },
          () => {
            expect('expect this not to be called').toBeUndefined();
          }
        );
    });

    it(`
      should be able to set a mock GameBoard
      then load it with SDK.GameBoards.readQ()
    `, (done) => {
      MockSdk.addMockData({
        GameBoards: [basicGameBoard]
      });
      const SDK = initSDK();

      SDK.GameBoards.readQ(basicGameBoard._id)
        .then(
          (loadedGameBoard: GameBoard) => {
            expect(loadedGameBoard).toEqual(basicGameBoard);
            done();
          },
          () => {
            expect('expect this not to be called').toBeUndefined();
          }
        );
    });

    it(`
      should be able to set a mock Game/GameBoard
      then load it with SDK.GameBoards.readGamesBoardQ()
    `, (done) => {
      MockSdk.addMockData({
        Games: [basicGame],
        GameBoards: [basicGameBoard],
      });
      const SDK = initSDK();

      SDK.GameBoards.readGamesBoardQ(basicGame._id)
        .then(
          (loadedGameBoard: GameBoard) => {
            expect(loadedGameBoard).toEqual(basicGameBoard);
            done();
          },
          (e) => {
            expect('expect this not to be called').toBeUndefined();
          }
        );
    });
  });
});
