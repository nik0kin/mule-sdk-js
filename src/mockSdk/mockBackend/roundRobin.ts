import { Promise } from 'q';

import { History } from '../../types/mule';

export function isPlayersTurn(playerId: string, history: History): boolean {
  return playerId === history.turnOrder[history.currentPlayerIndexTurn];
}

export function playTurn(): Promise<any> {
  // play turn

  // TODO loop thru actions
  
  // progressTurn

  // progressRound (if applicable)
}
