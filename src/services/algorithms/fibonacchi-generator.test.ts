import fibonacchiGenerator from './fibonacchi-generator';

describe('testing fibpnacchi generator', () => {
  it('0 should yield 0', () => {
    const fb0 = fibonacchiGenerator(0);
    const fb0fn = jest.fn().mockImplementation(() => fb0.next().value);
    expect(fb0fn()).toEqual([0]);
    expect(fb0fn()).toEqual(undefined);
  });
  it('1 should yield 1', () => {
    const fb1 = fibonacchiGenerator(1);
    const fb1fn = jest.fn().mockImplementation(() => fb1.next().value);
    expect(fb1fn()).toEqual([0]);
    expect(fb1fn()).toEqual([0, 1]);
    expect(fb1fn()).toEqual(undefined);
  });
  it('should yield 0, 1, 1, 2, 3, 5, 8', () => {
    const fb6 = fibonacchiGenerator(6);
    const fb6fn = jest.fn().mockImplementation(() => fb6.next().value);
    expect(fb6fn()).toEqual([0]);
    expect(fb6fn()).toEqual([0, 1]);
    expect(fb6fn()).toEqual([0, 1, 1]);
    expect(fb6fn()).toEqual([0, 1, 1, 2]);
    expect(fb6fn()).toEqual([0, 1, 1, 2, 3]);
    expect(fb6fn()).toEqual([0, 1, 1, 2, 3, 5]);
    expect(fb6fn()).toEqual([0, 1, 1, 2, 3, 5, 8]);
    expect(fb6fn()).toEqual(undefined);
  });
});
