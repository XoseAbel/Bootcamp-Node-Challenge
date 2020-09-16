// primer parametro valor a evaluar
// segundo parametro array con min_lenght y max_lenght
// tercer parametro campo a evaluar
export const evalLenght = (value, lengthArr, key) => {
  if (value.length < lengthArr[0] || value.length > lengthArr[1]) {
    throw new Error(
      `Validation error: variable ${key} must be between ${lengthArr}`
    );
  }
  return true;
};
