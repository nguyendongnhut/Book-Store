import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

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
        const response = await fetch(`http://localhost:3001/api/product/type`);
        const responseJSON = await response.json();

        console.log({ responseJSON });
        const data = responseJSON;
        console.log("data", data);
        setCategoryList(data);
      } catch (error) {
        console.log("failed: ", error.message);
      }
    }

    FetchCategoryList();
  }, []);

  return (
    <div>
      <div className="ListCategories">
        <div className="ListCategories__Name">Thể Loại</div>
        <ul className="Category">
          {categoryList.map((item) => (
            <li key={item.MaLoaiSanPham} className="Category__Name">
              <Link to="#">{item.TenLoaiSanPham}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Categories;
