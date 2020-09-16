// primer parametro objeto a evaluar
// segundo parametro array de las condiciones, seran objetos con las propiedades
// {key:string,required:boolean,checkfn:[fn1,fn2...]}

export const evalObject = (obj, arrValidations) => {
  arrValidations.forEach(value => {
    if (value.required && !obj[value.key]) {
      throw new Error(`Field ${value.key} is required`);
    }
    if (obj[value.key]) {
      value.checkfn.forEach(fn => {
        fn(obj[value.key]);
      });
    }
  });
  return true;
};
