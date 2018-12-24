import * as _ from 'lodash';

import { MockSdk } from '../../src/mockSdk/mock-sdk';
import { MockSdk as MockSdk2 } from '../../src/';

describe('mock-sdk', () => {
  it('should expose sdk', () => {
    expect(MockSdk).toBeDefined();
  });

  it('should expose sdk', () => {
    expect(MockSdk2).toBeDefined();
  });

  it('should create an SDK instance', () => {
    var SDK = new MockSdk('http://zion.tgp.io:313/webservices/');

    expect(SDK).toBeDefined();
  });
});
