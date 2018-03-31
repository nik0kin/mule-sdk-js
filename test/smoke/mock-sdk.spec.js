import * as _ from 'lodash';
import * as Q from 'q';

import { MockSdk } from '../../src/mockSdk/mock-sdk';

describe('mock-sdk', () => {
  it('should expose sdk', () => {
    expect(MockSdk).toBeDefined();
  });

  it('should create an SDK instance', () => {
    var SDK = new MockSdk('http://zion.tgp.io:313/webservices/');
    
    expect(SDK).toBeDefined();
  });
});
