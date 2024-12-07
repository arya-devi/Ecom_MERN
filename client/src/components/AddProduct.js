import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axiosInstance from "../axiosinstance";

const AddProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({
    no: "",
    name: "",
    price: "",
    description: "",
    image: "",
  });
  useEffect(() => {
    const token = localStorage.getItem("token"); // Check if token exists
    if (!token) {
      // If no token, redirect to login
      navigate("/login/You are not Authenticated");
    }
  }, [navigate]);
  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/viewProduct/${id}`)
        .then((response) => {
          console.log(response.data);

          const fetchedProduct = response.data;
          console.log(fetchedProduct);
          setProduct({
            no: fetchedProduct.no,
            name: fetchedProduct.name,
            price: fetchedProduct.price,
            description: fetchedProduct.description,
            image: fetchedProduct.image,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);
  console.log(id);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  console.log(product);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        const responce = await axiosInstance.put(
          `/update_product/${id}`,
          product
        );
        console.log("product updated ", responce.data);
        setProduct({
          no: "",
          name: "",
          price: "",
          description: "",
          image: "",
        });
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        const responce = await axiosInstance.post("/create_product", product);
        console.log(responce.data);
        setProduct({
          no: "",
          name: "",
          price: "",
          description: "",
          image: "",
        });
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (err) {
      console.error("Error submitting the product:", err);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h2 style={{ color: "#795757" }} className="text-center mb-4">
          {id ? "Edit Product" : "Add Product"}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Enter Product Name"
            />
          </div>

          {/* Price Field */}
          <div className="form-group">
            <label htmlFor="productPrice">Price</label>
            <input
              type="number"
              className="form-control"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter Price"
            />
          </div>

          {/* Description Field */}
          <div className="form-group">
            <label htmlFor="productDescription">Description</label>
            <textarea
              className="form-control"
              name="description"
              value={product.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter Product Description"
            ></textarea>
          </div>

          {/* Image Field */}
          <div className="form-group">
            <label htmlFor="productImage">Image</label>
            <input
              type="text"
              className="form-control"
              name="image"
              value={product.image}
              onChange={handleChange}
              placeholder="Add image"
            />
          </div>

          {/* Submit Button */}
          <button
            style={{ color:"white", backgroundColor: "#795757" }}
            type="submit"
            className="btn btn-block"
          >
            {id ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
