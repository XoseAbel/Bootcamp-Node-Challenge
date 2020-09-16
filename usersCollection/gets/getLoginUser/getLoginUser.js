import { connectMongo } from '../../../mongo_middleware/connectMongoCallback';
import { MONGO_COL_USERS } from '../../../mongo_middleware/const';
import { ApiError } from '../../../auxiliarFunctions/throwErrors/ApiError';
import { GET } from '../../../auxiliarFunctions/throwErrors/conts';
import { QueryMongoByID } from '../../../auxiliarFunctions/QueryMongoByID';
import { LastLoginQuery } from './auxiliarFuntions/LastLoginQuery';
import { LoginQueryUser } from './auxiliarFuntions/LoginQueryUser';

const getLoginUser = async (req, res) => {
  try {
    //se podrian obtener los datos de la req.query,
    //pero al estar proporcionando datos sensible(password) se consideró mejor practica recibir la info por req.body
    const { email, password } = req.body;
    const loginFindUser = new LoginQueryUser(email, password);
    // console.log(loginQuery);
    // construimos query para actualizar la fecha de login
    const updateLogIn = new LastLoginQuery();

    //MongoDB para FindOne y si tiene exito para UpdateOne
    let id;
    await connectMongo(MONGO_COL_USERS, async collection => {
      try {
        //buscamos el usuario, y lanzamos 404 si no se encuentra
        const data = await collection.findOne(loginFindUser);
        // console.log(data);
        if (!data) {
          throw 404;
        }
        //si todo fue bien, actualizamos LAST_LOG_IN
        id = data._id;
        const queryId = new QueryMongoByID(id);
        await collection.updateOne(queryId, updateLogIn);
      } catch (error) {
        // console.log('error', error);
        let code = error === 404 ? 404 : 500;
        throw new ApiError(code, GET, MONGO_COL_USERS);
      }
    });

    res.status(200).json({ id });
    //lanzamiento de errores
  } catch (error) {
    res.status(error.code).json({ error: error.message });
  }
};
export default getLoginUser;
