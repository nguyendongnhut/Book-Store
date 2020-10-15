import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Form } from "semantic-ui-react";
import { useInput } from "../../hooks/input-hook";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import * as NumberToPrice from "../../constants/NumberToPrice";

import "./SearchInfo.css";
import Products from "../../product/Products/Products";
import ProductSearch from "../ProductSearch/ProductSearch";

SearchInfo.propTypes = {};

function SearchInfo(props) {
  const { register, handleSubmit, errors } = useForm();
  const [listPublisher, setListPublisher] = useState([]);
  const [listCategory, setListCategory] = useState([]);

  const history = useHistory();

  useEffect(() => {
    async function FetchGetPublisher() {
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        };

        const response = await fetch(
          `http://localhost:3001/api/publishers`,
          requestOptions
        );

        const responseJSON = await response.json();

        const data = responseJSON;

        setListPublisher(data);
      } catch (error) {
        console.log("fail: ", error.message);
      }
    }

    async function FetchGetCategory() {
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        };

        const response = await fetch(
          `http://localhost:3001/api/categorys`,
          requestOptions
        );

        const responseJSON = await response.json();

        const data = responseJSON;

        setListCategory(data);
      } catch (error) {
        console.log("fail: ", error.message);
      }
    }

    FetchGetCategory();
    FetchGetPublisher();
  }, []);

  const onSubmit = (data) => {
    console.log(data.name);
    // const requestOptions = {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + sessionStorage.getItem("token"),
    //   },
    //   body: JSON.stringify({
    //     name: data.name,
    //     lowPrice: data.lowPrice,
    //     highPrice: data.highPrice,
    //     authorname: data.authorName,
    //     categoryId: data.category,
    //     publisherId: data.publisher,
    //   }),
    // };

    // fetch(`http://localhost:3001/api/products/search`, requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     setListProducts(data);
    //   });
    let query = "";
    if (data.name != "") {
      query += `name=${data.name}&`;
    }
    if (data.authorName != "") {
      query += `authorname=${data.authorName}&`;
    }
    if (data.lowPrice != "") {
      query += `lowPrice=${data.lowPrice}&`;
    }
    if (data.highPrice != "") {
      query += `highPrice=${data.highPrice}&`;
    }
    if (data.publisher != "") {
      query += `publisher=${data.publisher}&`;
    }
    if (data.category != "") {
      query += `category=${data.category}`;
    }

    history.push({
      pathname: `/products/search`,
      search: query,
    });
  };

  const ListCategorys = listCategory.map((item) => {
    return (
      <option value={item.categoryId} key={item.categoryId}>
        {item.name}
      </option>
    );
  });

  const ListPublishers = listPublisher.map((item) => {
    return (
      <option value={item.publisherId} key={item.publisherId}>
        {item.name}
      </option>
    );
  });

  let lowPriceArray = [];
  let highPriceArray = [];
  for (let i = 15000; i < 50000000; i *= 2) {
    lowPriceArray.push(i);
    highPriceArray.push(i);
  }

  const lowArray = lowPriceArray.map((item) => {
    return <option>{item}</option>;
  });

  const highArray = highPriceArray.map((item) => {
    return <option>{item}</option>;
  });

  return (
    <React.Fragment>
      <div className="Search">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Search ..."
              className="Search-txt"
              ref={register}
            />
            <a href="#" className="Search-btn">
              <FontAwesomeIcon icon={faSearch} />
            </a>
          </div>
          <div className="Search__Detail">
            <div className="Search__Detail-price">
              <select name="lowPrice" ref={register}>
                {lowArray}
              </select>
              <span>-</span>
              <select name="highPrice" ref={register}>
                {highArray}
              </select>
            </div>
            <div className="Search__Detail-authorname">
              <input
                type="text"
                name="authorName"
                placeholder="Author Name ..."
                ref={register}
              />
            </div>
            <div className="Search__Detail-category">
              <select ref={register} name="category">
                {ListCategorys}
              </select>
            </div>
            <div className="Search__Detail-publisher">
              <select ref={register} name="publisher">
                {ListPublishers}
              </select>
            </div>
            <div className="Search__Detail-submit">
              <button>Search</button>
            </div>
          </div>
        </Form>
      </div>
    </React.Fragment>
  );
}

export default SearchInfo;
