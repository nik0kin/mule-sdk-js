
import { Promise, resolve} from 'q';

import { DataModelTypes, GameBoard, GameBoardCache } from '../../../types/mule';
import { GameBoardsApi } from '../../../types/sdk';

import { database, genericGetData } from '../../mockBackend/data';

export class MockGameBoardsApi implements GameBoardsApi {
  
  public indexQ = (): Promise<GameBoard[]> => {
    return resolve(database.GameBoards);
  }
  public readQ: (userId: string) => Promise<GameBoard> = genericGetData<GameBoard>(DataModelTypes.GameBoards);
  public readGamesBoardQ = (gameId: string): Promise<GameBoard> => {
    throw 'nyi ' + gameId;
  }
  public gameBoardsCache: GameBoardCache = {}
  public cacheGameBoard = (result: GameBoard): void => {
    this.gameBoardsCache[result._id] = result;
  }
  public readCacheQ = (gameBoardId: string): Promise<GameBoard> => {
    return this.readQ(gameBoardId);
  }
}

export const gameBoardsApi: GameBoardsApi = new MockGameBoardsApi();
