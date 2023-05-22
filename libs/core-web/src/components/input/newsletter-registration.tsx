import React, { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { LoadingIcon } from '../atoms';
import classes from './newsletter-registration.module.css';

export function NewsletterRegistration() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  function registrationHandler(event: { preventDefault: () => void }) {
    event.preventDefault();
    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
    const enteredEmail = emailInputRef.current?.value;

    if (enteredEmail) {
      const reqBody = { email: enteredEmail };

      setIsLoading(true);

      fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          emailInputRef.current!.value = '';
          setIsLoading(false);
        });
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button className="registerBtn">Register</button>
        </div>
      </form>
      {isLoading ? (
        <span>
          <LoadingIcon />
        </span>
      ) : (
        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          theme="colored"
        />
      )}
    </section>
  );
}
