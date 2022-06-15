import React from "react";
import styled from "styled-components";
import { useState } from "react";

const StatelessContactForm = () => {
  const fields = [
    {
      label: "First Name",
      type: "text",
      name: "firstname",
    },
    {
      label: "Last Name",
      type: "text",
      name: "lastname",
    },
    {
      label: "Email",
      type: "text",
      name: "email",
    },
    {
      label: "Phone",
      type: "text",
      name: "phone",
    },
  ];

  const [is_active, set_active] = useState(false);

  return (
    <Wrapper
      name="contact stateless v1"
      method="POST"
      data-netlify="true"
      onSubmit="submit"
    >
      <h2>Stateless Form</h2>
      {/* On INPUT focus set the LABEL component class to "Active" */}
      {/* When no longer in focus toggle the class again so no longer active. ONLY IF input field is empty */}

      {fields.map((f, index) => {
        return (
          <Field
            key={index}
            onFocus={() => set_active(!is_active)}
            onBlur={() => set_active(!is_active)}
          >
            <Label is_active={is_active}>{f.label}</Label>
            <Input is_active={is_active} type={f.type} name={f.name}></Input>
          </Field>
        );
      })}
      <button type="submit">Send Message</button>
    </Wrapper>
  );
};

export default StatelessContactForm;

const Wrapper = styled.form`
  width: 500px;
  padding: 20px;
  border: 2px solid #e6e6e6;
  margin: 20px auto;
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
const Input = styled.input`
  height: 70px;
  width: 100%;
  width: 100%;
  width: -moz-available;
  width: -webkit-fill-available;
  width: fill-available;
  border: ${({ is_active }) =>
    is_active ? "2px solid #01B3FF" : "1px solid #e6e6e6"};
  border-radius: 6px;
  padding: 1.35rem 1.25rem; //21.6px 20px
  padding: 30px 20px 10px 18px;
  line-height: 1.4;
  appearance: none;
  text-align: left;
`;
