import 'whatwg-fetch';
import Promise from 'promise-polyfill';

import { http } from './http';

describe('muleSdk utils: http', () => {
  it('get() should work with json-response in string form', (done) => {
    spyOn(window, 'fetch').and.callFake(() => Promise.resolve({
      json: () => '{}'
    }));

    http.get('stuff.com')
      .then((response: any) => {
        expect(response).toEqual({});
        done();
      });
  });

  it('get() should work with json-response in object form', (done) => {
    spyOn(window, 'fetch').and.callFake(() => Promise.resolve({
      json: (): any => {
        return {};
      }
    }));

    http.get('stuff.com')
      .then((response: any) => {
        expect(response).toEqual({});
        done();
      });
  });

  it('get() should handle a parse error by rejecting', (done) => {
    spyOn(window, 'fetch').and.callFake(() => Promise.resolve({
      json: () => '{{}'
    }));

    http.get('stuff.com')
      .then(() => {/**/}, (error) => {
        expect(error).toBeDefined();
        done();
      });
  });

  it('post() should work', (done) => {
    spyOn(window, 'fetch').and.callFake(() => Promise.resolve({
      json: (): any => {
        return {};
      }
    }));

    http.post('stuff.com')
      .then((response: any) => {
        expect(response).toEqual({});
        done();
      });
  });
});
