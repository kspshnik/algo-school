import reverseStringStep from './reverse-string-step';

describe('testing border cases', () => {
  const emptyString = '';
  it('should return empty string-reverse-page on empty string-reverse-page', () => {
    expect(reverseStringStep(emptyString, 0, 0)).toEqual('');
  });
  it('should throw if tail is greater then length', () => {
    expect(() => reverseStringStep(emptyString, 0, 6)).toThrow(
      'reverseStringStep(): Head and/or tail is/are out of range!',
    );
  });
});
describe('testing reverse string-reverse-page step', () => {
  it('should return reversed on even length string-reverse-page', () => {
    expect(reverseStringStep('ab', 0, 1)).toEqual('ba');
    expect(reverseStringStep('poke', 1, 2)).toEqual('pkoe');
    expect(reverseStringStep('alfabeta', 2, 5)).toEqual('aleabfta');
    expect(reverseStringStep('cinema', 0, 5)).toEqual('ainemc');
  });
  it('should return a string-reverse-page itself if head === tail', () => {
    expect(reverseStringStep('react', 2, 2)).toEqual('react');
  });
  it('should return reversed on odd length string-reverse-page', () => {
    expect(reverseStringStep('ava', 0, 2)).toEqual('ava');
    expect(reverseStringStep('poker', 1, 3)).toEqual('pekor');
    expect(reverseStringStep('react', 1, 3)).toEqual('rcaet');
    expect(reverseStringStep('oranges', 0, 6)).toEqual('srangeo');
  });
});
