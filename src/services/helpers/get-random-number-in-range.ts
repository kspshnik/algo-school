const getRandomNumberInRange = (
  min: number,
  max: number,
) : number => min + Math.ceil(Math.random() * (max - min));

export default getRandomNumberInRange;
