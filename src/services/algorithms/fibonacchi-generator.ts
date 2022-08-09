function* fibonacchiGenerator(limit: number) : Generator<number, void, never> {
  const fib : Array<number> = [];
  for (let i = 0; i < limit + 1; i += 1) {
    if (i === 0 || i === 1) {
      yield i;
      fib.push(i);
    } else {
      yield fib[i - 1] + fib[i - 2];
      fib.push(fib[i - 1] + fib[i - 2]);
    }
  }
}
export default fibonacchiGenerator;
