import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

UpdatePublisher.propTypes = {
  publisher: PropTypes.object,
};

UpdatePublisher.defaultProps = {
  publisher: {},
};

function UpdatePublisher(props) {
  const { errors, handleSubmit, register } = useForm();
  const [publishers, setPublishers] = useState([]);

  const history = useHistory();

  const onSubmit = (data) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        publisherId: data.publisherId,
        name: data.publisher,
      }),
    };
    fetch(
      `http://localhost:3001/api/publishers/${data.publisherId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPublishers(data);
      });

    history.push("/products");
  };

  useEffect(() => {
    async function FetchGetPublishers() {
      try {
        const response = await fetch(`http://localhost:3001/api/publishers`);

        const responseJSON = await response.json();

        const data = responseJSON;
        setPublishers(data);
      } catch (error) {
        console.log("get publisher fail: ", error.message);
      }
    }

    FetchGetPublishers();
  }, []);

  const ListPublishers = publishers.map((item) => {
    return (
      <option value={item.publisherId} key={item.publisherId}>
        {item.name}
      </option>
    );
  });

  return (
    <Form id="reset-form-add" onSubmit={handleSubmit(onSubmit)}>
      <label>Publisher</label>
      <select name="publisherId" ref={register}>
        {ListPublishers}
      </select>
      <label>Change Publisher Name</label>
      <input name="publisher" ref={register} />
      <input type="submit" />
    </Form>
  );
}

export default UpdatePublisher;
