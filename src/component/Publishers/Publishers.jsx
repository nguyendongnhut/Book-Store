import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

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
        const response = await fetch(
          `http://localhost:3001/api/product/publisher`
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

  return (
    <div>
      <div className="ListPublishers">
        <div className="ListPublisher__Name">Nhà Sản Xuất</div>
        <ul className="Publisher">
          {publisherList.map((item) => (
            <li key={item.MaHangSanXuat} className="Publisher__Name">
              <Link to="#">{item.TenHangSanXuat}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Publishers;
