// This file would typically be used in a Node.js backend environment
// For frontend, we'll use Firebase Cloud Functions to interact with MongoDB

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let dbConnection;

export const connectToDatabase = async () => {
  if (dbConnection) return dbConnection;

  try {
    await client.connect();
    dbConnection = client.db('unihub');
    console.log('Successfully connected to MongoDB Atlas');
    return dbConnection;
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    throw error;
  }
};

export const getCollection = async (collectionName) => {
  const db = await connectToDatabase();
  return db.collection(collectionName);
};
