import { Promise, all, resolve } from 'q';
import { clone, each, find } from 'lodash';

import { DataModelTypes, Game, PlayersMap, User, PlayersMapPlayer } from '../../../types/mule';
import { GamesApi, UnknownType } from '../../../types/sdk';

import { usersApi } from '../models/Users';
import { database, genericGetData } from '../../mockBackend/data';

export class MockGamesApi implements GamesApi {

  public indexQ = (): Promise<Game[]> => {
    return resolve(database.Games);
  }
  public createQ = (params: UnknownType): Promise<UnknownType> => {
    throw new Error('nyi ' + params);
  }
  public readQ: (gameId: string) => Promise<Game> = genericGetData<Game>(DataModelTypes.Games);
  public readUsersGamesQ = (userId: string): Promise<Game[]> => {
    return resolve(database.Games.filter((game: Game) => {
      return !!find(game.players, (player: PlayersMapPlayer) => {
        return player.playerId === userId;
      });
    }));
  }
  public readMyGamesQ = (): Promise<Game[]> => {
    throw new Error('nyi');
  }
  public joinGameQ = (gameId: string): Promise<UnknownType> => {
    throw new Error('nyi ' + gameId);
  }

  // TODO rename this?
  //  the code is a copy/paste from muleSdk
  public getPlayersMapQ = (game: Game): Promise<PlayersMap> => {
    var map: PlayersMap = clone(game.players),
      promiseArray: Promise<void>[] = [];

    each(map, (player, playerRel) => {
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
