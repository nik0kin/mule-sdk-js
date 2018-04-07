import { Promise } from 'q';

import { BundleCode } from '../../types/backend-sdk';
import {
  Game, GameBoard, GameState,
  TurnSubmitStyle, DataModelTypes, RuleBundle, History
} from '../../types/mule';
import { MulePlayTurnRequest, MulePlayTurnResponse } from '../../types/mule-http';

import { genericGet } from './data';
import * as roundRobin from './roundRobin';

const bundleCodes: {[name: string]: BundleCode} = {};

export class BackendMockBrain {

}


export function playTurn(gameId: string, params: MulePlayTurnRequest): Promise<MulePlayTurnResponse> {
  const game: Game | undefined = genericGet<Game>(DataModelTypes.Games, gameId);
  if (!game) {
    throw 'invalid gameId ' + gameId; 
  }

  const ruleBundle: RuleBundle | undefined = genericGet<RuleBundle>(DataModelTypes.RuleBundles, game.ruleBundle.id);
  if (!ruleBundle) {
    throw 'invalid ruleBundleId ' + game.ruleBundle.id;
  }

  const gameBoard: GameBoard | undefined = genericGet<GameBoard>(DataModelTypes.GameStates, game.gameBoard);
  if (!gameBoard) {
    throw 'invalid gameboardId ' + game.gameBoard;
  }

  // const gameState: GameState | undefined = genericGet<GameState>(DataModelTypes.GameStates, gameBoard.gameState);
  // if (!gameState) {
  //   throw 'invalid historyId ' + gameBoard.gameState;
  // }
  
  const history: History | undefined = genericGet<History>(DataModelTypes.Historys, gameBoard.history);
  if (!history) {
    throw 'invalid historyId ' + gameBoard.history;
  }

  // get TurnSubmitStyle
  const turnSubmitStyle: TurnSubmitStyle = ruleBundle.turnSubmitStyle;

  if (turnSubmitStyle === TurnSubmitStyle.RoundRobin) {
    // return robinRobin.playTurn
    if (!roundRobin.isPlayersTurn(params.playerId, history)) {
      throw 'not players turn: ' + params.playerId;
    }

  } else if (turnSubmitStyle === TurnSubmitStyle.PlayByMail) {
    throw 'nyi';
  } else {
    throw 'wtf unknown submitstyle';
  }

  throw 'nyi';
}

export function addBundleCode(ruleBundleName: string, bundleCode: BundleCode): void {
  bundleCodes[ruleBundleName] = bundleCode;
}
