
import * as Q from 'q';
import * as _ from 'lodash';

import { initUsersApi, UsersApi, User } from '../models/Users';
import { qwest } from '../utils/qwest';

export interface GamesApi {
  indexQ(): Q.Promise<Game[]>;
  createQ(params: any): Q.Promise<any>;
  readQ(gameId: string): Q.Promise<string>;
  readUsersGamesQ(userId: string): Q.Promise<Game[]>;
  readMyGamesQ(): Q.Promise<Game[]>;
  joinGameQ(gameId: string): Q.Promise<any>;
  getPlayersMapQ(game: Game): Q.Promise<PlayersMap>;
}

export interface Game {
  _id: string;
  gameBoard: string; // id
  gameStatus: string;
  maxPlayers: number;
  players: PlayersMap;
  name: string;
  nextTurnTime: Date;
  ruleBundle: {
    id: string;
    name: string;
  };
  turnProgressStyle: string;
  turnTimeLimit: number;
}

export interface PlayersMap {
  [playerNum: string]: { //  'p1'
    playerId: string;
    playerStatus: string;
    name?: string; // added by getPlayersMapQ()
  };
}

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
