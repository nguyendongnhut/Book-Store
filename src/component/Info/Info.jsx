import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../Header/Header.css";

Info.propTypes = {
  name: PropTypes.string,
};

Info.defaultProps = {
  name: "",
};

function Info(props) {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
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
      const user = responseJSON[0].userId;
      setName(data);
      setUserId(user);
    }

    FetchGetUserName();
  }, []);

  return (
    <React.Fragment>
      {name}
      <div className="dropdown-content">
        <Link to={`/order/userId/${userId}`}>
          <p>History Orders</p>
        </Link>
        <Link to="#">
          <p>Change Info</p>
        </Link>
      </div>
    </React.Fragment>
  );
}

export default Info;
