function* fibonacchiGenerator(limit : number) : Generator<Array<number>, void, Array<number>> {
  const fib : Array<number> = [];
  for (let i = 0; i < limit + 1; i += 1) {
    if (i === 0 || i === 1) {
      fib.push(i);
      yield fib;
    } else {
      fib.push(fib[i - 1] + fib[i - 2]);
      yield fib;
    }
  }
}

export default fibonacchiGenerator;
