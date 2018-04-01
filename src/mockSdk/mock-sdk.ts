

import { SDK } from '../types/sdk';
import * as fn from '../shared/fn';

import { MockGameBoardsApi } from './frontendApi/models/GameBoards';
import { MockGamesApi } from './frontendApi/models/Games';
import { MockGameStatesApi } from './frontendApi/models/GameStates';
import { MockHistorysApi } from './frontendApi/models/Historys';
import { MockRuleBundlesApi } from './frontendApi/models/RuleBundles';
import { MockTurnsApi } from './frontendApi/models/Turns';
import { MockUsersApi } from './frontendApi/models/Users';
import { MockPlayTurnApi } from './frontendApi/methods/PlayTurn';

import { addMockData } from './mockBackend/data';

export class MockSdk implements SDK {

  constructor(contextPath?: string) {
    console.log('MockSdk initialized with path: ' + contextPath);
  }

  // expose util fn  
  public fn = fn.allFn;

  // export mock apis
  public Users = new MockUsersApi();
  public Games = new MockGamesApi();
  public RuleBundles = new MockRuleBundlesApi();
  public GameBoards = new MockGameBoardsApi(); 
  public GameStates = new MockGameStatesApi();
  public Historys = new MockHistorysApi();
  public Turns = new MockTurnsApi();

  public PlayTurn = new MockPlayTurnApi();


  // special Mock SDK features 
  public static addMockData = addMockData;
}
