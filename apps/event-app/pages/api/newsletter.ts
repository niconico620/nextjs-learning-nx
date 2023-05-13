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
    console.log(mongoURI);
    const client = await MongoClient.connect("mongodb+srv://niconico620:bALkr6XqYNBNvVA9@bebudates.djiyias.mongodb.net/?retryWrites=true&w=majority");

    const db = client.db('newsletter');

    await db.collection('emails').insertOne({ email: email });


    res.status(201).json({ message: 'Success!' });

    client.close();

  }
}

export default handler;