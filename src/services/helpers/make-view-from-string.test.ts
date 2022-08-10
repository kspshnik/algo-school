import exp from 'constants';
import makeViewFromString from './make-view-from-string';

describe('testing makeViewFromString()', () => {
  it('should return an empty array from empty string', () => {
    expect(makeViewFromString('', '34', [])).toEqual([]);
  });
});
