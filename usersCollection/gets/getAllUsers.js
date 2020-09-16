import { connectMongo } from '../../mongo_middleware/connectMongoCallback';
import { MONGO_COL_USERS } from '../../mongo_middleware/const';
import { ApiError } from '../../auxiliarFunctions/throwErrors/ApiError';
import { GET } from '../../auxiliarFunctions/throwErrors/conts';
import { FilterQuery } from './auxiliarFunction/FilterQuery';
import { PROJECTION } from './auxiliarFunction/projection.const';

const getAllUsers = async (req, res) => {
  try {
    //obtener condicion y contruir filtro
    const { condition } = req.query;
    const filterQuery = new FilterQuery(condition);
    // console.log(filterQuery);

    //MongoDB find
    let data;
    let totalCount;
    await connectMongo(MONGO_COL_USERS, async collection => {
      try {
        const cursor = collection.find(filterQuery, { projection: PROJECTION });
        totalCount = await cursor.count();
        data = await cursor.toArray();
      } catch (error) {
        console.log('error', error);
        throw new ApiError(500, GET, MONGO_COL_USERS);
      }
    });

    res.status(200).json({ data, totalCount });
    //lanzamiento de errores
  } catch (error) {
    res.status(error.code).json({ error: error.message });
  }
};
export { getAllUsers };
