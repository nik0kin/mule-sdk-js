/*
  - possible test:
      given one player has not played
      when they submit their turn
      then progressRound should be called
*/

import { MockSdk } from '../../../src/mockSdk/mock-sdk';
import { History, PlayersMap, User, Turn } from '../../../src/types/mule';
import { MulePlayTurnRequest } from '../../../src/types/mule-http';

import { basicGame, anotherBasicGame } from '../../mock-data/Game';
import { basicGameBoard } from '../../mock-data/GameBoard';
import { basicGameState } from '../../mock-data/GameState';
import { basicRoundRobinHistory } from '../../mock-data/History';
import { backgammonRuleBundle } from '../../mock-data/RuleBundle';
import { basicUsers } from '../../mock-data/User';


fdescribe('MockSdk E2E API', () => {

  function initSDK(): MockSdk {
    return new MockSdk('http://zion.tgp.io:313/webservices/');
  }

  afterEach(() => {
    MockSdk.resetMockData();
  });

  it(`
    given a player has not played (and its his turn)
    when they submit their turn
    then the turn should be saved
    and then progressTurn should be called (round robin)
  `, (done) => {
    MockSdk.addMockData({
      Users: basicUsers,
      Games: [basicGame],
      GameBoards: [basicGameBoard],
      GameStates: [basicGameState],
      RuleBundles: [backgammonRuleBundle],
      Historys: [basicRoundRobinHistory],
      Turns: []
    });
    MockSdk.addBundleCode(basicGame.ruleBundle.name, {
      actions: {},
    });
    const SDK = initSDK();

    const playerUser: User = basicUsers[1];
    const currentRound: number = basicRoundRobinHistory.currentRound;
    const playerRel: string = 'p1';
    const playerTurnIndex: number = 0; // could get from basicRoundRobinHistory.turnOrder w/ playerRel
    let savedTurnId: string;

    const turnParams: MulePlayTurnRequest = {
      playerId: playerUser._id,
      actions: [{
        type: 'testAction',
        params: {
          test: true
        }
      }],
    };

    expect(basicRoundRobinHistory.turns[currentRound - 1][playerTurnIndex]).not.toBeDefined();
    expect(basicRoundRobinHistory.currentTurn).toEqual(1);

    SDK.PlayTurn.sendGameTurnQ(basicGame._id, turnParams)
      .then((result) => {
        expect(result).toBeDefined();

        // verify history has progressed
        return SDK.Historys.readQ(basicGameBoard.history);
      })
      .then((history: History) => {
        expect(history.turns[currentRound - 1][playerTurnIndex]).toBeDefined();
        savedTurnId = history.turns[currentRound - 1][playerTurnIndex];
        // expect(history.currentTurn).toEqual(2); // TODO

        return SDK.Turns.readQ(savedTurnId);
      })
      .then((turn: Turn) => {
        expect(turn.gameId).toEqual(basicGame._id);
        expect(turn.playerTurns[playerRel].actions[0].params.test).toEqual(true);

        done();
      })
      .catch(() => {
        expect('expect this not to be called').toBeUndefined();
      });

  });
/*
    it(`
      given one player has not played
      when they submit their turn
      then progressRound should be called  (playByMail)
    `, (done) => {
      MockSdk.addMockData({
        Users: basicUsers,
        Games: [basicGame],
        GameBoards: [basicGameBoard],
        GameStates: [],
        Historys: [],
        Turns: []
      });
      const SDK = initSDK();

      SDK.Games.readQ(basicGame._id)
        .then(
          (loadedGame) => {
            expect(loadedGame).toEqual(basicGame);
            done();
          },
          () => {
            expect('expect this not to be called').toBeUndefined();
          }
        );
    });
*/
});
