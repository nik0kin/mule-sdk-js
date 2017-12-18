
import * as Q from 'q';

import { RuleBundle } from '../../../types/mule';
import { RuleBundlesApi } from '../../../types/sdk';

export class MockRuleBundlesApi implements RuleBundlesApi {
  public indexQ = (): Q.Promise<RuleBundle[]> => {
    return Q.resolve([]);
  }
  public createQ = (params: any): Q.Promise<any> => {
    throw 'nyi' + params;
  }
  public readQ = (ruleBundleId: string): Q.Promise<RuleBundle> => {
    throw 'nyi' + ruleBundleId;
  }
}
