import React from "react";
import Banner from "../components/Banner";
import Products from "../components/Products";

export default function Home() {
  return (
    <div>
      <Banner />
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto">
          <h1 className="text-3xl text-center font-bold mb-4">
            카페에 오신 것을 환영합니다!
          </h1>
          <p className="text-center text-gray-600 mb-8">
            매일 당신을 위한 특별한 커피 경험을 제공합니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div>
          <Products />
        </div>
      </div>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 The Cafe.</p>
        </div>
      </footer>
    </div>
  );
}
