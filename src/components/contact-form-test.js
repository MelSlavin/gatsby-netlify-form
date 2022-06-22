// import React, { useState } from "react";
// import styled from "styled-components";
// import { css } from "styled-components";

// const encode = (data) => {
//   return Object.keys(data)
//     .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
//     .join("&");
// };

// const ContactForm = () => {
//   const [submitted, setSubmitted] = useState("");
//   const [submitting, setSubmitting] = useState(false);
//   const [firstname, setFirstname] = useState("");
//   const [lastname, setLastname] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [subject, setSubject] = useState({ value: "choose" });
//   const [message, setMessage] = useState("");

//   const SubjectOptions = [
//     "--- Please choose a subject ---",
//     "I would like to become a distributor",
//     "Quote",
//     "Technical Support",
//     "Free Software Trial",
//     "Evaluation unit to trial in my lab",
//     "Just gathering information right now",
//   ];

//   const handleSubmit = (event) => {
//     setSubmitting(true);
//     fetch("/", {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: encode({
//         "form-name": "contact test v1",
//         firstname,
//         lastname,
//         email,
//         phone,
//         subject,
//         message,
//       }),
//     })
//       .then(() => {
//         setSubmitting(false);
//         setSubmitted("Message has been sent successfully.");
//       })
//       .catch((error) => alert(error));

//     event.preventDefault();
//   };

//   if (submitting) {
//     return (
//       <div>
//         <p>Sending message...</p>
//       </div>
//     );
//   }

//   if (submitted) {
//     return (
//       <div>
//         <p>Thank you! Your message has been sent successfully!</p>
//       </div>
//     );
//   }

//   return (
//     <Wrapper
//       onSubmit={handleSubmit}
//       name="contact v1"
//       data-netlify="true"
//       data-netlify-honeypot="bot-field"
//     >
//       <Input type="hidden" name="form-name" value="contact v1" />
//       <h2>Contact Form</h2>
//       <Field>
//         <Label htmlFor="firstname">First Name</Label>
//         <Input
//           type="text"
//           name="firstname"
//           value={firstname}
//           onChange={({ target }) => setFirstname(target.value)}
//         />
//       </Field>
//       <Field>
//         <Label>Last Name</Label>
//         <Input
//           type="text"
//           name="lastname"
//           value={lastname}
//           onChange={({ target }) => setLastname(target.value)}
//         />
//       </Field>
//       <Field>
//         <Label>Email</Label>
//         <Input
//           type="email"
//           name="email"
//           value={email}
//           onChange={({ target }) => setEmail(target.value)}
//         />
//       </Field>
//       <Field>
//         <Label>Phone</Label>
//         <Input
//           type="text"
//           name="phone"
//           value={phone}
//           onChange={({ target }) => setPhone(target.value)}
//         />
//       </Field>
//       <Field>
//         <DropdownLabel>What would you like?</DropdownLabel>
//         <SubjectDropdown
//           name="subject"
//           value={subject}
//           onChange={({ target }) => setSubject(target.value)}
//         >
//           {SubjectOptions.map((subject) => (
//             <option key={subject} value={subject}>
//               {subject}
//             </option>
//           ))}
//         </SubjectDropdown>
//       </Field>
//       <Field>
//         <Label>Message</Label>
//         <TextArea
//           type="text"
//           name="message"
//           value={message}
//           onChange={({ target }) => setMessage(target.value)}
//           rows="10"
//           cols="30"
//         />
//       </Field>
//       <button type="submit">Send Message</button>
//     </Wrapper>
//   );
// };

// export default ContactForm;

// const Wrapper = styled.form`
//   width: 500px;
//   padding: 20px;
//   border: 2px solid #e6e6e6;
//   margin: auto;
// `;
// const Field = styled.div`
//   width: 100%;
//   position: relative;
//   padding-bottom: 20px;
// `;
// const Label = styled.label`
//   position: absolute;
//   color: #a5a5a5;
//   line-height: 1.4;
//   padding: 0 18px;
//   top: ${({ is_active }) => (is_active ? "14px" : "24px")};
//   font-size: ${({ is_active }) => (is_active ? "14px" : "16px")};
//   transition: all 0.2s ease-in-out;
// `;
// const DropdownLabel = styled(Label)`
//   position: relative;
//   top: 0px;
// `;
// const SubjectDropdown = styled.select`
//   border: 1px solid #e6e6e6;
//   border-radius: 6px;
//   padding: 10px;
// `;
// const boxStyles = css`
//   border: ${({ is_active }) =>
//     is_active ? "2px solid #01B3FF" : "1px solid #e6e6e6"};
//   border-radius: 6px;
//   padding: 30px 20px 10px 18px;
//   line-height: 1.4;
//   appearance: none;
//   width: fill-available;
// `;
// const Input = styled.input`
//   ${boxStyles}
//   height: 70px;
// `;
// const TextArea = styled.textarea`
//   ${boxStyles}
//   padding-top: 60px;
//   resize: vertical;
// `;
