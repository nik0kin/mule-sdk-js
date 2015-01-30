/**
 * sdk.js
 *  TODO: es6
 */

define(
  ['./lib/q', './utils/index',
    "./models/Users", "./models/Games",
    "./models/RuleBundles", "./models/GameBoards",
    './models/GameStates',
    "./models/Historys", "./models/Turns",
    "./methods/PlayTurn", './Spinal/index'],
  function (Q, utils,
    Users, Games,
    RuleBundles, GameBoards,
    GameStates,
    Historys, Turns,
    PlayTurn, Spinal
  ) {

  return function (contextPath) {
    var that = {};

    that.Q = Q;
    that.utils = utils;

    that.Users = Users(contextPath);
    that.Games = Games(contextPath);
    that.RuleBundles = RuleBundles(contextPath);
    that.GameBoards = GameBoards(contextPath);
    that.GameStates = GameStates(contextPath);
    that.Historys = Historys(contextPath);
    that.Turns = Turns(contextPath);

    that.PlayTurn = PlayTurn(contextPath);

    that.Spinal = Spinal(that);

    return that;
  };
});
