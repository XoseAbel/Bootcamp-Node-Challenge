import { CONDITION, LASTUPDATE } from '../../../conts';

function GroupQueryStatstics() {
  this._id = `$${CONDITION}`;
  this.Total = { $sum: 1 };
  this.LastUpdate = { $max: `$${LASTUPDATE}` };
}

export { GroupQueryStatstics };
