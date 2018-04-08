/// <reference types="q" />
import { Promise } from 'q';
import { History } from '../../types/mule';
export declare function isPlayersTurn(playerId: string, history: History): boolean;
export declare function playTurn(): Promise<any>;
