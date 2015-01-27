/**
 * js-sdk/models/Games.js
 *
 */

define(['./Users', '../q', '../lodash', '../qwest'], function (Users, Q, _, qwest) {
  return function (contextPath) {
    var that = {};

    if (typeof Users != 'object')
      Users = Users(contextPath);

    that.indexQ = function () {
      return qwest.get(contextPath+"games");
    };

    that.createQ = function (params) {
      return qwest.post(contextPath+"games", params);
    };

    that.readQ = function (gameId) {
      return qwest.get(contextPath+"games/" + gameId);
    };

    that.readUsersGamesQ = function (userId) {
      return qwest.get(contextPath+"users/" + userId + '/games');
    };

    that.readMyGamesQ = function () {
      return that.readUsersGamesQ(Users.getLoggedInUserId());
    };

    ////// GAME SERVICES //////

    that.joinGameQ = function (gameId) {
      return qwest.post(contextPath+"games/" + gameId + '/join');
    };

    ///// other //////

    that.getPlayersMapQ = function (game) {
      var map = _.clone(game.players),
        promiseArray = [];

      _.each(map, function (player, playerRel) {
        promiseArray.push(Users.readCacheQ(player.playerId)
          .then(function (user) {
            map[playerRel].name = user.username;
          })
        );
      });

      return Q.all(promiseArray)
        .then(function () {
          return Q(map);
        });
    };

    return that;
  };
});
