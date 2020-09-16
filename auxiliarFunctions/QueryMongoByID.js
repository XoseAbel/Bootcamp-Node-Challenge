import { ObjectId } from 'mongodb';
import { ApiError } from './throwErrors/ApiError';

function QueryMongoByID(id) {
  try {
    this._id = ObjectId(id);
  } catch (error) {
    throw new ApiError(400, 'Invalid ObjectID');
  }
}
export { QueryMongoByID };
