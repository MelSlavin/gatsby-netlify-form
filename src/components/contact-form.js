import React, { useState } from "react";
import styled from "styled-components";
import { css } from "styled-components";

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const ContactForm = () => {
  const [submitted, setSubmitted] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [fields, setFields] = useState({});

  const Fields = [
    {
      name: "firstname",
      label: "First Name",
      type: "text",
    },
    {
      name: "lastname",
      label: "Last Name",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
    },
    {
      name: "phone",
      label: "Phone",
      type: "text",
    },
    {
      name: "subject",
      label: "What would you like?",
    },
    {
      name: "message",
      label: "Message",
      type: "text",
    },
  ];

  const SubjectOptions = [
    "--- Please choose an option ---",
    "Option 1",
    "Option 2",
    "Option 3",
  ];

  const handleSubmit = (event) => {
    setSubmitting(true);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact v1",
        ...fields,
      }),
    })
      .then(() => {
        setSubmitting(false);
        setSubmitted("Message has been sent successfully.");
      })
      .catch((error) => alert(error));

    event.preventDefault();
  };

  const onFieldChange = ({ target }) => {
    setFields({
      ...fields,
      [target.name]: target.value,
    });
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

      {Fields.map(({ name, label, type }) => {
        if (name === "subject") {
          return (
            <Field key={name}>
              <DropdownLabel>{label}</DropdownLabel>
              <SubjectDropdown name={name} onChange={onFieldChange}>
                {SubjectOptions.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </SubjectDropdown>
            </Field>
          );
        }
        if (name === "message") {
          return (
            <Field key={name}>
              <Label>{label}</Label>
              <TextArea
                type={type}
                name={name}
                onChange={onFieldChange}
                rows="10"
                cols="30"
              />
            </Field>
          );
        }
        return (
          <Field key={name}>
            <Label>{label}</Label>
            <Input type={type} name={name} onChange={onFieldChange} />
          </Field>
        );
      })}

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
  top: 24px;
  font-size: 16px;
  transition: all 0.2s ease-in-out;
`;
const DropdownLabel = styled(Label)`
  position: relative;
  top: 0px;
`;
const SubjectDropdown = styled.select`
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  padding: 10px;
`;
const boxStyles = css`
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  padding: 30px 20px 10px 18px;
  line-height: 1.4;
  appearance: none;
  width: fill-available;
`;
const Input = styled.input`
  ${boxStyles}
  height: 70px;
`;
const TextArea = styled.textarea`
  ${boxStyles}
  padding-top: 60px;
  resize: vertical;
`;
