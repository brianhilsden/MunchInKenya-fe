import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { auth, provider } from "./firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import logo from "./Logo-google-icon-PNG.png";
import { motion } from 'framer-motion';

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
      fetch("https://munchinkenya-be.vercel.app/login", {
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
            .then(navigate("/MunchInKenya-fe"));
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
              .then(() => navigate("/MunchInKenya-fe"));
          } else {
            fetch("https://munchinkenya-be.vercel.app/signup", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: user.displayName,
                email: user.email,
                phone_number: user.phoneNumber,
                password: "1234",
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
                  .then(() => navigate("/MunchInKenya-fe"));
              } else {
                res.json().then((err) => setError(err.error));
              }
            });
          }
        });
      })
      .catch((error) => {
        console.error("Google login error:", error);
      });
  }

  return (
    <div className=" flex justify-center items-center sm:p-6">
      <motion.div
        className="w-full md:w-[90%] h-[50rem] p-2 sm:p-6 rounded-lg flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full md:w-1/2 p-6 bg-secondary rounded-l-lg">
          <h1 className="text-primary text-3xl font-semibold mb-4">Login to Your Account</h1>
          <p className="text-white mb-4">Get ready to savor delicious flavors delivered right to your doorstep</p>
          
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded-md"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                className="w-full p-3 border border-gray-300 rounded-md"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </div>

            {error && <div className="text-red-500 text-center mb-4">{error}</div>}

            <button type="submit" className="w-full bg-primary text-white p-3 rounded-md hover:bg-orange-700 transition">
              Login
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-white">OR</p>
            <motion.button
              className="w-full bg-accent text-white p-3 rounded-md mt-4 hover:bg-yellow-600 transition"
              onClick={googleLogin}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img src={logo} alt="Google" className="inline-block mr-2" width={25} />
              Login with Google
            </motion.button>
          </div>

          <p className="text-center text-white mt-6">
            Don't Have An Account?{" "}
            <span
              className="text-primary cursor-pointer"
              onClick={() => navigate("/MunchInKenya-fe/signUp")}
            >
              Sign Up
            </span>
          </p>
        </div>

        <div className="hidden md:block w-1/2 bg-cover bg-center rounded-r-lg relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=1980&auto=format&fit=crop')" }}>
          <h1 className="text-white text-4xl font-bold text-center absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Welcome Back!
          </h1>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
