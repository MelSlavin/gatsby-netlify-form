import React, { useState } from "react";
import styled from "styled-components";
import { css } from "styled-components";
import { handleValidation } from "./form-validation";

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
const Label = styled.label.attrs((props) => ({
  className: props.className,
}))`
  &.subject-label {
    position: relative;
    top: 0;
  }
  position: absolute;
  color: #a5a5a5;
  line-height: 1.4;
  padding: 0 18px;
  top: 24px;
  font-size: 16px;
  transition: all 0.2s ease-in-out;
`;
const SubjectDropdown = styled.select`
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  padding: 10px;
`;
const Option = styled.option``;
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
const Error = styled.span.attrs((props) => ({
  className: props.className,
}))`
  &.subject-error {
    width: fit-content;
    margin-left: 215px;
  }
  &.message-error {
    position: absolute;
    bottom: -6px;
    width: fill-available;
  }
  color: white;
  background: #fb4747;
  border-radius: 2px 2px 6px 6px;
  display: block;
  margin: 0px 30px;
  padding: 6px 10px;
  text-align: center;
`;
const Button = styled.button`
  margin-top: 30px;
`;

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const ContactForm = () => {
  const [submitted, setSubmitted] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});

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
    event.preventDefault();
    if (!handleValidation(fields, errors, setErrors)) {
      return;
    }
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
        setSubmitted("Thank you! Your message has been sent successfully.");
      })
      .catch((error) => alert(error));
  };

  const onFieldChange = ({ target }) => {
    setFields({
      ...fields,
      [target.name]: target.value,
    });
    delete errors[target.name];
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
        <p>{submitted}</p>
      </div>
    );
  }

  return (
    <Wrapper
      onSubmit={handleSubmit}
      name="contact v1"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      data-netlify-recaptcha="true"
      noValidate
    >
      <Input type="hidden" name="form-name" value="contact v1" />

      <h2>Contact Form</h2>

      {Fields.map(({ name, label, type }) => {
        return (
          <Field key={name}>
            <Label className={name + "-label"}>{label}</Label>

            {(() => {
              switch (name) {
                case "subject":
                  return (
                    <SubjectDropdown name={name} onChange={onFieldChange}>
                      {SubjectOptions.map((subject) => (
                        <Option key={subject} value={subject}>
                          {subject}
                        </Option>
                      ))}
                    </SubjectDropdown>
                  );
                case "message":
                  return (
                    <TextArea
                      type={type}
                      name={name}
                      onChange={onFieldChange}
                      rows="10"
                      cols="30"
                    />
                  );
                default:
                  return (
                    <Input type={type} name={name} onChange={onFieldChange} />
                  );
              }
            })()}

            {errors[name] && (
              <Error className={name + "-error"}>{errors[name]}</Error>
            )}
          </Field>
        );
      })}
      <div data-netlify-recaptcha="true"></div>
      <Button type="submit">Send Message</Button>
    </Wrapper>
  );
};

export default ContactForm;
