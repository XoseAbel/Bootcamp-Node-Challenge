export const evalPassword = (value, key) => {
  const values = value.split('');
  const numbers = values.filter(element => !isNaN(element));

  if (values.length === numbers.length || numbers.length === 0) {
    throw new Error(
      `Validation error: variable ${key} must contain at least a string and a number`
    );
  }
  return true;
};
