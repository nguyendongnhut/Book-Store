import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import "./Publisher.css";

Publishers.propTypes = {
  publishers: PropTypes.array,
};

Publishers.defaultProps = {
  punlishers: [],
};

function Publishers(props) {
  const [publisherList, setPublisherList] = useState([]);

  useEffect(() => {
    async function FetchPublisherList() {
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        };

        const response = await fetch(
          `http://localhost:3001/api/publishers`,
          requestOptions
        );

        const responseJSON = await response.json();

        const data = responseJSON;
        setPublisherList(data);
      } catch (error) {
        console.log("failed:", error.message);
      }
    }

    FetchPublisherList();
  }, []);

  const { publisherId } = useParams();

  return (
    <div>
      <div className="ListPublishers">
        <div className="ListPublisher__Name">Nhà Xuất Bản</div>
        <ul className="Publisher">
          {publisherList.map((item) => (
            <li key={item.publisherId} className="Publisher__Name">
              <Link to={`/products/publisher/${item.publisherId}`}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Publishers;
