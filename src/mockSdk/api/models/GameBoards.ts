
import * as Q from 'q';

import { GameBoard, GameBoardCache } from '../../../types/mule';
import { GameBoardsApi } from '../../../types/sdk';

export class MockGameBoardsApi implements GameBoardsApi {
  
  public indexQ = (): Q.Promise<GameBoard[]> => {
    return Q.resolve([]);
  }
  public readQ = (gameBoardId: string): Q.Promise<GameBoard> => {
    return Q.resolve(this.gameBoardsCache[gameBoardId]);
  }
  public readGamesBoardQ = (gameId: string): Q.Promise<GameBoard> => {
    throw 'nyi ' + gameId;
  }
  public gameBoardsCache: GameBoardCache = {}
  public fakeCacheWrite = (result: GameBoard): void => {
    this.gameBoardsCache[result._id] = result;
  }
  public readCacheQ = (gameBoardId: string): Q.Promise<GameBoard> => {
    return this.readQ(gameBoardId);
  }
}
