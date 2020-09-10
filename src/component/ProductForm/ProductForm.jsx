import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";
import { useInput } from "../../hooks/input-hook";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";

ProductForm.propTypes = {
  product: PropTypes.object,
};

ProductForm.defaultProps = {
  product: {},
};

function ProductForm(props) {
  const { register, handleSubmit, errors } = useForm();
  const [ListProducts, setListProducts] = useState([]);
  const [formData, setFormData] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [file, setFile] = useState("");

  const [uploadedFile, setUploadedFile] = useState({});

  const history = useHistory();

  const handleImage = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
    };
    if (file != null) {
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    if (file != null) {
      handleUploadImage();
    }

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: data.bookName,
        authorname: data.authorName,
        categoryId: data.category,
        publisherId: data.publisher,
        price: data.price,
        image: file.name,
        description: data.description,
      }),
    };
    fetch(`http://localhost:3001/api/products`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setListProducts(data);
      });

    history.push("/products");
  };

  const handleUploadImage = async (e) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        "http://localhost:3001/api/products/uploadImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      );

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      console.log("File Uploaded");
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
    // const formData = new FormData();
    // formData.append("image", file);

    // // axios.post("http://localhost:3001/api/products/uploadImage", {
    // //   headers: {
    // //     "Content-Type": "multipart/form-data",
    // //     Authorization: "Bearer " + sessionStorage.getItem("token"),
    // //   },
    // //   formData,
    // // });

    // const requestOptions = {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //     "Content-Type": "multipart/form-data",
    //     Authorization: "Bearer " + sessionStorage.getItem("token"),
    //   },
    // };
    // fetch(
    //   `http://localhost:3001/api/products/uploadImage`,
    //   requestOptions,
    //   formData
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //   });
  };

  // const handleImage = (e) => {
  //   setFile(e.target.files[0]);
  // };

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
    <Form
      id="reset-form-add"
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
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
        name="image"
        ref={register}
        onChange={handleImage}
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
