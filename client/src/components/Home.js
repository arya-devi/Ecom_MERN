
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
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Convert to boolean

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login/You are not Authenticated");
    } else {
      axiosInstance
        .get("/retrieve_products")
        .then((response) => {
          setProductData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [navigate]);

  const viewProduct = (id) => {
    navigate(`/viewProduct/${id}`);
  };

  const addProduct = () => {
    navigate("/addProduct");
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center text-primary mb-4">Products List</h1>
        {isAdmin && (
          <div className="d-flex justify-content-center mb-5">
            <button
              onClick={addProduct}
              className="btn btn-outline-primary px-4 py-2"
            >
              Add Product
            </button>
          </div>
        )}

        <div className="row">
          {productData.map((product) => (
            <div className="col-md-4 col-sm-6 mb-4" key={product._id}>
              <div className="card h-100 shadow">
                <img
                  src={product.image || "default-image.jpg"}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-dark">{product.name}</h5>
                  <p className="card-text text-muted">
                    <strong>Price: </strong>${product.price}
                  </p>
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between mb-2">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => viewProduct(product._id)}
                      >
                        View Details
                      </button>
                      {!isAdmin && (
                        <button
                        className="btn btn-sm btn-success"
                        onClick={() => dispatch(addItem(product))}
                      >
                        Add to Cart
                      </button>
                      )}
                      
                    </div>
                    {isAdmin && (
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => navigate(`/editProduct/${product._id}`)}
                        >
                          Edit
                        </button>
                      </div>
                    )}
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
