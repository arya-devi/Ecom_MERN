import { createSlice } from '@reduxjs/toolkit';

// Function to load cart from localStorage
const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
};

// Function to save cart to localStorage
const saveCartToLocalStorage = (cartItems) => {
  localStorage.setItem('cart', JSON.stringify(cartItems));
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartFromLocalStorage(), // Load cart from localStorage on initialization
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      if (existingItem) {
        // If item exists, increase the quantity
        existingItem.quantity++;
      } else {
        // Otherwise, add new item with quantity
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveCartToLocalStorage(state.items); // Save to localStorage
    },
    decrement: (state, action) => {
      const decreaseQntyItem = state.items.find(item => item.name === action.payload.name);
      if (decreaseQntyItem.quantity === 1) {
        state.items = state.items.filter(item => item.name !== action.payload.name);
      } else {
        decreaseQntyItem.quantity--;
      }
      saveCartToLocalStorage(state.items); // Save to localStorage
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload.name);
      saveCartToLocalStorage(state.items); // Save to localStorage
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state.items); // Save to localStorage
    }
  }
});

export const { addItem, removeItem, clearCart, decrement } = cartSlice.actions;

export default cartSlice.reducer;
