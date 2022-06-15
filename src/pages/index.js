import React from "react";
import ContactForm from "../components/contact-form";
import Form from "../components/stateful-contact-form";
import StatelessContactForm from "../components/stateless-contact-form";

export default function Home() {
  return (
    <div>
      <ContactForm />
      <StatelessContactForm />
      <Form />
    </div>
  );
}
