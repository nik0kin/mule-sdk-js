import { Promise } from 'q';
import { Action } from '../../types/mule';
export declare function validateActions(gameId: string, ruleBundleName: string, actions: Action[]): Promise<Action[]>;
export declare function doActionsAndSaveMeta(gameId: string, ruleBundleName: string, actions: Action[]): Promise<void>;
