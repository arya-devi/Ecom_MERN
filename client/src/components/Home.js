import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axiosInstance from "../axiosinstance";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Check if token exists
    if (!token) {
      // If no token, redirect to login
      navigate("/login/You are not Authenticated");
    } else {
      // If token exists, set it in the axios headers

      // Fetch products from the API (replace with your actual API endpoint)
      axiosInstance
        .get("/retrieve_products")
        .then((response) => {
          console.log(response.data);
          setProductData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [navigate]);
  const viewProduct = (id) => {
    navigate(`/viewProduct/${id}`);
    console.log(`/viewProduct/${id}`);
  };
  const addProduct = () => {
    navigate("/addProduct");
    console.log("added");
  };
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1 style={{ color: "#664343" }} className="text-center mb-4">
          Products List
        </h1>
        <div className="d-flex justify-content-center mb-5">
          <button
            style={{ fontSize: "0.9rem", backgroundColor: "#795757" }}
            onClick={() => addProduct()}
            className="btn text-white"
          >
            Add Product
          </button>
        </div>
        <div className="row">
          {productData.map((product) => (
            <div className="col-12 mb-4" key={product._id}>
              <div className="card h-100">
                <div
                  style={{ fontSize: "0.9rem", backgroundColor: "#FFF4EA" }}
                  className="card-body #664343 p-4  d-flex justify-content-between align-items-center"
                >
                  <h5 style={{ color: "#664343" }} className="card-title mb-0">
                    {product.name}
                  </h5>
                  <div>
                    <button
                      style={{ fontSize: "0.9rem", backgroundColor: "#795757" }}
                      onClick={() => {
                        viewProduct(product._id);
                      }}
                      className="btn text-white rounded-pill"
                    >
                      View Details
                    </button>
                    <button
                      style={{ fontSize: "0.9rem", backgroundColor: "#795757" }}
                      onClick={() => dispatch(addItem(product))}
                      className="btn text-white rounded-pill ml-5"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
