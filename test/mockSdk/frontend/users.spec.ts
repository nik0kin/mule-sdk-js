
import { MockSdk } from '../../../src/mockSdk/mock-sdk';
import { User } from '../../../src/types/mule';

import { basicGame, anotherBasicGame } from '../../mock-data/Game';
import { basicUsers } from '../../mock-data/User';

describe('mock-frontend-sdk', () => {

  function initSDK(): MockSdk {
    return new MockSdk('http://zion.tgp.io:313/webservices/');
  }

  afterEach(() => {
    MockSdk.resetMockData();
  });

  describe('User API', () => {
    it(`
      given a user isnt logged in
      then SDK.Users.sessionQ() will reject
    `, (done) => {
      MockSdk.addMockData({
        Users: basicUsers,
      });
      const SDK = initSDK();

      SDK.Users.sessionQ()
        .then(
          (user: User) => {
            expect('expect this not to be called').toBeUndefined();
          },
          () => {
            expect('expect this to be called').toBeDefined();
            done();
          }
        );
    });

    it(`
      given a user is logged in
      then SDK.Users.sessionQ() will load the logged in User
    `, (done) => {
      MockSdk.addMockData({
        Users: basicUsers,
      });
      MockSdk.setLoggedInUser(basicUsers[0]._id);
      const SDK = initSDK();

      SDK.Users.sessionQ()
        .then(
          (user: User) => {
            expect(user).toEqual(basicUsers[0]);
            done();
          },
          () => {
            expect('expect this not to be called').toBeUndefined();
          }
        );
    });

    it(`
      given a user isnt logged in
      when SDK.Users.loginQ() is called
      then the user will be logged in
    `, (done) => {
      MockSdk.addMockData({
        Users: basicUsers,
      });
      const SDK = initSDK();

      SDK.Users.loginQ({username: basicUsers[1].username, password: 'mockApiDoesntCare'})
        .then(
          (response) => {
            expect(response.userId).toEqual(basicUsers[1]._id);
            expect(response.username).toEqual(basicUsers[1].username);
            expect(SDK.Users.getLoggedInUserId()).toEqual(basicUsers[1]._id);
            done();
          },
          () => {
            expect('expect this not to be called').toBeUndefined();
          }
        );
    });
  });
});
