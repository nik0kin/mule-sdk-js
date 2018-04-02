/// <reference types="q" />
import { Promise } from 'q';
import { Turn } from '../../../types/mule';
import { TurnsApi } from '../../../types/sdk';
export declare class MockTurnsApi implements TurnsApi {
    readQ: (turnId: string) => Promise<Turn>;
    readGamesTurnQ: (gameId: string, turnNumber: number) => Promise<Turn>;
}
export declare const turnsApi: TurnsApi;
