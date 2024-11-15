import React from 'react';

const CartPage = () => {
    
  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1000 }}>
    <div className="card p-3 shadow-lg" style={{ width: '350px' }}>
      <h5 className="card-title text-center">Your Cart</h5>
  
      {/* Product Item */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <strong>Product Name</strong>
          <p className="text-muted mb-0">Price: $10.00</p>
        </div>
  
        <div className="d-flex align-items-center">
          {/* Remove button */}
          <button className="btn btn-outline-danger btn-sm me-2">
            <i className="bi bi-dash-circle"></i>
          </button>
  
          {/* Quantity */}
          <span className="mx-2">1</span>
  
          {/* Add button */}
          <button className="btn btn-outline-success btn-sm">
            <i className="bi bi-plus-circle"></i>
          </button>
        </div>
      </div>
  
      <hr />
  
      {/* Total Price */}
      <div className="d-flex justify-content-between">
        <h6>Total:</h6>
        <h6>$10.00</h6>
      </div>
  
      {/* Important Information */}
      <p className="text-muted small mb-3">
        Shipping charges may apply. Taxes calculated at checkout.
      </p>
  
      {/* Clear Cart Button */}
      <button className="btn btn-danger w-100 mb-2">Clear Cart</button>
  
      {/* Proceed to Payment Button */}
      <button className="btn btn-primary w-100">Proceed to Payment</button>
    </div>
  </div>
  

   
  );
};

export default CartPage;
