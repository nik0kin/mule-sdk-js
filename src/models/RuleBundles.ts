
import * as Q from 'q';

import { RuleBundle } from '../../types/mule';
import { RuleBundlesApi } from '../../types/sdk';

import { qwest } from '../utils/qwest';

export function initRuleBundlesApi(contextPath: string): RuleBundlesApi {
  var that: any = {};

  that.indexQ = function (): Q.Promise<RuleBundle[]> {
    return qwest.get(contextPath + 'ruleBundles');
  };

  that.createQ = function (params: any): Q.Promise<any> {
    return qwest.post(contextPath + 'ruleBundles', params);
  };

  that.readQ = function (ruleBundleId: string): Q.Promise<RuleBundle> {
    return qwest.get(contextPath + 'ruleBundles/' + ruleBundleId);
  };

  return that as RuleBundlesApi;
}
