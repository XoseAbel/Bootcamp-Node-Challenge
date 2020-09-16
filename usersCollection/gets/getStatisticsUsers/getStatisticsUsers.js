import { connectMongo } from '../../../mongo_middleware/connectMongoCallback';
import { MONGO_COL_USERS } from '../../../mongo_middleware/const';
import { ApiError } from '../../../auxiliarFunctions/throwErrors/ApiError';
import { GET } from '../../../auxiliarFunctions/throwErrors/conts';
import { GroupQueryStatstics } from './auxiliarFunctions/GroupQueryStatstics';

const getStatisticsUsers = async (req, res) => {
  try {
    // contruimos las condiones de agrupacion, independientes por is se modifican en un futuro
    const groupQuery = new GroupQueryStatstics();
    // console.log(groupQuery);

    //MongoDb aggregate para agrupar datos
    let data;
    await connectMongo(MONGO_COL_USERS, async collection => {
      try {
        const cursor = collection.aggregate([
          {
            $group: groupQuery,
          },
        ]);
        data = await cursor.toArray();
      } catch (error) {
        // console.log('error', error);
        throw new ApiError(500, GET, MONGO_COL_USERS);
      }
    });

    res.status(200).json({ data });
    //lanzamiento de errores
  } catch (error) {
    res.status(error.code).json({ error: error.message });
  }
};
export default getStatisticsUsers;
