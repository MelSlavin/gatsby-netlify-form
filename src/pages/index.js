import React from "react";
import styled from "styled-components";

export default class ContactForm extends React.Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    alert(`Thank you ${this.state.firstname} ${this.state.lastname}!`);
  };

  render() {
    return (
      <Wrapper
        onSubmit={this.handleSubmit}
        name="contact v1"
        method="POST"
        data-netlify="true"
      >
        <input type="hidden" name="form-name" value="contact v1" />
        <Field>
          <Label>First Name</Label>
          <Input
            type="text"
            name="firstname"
            value={this.state.firstname}
            onChange={this.handleInputChange}
          />
        </Field>
        <Field>
          <Label>Last Name</Label>
          <Input
            type="text"
            name="lastname"
            value={this.state.lastname}
            onChange={this.handleInputChange}
          />
        </Field>
        <Field>
          <Label>Email</Label>
          <Input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
        </Field>
        <Field>
          <Label>Phone</Label>
          <Input
            type="text"
            name="phone"
            value={this.state.phone}
            onChange={this.handleInputChange}
          />
        </Field>
        <button type="submit">Send Message</button>
      </Wrapper>
    );
  }
}

const Wrapper = styled.form`
  width: 100%;
  padding: 10px 10px 10px 25px;
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
  border: ${({ is_active }) =>
    is_active ? "2px solid #01B3FF" : "1px solid #e6e6e6"};
  border-radius: 6px;
  padding: 30px 20px 10px 18px;
  line-height: 1.4;
  appearance: none;
`;
