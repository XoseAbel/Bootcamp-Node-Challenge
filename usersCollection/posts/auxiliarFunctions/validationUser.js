import { evalLenght } from '../../../auxiliarFunctions/validations/evalLenght';
import {
  NAME,
  SURNAME,
  EMAIL,
  PASSWORD,
  CONDITION,
  CONDITION_OPTIONS,
  COUNTRYCODE,
  COUNTRY_CODE_OPTIONS,
  NUMBER,
  NUMBER_OPTIONS,
} from '../../conts';
import { evalType } from '../../../auxiliarFunctions/validations/evalType';
import {
  TYPEOF_NUMBER,
  TYPEOF_STRING,
} from '../../../auxiliarFunctions/validations/const';
import { evalEmail } from '../../../auxiliarFunctions/validations/evalEmail';
import { ApiError } from '../../../auxiliarFunctions/throwErrors/ApiError';
import { evalOptions } from '../../../auxiliarFunctions/validations/evalOptions';
import { evalObject } from '../../../auxiliarFunctions/validations/evalObject';
import { evalRange } from '../../../auxiliarFunctions/validations/evalRange';
import { evalPassword } from '../../../auxiliarFunctions/validations/evalPassword';

export const validationUser = data => {
  const { name, surname, email, password, phone, condition = 'unknown' } = data;
  try {
    //name
    evalType(name, TYPEOF_STRING, NAME);
    evalLenght(name, [2, 40], NAME);
    //surname
    evalType(surname, TYPEOF_STRING, SURNAME);
    evalLenght(surname, [2, 40], SURNAME);
    //email
    evalType(email, TYPEOF_STRING, EMAIL);
    evalEmail(email, EMAIL);
    //password
    evalType(password, TYPEOF_STRING, PASSWORD);
    evalLenght(password, [6, 14], PASSWORD);
    evalPassword(password, PASSWORD);
    //phone
    if (phone) {
      evalObject(phone, [
        {
          key: COUNTRYCODE,
          required: true,
          checkfn: [
            value => evalType(value, TYPEOF_NUMBER, COUNTRYCODE),
            value => evalRange(value, COUNTRY_CODE_OPTIONS, COUNTRYCODE),
          ],
        },
        {
          key: NUMBER,
          required: true,
          checkfn: [
            value => evalType(value, TYPEOF_NUMBER, NUMBER),
            value => evalRange(value, NUMBER_OPTIONS, NUMBER),
          ],
        },
      ]);
    }
    //condition
    evalType(condition, TYPEOF_STRING, CONDITION);
    evalOptions(condition, CONDITION_OPTIONS, CONDITION);
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};
