import { Promise, resolve } from 'q';

import { Action } from '../../types/mule';

// @ts-ignore  wip
export function validateActions(gameId: string, ruleBundleName: string, actions: Action[]): Promise<Action[]> {
  return resolve(actions); // TODO hook up to hookApi
}

// @ts-ignore  wip
export function doActionsAndSaveMeta(gameId: string, ruleBundleName: string, actions: Action[]): Promise<void> {
  return resolve(); // TODO hook up to hookApi
}
