import reverseStringGenerator from './reverse-string-generator';
import { TStringStepResult } from '../../types/algo-struct.types';

describe('testing border cases', () => {
  it('should yield the same string on empty or 1 char long string', () => {
    const emptyStringIterator = reverseStringGenerator('');
    const emptyStringFn = jest
      .fn<TStringStepResult, never>()
      .mockImplementation(() => emptyStringIterator.next().value as TStringStepResult);
    expect(emptyStringFn().arr.join('')).toEqual('');
    expect(emptyStringFn()).toEqual(undefined);
    const oneCharStringIterator = reverseStringGenerator('a');
    const oneCharStringFn = jest.fn<TStringStepResult, never>()
      .mockImplementation(() => oneCharStringIterator.next().value as TStringStepResult);
    expect(oneCharStringFn().arr.join('')).toEqual('a');
    expect(oneCharStringFn()).toEqual(undefined);
  });
});

describe('testing reverse', () => {
  it('should reverse even chars long string', () => {
    const evenStringIterator = reverseStringGenerator('army');
    const evenStringFn = jest.fn<TStringStepResult, never>()
      .mockImplementation(() => evenStringIterator.next().value as TStringStepResult);
    expect(evenStringFn().arr.join('')).toEqual('army');
    expect(evenStringFn().arr.join('')).toEqual('yrma');
    expect(evenStringFn().arr.join('')).toEqual('yrma');
    expect(evenStringFn().arr.join('')).toEqual('ymra');
    expect(evenStringFn()).toEqual(undefined);
  });
  it('should reverse odd chars long string', () => {
    const oddStringIterator = reverseStringGenerator('react');
    const oddStringFn = jest.fn<TStringStepResult, never>()
      .mockImplementation(() => oddStringIterator.next().value as TStringStepResult);
    expect(oddStringFn().arr.join('')).toEqual('react');
    expect(oddStringFn().arr.join('')).toEqual('teacr');
    expect(oddStringFn().arr.join('')).toEqual('teacr');
    expect(oddStringFn().arr.join('')).toEqual('tcaer');
    expect(oddStringFn().arr.join('')).toEqual('tcaer');
    expect(oddStringFn().arr.join('')).toEqual('tcaer');
    expect(oddStringFn()).toEqual(undefined);
  });
});
