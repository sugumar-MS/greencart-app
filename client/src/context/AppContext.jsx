
// Import Statements

import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// Create Context

export const AppContext = createContext();

// App Context Provider
export const AppContextProvider = ({ children }) => {
  // Constants and Navigation
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();

  // State Variables

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});

  // Fetch Seller Status + data stay on after Refresh
  const fetchSeller = async () =>{
    try {
      const { data } = await axios.get('/api/seller/is-auth');
      if(data.success){
        setIsSeller(true)
      }else{
        setIsSeller(false)
      }
    } catch (error) {
       setIsSeller(false)
    }
  }

  // Fetch User Auth Status , User Data and Cart Items + data stay on after Refresh
  const fetchUser = async () =>{
    try {
      const { data } = await axios.get('/api/user/is-auth');
      if(data.success){
        setUser(data.user);
        setCartItems(data.user.cartItems)
      }
    } catch (error) {
      setUser(null)
    }
  }

  // Fetch All Products

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/product/list')
      if(data.success){
        setProducts(data.products)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
       toast.error(error.message)
    }
  };

  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchProducts();
  }, []);

  // Update to Database Cart Items  + data stay on after Refresh
  useEffect(()=>{
    const updateCart = async () => {
      try {
        const { data } = await axios.post('/api/cart/update', {cartItems})
        if(!data.success){
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    if(user){
      updateCart()
    }
  },[cartItems])

  // Add Product to Cart
  const AddToCart = (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    setCartItems(cartData);
    toast.success("Add to Cart");
  };

  // Update Cart Item Quantity

  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
  };

  // Remove Product from Cart

  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }

    setCartItems(cartData);
    toast.success("Remove from Cart");
  };

  // Get Total Cart Item Count

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  // Get Total Cart Amount

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (cartItems[items] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
    }

    return Math.floor(totalAmount * 100) / 100;
  };

  // Provider Value

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    setShowUserLogin,
    products,
    cartItems,
    AddToCart,
    removeFromCart,
    showUserLogin,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartAmount,
    updateCartItem,
    axios,
    fetchProducts,
    setCartItems
  };

  // Return Provider

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom Hook

export const useAppContext = () => {
  return useContext(AppContext);
};
