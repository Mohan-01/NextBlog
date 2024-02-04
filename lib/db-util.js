import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.5mvqo3s.mongodb.net/${process.env.mongodb_database}?retryWrites=true`;
  const client = await MongoClient.connect(connectionString);
  return client;
}
