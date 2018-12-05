
import * as Q from 'q';
import { clone, each } from 'lodash';

import { Game, PlayersMap, User } from '../../types/mule';
import { GamesApi, UsersApi } from '../../types/sdk';

import { initUsersApi } from '../models/Users';
import { http } from '../utils/http';


export function initGamesApi(contextPath: string) {
  var that: any = {};

  const usersApi: UsersApi = initUsersApi(contextPath);

  that.indexQ = function (): Q.Promise<Game[]> {
    return http.get(contextPath + 'games');
  };

  that.createQ = function (params: any): Q.Promise<any> {
    return http.post(contextPath + 'games', params);
  };

  that.readQ = function (gameId: string): Q.Promise<string> {
    return http.get(contextPath + 'games/' + gameId);
  };

  that.readUsersGamesQ = function (userId: string): Q.Promise<Game[]> {
    return http.get(contextPath + 'users/' + userId + '/games');
  };

  that.readMyGamesQ = function (): Q.Promise<Game[]> {
    return that.readUsersGamesQ(usersApi.getLoggedInUserId());
  };

  ////// GAME SERVICES //////

  that.joinGameQ = function (gameId: string): Q.Promise<any> {
    return http.post(contextPath + 'games/' + gameId + '/join');
  };

  ///// other //////

  that.getPlayersMapQ = function (game: Game): Q.Promise<PlayersMap> {
    var map: PlayersMap = clone(game.players),
      promiseArray: Q.Promise<void>[] = [];

    each(map, function (player: {playerId: string}, playerRel: string) {
      promiseArray.push(usersApi.readCacheQ(player.playerId)
        .then(function (user?: User) {
          if (user) {
            map[playerRel].name = user.username;
          }
        })
      );
    });

    return Q.all(promiseArray)
      .then(() => map);
  };

  return that as GamesApi;
}
