// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import Navbar from "./Navbar";
// import axiosInstance from "../axiosinstance";

// const SingleProductPage = () => {
//   const navigate = useNavigate();
//   const [productData, setProductData] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const isAdmin = localStorage.getItem("isAdmin");
//   const { id } = useParams();
//   console.log(id);

//   useEffect(() => {
//     const token = localStorage.getItem("token"); // Check if token exists
//     if (!token) {
//       // If no token, redirect to login
//       navigate("/login/You are not Authenticated");
//     }
//   }, [navigate]);
//   // Fetch products from the API (replace with your actual API endpoint)
//   useEffect(() => {
//     axiosInstance
//       .get(`/viewProduct/${id}`)
//       .then((response) => {
//         console.log(response.data);

//         setProductData(response.data);
//         //   console.log(productData);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [id]);

//   function editProduct() {
//     navigate(`/editProduct/${id}`);
//   }
//   async function handleDelete() {
//     console.log("delete");
//     const responce = await axiosInstance.delete(`/delete_product/${id}`);
//     setShowModal(false);
//     console.log(responce.data);
//     setTimeout(() => {
//       navigate("/home");
//     }, 1000);
//   }
//   return (
//     <div>
//       <Navbar />
//       <div className="container mt-5">
//         <h1
//           style={{
//             color: "#795757",
//           }}
//           className="text-center mb-4 "
//         >
//           Product Details
//         </h1>
//         <div className="row justify-content-center p-5">
//           <div className="col-md-6 mb-4">
//             <div className="card h-100 shadow-lg border-0">
//               <div
//                 style={{
//                   backgroundColor: "#795757",
//                 }}
//                 className="card-body p-5"
//               >
//                 <h5
//                   style={{
//                     color: "#FFF0D1",
//                   }}
//                   className="card-title font-weight-bold"
//                 >
//                   {productData.name}
//                 </h5>
//                 <hr />
//                 <p
//                   style={{
//                     color: "#FFF0D1",
//                   }}
//                   className="card-text"
//                 >
//                   <strong>ID:</strong> {productData.no}
//                 </p>
//                 <p
//                   style={{
//                     color: "#FFF0D1",
//                   }}
//                   className="card-text"
//                 >
//                   <strong>Description:</strong> {productData.description}
//                 </p>
//                 <p
//                   style={{
//                     color: "#FFF0D1",
//                   }}
//                   className="card-text"
//                 >
//                   <strong>Price:</strong> ₹ {productData.price}
//                 </p>
//               </div>

//               <div
//                 style={{
//                   backgroundColor: "#FFF0D1",
//                 }}
//                 className="card-footer text-center d-flex justify-content-around p-4"
//               >
//                 {isAdmin === "true" && (
//                   <button
//                     style={{
//                       backgroundColor: "#795757",
//                     }}
//                     onClick={editProduct}
//                     className="btn btn-success btn-sm w-25"
//                   >
//                     Edit
//                   </button>
//                 )}
//               {isAdmin === "true" && (
//                 <button
//                 style={{
//                   backgroundColor: "#795757",
//                 }}
//                 onClick={() => setShowModal(true)}
//                 className="btn btn-danger btn-sm w-25"
//               >
//                 Delete
//               </button>
//               )}
                
//               </div>
//             </div>
//           </div>
//         </div>
//         <h3 className="text-center">
//           <Link
//             to="/home"
//             className="btn btn-sm w-15 rounded-pill"
//             style={{ backgroundColor: "#795757", color: "white" }}
//           >
//             Back
//           </Link>
//         </h3>

//         {showModal && (
//           <div
//             className="modal fade show"
//             style={{ display: "block" }}
//             tabIndex="-1"
//             role="dialog"
//           >
//             <div className="modal-dialog modal-dialog-centered" role="document">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">Confirm Deletion</h5>
//                   <button
//                     type="button"
//                     className="close"
//                     onClick={() => setShowModal(false)}
//                   >
//                     <span aria-hidden="true">&times;</span>
//                   </button>
//                 </div>
//                 <div className="modal-body">
//                   Are you sure you want to delete this entry?
//                 </div>
//                 <div className="modal-footer">
//                   <button
//                     type="button"
//                     className="btn btn-secondary"
//                     onClick={() => setShowModal(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={() => handleDelete()}
//                     type="button"
//                     className="btn btn-danger"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SingleProductPage;
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axiosInstance from "../axiosinstance";

const SingleProductPage = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const isAdmin = localStorage.getItem("isAdmin");
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login/You are not Authenticated");
    }
  }, [navigate]);

  useEffect(() => {
    axiosInstance
      .get(`/viewProduct/${id}`)
      .then((response) => {
        setProductData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const editProduct = () => {
    navigate(`/editProduct/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/delete_product/${id}`);
      setShowModal(false);
      navigate("/home");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center mb-5" style={{ color: "#5a4e4e", fontFamily: "'Lora', serif", fontSize: "3rem" }}>
          Product Details
        </h1>
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8 d-flex justify-content-between align-items-center">
            <div className="product-image col-md-5">
              <img
                src={productData.image || "/default-image.jpg"}
                alt={productData.name}
                className="img-fluid rounded-3 shadow-lg"
                style={{
                  maxHeight: "500px",
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="product-details col-md-6">
              <h2 className="text-primary" style={{ fontSize: "2.5rem", fontWeight: "bold", lineHeight: "1.2" }}>
                {productData.name}
              </h2>
              <p className="text-muted" style={{ fontSize: "1.2rem", fontStyle: "italic" }}>
                {productData.description || "No description available."}
              </p>
              <p className="font-weight-bold" style={{ fontSize: "1.5rem", color: "#ff5722" }}>
                ₹{productData.price}
              </p>
              {isAdmin === "true" && (
                <div className="d-flex gap-4 mt-4">
                  <button
                    className="btn btn-success rounded-pill px-5 py-3"
                    style={{
                      fontSize: "1.2rem",
                      transition: "all 0.3s ease-in-out",
                    }}
                    onClick={editProduct}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger rounded-pill px-5 py-3"
                    style={{
                      fontSize: "1.2rem",
                      transition: "all 0.3s ease-in-out",
                    }}
                    onClick={() => setShowModal(true)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="text-center mt-5">
          <Link
            to="/home"
            className="btn btn-outline-dark rounded-pill px-4 py-3 transition-all duration-300 hover:bg-dark hover:text-white"
            style={{
              backgroundColor: "#795757",
              color: "#FFF0D1",
              fontSize: "1.2rem",
            }}
          >
            Back
          </Link>
        </div>

        {showModal && (
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex="-1"
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content rounded-3 shadow-lg">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Deletion</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  Are you sure you want to delete this product?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProductPage;
