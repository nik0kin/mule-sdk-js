import { Promise, resolve } from 'q';

import { Action } from '../../types/mule';
import { UnknownType } from '../../types/sdk';

export function validateActions(gameId: string, ruleBundleName: string, actions: Action[]): Promise<Action[]> {
  return resolve(actions); // TODO hook up to hookApi
}

export function doActionsAndSaveMeta(gameId: string, ruleBundleName: string, actions: Action[]): Promise<void> {
  return resolve(); // TODO hook up to hookApi
}
