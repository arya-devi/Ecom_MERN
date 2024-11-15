import React from "react";

const Sidebar = () => {
  return (
    <div className="bg-dark vh-100 position-fixed p-3" style={{ width: "250px" }}>
      <h4 className="text-white text-center">Admin Panel</h4>
      <hr className="bg-light" />
      <a href="#" className="text-white d-block py-2 px-3">Dashboard</a>
      <a href="#" className="text-white d-block py-2 px-3">Users</a>
      <a href="#" className="text-white d-block py-2 px-3">Orders</a>
      <a href="#" className="text-white d-block py-2 px-3">Products</a>
      <a href="#" className="text-white d-block py-2 px-3">Reports</a>
      <a href="#" className="text-white d-block py-2 px-3">Settings</a>
      <a href="#" className="text-white d-block py-2 px-3">Logout</a>
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <span className="navbar-brand">Admin Dashboard</span>
      </div>
    </nav>
  );
};

const DashboardCards = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-3 col-md-6">
          <div className="card text-white bg-primary mb-3">
            <div className="card-header">Total Users</div>
            <div className="card-body">
              <h5 className="card-title">1,234</h5>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="card text-white bg-success mb-3">
            <div className="card-header">Orders</div>
            <div className="card-body">
              <h5 className="card-title">567</h5>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="card text-white bg-warning mb-3">
            <div className="card-header">Revenue</div>
            <div className="card-body">
              <h5 className="card-title">$12,345</h5>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="card text-white bg-danger mb-3">
            <div className="card-header">Issues</div>
            <div className="card-body">
              <h5 className="card-title">23</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminPanel = () => {
  return (
    <div>
      <Sidebar />
      <div className="content" style={{ marginLeft: "250px" }}>
        <Navbar />
        <DashboardCards />
      </div>
    </div>
  );
};

export default AdminPanel;
