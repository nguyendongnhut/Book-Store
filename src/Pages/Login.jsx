import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";
import { useInput } from "../hooks/input-hook";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";

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

    // fetch("http://localhost:3001/api/users", {
    //   method: "GET",
    //   headers: { "Content-Type": "application/json" },
    // }).then(async (response) => {
    //   const data = await response.json();

    //   let user = data.filter((item) => {
    //     return uAccount === item.useraccount;
    //   });

    //   if(!user) {

    //   }
    // })

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
    <div className="Login__form">
      {message ? message : ""}
      {errors.userAccount && "user account is required"}
      {errors.password && "password is required"}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input
          type="text"
          name="userAccount"
          ref={register({ required: true })}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          ref={register({ required: true })}
        />
        <input type="submit" />
      </Form>
    </div>
  );
}

export default Login;
