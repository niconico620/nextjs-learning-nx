import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGODB_URI;
console.log(mongoURI);
const client = new MongoClient("mongodb+srv://niconico620:bALkr6XqYNBNvVA9@bebudates.djiyias.mongodb.net/?retryWrites=true&w=majority");

async function connectToDatabase() {
  await client.connect();
  return client.db('comments');
}

async function handler(req, res) {
  const eventId = req.query.eventId;

  if (req.method === 'GET') {
    const db = await connectToDatabase();
    const collection = db.collection('comment');
    const comments = await collection.find({ eventId: eventId }).toArray();

    res.status(200).json({
      message: 'COMMENTS LOADED',
      comments,
    });
  } else if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    const newComment = {
      date: new Date().toISOString(),
      eventId,
      email,
      name,
      comment: text,
    };

    // store newComment in the database.
    const db = await connectToDatabase();
    await db.collection('comment').insertOne(newComment);

    res.status(201).json({
      message: 'Success!',
      addedComment: newComment,
    });

    client.close();
  }
}

export default handler;
