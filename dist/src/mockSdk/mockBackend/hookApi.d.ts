import { Promise } from 'q';
import { BundleCode } from '../../types/backend-sdk';
export declare function addBundleCode(ruleBundleName: string, bundleCode: BundleCode): void;
export declare function progressRoundHook(ruleBundleName: string, gameId: string): Promise<any>;
export declare function progressTurnHook(ruleBundleName: string, gameId: string): Promise<any>;
