import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useEffect } from "react";

Info.propTypes = {
  name: PropTypes.string,
};

Info.defaultProps = {
  name: "",
};

function Info(props) {
  const [name, setName] = useState("");

  useEffect(() => {
    async function FetchGetUserName() {
      const requestOptions = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };

      const response = await fetch(
        `http://localhost:3001/api/users/user`,
        requestOptions
      );

      const responseJSON = await response.json();

      const data = responseJSON[0].username;
      setName(data);
    }

    FetchGetUserName();
  }, []);

  return <div>{name}</div>;
}

export default Info;
