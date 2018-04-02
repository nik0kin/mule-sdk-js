import { Promise, all, resolve } from 'q';
import * as _ from 'lodash';

import { DataModelTypes, Game, PlayersMap, User } from '../../../types/mule';
import { GamesApi, UnknownType } from '../../../types/sdk';

import { usersApi } from '../models/Users';
import { database, genericGetData } from '../../mockBackend/data';

export class MockGamesApi implements GamesApi {

  public indexQ = (): Promise<Game[]> => {
    return resolve(database.Games);
  }
  public createQ = (params: UnknownType): Promise<UnknownType> => {
    throw 'nyi ' + params;
  }  
  public readQ: (gameId: string) => Promise<Game> = genericGetData<Game>(DataModelTypes.Games);
  public readUsersGamesQ = (userId: string): Promise<Game[]> => {
    return resolve(_.filter(database.Games, (game: Game) => {
      return !!_.find(game.players, (player) => {
        return player.playerId === userId;
      });
    }));
  }
  public readMyGamesQ = (): Promise<Game[]> => {
    throw 'nyi';
  }
  public joinGameQ = (gameId: string): Promise<UnknownType> => {
    throw 'nyi ' + gameId;
  }

  // TODO rename this?
  //  the code is a copy/paste from muleSdk
  public getPlayersMapQ = (game: Game): Promise<PlayersMap> => {
    var map: PlayersMap = _.clone(game.players),
      promiseArray: Promise<void>[] = [];

    _.each(map, (player, playerRel) => {
      promiseArray.push(usersApi.readQ(player.playerId)
        .then((user?: User) => {
          if (user) {
            map[playerRel].name = user.username;
          }
        })
      );
    });

    return all(promiseArray)
      .then(() => map);
  }
}

export const gamesApi: GamesApi = new MockGamesApi();
