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
      fetch("http://127.0.0.1:5555/login", {
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
  console.log(user);

  function googleLogin() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        fetch("http://127.0.0.1:5555/userByEmail", {
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
            fetch("http://127.0.0.1:5555/signup", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: user.displayName,
                email: user.email,
                phone_number: user.phoneNumber,
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
        // IdP data available using getAdditionalUserInfo(result)
        // ...

        setUser();
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-left" >
          <h2>Login to Your Account</h2>
          <p>The Faster you Login, The Faster we get to work</p>
          <form>
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
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <div className="alternative-login">
            <p>OR</p>
            <div className="social-login">
              <button className="google-login" onClick={googleLogin} ><img src={logo} width={25}/>Login with Google</button>
              <button className="apple-login">Login with Apple</button>
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

/* 

import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { auth,provider } from "./firebase";
import  {getAuth,signInWithPopup,GoogleAuthProvider} from "firebase/auth"
import logo from "./Logo-google-icon-PNG.png"

function Login() {
  const [data,filteredList,addToCart,removeFromCart,cart,user,setUser,setIsLoggedIn] = useOutletContext();
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
              localStorage.setItem("access_token", data.access_token);
              setUser(data.user);
              setError(null);
              setIsLoggedIn(true)
             
             
              
            }).then( navigate("/"));
          } else {
            res.json().then((err) => setError(err.error));
          }
        });
      },
  })
  console.log(user);

  function googleLogin(){
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    
  
    // The signed-in user info.
    const user = result.user;
    fetch("http://127.0.0.1:5555/userByEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"email":user.email}),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          localStorage.setItem("access_token", data.access_token);
          setUser(data.user);
          setError(null);
          setIsLoggedIn(true)
         
         
          
        }).then( navigate("/"));
      } else {
        fetch("http://127.0.0.1:5555/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({"name":user.displayName,"email":user.email,"phone_number":user.phoneNumber}),
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
      }
    });
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    
    setUser()
    console.log(user);
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }


  return (
    <div className="p-4 shadow rounded-lg bg-light" style={{height:"100vh"}}>
      
      <form onSubmit={formik.handleSubmit}>
        <input
          id="email"
          name="email"
          placeholder="Email"
          className="form-control my-2"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <p style={{ color: "red" }}> {formik.errors.email}</p>

        <input
          id="password"
          name="password"
          placeholder="Password"
          type="password"
          className="form-control my-2"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <p style={{ color: "red" }}> {formik.errors.password}</p>
        <div id="button_container" className="text-center mt-3">
        <div id="button_container" className="text-center d-flex flex-column align-center " style={{width:"20%", margin: "0 auto"}}>
              <button id="Log In" className="btn btn-primary" type="submit" style={{width:"100%",height:"6vh", fontSize: "larger"}}>Log In</button><hr/>
              <button onClick={googleLogin} style={{ backgroundColor: "grey",height:"6vh", fontSize: "larger" }}><img src={logo} width={25}/>&nbsp;&nbsp;Continue with Google</button>
          </div><br/>
            <p>Don't have an account? <span style={{color: "blue",cursor: "pointer"}} id="register-page" onClick={()=>navigate("/signUp")}>Register here</span></p>
            
        </div>
        
      </form>
      
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
 */
