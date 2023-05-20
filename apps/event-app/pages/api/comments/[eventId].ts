import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGODB_URI;
const client = new MongoClient(mongoURI);

async function connectToDatabase() {
  await client.connect();
  return client.db('comments');
}

async function handler(req, res) {
  const eventId = req.query.eventId;

  if (req.method === 'GET') {
    let db;
    let comments;

    try {
      db = await connectToDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Database connection failed.' });
      return;
    }

    try {
      const collection = db.collection('comment');
      comments = await collection.find({ eventId: eventId }).sort({ _id: -1 }).toArray();
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve comments data.' });
    }


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

    let db;

    try {
      db = await connectToDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Database connection failed.' });
      return;
    }

    try {
      await db.collection('comment').insertOne(newComment);
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting data failed.' });
    }


    res.status(201).json({
      message: 'Successfully posted your comment!',
      addedComment: newComment,
    });
  }

  client.close();
}

export default handler;
