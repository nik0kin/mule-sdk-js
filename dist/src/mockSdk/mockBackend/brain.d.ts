/// <reference types="q" />
import { Promise } from 'q';
import { BundleCode } from '../../types/backend-sdk';
import { MulePlayTurnRequest, MulePlayTurnResponse } from '../../types/mule-http';
export declare class BackendMockBrain {
}
export declare function playTurn(gameId: string, params: MulePlayTurnRequest): Promise<MulePlayTurnResponse>;
export declare function addBundleCode(ruleBundleName: string, bundleCode: BundleCode): void;
