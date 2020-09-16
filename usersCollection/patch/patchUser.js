import { connectMongo } from '../../mongo_middleware/connectMongoCallback';
import { MONGO_COL_USERS } from '../../mongo_middleware/const';
import { QueryMongoByID } from '../../auxiliarFunctions/QueryMongoByID';
import { patchDocument } from './auxiliarFunctions/patchDocument';
import { ApiError } from '../../auxiliarFunctions/throwErrors/ApiError';
import { PATCH } from '../../auxiliarFunctions/throwErrors/conts';

const patchUser = async (req, res) => {
  try {
    //obtener id y crear query
    const { id_user } = req.params;
    const queryId = new QueryMongoByID(id_user);

    //construir updateQuery
    const { op, value } = req.body;
    const patchOperation = patchDocument(op, value);
    if (!patchOperation) {
      throw new ApiError(400, 'Operation Invalid');
    }
    const patchValue = patchOperation();
    // console.log(patchValue);

    //mongo updateOne
    let modifiedCount;
    let matchedCount;
    await connectMongo(MONGO_COL_USERS, async collection => {
      try {
        const data = await collection.updateOne(queryId, patchValue);
        modifiedCount = data.modifiedCount;
        matchedCount = data.matchedCount;
        if (!matchedCount) {
          throw 404;
        }
      } catch (error) {
        let code = error === 404 ? 404 : 500;
        throw new ApiError(code, PATCH, MONGO_COL_USERS);
      }
    });

    res.status(200).json({ modifiedCount, matchedCount });
    //lanzamiento de errores
  } catch (error) {
    res.status(error.code).json({ error: error.message });
  }
};
export { patchUser };
