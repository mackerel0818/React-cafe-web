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
            품격 있는 커피, 훌륭한 서비스, 그리고 미소 한 잔.
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
