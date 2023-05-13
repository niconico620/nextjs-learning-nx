import path from "path";
import fs from 'fs';

export function buildFeedbackPath() {
  return path.join(process.cwd(), 'apps', 'learning-api-routes', 'data', 'feedback.json');
}

export function extractFeedback(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData.toString());

  return data;
}

function handler(req, res) {
  if (req.method === 'POST') {
    const email = req.body.email;
    const feedbackText = req.body.text;

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      text: feedbackText
    }

    //store newFeedback in a file or a database. for this exercise i'll just store this in a file nalang called feedback.json
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: 'Success!', feedback: newFeedback });

  } else {

    //this is GET method by default

    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);

    res.status(200).json({ feedback: data });
  }

}

export default handler;