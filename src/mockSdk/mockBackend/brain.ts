import { findKey } from 'lodash';

import {
  Game, GameBoard, LiteHistory, LiteRoundRobinHistory, PlayersMapPlayer,
  TurnSubmitStyle, DataModelTypes, RuleBundle, Turn
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
    throw new Error('invalid gameId ' + gameId);
  }

  const ruleBundle: RuleBundle | undefined = genericGet<RuleBundle>(DataModelTypes.RuleBundles, game.ruleBundle.id);
  if (!ruleBundle) {
    throw new Error('invalid ruleBundleId ' + game.ruleBundle.id);
  }

  const gameBoard: GameBoard | undefined = genericGet<GameBoard>(DataModelTypes.GameBoards, game.gameBoard);
  if (!gameBoard) {
    throw new Error('invalid gameboardId ' + game.gameBoard);
  }

  // const gameState: GameState | undefined = genericGet<GameState>(DataModelTypes.GameStates, gameBoard.gameState);
  // if (!gameState) {
  //   throw new Error('invalid historyId ' + gameBoard.gameState);
  // }

  const history: LiteHistory | undefined = genericGet<LiteHistory>(DataModelTypes.Historys, gameBoard.history);
  if (!history) {
    throw new Error('invalid historyId ' + gameBoard.history);
  }

  const playerRel: string | undefined = findKey(game.players, (player: PlayersMapPlayer) => {
    return player.playerId === params.playerId;
  });
  if (!playerRel) {
    throw new Error('invalid playerId: ' + params.playerId);
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
    if (!roundRobin.isPlayersTurn(playerRel, history as LiteRoundRobinHistory)) {
      throw new Error('not players turn: ' + params.playerId);
    }

    // save history/turn
    roundRobin.addTurnAndSaveHistory(newTurn, playerRel, history as LiteRoundRobinHistory);

    return roundRobin.playTurn(gameId, ruleBundle.name, playerRel, newTurn, history);

  } else if (turnSubmitStyle === TurnSubmitStyle.PlayByMail) {
    throw new Error('nyi');
  } else {
    throw new Error('wtf unknown submitstyle');
  }
}

