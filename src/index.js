import React from "react";
import ReactDOM from "react-dom";
import { Formik, Field, Form, useField, ErrorMessage } from "formik";
import "./styles.css";
import * as Yup from "yup";

const SignupForm = () => {
  const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and also replace ErrorMessage entirely.
    const [field] = useField(props);
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <Field {...field} {...props} />
        <ErrorMessage name={field.name} />
      </>
    );
  };
  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "" }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        lastName: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
          resetForm({});
        }, 400);
      }}
    >
      {(formik) => (
        <Form>
          <MyTextInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Input your name"
          />
          <MyTextInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Input your lastname"
          />
          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="Input your email"
          />
          <br />
          <button disabled={formik.isSubmitting} type="submit">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

function App() {
  return <SignupForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
