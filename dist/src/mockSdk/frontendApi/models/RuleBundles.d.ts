import { Promise } from 'q';
import { RuleBundle } from '../../../types/mule';
import { RuleBundlesApi, UnknownType } from '../../../types/sdk';
export declare class MockRuleBundlesApi implements RuleBundlesApi {
    indexQ: () => Promise<RuleBundle[]>;
    createQ: (params: UnknownType) => Promise<UnknownType>;
    readQ: (ruleBundleId: string) => Promise<RuleBundle>;
}
export declare const ruleBundlesApi: RuleBundlesApi;
