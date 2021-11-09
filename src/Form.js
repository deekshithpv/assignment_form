import React, { useState, useEffect } from "react";
import "./Form.css";
import "semantic-ui-css/semantic.min.css";

// Regex Chars for validations
const nameRegex = /^[a-zA-Z]+$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const phoneRegex = /^\d{10}$/;

// pattern and delay constants
const pattern = "●";
const delay = 600;

// Function for generating masking pattern
const pointGen = (pattern, num) => {
  return Array.apply(null, Array(num))
    .map(() => pattern)
    .join("");
};

// Form component
const Form = () => {
  // State Variables for input Fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailID, setEmailID] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [formErrors, setFormErrors] = useState({});
  // State variables for password
  const [password, setPassword] = useState("");
  const [unmaskedPassword, setUnmaskedPassword] = useState("");
  // Handling onChange event
  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "emailID":
        setEmailID(value);
        break;
      case "phoneNo":
        setPhoneNo(value);
        break;
      default:
        console.log("Default case");
    }
  };
  // Handling onBlur event
  const handleBlur = (e) => {
    const { name, value } = e.target;
    console.log(`${name} : ${value}`);

    switch (name) {
      case "firstName":
        if (!value) {
          setFormErrors({ [name]: "First Name is Required" });
        } else if (!nameRegex.test(value)) {
          setFormErrors({ [name]: "Enter a valid first name" });
        } else {
          setFormErrors({ [name]: "" });
        }
        break;
      case "lastName":
        if (!value) {
          setFormErrors({ [name]: "Last Name is Required" });
        } else if (!nameRegex.test(value)) {
          setFormErrors({ [name]: "Enter a valid last name" });
        } else {
          setFormErrors({ [name]: "" });
        }
        break;
      case "emailID":
        if (!value) {
          setFormErrors({ [name]: "Email ID  is Required" });
        } else if (!emailRegex.test(value)) {
          setFormErrors({ [name]: "Enter a valid Email ID" });
        } else {
          setFormErrors({ [name]: "" });
        }
        break;
      case "phoneNo":
        if (!value) {
          setFormErrors({ [name]: "Phone Number is Required" });
        } else if (!phoneRegex.test(value)) {
          setFormErrors({ [name]: "Enter a valid Phone No" });
        } else {
          setFormErrors({ [name]: "" });
        }
        break;
      default:
        console.log("Default case");
    }
  };
  // useEffect for password masking;
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPassword(pointGen(pattern, password.length));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [password]);

  // handling password masking
  const handlePasswordChange = (e) => {
    // insert cursor location
    const index = e.target.selectionStart;
    const inputText = e.target.value;

    // increase length of input's value
    const addedTextLength = inputText.length - unmaskedPassword.length;

    // increase text
    if (addedTextLength > 0) {
      const newStr = inputText.slice(index - addedTextLength, index);
      setUnmaskedPassword(
        unmaskedPassword.slice(0, index - addedTextLength) +
          newStr +
          unmaskedPassword.slice(index - addedTextLength)
      );
      // delete text
    } else if (addedTextLength < 0) {
      setUnmaskedPassword(
        unmaskedPassword.slice(0, index) +
          unmaskedPassword.slice(index - addedTextLength)
      );
    }

    // render mask effect
    if (inputText.length === 0) {
      setPassword("");
    } else {
      setPassword(
        pointGen(pattern, inputText.length - 1) +
          inputText.charAt(inputText.length - 1)
      );
    }
  };

  return (
    <div className="container">
      <form>
        <div className="form-container">
          <h1>Student Registration</h1>
          <div className="ui divider"></div>
          <div className="ui form">
            <div className="field">
              <label htmlFor="firstName">First Name</label>
              <input
                name="firstName"
                type="text"
                placeholder="First Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={firstName}
              ></input>
            </div>
            <p>{formErrors.firstName}</p>
            <div className="field">
              <label htmlFor="lastName">Last Name</label>
              <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={lastName}
              ></input>
            </div>
            <p>{formErrors.lastName}</p>
            <div className="field">
              <label htmlFor="emailID">Email ID</label>
              <input
                name="emailID"
                type="email"
                placeholder="Email ID"
                onChange={handleChange}
                onBlur={handleBlur}
                value={emailID}
              ></input>
            </div>
            <p>{formErrors.emailID}</p>
            <div className="field">
              <label htmlFor="phoneNo">Phone Number</label>
              <input
                name="phoneNo"
                type="text"
                placeholder="Phone No"
                onChange={handleChange}
                onBlur={handleBlur}
                value={phoneNo}
              ></input>
            </div>
            <p>{formErrors.phoneNo}</p>
            <div className="field">
              <label htmlFor="passwordFirst">Password</label>
              <div>
                <input
                  name="passwordFirst"
                  type="text"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                ></input>
                <i class="eye icon"></i>
              </div>
            </div>
            <button className="fluid ui button blur">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
