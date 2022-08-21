import React, { useState } from "react";
import RegisterForm from "../components/forms/RegisterForm";
import axios from "axios";
import { toast } from "react-toastify";
import './Register.css'
import { registerTeacher } from "../actions/auth";
import { FloatingLabel, Form } from "react-bootstrap";
import RegisterImage from '../images/register.png'


const Register = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerTeacher({
        name,
        email,
        password,
      });

      // console.log("REGISTER USER ------>", res);
      toast.success("Register success. Please login.");
      history.push("/login");
    } catch (err) {
      // console.log(err);
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  return (
    <>
      <div className="register">
        <div className="register__left">
          <img src={RegisterImage} />
        </div>

        <div className="register__right">
          <h1>Join EdSage</h1>

          <FloatingLabel
            controlId="floatingInput"
            label="Name"
            className="register__input"
          >
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="register__input"
          >
            <Form.Control
              type="email"
              placeholder="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Password"
            className="register__input"
          >
            <Form.Control
              type="password"
              placeholder="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FloatingLabel>

          <button
            disabled={!email || !password}
            className="btn btn-outline-light register__button"
            onClick={handleSubmit}
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
