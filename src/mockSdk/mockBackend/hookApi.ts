import { Promise, resolve } from 'q';

import { BundleCode, BundleHooks, MuleStateSdk } from '../../types/backend-sdk';

// import createMQ from './M';
const createMQ: any = () => null; // temp while mockBackend is under construction

const bundleCodes: {[name: string]: BundleCode} = {};

export function addBundleCode(ruleBundleName: string, bundleCode: BundleCode): void {
  bundleCodes[ruleBundleName] = bundleCode;
}

function getBundleCode(ruleBundleName: string): BundleCode {
  return bundleCodes[ruleBundleName];
}

function getBundleCodeHook(ruleBundleName: string, hookName: string): Function | undefined {
  const hookKey: BundleHooks = hookName as BundleHooks;
  return getBundleCode(ruleBundleName)[hookKey];
}

// returns metadata or null
export function progressRoundHook(ruleBundleName: string, gameId: string): Promise<any> {
  return baseHook(ruleBundleName, gameId, 'progressRound');
}

// returns metadata or null
export function progressTurnHook(ruleBundleName: string, gameId: string): Promise<any> {
  return baseHook(ruleBundleName, gameId, 'progressTurn');
}

function baseHook(ruleBundleName: string, gameId: string, hookName: string, param1?: any, param2?: any): Promise<any> {
  // look if hook exists
  // if hook exists
  //   print start msg
  //     doHookQ
  //      then: print end msg
  //      fail: display err & propigate

  const hookQ: Function | undefined = getBundleCodeHook(ruleBundleName, hookName);

  if (hookQ) {
    return createMQ(gameId, hookName)
      .then(function (M: MuleStateSdk) {
        console.log('[START] ' + hookName, gameId);
        return hookQ(M, param1, param2);
      })
      .then(function (result: any) {
        console.log('[END] ' + hookName, gameId);
        return result;
      })
      .fail(function (err: any) {
        var errorMsg = '[ERROR] '  + hookName + ': ' + err;
        console.log(errorMsg, gameId, err);
        throw errorMsg;
      });
  } else {
    console.log(hookName + ' Hook Not Implemented', gameId);
    return resolve();
  }
}
