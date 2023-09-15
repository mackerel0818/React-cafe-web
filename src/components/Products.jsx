import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getProducts } from "../api/firebase";
import ProductCard from "./ProductCard";
import { useAuthContext } from "./context/AuthContext";

export default function Products() {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(["products"], getProducts);

  const { user } = useAuthContext();

  return (
    <div>
      {!user && (
        <p className="text-center text-lg font-semibold my-4">
          ⚠️⚠️로그인 후 주문 가능합니다!⚠️⚠️
        </p>
      )}
      <div className="flex flex-wrap">
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
}
