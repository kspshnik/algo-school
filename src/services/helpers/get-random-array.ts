import getRandomNumberInRange from './get-random-number-in-range';

const getRandomArray = (
  minNumber: number,
  maxNumber: number,
  minLength: number,
  maxLength: number,
) : Array<number> => {
  const arrayLength = getRandomNumberInRange(minLength, maxLength);
  const res : Array<number> = [];
  for (let i = 0; i < arrayLength; i += 1) {
    res.push(getRandomNumberInRange(minNumber, maxNumber));
  }
  return res;
};
export default getRandomArray;
