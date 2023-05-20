import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv';

dotenv.config();

async function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;

    //always good to add validation in the server-side code. cant rely on just frontend validation alone.

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
      return;
    }

    //store newFeedback in a database.
    const mongoURI = process.env.MONGODB_URI;
    const client = await MongoClient.connect(mongoURI);

    const db = client.db('newsletter');

    await db.collection('emails').insertOne({ email: email });


    res.status(201).json({ message: 'Success!', email });

    client.close();

  }
}

export default handler;