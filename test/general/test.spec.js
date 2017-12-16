import * as _ from 'lodash';
import * as Q from 'q';

import {sdk} from '../../src/mule-sdk';

describe('mule-sdk', () => {
  it('should expose sdk', () => {
    expect(sdk).toBeDefined();
  });

  it('should create an SDK instance', () => {
    var SDK = sdk('http://zion.tgp.io:313/webservices/');
    
    expect(SDK).toBeDefined();
  });
  
  it('should depencies should work', () => {
    _.times(3, () => console.log('lol'));

    console.log(fetch)
    console.log(Q)
  });
  
});
