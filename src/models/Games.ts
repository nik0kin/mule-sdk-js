
import * as Q from 'q';
import * as _ from 'lodash';

import { Game, PlayersMap, User } from '../../types/mule';
import { GamesApi, UsersApi } from '../../types/sdk';

import { initUsersApi } from '../models/Users';
import { qwest } from '../utils/qwest';


export function initGamesApi(contextPath: string) {
  var that: any = {};

  const usersApi: UsersApi = initUsersApi(contextPath);

  that.indexQ = function (): Q.Promise<Game[]> {
    return qwest.get(contextPath + 'games');
  };

  that.createQ = function (params: any): Q.Promise<any> {
    return qwest.post(contextPath + 'games', params);
  };

  that.readQ = function (gameId: string): Q.Promise<string> {
    return qwest.get(contextPath + 'games/' + gameId);
  };

  that.readUsersGamesQ = function (userId: string): Q.Promise<Game[]> {
    return qwest.get(contextPath + 'users/' + userId + '/games');
  };

  that.readMyGamesQ = function (): Q.Promise<Game[]> {
    return that.readUsersGamesQ(usersApi.getLoggedInUserId());
  };

  ////// GAME SERVICES //////

  that.joinGameQ = function (gameId: string): Q.Promise<any> {
    return qwest.post(contextPath + 'games/' + gameId + '/join');
  };

  ///// other //////

  that.getPlayersMapQ = function (game: Game): Q.Promise<PlayersMap> {
    var map: PlayersMap = _.clone(game.players),
      promiseArray: Q.Promise<any>[] = [];

    _.each(map, function (player, playerRel) {
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
};
