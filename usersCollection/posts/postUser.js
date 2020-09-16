import { connectMongo } from '../../mongo_middleware/connectMongoCallback';
import { MONGO_COL_USERS } from '../../mongo_middleware/const';
import { POST } from '../../auxiliarFunctions/throwErrors/conts';
import { UserDocument } from './auxiliarFunctions/UserDocument';
import { validationUser } from './auxiliarFunctions/validationUser';
import { ApiError } from '../../auxiliarFunctions/throwErrors/ApiError';

const postUser = async (req, res) => {
  try {
    //validaciones de los datos recibidos
    validationUser(req.body);
    //construir new document
    const {
      name,
      surname,
      email,
      password,
      phone,
      condition = 'unknown',
    } = req.body;

    const newUser = new UserDocument(
      name,
      surname,
      email,
      password,
      phone,
      condition
    );
    // console.log(newUser);

    //MongoDB insertOne
    let insertOneUser;
    await connectMongo(MONGO_COL_USERS, async collection => {
      try {
        insertOneUser = await collection.insertOne(newUser);
      } catch (error) {
        // console.error(error);
        throw new ApiError(500, POST, MONGO_COL_USERS);
      }
    });
    const { insertedCount, insertedId } = insertOneUser;

    res.status(200).json({ insertedCount, insertedId });
    //lanzamiento de errores
    1;
  } catch (error) {
    // console.log(error);
    res.status(error.code).json({ error: error.message });
  }
};
export { postUser };
