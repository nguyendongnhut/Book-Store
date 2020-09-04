import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

AddProduct.propTypes = {
  product: PropTypes.object,
  onSubmit: PropTypes.func,
};

AddProduct.defaultProps = {
  product: {},
  onSubmit: null,
};

function AddProduct(props) {
  // const [file, setFile] = useState([{}]);
  // // const [items, setItems] = useState([]);
  // const [types, setTypes] = useState([]);
  // const [publishers, setPublishers] = useState([]);
  // // const [filename, setFilename] = useState("choose file");
  // // const [uploadedFile, setUploadedFile] = useState({});

  // // function onChange(e) {
  // //   console.log(e.target.files[0]);
  // //   setFile(e.target.files[0]);
  // //   // setFilename(e.target.files[0].name);
  // // }

  // // function fileUploadHandler() {
  // //   const formData = new formData();

  // //   formData.append("file", file);

  // //   axios
  // //     .post("http://localhost:3001/api/admin/uploadImage", formData)
  // //     .then((res) => {
  // //       console.log(res);
  // //     });
  // // }

  // // function HandlerInput(e) {
  // //   let name = e.target.name;
  // //   let value = e.target.value;
  // //   const temp = this.state.items.slice();
  // //   temp[0][name] = value;
  // //   this.setState({
  // //     items: temp,
  // //   });
  // // }

  // function handlerInputNameBook(e) {
  //   e.preventDefault();

  //   const name = e.target.value;

  //   const formValue = {
  //     name: name,
  //   };

  //   console.log(formValue);
  // }

  // function handlerInputNameAuthor(e) {
  //   e.preventDefault();

  //   const name = e.target.value;

  //   const formValue = {
  //     nameAuthor: name,
  //   };

  //   console.log(formValue);
  // }

  // useEffect(() => {
  //   async function FetchGetTypes() {
  //     try {
  //       const response = await fetch(`http://localhost:3001/api/admin/getType`);

  //       const responseJSON = await response.json();
  //       const data = responseJSON;
  //       setTypes(data);
  //     } catch (error) {
  //       console.log("get type fail: ", error.message);
  //     }
  //   }

  //   async function FetchGetPublishers() {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:3001/api/admin/getPublisher`
  //       );

  //       const responseJSON = await response.json();
  //       const data = responseJSON;
  //       setPublishers(data);
  //     } catch (error) {}
  //   }

  //   FetchGetTypes();
  //   FetchGetPublishers();
  // }, []);

  // // const onSubmit = async (e) => {
  // //   e.preventDefault();
  // useEffect(() => {
  //   function FetchSubmitData() {
  //     fetch(`http://localhost:3001/api/admin/addBook`, {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         TenSanPham:
  //       }),
  //     });
  //   }
  // });
  // //   const formData = new FormData();
  // //   formData.append("file", file);

  // //   try {
  // //     const response = await axios(
  // //       "http://localhost:3001/api/admin/uploadImage",
  // //       formData
  // //     );

  // //     const { fileName, filePath } = response.data;

  // //     setUploadedFile({ fileName, filePath });
  // //   } catch (error) {
  // //     console.log("upload file failed: ", error);
  // //   }
  // // };

  // const ListTypes = types.map((item) => {
  //   return (
  //     <option value={item.TenLoaiSanPham} key={item.MaLoaiSanPham}>
  //       {item.TenLoaiSanPham}
  //     </option>
  //   );
  // });

  // const ListPublishers = publishers.map((item) => {
  //   return (
  //     <option value={item.TenHangSanXuat} key={item.MaHangSanXuat}>
  //       {item.TenHangSanXuat}
  //     </option>
  //   );
  // });

  return (
    // <div className="AddProduct">
    //   <form
    //     method="POST"
    //     className="AddProduct__Form"
    //     // onSubmit={handleOnSubmit}
    //   >
    //     <div className="Form__Group">
    //       <label>Tên Sách</label>
    //       <input
    //         type="text"
    //         ref="TenSanPham"
    //         className="form-control"
    //         name="TenSanPham"
    //         onChange={handlerInputNameBook}
    //       />
    //     </div>
    //     <div className="Form__Group">
    //       <label>Tên Tác Giả</label>
    //       <input type="text" onChange={handlerInputNameAuthor} />
    //     </div>
    //     <div className="Form__Group">
    //       <label>Thể Loại</label>
    //       <select>{ListTypes}</select>
    //     </div>
    //     <div className="Form__Group">
    //       <label>Nhà Xuất Bản</label>
    //       <select>{ListPublishers}</select>
    //     </div>

    //     <div className="Form__Group">
    //       <label>Giá Tiền</label>
    //       <input type="text" />
    //     </div>
    //     {/* <div className="Form__Group">
    //       <label>Hình</label>
    //       <input type="file" id="customFile" onChange={onChange} />
    //     </div>
    //     <input type="submit" value="Upload" onClick={fileUploadHandler} /> */}
    //   </form>
    // </div>
    <div></div>
  );
}

export default AddProduct;
