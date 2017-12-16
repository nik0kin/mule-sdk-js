
import * as Q from 'q';

import { qwest } from '../utils/qwest';

export interface RuleBundlesApi {
  indexQ(): Q.Promise<RuleBundle[]>;
  createQ(params: any): Q.Promise<any>;
  readQ(ruleBundleId: string): Q.Promise<RuleBundle>;
}

export interface RuleBundle {
  name: string;
}

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
