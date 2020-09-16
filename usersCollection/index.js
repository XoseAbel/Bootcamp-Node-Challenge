import { USERS_URL, USERS_ID_URL, LOGIN_URL, STATISTICS_URL } from './conts';
import { postUser } from './posts/postUser';
import { getAllUsers } from './gets/getAllUsers';
import { getOneUser } from './gets/getOneUser';
import { patchUser } from './patch/patchUser';
import getLoginUser from './gets/getLoginUser/getLoginUser';
import getStatisticsUsers from './gets/getStatisticsUsers/getStatisticsUsers';

const init = app => {
  //GETS para la coleccion de users
  app.get(USERS_URL, getAllUsers);
  app.get(USERS_ID_URL, getOneUser);
  //POST para la coleccion de users
  app.post(USERS_URL, postUser);
  //PATCH para la coleccion de users
  app.patch(USERS_ID_URL, patchUser);
  //LOGIN para la coleccion de users con el metodo GET
  app.post(LOGIN_URL, getLoginUser);
  //STATISTICS para la coleccion de users con el metodo GET
  app.get(STATISTICS_URL, getStatisticsUsers);
};
export default init;
