const swapItems = <T = number>(
  arr : Array<T>,
  head : number,
  tail : number,
) : Array<T> => {
  const wrk = arr;
  const tmp : T = arr[head];
  wrk[head] = arr[tail];
  wrk[tail] = tmp;
  return wrk;
};

export default swapItems;
