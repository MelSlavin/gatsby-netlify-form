import React, { useState } from "react";
import styled from "styled-components";

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const ContactForm = () => {
  const [submitted, setSubmitted] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState({ value: "choose" });
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    setSubmitting(true);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "v1 steribar contact",
        firstname,
        lastname,
        email,
        phone,
        message,
      }),
    })
      .then(() => {
        setSubmitting(false);
        setSubmitted("Message has been sent successfully.");
      })
      .catch((error) => alert(error));

    event.preventDefault();
  };

  if (submitting) {
    return (
      <div>
        <p>Sending message...</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div>
        <p>Thank you! Your message has been sent successfully!</p>
      </div>
    );
  }

  return (
    <Wrapper
      onSubmit={handleSubmit}
      name="contact v1"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <Input type="hidden" name="form-name" value="contact v1" />
      <h2>Contact Form</h2>
      <Field>
        <Label htmlFor="firstname">First Name</Label>
        <Input
          type="text"
          name="firstname"
          value={firstname}
          onChange={({ target }) => setFirstname(target.value)}
        />
      </Field>
      <Field>
        <Label>Last Name</Label>
        <Input
          type="text"
          name="lastname"
          value={lastname}
          onChange={({ target }) => setLastname(target.value)}
        />
      </Field>
      <Field>
        <Label>Email</Label>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
      </Field>
      <Field>
        <Label>Phone</Label>
        <Input
          type="text"
          name="phone"
          value={phone}
          onChange={({ target }) => setPhone(target.value)}
        />
      </Field>
      <Field>
        <DropdownLabel>What would you like?</DropdownLabel>
        <Dropdown
          value={subject}
          onChange={({ target }) => setSubject(target.value)}
        >
          <option value="choose">--- Please choose a subject ---</option>
          <option value="distributor">
            I would like to become a distributor
          </option>
          <option value="quote">Quote</option>
          <option value="support">Technical Support</option>
          <option value="software-trial">Free Software Trial</option>
          <option value="evaluation-unit">
            Evaluation unit to trial in my lab
          </option>
          <option value="information">
            Just gathering information right now
          </option>
        </Dropdown>
      </Field>
      <Field>
        <Label>Message</Label>
        <Input
          type="text"
          name="message"
          value={message}
          onChange={({ target }) => setMessage(target.value)}
        />
      </Field>
      <button type="submit">Send Message</button>
    </Wrapper>
  );
};

export default ContactForm;

const Wrapper = styled.form`
  width: 500px;
  padding: 20px;
  border: 2px solid #e6e6e6;
  margin: auto;
`;
const Field = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: 20px;
`;
const Label = styled.label`
  position: absolute;
  color: #a5a5a5;
  line-height: 1.4;
  padding: 0 18px;
  top: ${({ is_active }) => (is_active ? "14px" : "24px")};
  font-size: ${({ is_active }) => (is_active ? "14px" : "16px")};
  transition: all 0.2s ease-in-out;
`;
const DropdownLabel = styled(Label)`
  position: relative;
  top: 0px;
`;
const Input = styled.input`
  height: 70px;
  border: ${({ is_active }) =>
    is_active ? "2px solid #01B3FF" : "1px solid #e6e6e6"};
  border-radius: 6px;
  padding: 30px 20px 10px 18px;
  line-height: 1.4;
  appearance: none;
  width: 100%;
  width: -moz-available;
  width: -webkit-fill-available;
  width: fill-available;
`;
const Dropdown = styled.select`
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  padding: 10px;
`;
