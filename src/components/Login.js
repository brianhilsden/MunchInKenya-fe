import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function Login() {
  const [user, setUser] = useOutletContext();
  const [error, setError] = useState();
  const navigate = useNavigate()
  const formSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Must enter email"),
    password: yup.string().required("Must enter password"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
        fetch("http://127.0.0.1:5555/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }).then((res) => {
          if (res.ok) {
            res.json().then((data) => {
              setUser(data);
              setError(null);
            });
          } else {
            res.json().then((err) => setError(err.error));
          }
        });
      },
  });
  console.log(user);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <br />
        <input
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <p style={{ color: "red" }}> {formik.errors.email}</p>

        <label htmlFor="password">Password</label>
        <br />
        <input
          id="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <p style={{ color: "red" }}> {formik.errors.password}</p>
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
