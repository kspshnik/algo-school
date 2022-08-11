const swapItemsInArray = <T = number>(
  arr: Array<T>,
  from: number,
  to: number,
) : Array<T> => arr.map(
    (
      item,
      index,
      array,
    ) => {
      let res = item;
      if (index === from) {
        res = array[to];
      } else if (index === to) {
        res = array[from];
      }
      return res;
    },
  );

export default swapItemsInArray;
