import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { UpdateOrderStatus, getOrders } from "../api/firebase";
import { useAuthContext } from "../components/context/AuthContext";
import { BsFire, BsSnow2 } from "react-icons/bs";
import CategoryIcon from "../components/CategoryIcon";
import Button from "../components/Button";

const TEXT_CLASS = "text-sm font-medium";

export default function MyOrder() {
  const { isLoading, error, data: orders } = useQuery(["orders"], getOrders);
  const { uid } = useAuthContext();

  const queryClient = useQueryClient();

  const refetchOrder = () => {
    queryClient.invalidateQueries(["orders"]);
  };

  const hasOrders = orders && orders.length > 0;
  const myOrders = hasOrders && orders.filter((order) => order.userId === uid);
  const [success, setSuccess] = useState();

  const handlePaid = (order) => {
    UpdateOrderStatus(order.orderId, "paid").then(() => {
      setSuccess("음료가 나올 때까지 잠시만 기다려주세요~☕☕");
      setInterval(() => {
        setSuccess(null);
      }, 4000);
    });
    refetchOrder();
  };

  const handleCancel = (order) => {
    UpdateOrderStatus(order.orderId, "cancelled").then(() => {
      setSuccess("❌❌주문이 취소되었습니다!❌❌");
      setInterval(() => {
        setSuccess(null);
      }, 6000);
    });
    refetchOrder();
  };

  return (
    <section>
      <h1 className="text-3xl text-center font-bold mt-6 mb-10">주문 내역</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!hasOrders && (
        <p className="text-center">❌❌주문 내역이 없습니다!❌❌</p>
      )}
      {success && <p className="text-center mb-4">{success}</p>}
      <ul>
        {myOrders &&
          myOrders.map((order, index) => (
            <li
              key={index}
              className={`${TEXT_CLASS} mb-6 p-8 border-2 border-gray-300 rounded mx-4`}
            >
              <div className="mb-4">
                <p className="font-bold">주문 번호: {order.id}</p>
                <div className="flex justify-between">
                  <p>주문자: {order.userName}</p>
                  <p className="text-gray-500">주문 일자: {order.date}</p>
                </div>
              </div>
              <div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-400">
                      <th className="text-left py-2">상품</th>
                      <th className="text-left py-2">카테고리</th>
                      <th className="text-left py-2"></th>
                      <th className="text-left py-2">가격</th>
                      <th className="text-left py-2">수량</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((product, productIndex) => (
                      <tr
                        key={productIndex}
                        className="border-b border-gray-300"
                      >
                        <td className="py-2">{product.title}</td>
                        <td className="py-2">
                          {product.category && <CategoryIcon item={product} />}
                        </td>
                        <td className="py-2">
                          {product.temp && product.temp === "ice" && (
                            <BsSnow2 />
                          )}
                          {product.temp && product.temp === "hot" && <BsFire />}
                        </td>

                        <td className="py-2">₩{product.price}</td>
                        <td className="py-2">{product.quantity}잔</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="font-bold mt-2 text-right">
                합계: ₩{order.totalPrice}
              </p>
              {order.state === "order" && (
                <div className="flex justify-end gap-2 mt-2">
                  <Button text={"결제완료"} onClick={() => handlePaid(order)} />
                  <Button
                    text={"주문취소"}
                    onClick={() => handleCancel(order)}
                  />
                </div>
              )}
              {order.state === "cancelled" && (
                <p className="text-center font-bold text-red-500">
                  취소된 주문입니다.
                </p>
              )}
              {order.state === "paid" && (
                <p className="text-center font-bold text-brand">
                  결제된 주문입니다.
                </p>
              )}
            </li>
          ))}
      </ul>
    </section>
  );
}
