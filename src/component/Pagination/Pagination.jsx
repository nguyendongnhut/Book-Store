import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Pagination.css";

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
  onPageChange: null,
};

function Pagination(props) {
  const pageNumbers = [];
  const { perPage, totalProduct, paginate, pre, next } = props;

  const totalPages = Math.ceil(totalProduct / perPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const listNumbers = pageNumbers.map((item) => (
    <li key={item} className="Pagination__Item">
      <Link onClick={() => paginate(item)} to="#">
        {item}
      </Link>
    </li>
  ));

  return (
    <div className="Pagination__List">
      <button onClick={() => pre()}>Pre</button>
      <ul className="Pagination__List">{listNumbers}</ul>
      <button onClick={() => next()}>Next</button>
    </div>
  );
}

export default Pagination;
