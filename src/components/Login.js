//TECH IMPORTS 
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";


const Login = () => {

//SLICES OF STATE / HOOKS / PROPS

const history = useHistory();

const initialFormValues = {
  username: "",
  password: "",
}

const initialFormErrors = {
  username: "",
  password: "",
}

const [formValues, setFormValues]=useState(initialFormValues);
const [initialError, setInitialError]=useState("")
const [formErrors, setFormErrors]=useState(initialFormErrors);
const [disabled, setDisabled]=useState("");


//YUP FORM SCHEMA 

const formSchema = Yup.object().shape({
  username: Yup
  .string()
  .required("A Username Entry Is Required"),
  password: Yup
  .string()
  .required("A Password Entry Is Required")
  .min(6, "Passwords Must Be At-least 6 Characters Long"),
})

//SETS FORM SUBMISSION BUTTON TO DISABLED UNTIL FORM VALUES ARE VALID 
useEffect(()=>{
  formSchema.isValid(formValues).then((valid)=>{
    setDisabled(!valid)
  })
},[formValues])

//HANDLES CHANGES TO LOGIN FORM AS WELL AS RUNS FORM VALIDATION 

const handleLoginFormChange = (event) => {
  
  const {name, value, checked, type}=event.target;

  const valueToUse = type === "checkbox" ? checked : value
  
  Yup
  .reach(formSchema, name)
  .validate(value)
  .then((valid)=>{
    setFormErrors({
      ...formErrors, [name]: "",
    })
  })
  .catch((err)=>{
    setFormErrors({
      ...formErrors, [name]: err.errors[0],
    })
  })

  setFormValues({
    ...formValues, [name]: valueToUse
  })
}


//HANDLES LOGIN FORM SUBMISSION 
const handleLoginFormSubmission = (event)=>{
  event.preventDefault();
  axios.post("http://localhost:5000/api/login", formValues)
  .then((res)=>{
    console.log("SUCCEEDED POSTING LOGIN TO DATABASE", res);
    localStorage.setItem("token", res.data.payload);
    history.push("/protected");
  })
  .catch((err)=>{
    console.log("FAILED POSTING LOGIN TO DATABASE", err);
    setInitialError("Username or Password not valid");
  })

}

//BEGIN FUNCTIONAL COMPONENT RETURN 
  return (
    <div className="loginFormCatchAll">
      <h1>
        Welcome to the Bubble App!
      </h1>
      <form onSubmit={handleLoginFormSubmission}>
          <label htmlFor="username">
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter Your Username"
              value={formValues.username}
              onChange={handleLoginFormChange}
            />
          </label>

          <label htmlFor="password">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Password"
              value={formValues.password}
              onChange={handleLoginFormChange}
            />
          </label>
          <button disabled={disabled}>Submit Login</button>
        </form>
        <p>{initialError}</p>
        <p>{formErrors.username}</p>
        <p>{formErrors.password}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEXT "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.