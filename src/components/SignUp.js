import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { auth,provider } from "./firebase";
import  {getAuth,signInWithPopup,GoogleAuthProvider} from "firebase/auth"
import logo from "./Logo-google-icon-PNG.png"

import './SignUp.css';

const SignUp = () => {
  const [data,filteredList,addToCart,removeFromCart,cart,user,setUser,setIsLoggedIn] = useOutletContext();
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
    <div className="signup-container">
      <div className="left">
        <div className="language-selector">
          <img src="path-to-flag-icon" alt="Flag" className="flag-icon" />
          <span>EN</span>
        </div>
        <h1>Hi there!</h1>
        <p>Welcome to MunchIn Dashboard</p>
        <button className="google-sign-in" onClick={googleLogin}>
          <img src={logo} width={25} alt="Google Icon" className="google-icon" />
          Log in with Google
        </button>
        <p className="or">or</p>
        <form className="signup-form" onSubmit={formik.handleSubmit}>
          <input type="email" placeholder="Your email" className="form-input" id="email"
          name="email"
          
          onChange={formik.handleChange}
          value={formik.values.email}/>
           <input type="text" placeholder="name" className="form-input" id="name"
          name="name"
          
          onChange={formik.handleChange}
          value={formik.values.name}/>
          <input type="text" placeholder="Phone Number" className="form-input" id="number"
          name="phone_number"
          
          onChange={formik.handleChange}
          value={formik.values.phone_number}/>
          <input type="password" placeholder="Password" className="form-input" id="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}/>
          <input type="password" placeholder="Password2" className="form-input" id="password2"
          name="password2"
          onChange={formik.handleChange}
          value={formik.values.password2}/>
          <button type="submit" className="form-button">Sign Up</button>
        </form>
       
        <p className="login-link" onClick={()=>navigate("/login")}>Already have an account?Log In</p>
      </div>
      <div className="right" style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1670740967011-86730910a2e5?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", backgroundSize: "cover" }}>
        <div className="image-container">
          <img src="path-to-astronaut-image" alt="Astronaut" className="astronaut-image" />
          <p>Go anywhere you want in a Galaxy full of wonders!</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
