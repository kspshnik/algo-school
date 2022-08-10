import { ElementStates } from '../../types/element-states';

const getElementState = (isActive : boolean, isDone : boolean) : ElementStates => {
  let state : ElementStates;
  if (isActive && isDone) {
    throw new Error("Item can't be changing and ready at the same time, sorry.");
  } else if (isActive && !isDone) {
    state = ElementStates.Changing;
  } else if (!isActive && isDone) {
    state = ElementStates.Modified;
  } else {
    state = ElementStates.Default;
  }
  return state;
};

export default getElementState;
