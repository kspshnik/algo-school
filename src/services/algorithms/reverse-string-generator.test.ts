import reverseStringGenerator from './reverse-string-generator';

describe('testing border cases', () => {
  it('should yield the same string on empty or 1 char long string', () => {
    const emptyStringIterator = reverseStringGenerator('');
    const emptyStringFn = jest.fn().mockImplementation(() => emptyStringIterator.next().value);
    expect(emptyStringFn()).toEqual('');
    expect(emptyStringFn()).toEqual(undefined);
    const oneCharStringIterator = reverseStringGenerator('a');
    const oneCharStringFn = jest.fn().mockImplementation(() => oneCharStringIterator.next().value);
    expect(oneCharStringFn()).toEqual('a');
    expect(oneCharStringFn()).toEqual(undefined);
  });
});

describe('testing reverse', () => {
  it('should reverse even chars long string', () => {
    const evenStringIterator = reverseStringGenerator('army');
    const evenStringFn = jest.fn().mockImplementation(() => evenStringIterator.next().value);
    expect(evenStringFn()).toEqual('yrma');
    expect(evenStringFn()).toEqual('ymra');
    expect(evenStringFn()).toEqual(undefined);
  });
  it('should reverse odd chars long string', () => {
    const oddStringIterator = reverseStringGenerator('react');
    const oddStringFn = jest.fn().mockImplementation(() => oddStringIterator.next().value);
    expect(oddStringFn()).toEqual('teacr');
    expect(oddStringFn()).toEqual('tcaer');
    expect(oddStringFn()).toEqual(undefined);
  });
});
