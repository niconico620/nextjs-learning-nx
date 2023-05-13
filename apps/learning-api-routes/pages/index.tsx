import styles from './index.module.css';
import { useRef, useState } from 'react';

export function Home() {
  const [feedbackItems, setFeedbackItems] = useState([]);

  const emailInputRef = useRef<HTMLInputElement>();
  const feedbackInputRef = useRef<HTMLTextAreaElement>();

  function submitForm(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = { email: enteredEmail, text: enteredFeedback };

    console.log(reqBody);

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function loadFeedbackHandler() {
    fetch('/api/feedback')
      .then((response) => response.json())
      .then((data) => {
        setFeedbackItems(data.feedback);
      });
  }

  return (
    <div>
      <h1>Home Page</h1>
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows={5} ref={feedbackInputRef}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <div>
        <ul>
          {feedbackItems.map((feedback) => (
            <li key={feedback.id}>
              <h3>{feedback.email}</h3>
              <label>Comment: </label>
              <p>{feedback.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
