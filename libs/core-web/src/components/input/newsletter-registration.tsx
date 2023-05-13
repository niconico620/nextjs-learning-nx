import React, { FormEvent, useRef } from 'react';
import classes from './newsletter-registration.module.css';

export function NewsletterRegistration() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  function registrationHandler(event: any) {
    event.preventDefault();

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
    const enteredEmail = emailInputRef.current?.value;

    const reqBody = { email: enteredEmail };

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => alert(`${data.message}`));
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
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}
