

import { SDK } from '../types/sdk';
import * as fn from '../shared/fn';

import { MockGameBoardsApi } from './api/models/GameBoards';
import { MockGamesApi } from './api/models/Games';
import { MockGameStatesApi } from './api/models/GameStates';
import { MockHistorysApi } from './api/models/Historys';
import { MockRuleBundlesApi } from './api/models/RuleBundles';
import { MockTurnsApi } from './api/models/Turns';
import { MockUsersApi } from './api/models/Users';
import { MockPlayTurnApi } from './api/methods/PlayTurn';

export class MockSdk implements SDK {
  public fn = fn.allFn;

  public Users = new MockUsersApi();
  public Games = new MockGamesApi();
  public RuleBundles = new MockRuleBundlesApi();
  public GameBoards = new MockGameBoardsApi(); 
  public GameStates = new MockGameStatesApi();
  public Historys = new MockHistorysApi();
  public Turns = new MockTurnsApi();

  public PlayTurn = new MockPlayTurnApi();
}
