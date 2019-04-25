import { each, isEmpty } from 'lodash';


import { User, UserCache } from '../../types/mule';
import { MuleUserCreateResponse, MuleUserSessionResponse, MuleUserLoginResponse } from '../../types/mule-http';
import { UsersApi } from '../../types/sdk';

import { http } from '../utils/http';

let userId: string | undefined;

export function initUsersApi(contextPath: string): UsersApi {
  let that: any = {};

  that.getLoggedInUserId = function (): string | undefined {
    return userId;
  };

  that.indexQ = function (): Promise<User[]> {
    return http.get(contextPath + 'users');
  };

  that.createQ = function (params: any): Promise<MuleUserCreateResponse> {
    return http.post(contextPath + 'users', params)
      .then(function (result: MuleUserCreateResponse) {
        userId = result.userId;
        that.cacheUser({_id: result.userId, username: params.username});
        return result;
      });
  };

  that.readQ = function (_userId: string): Promise<User> {
    return http.get(contextPath + 'users/' + _userId);
  };

  ////// USER SERVICES //////
  that.sessionQ = function (): Promise<MuleUserSessionResponse> {
    return http.get(contextPath + 'session');
  };

  that.loginQ = function (params: any): Promise<MuleUserLoginResponse> {
    return http.post(contextPath + 'LoginAuth', params)
      .then(function (result: MuleUserLoginResponse) {
        userId = result.userId;
        that.cacheUser({_id: result.userId, username: params.username});
        return result;
      });
  };

  ////// CACHING //////
  let usersCache: UserCache = {};
  that.usersCache = usersCache;

  that.cacheUser = function (result: User): void {
    that.usersCache[result._id] = result;
  };

  that.readCacheQ = function (_userId: string): Promise<User | undefined> {
    if (that.usersCache[_userId]) {
      return Promise.resolve(that.usersCache[_userId]);
    } else {
      return that.readQ(_userId)
        .then(function (result: User) {
            that.usersCache[result._id] = result;
            return result;
        });
    }
  };

  that.indexCacheQ = function (force: boolean): Promise<UserCache> {
    if (!force && isEmpty(usersCache)) {
      return that.indexQ()
        .then(function (result: User[]) {
          each(result, function (value: User) {
            usersCache[value._id] = value;
          });
          return usersCache;
        });
    } else {
      return Promise.resolve(usersCache);
    }
  };

  return that as UsersApi;
}
