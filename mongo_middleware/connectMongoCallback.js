import { getClient } from './getClient';
import { MONGO_BBDD } from './const';

//EJEMPLO FUNCION CON CALLBACK, PARA POSTERIOR EJECUCION
const connectMongo = async (collectionSelected, callback) => {
  let client = getClient();
  try {
    await client.connect();

    const database = client.db(MONGO_BBDD);
    const collection = database.collection(collectionSelected);

    //generamos la callback que vamos usar despues
    return await callback(collection);
  } catch (error) {
    throw error;
  } finally {
    client.close();
  }
};
export { connectMongo };
