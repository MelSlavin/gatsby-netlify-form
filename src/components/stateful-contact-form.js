import React, { useState } from "react";

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const Form = () => {
  const [submitted, setSubmitted] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    setSubmitting(true);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "waitlist", name, email, message }),
    })
      .then(() => {
        setSubmitting(false);
        setSubmitted("Thank you for your kind words!");
      })
      .catch((error) => alert(error));

    e.preventDefault();
  };

  if (submitting) {
    return (
      <div className="transition ease-in-out duration-300 pb-10 m-auto bg-white text-center pt-20 success">
        <p className="text-2xl font-bold mb-8 text-main-color">
          Adding you to the waitlist...
        </p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="transition ease-in-out duration-300 pb-10 m-auto bg-white text-center pt-20 success">
        <p className="text-main-color">
          Thank you for joining our waiting list.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      name="waitlist"
      className="mt-4 m-auto p-8 md:p-0 max-w-md lg:max-w-lg py-6"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="waitlist" />
      <div className="text-center text-4xl font-bold text-main-color leading-tight">
        Join the waitlist now!
        <h2 className="text-center text-xl font-semibold text-main-color">
          Please fill out the form below.
        </h2>
      </div>

      <div className="mb-4 mt-4">
        <label
          htmlFor="name"
          className="block text-gray-800 text-sm font-bold mb-2"
        >
          Your Name:{" "}
        </label>
        <input
          onChange={({ target }) => setName(target.value)}
          type="text"
          name="name"
          value={name}
          minLength="5"
          placeholder="e.g Morenike Martins-Brown"
          className="bg-gray-200 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-medium"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-gray-800 text-sm font-bold mb-2"
        >
          Your Email:
        </label>
        <input
          type="email"
          name="email"
          value={email}
          required
          onChange={({ target }) => setEmail(target.value)}
          placeholder="e.g morenike@hey.com"
          className="bg-gray-200 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-medium"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-gray-800 text-sm font-bold mb-2 mt-4"
        >
          Anything else you would like to know (optional)
        </label>
        <textarea
          name="message"
          placeholder="e.g When do you plan on launching?"
          rows="5"
          onChange={({ target }) => setMessage(target.value)}
          value={message}
          className="bg-gray-200 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-medium"
        ></textarea>
      </div>
      <p className="text-center mt-6 pb-10">
        <button
          type="submit"
          className="font-bold p-3 rounded-md header-main-color header-text-main-color text-white focus:outline-none transition duration-300 ease-in-out w-full lg:w-3/4"
        >
          Join waitlist
        </button>
      </p>
    </form>
  );
};

export default Form;
