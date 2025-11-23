
// Import Statements

import React from "react";
import ProductCart from "./ProductCart";
import { useAppContext } from "../context/AppContext";

// Best Seller Component
const BestSeller = () => {
  // Get Products from Context
  const { products } = useAppContext();

  // UI Rendering
  return (
    <div className="mt-10">
      {/* Section Title */}
      <p className="text-2xl md:text-3xl font-medium">Best Sellers</p>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6">
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product, index) => (
            <ProductCart key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default BestSeller;
