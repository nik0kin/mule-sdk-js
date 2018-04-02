
import { Promise, resolve } from 'q';

import { DataModelTypes, RuleBundle } from '../../../types/mule';
import { RuleBundlesApi } from '../../../types/sdk';

import { database, genericGetData } from '../../mockBackend/data';

export class MockRuleBundlesApi implements RuleBundlesApi {
  public indexQ = (): Promise<RuleBundle[]> => {
    return resolve(database.RuleBundles);
  }
  public createQ = (params: any): Promise<any> => {
    throw 'nyi' + params;
  }
  public readQ: (ruleBundleId: string) => Promise<RuleBundle> = genericGetData<RuleBundle>(DataModelTypes.RuleBundles);
}

export const ruleBundlesApi: RuleBundlesApi = new MockRuleBundlesApi();
