import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
const MONGO_PSSW = process.env.MONGO_PSSW;
const MONGO_USER = process.env.MONGO_USER;

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PSSW}@cluster0.llhje.mongodb.net?retryWrites=true&w=majority`;

export const getClient = () => {
  return new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
