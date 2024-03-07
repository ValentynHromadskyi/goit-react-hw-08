import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./RegisterForm.module.css";
import { useId } from "react";
import { register } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 symb long")
    .max(50, "Name not must be at exceed st 50 symb long ")
    .required("This is a required field"),
  email: Yup.string()
    .min(4, "Email must be at least 4 symb long")
    .max(50, "Email not must be at exceed st 50 symb long ")
    .required("This is a required field"),
  password: Yup.string()
    .min(4, "Password must be at least 4 symb long")
    .max(50, "Passwor not must be at exceed st 50 symb long ")
    .required("This is a required field"),
});

function RegisterForm() {
  const dispatch = useDispatch();

  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    dispatch(
      register({
        name: form.elements.name.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
    form.reset();
  };

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={RegisterSchema}
        // onSubmit={handleSubmit}
      >
        <Form className={css.form} onSubmit={handleSubmit} autoComplete="off">
          <div className={css.formGroup}>
            <label htmlFor={nameId}>Name</label>
            <Field className={css.input} type="text" name="name" id={nameId} />
            <ErrorMessage className={css.error} name="name" component="span" />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={emailId}>Email</label>
            <Field
              className={css.input}
              type="text"
              name="email"
              id={emailId}
              autoComplete="username"
            />
            <ErrorMessage className={css.error} name="email" component="span" />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={passwordId}>Password</label>
            <Field
              className={css.input}
              type="password"
              name="password"
              id={passwordId}
              autoComplete="current-password"
            />
            <ErrorMessage
              className={css.error}
              name="password"
              component="span"
            />
          </div>

          <button className={css.btn} type="submit">
            Register
          </button>
          <button className={css.btn}>
            <NavLink to="/login">Already have an account? Login here</NavLink>
          </button>
        </Form>
      </Formik>
    </>
  );
}

export default RegisterForm;
