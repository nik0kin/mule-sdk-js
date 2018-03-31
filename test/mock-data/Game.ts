import { Game, TurnProgressStyle } from '../../src/types/mule';

export const basicGame: Game = {
  _id: 'testId_100',
  gameBoard: 'gameBoardId_101',
  gameStatus: 'inprogress',
  maxPlayers: 2,
  players: {
    'p1': {
      playerId: 'playerId_102',
      playerStatus: 'inGame'
    },
    'p2': {
      playerId: 'playerId_103',
      playerStatus: 'inGame'
    },
  },
  name: 'Checkers 1v1 - noobs only',
  nextTurnTime: new Date(),
  ruleBundle: {
    id: 'ruleBundleId_104',
    name: 'Checkers',
  },
  ruleBundleGameSettings: {
    customBoardSettings: {},
  },
  turnProgressStyle: TurnProgressStyle.WaitProgress,
  turnTimeLimit: -1,
};
