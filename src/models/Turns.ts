import * as Q from 'q';

import { qwest } from '../utils/qwest';
import { Turn } from './Turns';

export interface TurnsApi {
  readQ(historyId: string): Q.Promise<Turn>;
  readGamesTurnQ(gameId: string, turnNumber: number): Q.Promise<Turn>;
}

export interface Turn {
  _id: string;
  gameId: string;
  playerTurns: {
    [playerNum: string]: {
      actions: any[];
      dateSubmitted: Date;
    }
  }
}

export function initTurnsApi(contextPath: string): TurnsApi {
  const that: any = {};

  that.readQ = function (turnId: string): Q.Promise<Turn> {
    return qwest.get(contextPath + 'turns/' + turnId);
  };

  that.readGamesTurnQ = function (gameId: string, turnNumber: number): Q.Promise<Turn> {
    return qwest.get(contextPath + 'games/' + gameId + '/history/' + turnNumber);
  };

  return that as TurnsApi;
}
