
// Import Statements
import React from "react";
import { assets, features } from "../assets/assets";

// Bottom Banner Component
const BottomBanner = () => {
  // UI Rendering
  return (
    <div className="relative mt-24">
      {/* Banner Images */}
      <img
        src={assets.bottom_banner_image}
        alt=""
        className="w-full hidden md:block"
      />
      <img
        src={assets.bottom_banner_image_sm}
        alt=""
        className="w-full md:hidden"
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24">
        <div>
          {/* Title */}
          <h1 className="mb-6 text-2xl md:text-3xl font-semibold text-primary">
            Why We Are the Best?
          </h1>

          {/* Features List */}
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4 mt-2">
              {/* Feature Icon */}
              <img src={feature.icon} alt="" className="w-9 md:w-11" />

              {/* Feature Details */}
              <div>
                <h3 className="text-lg md:text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="text-gray-500/70 text-xs md:text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
