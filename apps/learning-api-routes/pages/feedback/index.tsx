import React, { useState } from 'react';
import { buildFeedbackPath, extractFeedback } from '../api/feedback';

function FeedbackPage(props: any) {
  const { feedbackItems } = props;
  const [feedbackData, setFeedbackData] = useState();
  function loadFeedbackHandler(id) {
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      });
  }
  return (
    <>
      {feedbackData && <p>{feedbackData['email']}</p>}
      <ul>
        {feedbackItems.map((feedback) => (
          <li key={feedback.id}>
            <h3>{feedback.email}</h3>
            <label>Comment: </label>
            <p>{feedback.text}</p>
            <button onClick={loadFeedbackHandler.bind(null, feedback.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
