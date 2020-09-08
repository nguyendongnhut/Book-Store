import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useHistory } from "react-router-dom";

AddPublisher.propTypes = {
  publisher: PropTypes.object,
};

AddPublisher.defaultProps = {
  publisher: {},
};

function AddPublisher(props) {
  const { errors, handleSubmit, register } = useForm();
  const [publisher, setPublisher] = useState({});

  const history = useHistory();

  const onSubmit = (data) => {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.publisher,
      }),
    };
    fetch(`http://localhost:3001/api/publishers`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPublisher(data);
      });

    history.push("/products");
  };

  return (
    <Form id="reset-form-add" onSubmit={handleSubmit(onSubmit)}>
      <label>Publisher Name</label>
      <input name="publisher" ref={register} />
      <input type="submit" />
    </Form>
  );
}

export default AddPublisher;
