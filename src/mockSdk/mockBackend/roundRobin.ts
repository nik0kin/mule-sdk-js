import { assign, invert } from 'lodash';
import { Promise, resolve } from 'q';

import { History, HistoryTurns, Turn, TurnId, DataModelTypes, LiteHistory } from '../../types/mule';
import { MulePlayTurnResponse } from '../../types/mule-http';

import { genericSave } from './data';
import { doActionsAndSaveMeta } from './actionsHelper';

export function isPlayersTurn(playerId: string, history: History<Turn | TurnId>): boolean {
  return playerId === history.turnOrder[history.currentPlayerIndexTurn];
}

export function playTurn(gameId: string, ruleBundleName: string, playerRel: string, turn: Turn, history: LiteHistory): Promise<MulePlayTurnResponse> {
  // play turn
  doActionsAndSaveMeta(gameId, ruleBundleName, turn.playerTurns[playerRel].actions);

  // progressTurn

  // progressRound (if applicable)

  return resolve({
    msg: 'Success',
    turnNumber: history.currentTurn, // 2
  });
}

export function addTurnAndSaveHistory(newTurn: Turn, playerRel: string, history: LiteHistory): LiteHistory {
  const newHistory: LiteHistory = getAddedTurnToHistory(newTurn, playerRel, history);
  return genericSave<LiteHistory>(DataModelTypes.Historys, newHistory);
}

function getAddedTurnToHistory(newTurn: Turn, playerRel: string, history: LiteHistory): LiteHistory {
  return assign({}, history, {
    turns: getTurnsWithAddedTurnId(history.turns, newTurn._id, history.currentRound, getPlayersOrderIndex(playerRel, history)),
  });
}

function getPlayersOrderIndex(playerRel: string, history: History<Turn | TurnId>): number {
  return Number(invert(history.turnOrder)[playerRel]); // from mule-models/History
}

function getTurnsWithAddedTurnId(turns: HistoryTurns<TurnId>, newTurnId: string, round: number, playerOrderIndex: number): HistoryTurns<TurnId> {
  const roundTurnIds: TurnId[] = turns[round - 1];
  const newRoundTurnIds: TurnId[] = [...roundTurnIds];
  newRoundTurnIds[playerOrderIndex] = newTurnId;
  return assign({}, turns, {
    [round - 1]: newRoundTurnIds
  });
}
