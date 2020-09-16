export const evalType = (value, type, key) => {
  if (typeof value !== type) {
    throw new Error(`Type error: variable ${key} must be a ${type}`);
  }
  return true;
};
