import { RuleBundle } from '../../types/mule';
import { RuleBundlesApi } from '../../types/sdk';

import { http } from '../utils/http';

export function initRuleBundlesApi(contextPath: string): RuleBundlesApi {
  var that: any = {};

  that.indexQ = function (): Promise<RuleBundle[]> {
    return http.get(contextPath + 'ruleBundles');
  };

  that.createQ = function (params: any): Promise<any> {
    return http.post(contextPath + 'ruleBundles', params);
  };

  that.readQ = function (ruleBundleId: string): Promise<RuleBundle> {
    return http.get(contextPath + 'ruleBundles/' + ruleBundleId);
  };

  return that as RuleBundlesApi;
}
