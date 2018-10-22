import { Promise } from 'q';
import { History, Turn } from '../../types/mule';
import { MulePlayTurnResponse } from '../../types/mule-http';
export declare function isPlayersTurn(playerId: string, history: History): boolean;
export declare function playTurn(gameId: string, ruleBundleName: string, playerRel: string, turn: Turn, history: History): Promise<MulePlayTurnResponse>;
export declare function addTurnAndSaveHistory(newTurn: Turn, playerRel: string, history: History): History;
