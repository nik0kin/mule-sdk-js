import { Promise } from 'q';
import { RoundRobinHistory, LiteRoundRobinHistory, Turn, LiteHistory } from '../../types/mule';
import { MulePlayTurnResponse } from '../../types/mule-http';
export declare function isPlayersTurn(playerId: string, history: RoundRobinHistory): boolean;
export declare function playTurn(gameId: string, ruleBundleName: string, playerRel: string, turn: Turn, history: LiteHistory): Promise<MulePlayTurnResponse>;
export declare function addTurnAndSaveHistory(newTurn: Turn, playerRel: string, history: LiteRoundRobinHistory): LiteRoundRobinHistory;
