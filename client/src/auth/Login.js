import React, { useState } from "react";
import { toast } from "react-toastify";
import { loginTeacher } from "../actions/auth";
import "./Login.css";
import { useDispatch } from "react-redux";
import { FloatingLabel, Form } from "react-bootstrap";
import LoginImage from "../images/login.jpeg";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SEND LOGIN DATA", { email, password });
    try {
      let res = await loginTeacher({ email, password });

      if (res.data) {
        console.log(
          "SAVE USER RES IN REDUX AND LOCAL STORAGE THEN REDIRECT ------>"
        );
        // console.log(res.data);
        window.localStorage.setItem("auth", JSON.stringify(res.data));

        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        });
        history.push("/teacher");
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };
  return (
    <>
      <div className="login">
        <div className="login__left">
          <h1>Login to EdSage</h1>
          <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="login__input"
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
            className="login__input"
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
            className="btn btn-outline-light login__button"
            onClick={handleSubmit} 
          >
            Login
          </button>
        </div>
        <div className="login__right">
          <img src={LoginImage} />
        </div>
      </div>
    </>
  );
};

export default Login;
