import { ApiError } from '../../../../auxiliarFunctions/throwErrors/ApiError';
import { evalObject } from '../../../../auxiliarFunctions/validations/evalObject';
import { evalRange } from '../../../../auxiliarFunctions/validations/evalRange';
import {
  COUNTRYCODE,
  NUMBER,
  NUMBER_OPTIONS,
  COUNTRY_CODE_OPTIONS,
} from '../../../conts';
import { evalType } from '../../../../auxiliarFunctions/validations/evalType';
import { TYPEOF_NUMBER } from '../../../../auxiliarFunctions/validations/const';

export const setPhone = (op, value) => {
  try {
    //phone validation
    const { phone } = value;

    evalObject(phone, [
      {
        key: COUNTRYCODE,
        required: true,
        checkfn: [
          element => evalType(element, TYPEOF_NUMBER, COUNTRYCODE),
          element => evalRange(element, COUNTRY_CODE_OPTIONS, COUNTRYCODE),
        ],
      },
      {
        key: NUMBER,
        required: true,
        checkfn: [
          element => evalType(element, TYPEOF_NUMBER, NUMBER),
          element => evalRange(element, NUMBER_OPTIONS, NUMBER),
        ],
      },
    ]);

    return { $set: { phone: phone, lastUpdate: new Date() } };
  } catch (error) {
    console.log(error);
    throw new ApiError(400, error.message);
  }
};
