import React, { useState, useEffect } from "react";
import { Form } from "semantic-ui-react";
import { useInput } from "../../hooks/input-hook";
import { useForm } from "react-hook-form";

ProductForm.propTypes = {};

ProductForm.defaultProps = {};

function ProductForm(props) {
  const { register, handleSubmit, errors } = useForm();
  const [ListProducts, setListProducts] = useState([]);
  const [formData, setFormData] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [publishers, setPublishers] = useState([]);

  const onSubmit = (data) => {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer" + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        TenSanPham: data.bookName,
        TenTacGia: data.authorName,
        MaLoaiSanPham: data.category,
        MaHangSanXuat: data.publisher,
        GiaSanPham: data.price,
        HinhURL: data.imagesUrl,
        MoTa: data.description,
      }),
    };
    fetch(`http://localhost:3001/api/admin/addBook`, requestOptions)
      .then((response) => response.json())
      .then((data) => setListProducts(data));

    document.getElementById("reset-form-add").reset();
  };

  useEffect(() => {
    // send request ap get category
    async function FetchGetCategorys() {
      try {
        const response = await fetch(`http://localhost:3001/api/categorys`);

        const responseJSON = await response.json();
        const data = responseJSON;
        setCategorys(data);
      } catch (error) {
        console.log("get category fail: ", error.message);
      }
    }

    // send request api get list publisher
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

    FetchGetCategorys();
    FetchGetPublishers();
  }, []);

  const ListCategorys = categorys.map((item) => {
    return (
      <option value={item.categoryId} key={item.categoryId}>
        {item.name}
      </option>
    );
  });

  const ListPublishers = publishers.map((item) => {
    return (
      <option value={item.publisherId} key={item.publisherId}>
        {item.name}
      </option>
    );
  });

  return (
    <Form id="reset-form-add" onSubmit={handleSubmit(onSubmit)}>
      <label>Book Name</label>
      <input name="bookName" ref={register} />
      <label>Author Name</label>
      <input name="authorName" ref={register} />
      <label>Type</label>
      <select name="category" ref={register}>
        {ListCategorys}
      </select>
      <label>Publisher</label>
      <select name="publisher" ref={register}>
        {ListPublishers}
      </select>
      <label>Description</label>
      <textarea
        name="description"
        ref={register}
        id="story"
        rows="5"
        cols="33"
      />
      <label>Price</label>
      <input type="number" name="price" ref={register} />
      <input
        id="file"
        type="file"
        name="imagesUrl"
        ref={register}
        // The onChange should trigger updates whenever
        // the value changes?
        // Try to select a file, then try selecting another one.
        multiple
      />
      <input type="submit" />
    </Form>
  );
}

export default ProductForm;
