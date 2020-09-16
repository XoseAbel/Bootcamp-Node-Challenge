import { ApiError } from '../../../../auxiliarFunctions/throwErrors/ApiError';
import { evalType } from '../../../../auxiliarFunctions/validations/evalType';
import { TYPEOF_STRING } from '../../../../auxiliarFunctions/validations/const';
import { CONDITION_OPTIONS, CONDITION } from '../../../conts';
import { evalOptions } from '../../../../auxiliarFunctions/validations/evalOptions';

export const setCondition = (op, value) => {
  try {
    //condition validation
    evalType(value, TYPEOF_STRING, CONDITION);
    evalOptions(value, CONDITION_OPTIONS, CONDITION);

    return {
      $set: { condition: value, lastUpdate: new Date() },
    };
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};
