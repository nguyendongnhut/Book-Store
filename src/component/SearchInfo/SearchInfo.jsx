import React from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./SearchInfo.css";
import { useState } from "react";

SearchInfo.propTypes = {};

function SearchInfo(props) {
  const [listPublisher, setListPublisher] = useState([]);
  const [listCategory, setCategory] = useState([]);

  return (
    <div className="Search">
      <input type="text" placeholder="Search ..." className="Search-txt" />
      <a href="#" className="Search-btn">
        <FontAwesomeIcon icon={faSearch} />
      </a>
      <div className="Search__Detail">
        <div className="Search__Detail-price">
          <input type="text" name="lowPrice" placeholder="Low Price ..." />
          <span>-</span>
          <input type="text" name="highPrice" placeholder="High Price ..." />
        </div>
        <div className="Search__Detail-authorname">
          <input type="text" name="authorname" placeholder="Author Name ..." />
        </div>
        <div className="Search__Detail-category">
          <select>
            <option>srgwrege</option>
            <option>srgwrege</option>
            <option>srgwrege</option>
            <option>srgwrege</option>
          </select>
        </div>
        <div className="Search__Detail-publisher">
          <select>
            <option>srgwrege</option>
            <option>srgwrege</option>
            <option>srgwrege</option>
            <option>srgwrege</option>
          </select>
        </div>
        <div className="Search__Detail-submit">
          <button>Search</button>
        </div>
      </div>
    </div>
  );
}

export default SearchInfo;
