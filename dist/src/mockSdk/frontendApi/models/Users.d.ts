import { User, UserCache } from '../../../types/mule';
import { MuleUserCreateResponse, MuleUserLoginRequest, MuleUserLoginResponse } from '../../../types/mule-http';
import { UsersApi, UnknownType } from '../../../types/sdk';
export declare let loggedInUserId: string | undefined;
export declare function setLoggedInUser(userId: string): void;
export declare class MockUsersApi implements UsersApi {
    getLoggedInUserId: () => string | undefined;
    indexQ: () => Promise<User[]>;
    createQ: (params: UnknownType) => Promise<MuleUserCreateResponse>;
    readQ: (userId: string) => Promise<User>;
    sessionQ: () => Promise<User>;
    loginQ: (params: MuleUserLoginRequest) => Promise<MuleUserLoginResponse>;
    usersCache: UserCache;
    cacheUser: (result: User) => void;
    readCacheQ: (userId: string) => Promise<User | undefined>;
    indexCacheQ: (force: boolean) => Promise<UserCache>;
}
export declare const usersApi: UsersApi;
