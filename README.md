# mule-sdk.js

### Get Started

Dev Watch Mode
```
npm run serve
```

To Build
```
./build.sh
# builds to dist/
```
Note: Dont use built stuff (see Example)

#### Gulp based on

https://github.com/Microsoft/TypeScriptSamples/tree/ac60a3cc89c731d44fc30d5a1b170f71f246e4c2/react-flux-babel-karma

#### Example SDK Instantiation (in a Typescript project)

```
import { sdk } from '../path-to/../src/mule-sdk';

let yourMuleServicesUrl = "http://muleserver.com:313/";

let SDK = sdk(yourMuleServicesUrl);

SDK.doStuff();
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
SDK.utils.getUrlParameter(paramName)

#### Experimental Spinal

SDK.Spinal() - creates Spinal instance
mySpinal.initQ(spinalConfig)
mySpinal.startRefresh()
mySpinal.stopRefresh()
