import { createBrowserRouter } from "react-router-dom";
import About from "./components/About";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Product from "./components/Products";
import SingleProduct from "./components/SingleProduct";
import Signup from "./components/Signup";
import App from "./App";
import AddProduct from "./components/AddProduct";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";

const router = createBrowserRouter([
    { path: 'main', element: <App/> },
    { path: '', element: <Signup/> },
    { path: 'login', element: <Login/> },
    { path: 'login/:msg', element: <Login/> },
    { path: 'home', element: <Home/> },
    { path: 'aboutus', element: <About/> },
    { path: 'cart', element: <Cart/> },
    { path: 'product/:id', element: <Product/> },
    { path: 'addProduct', element: <AddProduct/> },
    { path: 'viewProduct/:id', element: <SingleProduct/> },
    { path: 'editProduct/:id', element: <AddProduct/> },
    { path: 'admin', element: <AdminPanel/> }
]);

export default router;