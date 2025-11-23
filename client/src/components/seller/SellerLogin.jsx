// Import Statements
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

// Seller Login Component
const SellerLogin = () => {
  // Context and State
  const { isSeller, setIsSeller, navigate, axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Form Submit Handler
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("/api/seller/login", {
        email,
        password,
      });
      if (data.success) {
        // toast.success(data.message)
        setIsSeller(true);
        navigate("/seller");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Redirect After Login
  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);

  // UI Rendering
  return (
    !isSeller && (
      <div>
        <form
          onSubmit={onSubmitHandler}
          className="min-h-screen flex items-center text-sm text-gray-600"
        >
          <div className="flex flex-col gap-5 m-auto items-start border border-gray-200 rounded-lg shadow-xl p-8 py-12 min-w-80 sm:min-w-88">
            <p className="text-2xl font-medium m-auto">
              <span className="text-primary">Seller</span> Login
            </p>

            {/* Email Input */}
            <div className="w-full">
              <p>Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter your Email"
                className="border border-gray-200 outline-primary p-2 mt-1 w-full"
                required
              />
            </div>

            {/* Password Input */}
            <div className="w-full">
              <p>Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Enter your Password"
                className="border border-gray-200 outline-primary p-2 mt-1 w-full"
                required
              />
            </div>

            {/* Submit Button */}
            <button className="w-full bg-primary py-2 text-white rounded-md cursor-pointer hover:bg-primary-dull">
              Login
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default SellerLogin;
