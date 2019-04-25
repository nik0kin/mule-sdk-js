import * as _ from 'lodash';


import { initializeMuleSdk } from '../../src/muleSdk/mule-sdk';

describe('mule-sdk', () => {
  it('should expose sdk', () => {
    expect(initializeMuleSdk).toBeDefined();
  });

  it('should create an SDK instance', () => {
    let sdk = initializeMuleSdk('http://zion.tgp.io:313/webservices/');

    expect(sdk).toBeDefined();
  });

  it('should dependencies should work', () => {
    let i = 0;
    _.times(2, () => i++);
    expect(i).toBe(2);

    expect(fetch).toBeDefined();
    expect(Promise).toBeDefined();
  });

});
