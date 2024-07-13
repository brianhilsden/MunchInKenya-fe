import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

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



  return (
    <div className="p-4 shadow rounded-lg bg-light">
     
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
          className="form-control my-2"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <p style={{ color: "red" }}> {formik.errors.password}</p>
        <div id="button_container" class="text-center mt-3">
            <button id="login" class="btn btn-primary mx-1" type="submit">Login</button>
            <p>Don't have an account? <span style={{color: "blue",cursor: "pointer"}} id="register-page" onClick={()=>navigate("/signUp")}>Register here</span></p>
            <p id="forgotten" style={{color: "blue",cursor: "pointer"}}>Forgotten password?</p>
        </div>
        
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
