import React, { useState } from "react";
import { useGameStore } from "../../stateManagement/Store";
import Button from "../../lib/Button";

export default function FeedbackForm() {
  const [result, setResult] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  console.log(useGameStore.getState().showFeedbackForm);
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.currentTarget);

    formData.append("access_key", "5e933c80-887b-4630-be66-817f5b1d647e");

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
      setResult("Your message has been sent!");
    } else {
      console.log("Error", res);
      setResult(res.message);
    }

    setFormSubmitted(true);
  };

  return (
    <>
      {!formSubmitted ? (
        <>
          <h2 className="text-center text-xl">Any Feedback?</h2>
          <form
            onSubmit={onSubmit}
            className="flex flex-col justify-center items-center gap-2 "
          >
            <input
              type="hidden"
              name="access_key"
              value="5e933c80-887b-4630-be66-817f5b1d647e"
            />
            <input type="hidden" name="from_name" value="Breakout Feedback" />
            <input
              type="hidden"
              name="subject"
              value={`Reply From ${name ? name : `Anon`}`}
            />

            <label htmlFor="feed-name">Name</label>
            <input
              type="text"
              id="feed-name"
              name="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="feed-email">Email</label>
            <input
              type="email"
              id="feed-email"
              name="email"
              placeholder="john@doe.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="feed-comments">Comments</label>
            <textarea
              id="feed-comments"
              name="message"
              placeholder="e.g bugs, glitches, performance issues?"
              minLength={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>

            <Button type="submit">Submit</Button>
          </form>
        </>
      ) : (
        <div>{result}</div>
      )}
    </>
  );
}
