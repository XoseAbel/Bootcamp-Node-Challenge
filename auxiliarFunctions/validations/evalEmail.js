import { evalType } from './evalType';
import { TYPEOF_STRING } from './const';

export const evalEmail = (value, key) => {
  try {
    const [username, domainArea] = value.split('@');
    const [domain, ending] = domainArea.split('.');
    evalType(username, TYPEOF_STRING);
    evalType(domain, TYPEOF_STRING);
    evalType(ending, TYPEOF_STRING);
  } catch (error) {
    throw new Error(`Validation error: variable ${key} is Invalid Mail`);
  }
};
