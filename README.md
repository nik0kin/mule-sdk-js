# mule-sdk.js

### Get Started

To Use as a multifile AMD module
```
bower install
./dodev.sh
```
then
```
define(['./path/to/src/mule-sdk'], function (sdk) {
});
```

To Build into a minified AMD module
```
./build.sh
# builds to dist/
```
then ```<script src="path/to/mule-sdk.min.js">``` after you load require.js
then this will work
```
define(['mule-sdk'], function (sdk) {
});
```

#### Example SDK Instantiation

```
define(['mule-sdk'], function (sdk) {
  var yourMuleServicesUrl = "http://muleserver.com:313/";

  var SDK = sdk(yourMuleServicesUrl);

  SDK.doStuff();
});
```


### Calls

#### Users
SDK.Users.indexQ()
SDK.Users.createQ(params)
SDK.Users.readQ(userId)

SDK.Users.loginQ()
SDK.Users.sessionQ(params)

#### Games
SDK.Games.indexQ()
SDK.Games.createQ(params)
SDK.Games.readQ(gameId)

SDK.Games.readUsersGamesQ(userId)

SDK.Games.joinGameQ(gameId)

SDK.Games.getPlayersMapQ(game)

#### RuleBundles
SDK.RuleBundles.indexQ()
SDK.RuleBundles.readQ()

#### GameBoards
SDK.GameBoards.indexQ()
SDK.GameBoards.readQ(gameBoardId)
SDK.GameBoards.readGamesBoardQ(gameId)

#### GameStates
SDK.GameStates.indexQ()
SDK.GameStates.readQ(gameStateId)
SDK.GameStates.readGamesStateQ(gameId)

#### Historys
SDK.Historys.indexQ()
SDK.Historys.readQ(historyId)
SDK.Historys.readGamesHistoryQ(gameId)
SDK.Historys.readGamesFullHistoryQ(gameId)

SDK.Historys.getWhosTurnIsIt(history)

#### Turns
SDK.Turns.readQ(turnId)
SDK.Turns.readGamesTurnQ(gameId, turnNumber)

#### Methods

SDK.PlayTurn.submitQ(params)
SDK.PlayTurn.sendGameTurnQ(gameId, params)

#### ETC

SDK.Q - Q library

#### Experimental Spinal

SDK.Spinal() - creates Spinal instance
mySpinal.initQ(spinalConfig)
mySpinal.startRefresh()
mySpinal.stopRefresh()
