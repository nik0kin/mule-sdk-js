import { findKey } from 'lodash';
import { Promise } from 'q';

import {
  Game, GameBoard, PlayersMapPlayer,
  TurnSubmitStyle, DataModelTypes, RuleBundle, History, Turn
} from '../../types/mule';
import { MulePlayTurnRequest, MulePlayTurnResponse } from '../../types/mule-http';

import { genericCreate, genericGet } from './data';
import * as roundRobin from './roundRobin';
import { validateActions } from './actionsHelper';

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

  const gameBoard: GameBoard | undefined = genericGet<GameBoard>(DataModelTypes.GameBoards, game.gameBoard);
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

  const playerRel: string | undefined = findKey(game.players, (player: PlayersMapPlayer) => {
    return player.playerId === params.playerId;
  });
  if (!playerRel) {
    throw 'invalid playerId: ' + params.playerId;
  }

  // check actions
  validateActions(gameId, ruleBundle.name, params.actions);

  // get TurnSubmitStyle
  const turnSubmitStyle: TurnSubmitStyle = ruleBundle.turnSubmitStyle;

  // save turn
  const newTurn: Turn = genericCreate<Turn>(DataModelTypes.Turns, {
    gameId,
    turnNumber: history.currentTurn,
    playerTurns: {
      [playerRel]: {
        dateSubmitted: new Date(),
        actions: params.actions,
      }
    }
  });

  if (turnSubmitStyle === TurnSubmitStyle.RoundRobin) {
    // return robinRobin.playTurn
    if (!roundRobin.isPlayersTurn(playerRel, history)) {
      throw 'not players turn: ' + params.playerId;
    }

    // save history/turn
    roundRobin.addTurnAndSaveHistory(newTurn, playerRel, history);

    return roundRobin.playTurn(gameId, ruleBundle.name, playerRel, newTurn, history);

  } else if (turnSubmitStyle === TurnSubmitStyle.PlayByMail) {
    throw 'nyi';
  } else {
    throw 'wtf unknown submitstyle';
  }
}

