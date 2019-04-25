

import { DataModelTypes, RuleBundle } from '../../../types/mule';
import { RuleBundlesApi, UnknownType } from '../../../types/sdk';

import { database, genericGetData } from '../../mockBackend/data';

export class MockRuleBundlesApi implements RuleBundlesApi {
  public indexQ = (): Promise<RuleBundle[]> => {
    return Promise.resolve(database.RuleBundles);
  }
  public createQ = (params: UnknownType): Promise<UnknownType> => {
    throw new Error('nyi' + params);
  }
  public readQ: (ruleBundleId: string) => Promise<RuleBundle> = genericGetData<RuleBundle>(DataModelTypes.RuleBundles);
}

export const ruleBundlesApi: RuleBundlesApi = new MockRuleBundlesApi();
