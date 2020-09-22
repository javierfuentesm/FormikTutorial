import React from "react";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import "./styles.css";
import * as Yup from "yup";

const SignupForm = () => {
  const formik = useFormik({
    initialValues: { email: "", name: "", lastName: "" },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" {...formik.getFieldProps("name")} />

      {formik.touched.name && formik.errors.name ? (
        <div style={{ color: "red" }}>{formik.errors.name}</div>
      ) : null}
      <label htmlFor="lastName">Last Name</label>
      <input id="lastName" type="text" {...formik.getFieldProps("lastName")} />

      {formik.touched.lastName && formik.errors.lastName ? (
        <div style={{ color: "red" }}>{formik.errors.lastName}</div>
      ) : null}

      <label htmlFor="email">Email Address</label>
      <input id="email" type="email" {...formik.getFieldProps("email")} />
      <br />
      {formik.touched.email && formik.errors.email ? (
        <div style={{ color: "red" }}>{formik.errors.email}</div>
      ) : null}

      <button type="submit">Submit</button>
    </form>
  );
};

function App() {
  return <SignupForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
