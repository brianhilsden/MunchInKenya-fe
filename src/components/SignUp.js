import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function SignUp() {
  const [, user, setUser,setIsLoggedIn] = useOutletContext();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const formSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Must enter email"),
    name: yup.string().required("Must enter a name"),
    phone_number: yup.string().required("Must enter a name").max(15),

    password: yup.string().required("Must enter password"),
    password2: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone_number: "",
      password: "",
      password2:""
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("http://127.0.0.1:5555/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            localStorage.setItem("access_token", data.access_token);
            setUser(data.user);
            setError(null);
            setIsLoggedIn(true)
       
          }).then(()=>navigate("/"));
        } else {
          res.json().then((err) => setError(err.error));
        }
      });
    },
  });

  return (
    <div className="p-4 shadow rounded-lg bg-light">
      <form onSubmit={formik.handleSubmit}>
        
        <input
          id="email"
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className="form-control my-2"
        />
        <p style={{ color: "red" }}> {formik.errors.email}</p>
        
        <input
          id="name"
          name="name"
          placeholder="Name"
          className="form-control my-2"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <p style={{ color: "red" }}> {formik.errors.name}</p>

        <input
          id="phone_number"
          name="phone_number"
          placeholder="Phone number"
          onChange={formik.handleChange}
          className="form-control my-2"
          value={formik.values.phone_number}
        />
        <p style={{ color: "red" }}> {formik.errors.phone_number}</p>

        <input
          id="password"
          name="password"
          className="form-control my-2"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <p style={{ color: "red" }}> {formik.errors.password}</p>

        <input
          id="password2"
          name="password2"
          placeholder="Confirm Password"
          className="form-control my-2"
          onChange={formik.handleChange}
          value={formik.values.password2}
        />
        <p style={{ color: "red" }}> {formik.errors.password2}</p>
        <div id="button_container" class="text-center mt-3">
              <button id="Sign Up" class="btn btn-secondary mx-1" type="submit">Sign Up</button>
          </div>
      
      </form>
      {error && <p>{error}</p>}
   
    </div>
  );
}

export default SignUp;