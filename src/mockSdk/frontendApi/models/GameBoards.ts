

import { DataModelTypes, GameBoard, GameBoardCache } from '../../../types/mule';
import { GameBoardsApi } from '../../../types/sdk';

import { database, genericGetData } from '../../mockBackend/data';

import { gamesApi } from './Games';

export class MockGameBoardsApi implements GameBoardsApi {

  public indexQ = (): Promise<GameBoard[]> => {
    return Promise.resolve(database.GameBoards);
  }
  public readQ: (userId: string) => Promise<GameBoard> = genericGetData<GameBoard>(DataModelTypes.GameBoards);
  public readGamesBoardQ (gameId: string): Promise<GameBoard> {
    return gamesApi.readQ(gameId)
      .then((game) => this.readQ(game.gameBoard));
  }
  public gameBoardsCache: GameBoardCache = {};
  public cacheGameBoard = (result: GameBoard): void => {
    this.gameBoardsCache[result._id] = result;
  }
}

export const gameBoardsApi: GameBoardsApi = new MockGameBoardsApi();
