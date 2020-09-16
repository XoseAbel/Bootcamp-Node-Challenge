// primer parametro valor a evaluar
// segundo parametro array con min_lenght y max_lenght
// tercer parametro campo a evaluar
export const evalOptions = (value, optionsArr, key) => {
  if (optionsArr.indexOf(value) === -1) {
    throw new Error(
      `Validation error: variable ${key} only accept: ${optionsArr}`
    );
  }
  return true;
};
