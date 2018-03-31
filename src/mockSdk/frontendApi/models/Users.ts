
import * as Q from 'q';

import { User, UserCache, MuleUserCreateResponse, MuleUserSessionResponse, MuleUserLoginResponse } from '../../../types/mule';
import { UsersApi } from '../../../types/sdk';

export class MockUsersApi implements UsersApi {
  public getLoggedInUserId = (): number | undefined => {
    return 1;
  }
  public indexQ = (): Q.Promise<User[]> => {
    return Q.resolve([]);
  }
  public createQ = (params: any): Q.Promise<MuleUserCreateResponse> => {
    throw 'nyi ' + params;
  }
  public readQ = (userId: string): Q.Promise<User> => {
    throw 'nyi ' + userId;
  }
  public sessionQ = (): Q.Promise<MuleUserSessionResponse> => {
    throw 'nyi ';
  }
  public loginQ = (params: any): Q.Promise<MuleUserLoginResponse> => {
    throw 'nyi ' + params;
  }
  public usersCache: UserCache;
  public fakeCacheWrite = (result: User): void => {
    throw 'nyi ' + result;
  }
  public readCacheQ = (userId: string): Q.Promise<User | undefined> => {
    throw 'nyi ' + userId;
  }
  public indexCacheQ = (force: boolean): Q.Promise<UserCache> => {
    throw 'nyi ' + force;
  }
}
