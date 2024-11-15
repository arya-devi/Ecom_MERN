import React from 'react';
import {  useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const AboutUs = () => {
  const navigate = useNavigate()
  function goHome(){
    navigate('/')
  }
  return (
    <div>
            <Navbar/>

        <div className="container my-5">
      <div className="text-center">
        <h1 className="display-4 mb-4">About Us</h1>
        <p className="lead">
          Welcome to <strong>[Your Company Name]</strong>! We are passionate about providing 
          the best products and services to our customers. Our team works hard to ensure 
          that you have the best experience with us.
        </p>
      </div>

      <div className="row">
        <div className="col-md-6">
          <h2 className="h3">Our Mission</h2>
          <p>
            Our mission is to deliver high-quality products while maintaining excellent 
            customer service. We aim to make a positive impact in the industry and be 
            a trusted name for all our customers.
          </p>
        </div>

        <div className="col-md-6">
          <h2 className="h3">Our Team</h2>
          <p>
            We are a group of dedicated professionals who are committed to excellence. 
            From our customer support to our management, each team member plays a vital 
            role in our success.
          </p>
        </div>
      </div>

      <div className="text-center mt-5">
        <h2 className="h4">Contact Us</h2>
        <p>If you have any questions, feel free to reach out to us at <a href="mailto:contact@yourcompany.com">contact@yourcompany.com</a>.</p>
        <button className="btn btn-primary">Get in Touch</button>
      </div>
      <button onClick={goHome}>Back</button>
    </div>
    </div>
    
  );
}

export default AboutUs;
