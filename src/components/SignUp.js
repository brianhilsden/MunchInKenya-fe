import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { auth, provider } from "./firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import logo from "./Logo-google-icon-PNG.png";


import './SignUp.css';

const SignUp = () => {
  const [data, filteredList, addToCart, removeFromCart, cart, user, setUser, setIsLoggedIn] = useOutletContext();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const formSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Must enter email"),
    name: yup.string().required("Must enter a name"),
    phone_number: yup.string().required("Must enter a number").max(15),
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
      password2: ""
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("https://muchinkenya-be.onrender.com/signup", {
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
          }).then(() => navigate("/MunchInKenya-fe"));
        } else {
          res.json().then((err) => setError(err.error));
        }
      });
    },
  });

  function googleLogin() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        fetch("https://muchinkenya-be.onrender.com/userByEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ "email": user.email }),
        }).then((res) => {
          if (res.ok) {
            res.json().then((data) => {
              localStorage.setItem("access_token", data.access_token);
              setUser(data.user);
              setError(null);
              setIsLoggedIn(true)
            }).then(navigate("/MunchInKenya-fe"));
          } else {
            fetch("https://muchinkenya-be.onrender.com/signup", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ "name": user.displayName, "email": user.email, "phone_number": user.phoneNumber,"password":"1234" }),
            }).then((res) => {
              if (res.ok) {
                res.json().then((data) => {
                  localStorage.setItem("access_token", data.access_token);
                  setUser(data.user);
                  setError(null);
                  setIsLoggedIn(true)
                }).then(() => navigate("/MunchInKenya-fe"));
              } else {
                res.json().then((err) => setError(err.error));
              }
            });
          }
        });
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }
 
  return (
    <div className="wrapper">
      <div className="signup-container">
        <div className="left">
          <h1>Hi there!</h1>
          <p>Welcome to MunchInKenya</p>
          <button className="google-sign-in" style={{width:"70%"}} onClick={googleLogin}>
            <img src={logo} width={25} alt="Google Icon" className="google-icon" />
            Continue with Google
          </button>
          <p className="or">or</p>
          <form className="signup-form" onSubmit={formik.handleSubmit}>
            <input type="email" placeholder="Your email" className="form-input" id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email} />
              {formik.errors.email}
            <input type="text" placeholder="Name" className="form-input" id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name} />
            <input type="text" placeholder="Phone Number" className="form-input" id="number"
              name="phone_number"
              onChange={formik.handleChange}
              value={formik.values.phone_number} />
            <input type="password" placeholder="Password" className="form-input" id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password} style={{ textAlign: "center" }} />
            <input type="password" placeholder="Confirm Password" className="form-input" id="password2"
              name="password2"
              onChange={formik.handleChange}
              value={formik.values.password2} style={{ textAlign: "center" }} />
              {formik.errors.password2}
            <button type="submit" className="form-button">Sign Up</button>
          </form>
          {error && <div>{error}</div>}
          <p className="login-link" onClick={() => navigate("/MunchInKenya-fe/login")} style={{cursor:"pointer"}}>Already have an account?Log In</p>
        </div>
        <div className="right" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", backgroundSize: "cover" }}>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
