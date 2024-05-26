import { useState } from "react";

import Button from "../../lib/Button";
import { useForm } from "react-hook-form";

export default function FeedbackForm() {
  const [result, setResult] = useState("");
  const {
    register,
    handleSubmit,
    reset,

    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      access_key: "5e933c80-887b-4630-be66-817f5b1d647e",
      subject: "",
      from_name: "Breakout Feedback",
      Name: "",
      Email: "",
      Comments: "",
    },
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const onSubmit = async (data: any) => {
    if (data.Name) {
      setValue("subject", `${data.Name} has sent a reply`); //come back and work on this...
    }
    setResult("Sending....");
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data, null, 2),
    }).then((res) => res.json());
    console.log(res)
    if (res.success) {
      console.log("Success", res);

      setResult("Your message has been sent!");
      console.log("subject is" + data.subject);
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center items-center gap-2 "
          >
            <input
              type="hidden"
              value="5e933c80-887b-4630-be66-817f5b1d647e"
              {...register("access_key")}
            />
            <input type="hidden" {...register("from_name")} />
            <input type="hidden" {...register("subject")} />

            <label htmlFor="feed-name">Name</label>
            <input
              {...register("Name", {
                required: { value: true, message: "Required" },
                minLength: {
                  value: 3,
                  message: "Please input at least 3 Characters",
                },
              })}
              type="text"
              id="feed-name"
              name="Name"
              placeholder="Your Name"
              className={errors.Name? "border-2 border-red-600" : ''}
            />
            <p className="text-red-600 text-center">{errors.Name?.message}</p>

            <label htmlFor="feed-email">Email</label>
            <input
              {...register("Email", {
                required: { value: true, message: "Required" },
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid Email Format",
                },
              })}
              type="email"
              id="feed-email"
              name="Email"
              placeholder="Your Email"
              className={errors.Email? "border-2 border-red-600" : ''}
            />
            <p className="text-red-600">{errors.Email?.message}</p>

            <label htmlFor="feed-comments">Comments</label>
            <textarea
              {...register("Comments", {
                required: { value: true, message: "Required" },
                minLength: {
                  value: 5,
                  message: "Please input at least 5 Characters",
                },
              })}
              id="feed-comments"
              name="Comments"
              placeholder="e.g bugs, glitches, performance issues?"
              className={errors.Comments? "border-2 border-red-600" : ''}
            ></textarea>
            <p className="text-red-600">{errors.Comments?.message}</p>
            <div className="flex gap-5">
              <Button onClick={() => reset()}>Reset</Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </>
      ) : (
        <div className="mt-4">{result}</div>
      )}
    </>
  );
}
