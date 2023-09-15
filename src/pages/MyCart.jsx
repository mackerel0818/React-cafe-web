import React, { useState } from "react";
import { useAuthContext } from "../components/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { addToOrders, getCarts } from "../api/firebase";
import CartItem from "../components/CartItem";
import Button from "../components/Button";

export default function MyCart() {
  const { uid, user } = useAuthContext();
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(["carts"], () => getCarts(uid));
  const [success, setSuccess] = useState();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const hasProducts = products && products.length > 0;
  const totalPrice =
    products &&
    products.reduce(
      (prev, current) => prev + parseInt(current.price) * current.quantity,
      0
    );

  const handleOrder = () => {
    const newOrder = {
      userId: uid,
      userName: user.displayName,
      products: products.map((product) => ({
        temp: product.temp,
        title: product.title,
        productId: product.id,
        category: product.category,
        price: product.price,
        quantity: product.quantity,
      })),
      totalPrice,
    };

    addToOrders(newOrder)
      .then(() => {
        setSuccess("주문 완료하였습니다!🙌");
        setTimeout(() => {
          setSuccess(null);
        }, 4000);
      })
      .catch(console.error);
  };

  return (
    <section className="container mx-auto p-4 ">
      <h1 className="text-3xl text-center font-bold mt-6 mb-10">내 장바구니</h1>
      {!hasProducts && (
        <p className="text-center">❌❌장바구니에 상품이 없습니다!❌❌</p>
      )}
      {hasProducts && (
        <>
          <ul>
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} uid={uid} />
              ))}
          </ul>
          <div className="lg:max-w-[700px] mx-auto">
            <p className="text-xl text-right mt-6">총액 : ₩{totalPrice}</p>
            <div className="flex flex-col text-center mt-6">
              {success && <p className="mb-2">{success}</p>}
              <Button text={"주문하기"} onClick={handleOrder} />
            </div>
          </div>
        </>
      )}
    </section>
  );
}
