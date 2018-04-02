
import {
  SDK,
  UsersApi,
  GamesApi, GameBoardsApi,
  RuleBundlesApi, GameStatesApi,
  HistorysApi, TurnsApi,
} from '../types/sdk';
import * as fn from '../shared/fn';

import { gameBoardsApi } from './frontendApi/models/GameBoards';
import { gamesApi } from './frontendApi/models/Games';
import { gameStatesApi } from './frontendApi/models/GameStates';
import { historysApi } from './frontendApi/models/Historys';
import { ruleBundlesApi } from './frontendApi/models/RuleBundles';
import { turnsApi } from './frontendApi/models/Turns';
import { setLoggedInUser, usersApi } from './frontendApi/models/Users';
import { MockPlayTurnApi } from './frontendApi/methods/PlayTurn';

import { addMockData, resetMockData } from './mockBackend/data';

export class MockSdk implements SDK {

  public contextPath: string;

  constructor(contextPath: string) {
    this.contextPath = contextPath;
  }

  // expose util fn  
  public fn = fn.allFn;

  // expose mock apis
  public Users: UsersApi = usersApi;
  public Games: GamesApi = gamesApi;
  public RuleBundles: RuleBundlesApi = ruleBundlesApi;
  public GameBoards: GameBoardsApi = gameBoardsApi; 
  public GameStates: GameStatesApi = gameStatesApi;
  public Historys: HistorysApi = historysApi;
  public Turns: TurnsApi = turnsApi;

  public PlayTurn = new MockPlayTurnApi();


  // special Mock SDK features 
  public static addMockData = addMockData;
  public static resetMockData = resetMockData;
  public static setLoggedInUser = setLoggedInUser;
}
