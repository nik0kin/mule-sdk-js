
import { LiteHistory, TurnSubmitStyle } from '../../src/types/mule';

export const basicRoundRobinHistory: LiteHistory = {
  _id: 'historyId_210',
  gameId: 'testId_100',
  currentPlayerIndexTurn: 0,
  currentRound: 1,
  currentTurn: 1,
  currentTurnStatus: {
    p1: false,
    p2: false,
  },
  turnOrder: ['p1', 'p2'],
  turnSubmitStyle: TurnSubmitStyle.RoundRobin,
  turns: {
    0: [],
  },
  winner: undefined,
};
