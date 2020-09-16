import { connectMongo } from '../../mongo_middleware/connectMongoCallback';
import { MONGO_COL_USERS } from '../../mongo_middleware/const';
import { QueryMongoByID } from '../../auxiliarFunctions/QueryMongoByID';
import { ApiError } from '../../auxiliarFunctions/throwErrors/ApiError';
import { GET } from '../../auxiliarFunctions/throwErrors/conts';
import { PROJECTION } from './auxiliarFunction/projection.const';

const getOneUser = async (req, res) => {
  try {
    //obtener id y crear query
    const { id_user } = req.params;
    const queryId = new QueryMongoByID(id_user);

    //mongoDB findOne
    let data;
    await connectMongo(MONGO_COL_USERS, async collection => {
      try {
        data = await collection.findOne(queryId, { projection: PROJECTION });
        //si el usuario no es encontrado lanzamos 404
        if (data === null) {
          throw 404;
        }
      } catch (error) {
        console.log('error', error);
        let code = error === 404 ? 404 : 500;
        throw new ApiError(code, GET, MONGO_COL_USERS);
      }
    });

    res.status(200).json({ data });

    //lanzamiento de errores
  } catch (error) {
    res.status(error.code).json({ error: error.message });
  }
};
export { getOneUser };
