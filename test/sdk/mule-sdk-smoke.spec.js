import * as _ from 'lodash';
import * as Q from 'q';

import { sdk } from '../../src/muleSdk/mule-sdk';

describe('mule-sdk', () => {
  it('should expose sdk', () => {
    expect(sdk).toBeDefined();
  });

  it('should create an SDK instance', () => {
    let SDK = sdk('http://zion.tgp.io:313/webservices/');
    
    expect(SDK).toBeDefined();
  });
  
  it('should depencies should work', () => {
    let i = 0;
    _.times(2, () => i++);
    expect(i).toBe(2);

    expect(fetch).toBeDefined();
    expect(Q).toBeDefined();
  });
  
});
