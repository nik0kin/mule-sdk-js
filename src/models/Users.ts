
import * as Q from 'q';
import * as _ from 'lodash';

import { qwest } from '../utils/qwest';

let userId: string | undefined;

export interface UsersApi {
  getLoggedInUserId(): number | undefined;
  indexQ(): Q.Promise<User[]>;
  createQ(params: any): Q.Promise<MuleUserCreateResponse>;
  readQ(userId: string): Q.Promise<User>;
  sessionQ(): Q.Promise<MuleUserSessionResponse>;
  loginQ(params: any): Q.Promise<MuleUserLoginResponse>;
  usersCache: UserCache;
  fakeCacheWrite(result: User): void;
  readCacheQ(userId: string): Q.Promise<User | undefined>;
  indexCacheQ(force: boolean): Q.Promise<UserCache>;
}

export interface User {
  _id: number;
  username: string;
}

export interface MuleUserCreateResponse {
  userId: string;
};

export interface MuleUserSessionResponse {
  [s: string]: any;
};

export interface MuleUserLoginResponse {
  [s: string]: any;
};

export interface UserCache {
  [userId: string]: User;
}

export function initUsersApi(contextPath: string): UsersApi {
  let that: any = {};

  that.getLoggedInUserId = function (): string | undefined {
    return userId;
  };

  that.indexQ = function (): Q.Promise<User[]> {
    return qwest.get(contextPath + 'users');
  };

  that.createQ = function (params: any): Q.Promise<MuleUserCreateResponse> {
    return qwest.post(contextPath + 'users', params)
      .then(function (result: MuleUserCreateResponse) {
        userId = result.userId;
        that.fakeCacheWrite({_id: result.userId, username: params.username});
        return result;
      });
  };

  that.readQ = function (userId: number): Q.Promise<User> {
    return qwest.get(contextPath + 'users/' + userId);
  };

  ////// USER SERVICES //////
  that.sessionQ = function (): Q.Promise<MuleUserSessionResponse> {
    return qwest.get(contextPath + 'session');
  };

  that.loginQ = function (params: any): Q.Promise<MuleUserLoginResponse> {
    return qwest.post(contextPath + 'LoginAuth', params)
      .then(function (result: MuleUserLoginResponse) {
        userId = result.userId;
        that.fakeCacheWrite({_id: result.userId, username: params.username});
        return result;
      });
  };

  ////// CACHING //////
  let usersCache: UserCache = {};
  that.usersCache = usersCache;

  that.fakeCacheWrite = function (result: User): void {
    that.usersCache[result._id] = result;
  };

  that.readCacheQ = function (userId: number): Q.Promise<User | undefined> {
    return Q.Promise(function (resolve, reject) {
      if (that.usersCache[userId]) {
        resolve(that.usersCache[userId]);
      } else {
        that.readQ(userId)
          .then(function (result: User) {
              that.usersCache[result._id] = result;
              resolve(result);
          })
          .catch(reject);
      }
    });
  };

  that.indexCacheQ = function (force: boolean): Q.Promise<UserCache> {
    if (!force && _.isEmpty(usersCache)) {
      return that.indexQ()
        .then(function (result: User[]) {
          _.each(result, function (value: User) {
            usersCache[value._id] = value;
          });
          return Q(usersCache);
        });
    } else {
      return Q(usersCache);
    }
  };

  return that as UsersApi;
};