import { buildFeedbackPath, extractFeedback } from "./feedback";

function handler(req, res) {
  if (req.method === 'DELETE') {
    //code that deletes that specific feedback
  } else if (req.method === 'POST') {
    //post
  } else {
    const feedbackId = req.query.feedbackId;
    const filePath = buildFeedbackPath();
    const feedbackData = extractFeedback(filePath);

    const selectedFeedback = feedbackData.find(feedback => feedback.id === feedbackId);

    res.status(200).json({ feedback: selectedFeedback });
  }
}

export default handler;