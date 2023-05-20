import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGODB_URI;
const client = new MongoClient(mongoURI);

async function connectToDatabase() {
  await client.connect();
  return client.db('newsletter');
}


async function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;

    //always good to add validation in the server-side code. cant rely on just frontend validation alone.

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
      return;
    }

    //store newFeedback in a database.
    let db;

    try {
      db = await connectToDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Database connection failed.' });
      return;
    }

    try {
      await db.collection('emails').insertOne({ email: email });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed.' });
    }


    res.status(201).json({ message: 'Signed up!', email });

  }
}

export default handler;