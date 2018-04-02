
import { getUrlParameter } from './http';

describe('SDK.fn: http', () => {
  it('getUrlParameter() should return the value', () => {
    // spying on this because window.location.search is harder
    spyOn(String.prototype, 'substring').and.returnValue('key=value');

    expect(getUrlParameter('key')).toEqual('value');
  });

  it('getUrlParameter() should return undefined if the key doesnt exist', () => {
    spyOn(String.prototype, 'substring').and.returnValue('');

    expect(getUrlParameter('key')).toBeUndefined();
  });
});
