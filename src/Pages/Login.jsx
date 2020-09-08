import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";
import { useInput } from "../hooks/input-hook";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import "./Login.css";

Login.propTypes = {};

Login.defaultProps = {};

function Login(props) {
  const { register, handleSubmit, errors } = useForm();
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  let history = useHistory();

  const onSubmit = (data) => {
    const requestOptions = {
      method: "POST",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        useraccount: data.userAccount,
        password: data.password,
      }),
    };

    fetch(`http://localhost:3001/api/auth`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode !== 400) {
          setToken(data.access_token);
          sessionStorage.setItem("token", data.access_token);
          history.push("/products");
        } else {
          setMessage(data.message);
        }
      });
  };

  return (
    <div className="Login__Form">
      <h1>Login</h1>
      <div className="Login__Message">
        {message && !errors.userAccount && !errors.password ? (
          <p className="Auth__Login-message">{message}</p>
        ) : (
          ""
        )}

        {errors.userAccount && (
          <p className="User__Login-message">{"user account is required"}</p>
        )}

        {errors.password && (
          <p className="PassWord__Login-message">{"password is required"}</p>
        )}
      </div>
      <div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <label>Username</label>
          <input
            className="User__Input"
            type="text"
            name="userAccount"
            ref={register({ required: true })}
          />

          <label>Password</label>
          <input
            className="User__Password"
            type="password"
            name="password"
            ref={register({ required: true })}
          />
          <input type="submit" />
        </Form>
      </div>
    </div>
  );
}

export default Login;
