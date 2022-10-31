const getArrowFill = (isChanging : boolean, isRightChanging : boolean, isRightDone : boolean) : string => (isChanging && (isRightChanging || isRightDone) ? '#D252E1' : '#0032FF');

export default getArrowFill;
