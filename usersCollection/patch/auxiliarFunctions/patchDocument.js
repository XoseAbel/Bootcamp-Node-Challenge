import { SETCONDITION, SETPHONE } from '../const';

import { setCondition } from './patchFunctions/setCondition';
import { setPhone } from './patchFunctions/setPhone';

function patchDocument(op, value) {
  const strategy = {
    [SETCONDITION]: () => setCondition(op, value),
    [SETPHONE]: () => setPhone(op, value),
    __default__: null,
  };

  return strategy[op] ? strategy[op] : strategy.__default__;
}
export { patchDocument };
