import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import "./Categories.css";
import RequestApi from "../../ultilities/request";
import * as ApiUrl from "../../constants/ApiUrl";

Categories.propTypes = {
  categories: PropTypes.array,
};

Categories.defaultProps = {
  categories: [],
};

function Categories(props) {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    async function FetchCategoryList() {
      try {
        const option = {
          // method: "GET",
          // body: JSON.stringify({}),
        };

        const data = await RequestApi(ApiUrl.productCategoriesApi, option);
        setCategoryList(data);
      } catch (error) {
        console.log("failed: ", error.message);
      }
    }

    FetchCategoryList();
  }, []);

  return (
    <div className="panel-group box-left">
      <div className="panel panel-info">
        <div className="panel-heading">
          <h4 className="panel-title">Thể Loại</h4>
        </div>
        <div className="panel-collapse collapse in">
          <div className="list-group">
            <ul className="Category">
              {categoryList.map((item) => (
                <li key={item.categoryId} className="Category__Name">
                  <Link to={`/products/category/${item.categoryId}`}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
