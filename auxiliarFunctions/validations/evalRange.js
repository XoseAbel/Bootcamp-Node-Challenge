// primer parametro valor a evaluar
// segundo parametro array con min_lenght y max_lenght
// tercer parametro campo a evaluar
export const evalRange = (value, rangeArr, key) => {
  if (value < rangeArr[0] || value > rangeArr[1]) {
    throw new Error(
      `Validation error: variable ${key} must be between ${rangeArr}`
    );
  }
  return true;
};
