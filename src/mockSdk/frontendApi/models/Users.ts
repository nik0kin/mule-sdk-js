
import { Promise, resolve, reject } from 'q';
import * as _ from 'lodash';

import {
  DataModelTypes,
  User, UserCache,
} from '../../../types/mule';
import { MuleUserCreateResponse, MuleUserSessionResponse, MuleUserLoginRequest, MuleUserLoginResponse } from '../../../types/mule-http';
import { UsersApi, UnknownType } from '../../../types/sdk';

import { database, genericGetData } from '../../mockBackend/data';

export let loggedInUserId: string | undefined = undefined;

export function setLoggedInUser(userId: string): void {
  loggedInUserId = userId;
}

export class MockUsersApi implements UsersApi {
  public getLoggedInUserId = (): string | undefined => {
    return loggedInUserId;
  }
  public indexQ = (): Promise<User[]> => {
    return resolve(database.Users);
  }
  public createQ = (params: UnknownType): Promise<MuleUserCreateResponse> => {
    throw new Error('nyi ' + params);
  }
  public readQ: (userId: string) => Promise<User> = genericGetData<User>(DataModelTypes.Users);
  public sessionQ = (): Promise<MuleUserSessionResponse> => {
    if (loggedInUserId) {
      return this.readQ(loggedInUserId);
    } else {
      return reject({ // TODO need to check how fetch would return that error
        statusCode: 403
      });
    }
  }
  public loginQ = (params: MuleUserLoginRequest): Promise<MuleUserLoginResponse> => {
    const foundUser: User | undefined = _.find(database.Users, (user: User) => {
      return user.username === params.username;
    });

    if (foundUser) {
      loggedInUserId = foundUser._id;
      return resolve({
        userId: foundUser._id,
        username: foundUser.username,
      });
    } else {
      return reject({
        statusCode: 401 // TODO double check
      });
    }
  }
  public usersCache: UserCache; // dont user cache (no reason)
  public cacheUser = (result: User): void => { // TODO why does a game frontend need to cache a user (un expose this)
    throw new Error('nyi ' + result);
  }
  public readCacheQ = (userId: string): Promise<User | undefined> => {
    return this.readQ(userId);
  }
  public indexCacheQ = (force: boolean): Promise<UserCache> => {
    throw new Error('nyi ' + force);
  }
}

export const usersApi: UsersApi = new MockUsersApi();
