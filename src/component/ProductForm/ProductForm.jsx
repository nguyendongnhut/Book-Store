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
  const [types, setTypes] = useState([]);
  const [publishers, setPublishers] = useState([]);

  const onSubmit = (data) => {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        TenSanPham: data.bookName,
        TenTacGia: data.authorName,
        MaLoaiSanPham: data.type,
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
    async function FetchGetTypes() {
      try {
        const response = await fetch(`http://localhost:3001/api/admin/getType`);

        const responseJSON = await response.json();
        const data = responseJSON;
        setTypes(data);
      } catch (error) {
        console.log("get type fail: ", error.message);
      }
    }

    async function FetchGetPublishers() {
      try {
        const response = await fetch(
          `http://localhost:3001/api/admin/getPublisher`
        );

        const responseJSON = await response.json();

        const data = responseJSON;
        setPublishers(data);
      } catch (error) {
        console.log("get type fail: ", error.message);
      }
    }

    FetchGetTypes();
    FetchGetPublishers();
  }, []);

  const ListTypes = types.map((item) => {
    return (
      <option value={item.MaLoaiSanPham} key={item.MaLoaiSanPham}>
        {item.TenLoaiSanPham}
      </option>
    );
  });

  const ListPublishers = publishers.map((item) => {
    return (
      <option value={item.MaHangSanXuat} key={item.MaHangSanXuat}>
        {item.TenHangSanXuat}
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
      <select name="type" ref={register}>
        {ListTypes}
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
