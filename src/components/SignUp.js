import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";  // Import Framer Motion
import { auth, provider } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import logo from "./Logo-google-icon-PNG.png";

const SignUp = () => {
  const [data, filteredList, addToCart, removeFromCart, cart, user, setUser, setIsLoggedIn] = useOutletContext();
  const [error, setError] = useState();
  const navigate = useNavigate();
  
  const formSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Must enter email"),
    name: yup.string().required("Must enter a name"),
    phone_number: yup.string().required("Must enter a number").max(15),
    password: yup.string().required("Must enter password"),
    password2: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
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
      fetch("https://munchinkenya-be.vercel.app/signup", {
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
            setIsLoggedIn(true);
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
        fetch("https://munchinkenya-be.vercel.app/userByEmail", {
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
            fetch("https://munchinkenya-be.vercel.app/signup", {
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
    <motion.div className="wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="signup-container flex flex-col md:flex-row justify-center items-center h-[50rem] p-6 bg-background">
        
        {/* Left Section */}
        <motion.div className="left p-8 md:w-1/2" initial={{ x: -100 }} animate={{ x: 0 }} transition={{ type: "spring", stiffness: 50 }}>
          <h1 className="text-4xl font-playfair mb-4">Hi there!</h1>
          <p className="text-lg text-textSecondary mb-6">Welcome to MunchInKenya</p>
          
          {/* Google Sign-in Button */}
          <motion.button className="google-sign-in bg-accent text-textPrimary px-4 py-2 rounded-lg flex items-center justify-center mb-4 w-full hover:bg-yellow-600 transition"
            whileTap={{ scale: 0.95 }} onClick={googleLogin}>
            <img src={logo} width={25} alt="Google Icon" className="mr-2 " />
            Continue with Google
          </motion.button>
          
          <p className="text-textSecondary mb-6 text-center">or</p>

          {/* Form */}
          <form className="signup-form space-y-4" onSubmit={formik.handleSubmit}>
            <motion.input type="email" placeholder="Your email" className="form-input w-full p-2 rounded-md bg-surface" id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              whileFocus={{ scale: 1.02 }} />
            {formik.errors.email && <p className="text-red-500">{formik.errors.email}</p>}

            <motion.input type="text" placeholder="Name" className="form-input w-full p-2 rounded-md bg-surface" id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name} />
            
            <motion.input type="text" placeholder="Phone Number" className="form-input w-full p-2 rounded-md bg-surface" id="number"
              name="phone_number"
              onChange={formik.handleChange}
              value={formik.values.phone_number} />

            <motion.input type="password" placeholder="Password" className="form-input w-full p-2 rounded-md bg-surface" id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password} />

            <motion.input type="password" placeholder="Confirm Password" className="form-input w-full p-2 rounded-md bg-surface" id="password2"
              name="password2"
              onChange={formik.handleChange}
              value={formik.values.password2} />
            {formik.errors.password2 && <p className="text-red-500">{formik.errors.password2}</p>}

            <motion.button type="submit" className="form-button bg-primary text-white py-2 rounded-lg w-full hover:bg-orange-700"
              whileTap={{ scale: 0.95 }}>
              Sign Up
            </motion.button>
          </form>
          {error && <div className="text-red-500 mt-2">{error}</div>}
          <p className="text-textSecondary mt-4 cursor-pointer" onClick={() => navigate("/MunchInKenya-fe/login")}>
            Already have an account? Log In
          </p>
        </motion.div>

        {/* Right Section */}
        <motion.div className="right hidden md:block md:w-1/2 bg-cover bg-center h-full" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?q=80&w=1974&auto=format&fit=crop')",
        }} initial={{ x: 100 }} animate={{ x: 0 }} transition={{ type: "spring", stiffness: 50 }}>
          
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SignUp;
