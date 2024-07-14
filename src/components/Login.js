// src/components/Login.js
import React from "react";
import "./Login.css"; // Import the CSS file for styling
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { auth, provider } from "./firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import logo from "./Logo-google-icon-PNG.png";

function Login() {
  const [
    data,
    filteredList,
    addToCart,
    removeFromCart,
    cart,
    user,
    setUser,
    setIsLoggedIn,
  ] = useOutletContext();
  const [error, setError] = useState();
  const navigate = useNavigate();
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
      fetch("https://muchinkenya-be.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => {
        if (res.ok) {
          res
            .json()
            .then((data) => {
              localStorage.setItem("access_token", data.access_token);
              setUser(data.user);
              setError(null);
              setIsLoggedIn(true);
            })
            .then(navigate("/"));
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

        // The signed-in user info.
        const user = result.user;
        fetch("https://muchinkenya-be.onrender.com/userByEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.email }),
        }).then((res) => {
          if (res.ok) {
            res
              .json()
              .then((data) => {
                localStorage.setItem("access_token", data.access_token);
                setUser(data.user);
                setError(null);
                setIsLoggedIn(true);
              })
              .then(navigate("/"));
          } else {
            fetch("https://muchinkenya-be.onrender.com/signup", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: user.displayName,
                email: user.email,
                phone_number: user.phoneNumber,
                password:"1234"
              }),
            }).then((res) => {
              if (res.ok) {
                res
                  .json()
                  .then((data) => {
                    localStorage.setItem("access_token", data.access_token);
                    setUser(data.user);
                    setError(null);
                    setIsLoggedIn(true);
                  })
                  .then(() => navigate("/"));
              } else {
                res.json().then((err) => setError(err.error));
              }
            });
          }
        });
   

        setUser();
       
      })
      .catch((error) => {
    
        const errorCode = error.code;
        const errorMessage = error.message;
      
        const email = error.customData.email;
     
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-left" >
          <h1 style={{fontWeight:"bold"}}>Login to Your Account</h1>
          Get ready to savor delicious flavors delivered right to your doorstep
          <form onSubmit={formik.handleSubmit}>
            
            <div className="input-group">
             
              <input
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                className="form-control my-2"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              
            </div>
           
            <div className="input-group">
             
              <input
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                className="form-control my-2 text-center"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </div>
            {error && <div style={{textAlign:"center"}}>{error}</div>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <div className="alternative-login">
            <p>OR</p>
            <div className="alter-login">
              <button className="google-login" onClick={googleLogin} ><img src={logo} width={25}/>Login with Google</button>
            
            </div>
          </div>
          <p className="signup-link">
            Don't Have An Account? <a onClick={()=>navigate("/signUp")} style={{cursor: "pointer"}}>Sign Up</a>
          </p>
        </div>
        <div className="login-right" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", backgroundSize: "cover" }}>

          <h1>Welcome Back!</h1>
        </div>
      </div>
    </div>
  );
}

export default Login;
