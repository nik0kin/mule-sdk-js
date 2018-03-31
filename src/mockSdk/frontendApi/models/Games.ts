
import * as Q from 'q';
import * as _ from 'lodash';

import { Game, PlayersMap } from '../../../types/mule';
import { GamesApi } from '../../../types/sdk';

import { database } from '../../mockBackend/data';

export class MockGamesApi implements GamesApi {
  public indexQ = (): Q.Promise<Game[]> => {
    return Q.resolve(database.Games);
  }
  public createQ = (params: any): Q.Promise<any> => {
    throw 'nyi ' + params;
  }
  public readQ = (gameId: string): Q.Promise<Game> => {
    return Q.resolve(_.find(database.Games, (game: Game) => {
      return game._id === gameId;
    }));
  }
  public readUsersGamesQ = (userId: string): Q.Promise<Game[]> => {
    throw 'nyi ' + userId;
  }
  public readMyGamesQ = (): Q.Promise<Game[]> => {
    throw 'nyi';
  }
  public joinGameQ = (gameId: string): Q.Promise<any> => {
    throw 'nyi ' + gameId;
  }
  public getPlayersMapQ = (game: Game): Q.Promise<PlayersMap> => {
    throw 'nyi ' + game;
  }
}
