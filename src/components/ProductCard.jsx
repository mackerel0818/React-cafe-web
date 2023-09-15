import React from "react";
import Button from "./Button";
import { useAuthContext } from "./context/AuthContext";
import { addOrUpdateToCarts } from "../api/firebase";
import { useQueryClient } from "@tanstack/react-query";

export default function ProductCard({
  product: { title, id, category, price, temp },
}) {
  const { user, uid } = useAuthContext();

  const queryClient = useQueryClient();

  const refetchCart = () => {
    queryClient.invalidateQueries(["carts"]);
  };

  const handleClick = () => {
    const product = { id, title, temp, price, category, quantity: 1 };
    addOrUpdateToCarts(uid, product);
    refetchCart();
  };

  return (
    <li className="bg-white w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 rounded-lg shadow-lg p-4 m-2 flex flex-col items-center flex-grow transition-all hover:scale-105">
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{category}</p>
      <p className="text-brand font-bold text-lg mt-2">{`₩${price}`}</p>
      <p className="text-gray-400 my-2">{temp}</p>
      {user && <Button text={"장바구니에 넣기"} onClick={handleClick} />}
    </li>
  );
}
