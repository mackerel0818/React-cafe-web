import { useQuery } from "@tanstack/react-query";
import React from "react";
import { BsCart4 } from "react-icons/bs";
import { getCarts } from "../api/firebase";
import { useAuthContext } from "./context/AuthContext";

export default function CartStatus() {
  const { uid } = useAuthContext();
  const { data: products } = useQuery(["carts"], () => getCarts(uid));

  return (
    <div className="relative">
      <BsCart4 />
      {products && (
        <p className="w-4 h-4 text-center bg-brand text-white text-xs font-bold rounded-full absolute -top-1 left-3">
          {products.length}
        </p>
      )}
    </div>
  );
}
