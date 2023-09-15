import React from "react";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BsFire, BsSnow2 } from "react-icons/bs";
import { addOrUpdateToCarts, removeFromCarts } from "../api/firebase";
import CategoryIcon from "./CategoryIcon";
import { useQueryClient } from "@tanstack/react-query";

const ICON_CLASS =
  "cursor-pointer mx-1 transition-all hover:text-brand hover:scale-105";
const TEXT_CLASS = "text-sm font-medium";

export default function CartItem({
  product,
  product: { title, temp, category, id, quantity, price },
  uid,
}) {
  const queryClient = useQueryClient();

  const refetchCart = () => {
    queryClient.invalidateQueries(["carts"]);
  };

  const handleMinus = () => {
    if (quantity < 2) return;
    addOrUpdateToCarts(uid, { ...product, quantity: quantity - 1 });
    refetchCart();
  };
  const handlePlus = () => {
    addOrUpdateToCarts(uid, { ...product, quantity: quantity + 1 });
    refetchCart();
  };

  const handleDelete = () => {
    removeFromCarts(uid, id);
    refetchCart();
  };

  return (
    <li className="flex justify-between m-4 lg:max-w-[700px] lg:mx-auto items-center border-b-2 border-gray-300 pb-2">
      <p className={`w-1/6 ${TEXT_CLASS}`}>
        {category && <CategoryIcon item={product} />}
      </p>
      <p className={`w-2/6 ${TEXT_CLASS}`}>{title}</p>
      <p className={`w-1/6 ${TEXT_CLASS}`}>
        {temp && temp === "ice" && <BsSnow2 />}
        {temp && temp === "hot" && <BsFire />}
      </p>
      <p className={`w-1/6 ${TEXT_CLASS}`}>₩{price}</p>
      <div className={`flex items-center w-1/6 ${TEXT_CLASS}`}>
        <AiOutlineMinusSquare onClick={handleMinus} className={ICON_CLASS} />
        <span className="mx-2">{quantity}</span>
        <AiOutlinePlusSquare onClick={handlePlus} className={ICON_CLASS} />
        <RiDeleteBin5Fill onClick={handleDelete} className={ICON_CLASS} />
      </div>
    </li>
  );
}
