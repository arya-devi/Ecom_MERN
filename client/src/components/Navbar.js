import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import axiosInstance from "../axiosinstance";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, clearCart, decrement } from "../store/cartSlice";

const CustomNavbar = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const user = localStorage.getItem("token");
  useEffect(() => {
    axiosInstance
      .get("/retrieve_products")
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const viewProduct = (id) => {
    navigate(`/viewProduct/${id}`);
    console.log(`/viewProduct/${id}`);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div>
      <Navbar
        expand="md"
        className="p-4"
        style={{ backgroundColor: "#FFF0D1" }}
      >
        <Container fluid>
          <NavLink
            className="navbar-brand"
            style={{ color: "#795757", fontWeight: "bold" }}
          >
            React
          </NavLink>

          <Navbar.Toggle aria-controls="offcanvasNavbar" />

          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title
                id="offcanvasNavbarLabel"
                style={{ color: "#795757" }}
              >
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {/* Search bar */}
                {user && (
                  <Form className="d-flex ms-auto" onSubmit={handleSubmit}>
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                      onChange={(e) => {
                        console.log(e.target.value);

                        setSearch(e.target.value);
                        const res = product.filter((item) => {
                          return item.name
                            .toLowerCase()
                            .includes(e.target.value.toLowerCase());
                        });
                        console.log(res);

                        setFilteredProduct(res);
                      }}
                    />
                    <Button
                      style={{ fontSize: "0.9rem", backgroundColor: "#795757" }}
                      type="submit"
                    >
                      Search
                    </Button>
                  </Form>
                )}
                {user ? (
                  <NavLink
                    className="nav-link"
                    to="/home"
                    style={{ color: "#795757" }}
                  >
                    Products
                  </NavLink>
                ) : (
                  <NavLink className="nav-link" style={{ color: "#6ddedc" }}>
                    <i class="bi bi-person-circle"></i> Guest Account
                  </NavLink>
                )}

                <NavLink
                  className="nav-link"
                  to="/main"
                  style={{ color: "#795757" }}
                >
                  Home
                </NavLink>
                <NavLink
                  className="nav-link"
                  to="/aboutus"
                  style={{ color: "#795757" }}
                >
                  About
                </NavLink>
                <NavLink
                  className="nav-link"
                  to="/admin"
                  style={{ color: "#795757" }}
                >
                  AdminOnly
                </NavLink>
                {user && (
                  <div className="position-relative">
                    <NavLink className="text-decoration-none">
                      <i
                        onClick={() => setShowCart(!showCart)}
                        className="bi bi-cart-fill"
                        style={{ fontSize: "24px", color: "#795757" }}
                      ></i>
                    </NavLink>
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill  text-white"
                      style={{
                        fontSize: "0.7rem",
                        padding: "0.3em 0.6em",
                        backgroundColor: "#795757",
                      }}
                    >
                      {cartItems.length}
                    </span>
                  </div>
                )}
              </Nav>

              {/* Logout button */}
              {user ? (
                <Button
                  style={{ fontSize: "0.9rem", backgroundColor: "#795757" }}
                  className="ms-3"
                  onClick={handleLogout} // Attach the logout handler here
                >
                  Logout<i className="fas fa-sign-out-alt"></i>
                </Button>
              ) : (
                <Button
                  variant="danger"
                  className="ms-3"
                  onClick={handleLogout} // Attach the logout handler here
                >
                  Login<i className="fas fa-sign-out-alt"></i>
                </Button>
              )}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      {showCart && (
        <div className="position-absolute end-0 p-1" style={{ zIndex: 1000 }}>
          <div
            className="card p-3 shadow-lg"
            style={{ width: "350px", backgroundColor: "#795757" }}
          >
            <h5
              style={{ fontSize: "24px", color: "#FFF0D1" }}
              className="card-title text-center"
            >
              Your Cart
            </h5>

            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="mb-3">
                  <div>
                    <strong style={{ color: "#FFF0D1" }}>
                      {item.name}
                    </strong>
                    <p style={{ color: "#FFF0D1" }}  className=" mb-0">Price: ₹ {item.price}</p>
                  </div>

                  <div className="d-flex align-items-center">
                    <button style={{ color: "#FFF0D1" }}
                      onClick={() => dispatch(removeItem(item))}
                      className="btn btn-outline-danger btn-sm me-2"
                    >
                      <i className="bi bi-trash"></i> {/* Trash icon */}
                    </button>

                    <button style={{ color: "#FFF0D1" }}
                      onClick={() => dispatch(decrement(item))}
                      className="btn btn-outline-dark  btn-sm"
                    >
                      <i className="bi bi-dash-circle"></i>
                    </button>

                    <span style={{ color: "#FFF0D1" }} className="mx-2">{item.quantity}</span>

                    <button style={{ color: "#FFF0D1" }}
                      onClick={() => dispatch(addItem(item))}
                      className="btn btn-outline-dark btn-sm"
                    >
                      <i className="bi bi-plus-circle"></i>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ color: "#FFF0D1" }} className="text-center">Your cart is empty.</div>
            )}

            <hr />

            <div className="d-flex justify-content-between">
              <h6 style={{ color: "#FFF0D1" }}>Total:</h6>
              <h6 style={{ color: "#FFF0D1" }}>
                ₹
                {cartItems.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}
                /-
              </h6>
            </div>

            <p style={{ color: "#FFF0D1" }} className="small mb-3">
              Shipping charges may apply. Taxes calculated at checkout.
            </p>

            <button style={{ backgroundColor: "#FFF0D1" }}
              onClick={() => dispatch(clearCart())}
              className="btn  w-100 mb-2"
            >
              Clear Cart
            </button>

            <button className="btn btn-warning w-100">
              Proceed to Payment
            </button>
          </div>
        </div>
      )}

      {search && (
        <div className="position-relative">
          <div
            id="search-results"
            className="position-absolute right-0 top-0 w-25"
            style={{ zIndex: 1, right: 0 }}
          >
            <div
              id="list-group"
              className="bg-white border border-secondary rounded-3 shadow-lg"
            >
              {filteredProduct.length > 0 ? (
                filteredProduct.map((item) => (
                  <div
                    key={item.id}
                    className="list-group-item d-flex justify-content-between align-items-center border-bottom p-3"
                    style={{ backgroundColor: "#987070" }}
                  >
                    {" "}
                    {/* Light grey background */}
                    <h6
                      className="mb-0 fw-bold"
                      style={{
                        padding: "10px",
                        color:"white",
                      }}
                    >
                      {" "}
                      {/* Bold and dark grey text */}
                      {item.name}
                    </h6>
                    <button
                      style={{
                        color:"white",
                        backgroundColor: "#795757",
                      }}
                      
                      onClick={() => viewProduct(item._id)}
                      size="sm"
                    >
                      View
                    </button>
                  </div>
                ))
              ) : (
                <div style={{
                  color:"#FFFDB5",
                  backgroundColor: "#795757",
                }} className="list-group-item text-center p-3 ">
                  <strong className="fw-bold">
                    No products found
                  </strong>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomNavbar;
