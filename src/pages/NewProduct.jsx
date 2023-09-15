import React, { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import Button from "../components/Button";
import { addNewProduct, deleteProduct, updateProduct } from "../api/firebase";
import UploadedList from "../components/UploadedList";
import Label from "../components/Label";
import { useQueryClient } from "@tanstack/react-query";

const CATEGORY_LIST = [
  {
    id: 0,
    data: "americano",
    text: "아메리카노",
    url: "https://res.cloudinary.com/dnbf7czsn/image/upload/v1694506773/americano_kpyaxg.png",
  },
  {
    id: 1,
    data: "cafelatte",
    text: "카페라떼",
    url: "https://res.cloudinary.com/dnbf7czsn/image/upload/v1694506773/cafe_latte_soshi2.png",
  },
  {
    id: 2,
    data: "ade",
    text: "에이드",
    url: "https://res.cloudinary.com/dnbf7czsn/image/upload/v1694506773/ade_uhd9qu.png",
  },
  {
    id: 3,
    data: "smoothie",
    text: "스무디",
    url: "https://res.cloudinary.com/dnbf7czsn/image/upload/v1694506773/smoothie_m7ihvg.png",
  },
  {
    id: 4,
    data: "frappuccino",
    text: "프라푸치노",
    url: "https://res.cloudinary.com/dnbf7czsn/image/upload/v1694506773/frappuccino_g8msiw.png",
  },
  {
    id: 5,
    data: "coke",
    text: "콜라",
    url: "https://res.cloudinary.com/dnbf7czsn/image/upload/v1694506773/coke_hces2i.png",
  },
];

export default function NewProduct() {
  const [product, setProduct] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();
  const [isFormVisible, setIsFormVisible] = useState(true);
  const queryClient = useQueryClient();

  const refetchProductList = () => {
    queryClient.invalidateQueries(["products"]);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((product) => ({ ...product, [name]: value }));
  };

  const handleReset = () => {
    setProduct({});
  };

  const handleUpdate = (product) => {
    setProduct(product);
    const { temp } = product;
    if (temp === "ice") {
      document.getElementById("ice").checked = true;
    } else if (temp === "hot") {
      document.getElementById("hot").checked = true;
    }
  };

  const handleDelete = (product) => {
    if (product.id) {
      deleteProduct(product.id)
        .then(() => {
          setSuccess("상품이 성공적으로 삭제되었습니다!");
          setTimeout(() => {
            setSuccess(null);
          }, 4000);
          setProduct({});
        })
        .catch(console.error);
    } else {
      console.error("삭제할 상품의 ID가 없습니다.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);

    if (product.id) {
      updateProduct(product.id, product)
        .then(() => {
          setSuccess("상품이 성공적으로 수정되었습니다!");
          setIsFormVisible(!isFormVisible);
          setTimeout(() => {
            setSuccess(null);
          }, 4000);
        })
        .finally(() => setIsUploading(false));
    } else {
      addNewProduct(product) //
        .then(() => {
          refetchProductList();
          setSuccess("성공적으로 제품이 추가되었습니다!");
          setIsFormVisible(!isFormVisible);
          setTimeout(() => {
            setSuccess(null);
          }, 4000);
        })
        .finally(() => setIsUploading(false));
    }
  };

  return (
    <section>
      <h2 className="text-3xl text-center font-bold my-6">상품 등록</h2>
      {success && <p>✅ {success}</p>}
      <div className="flex justify-center">
        <button className="text-3xl" onClick={toggleFormVisibility}>
          {isFormVisible ? <MdExpandLess /> : <MdExpandMore />}
        </button>
      </div>
      {isFormVisible && (
        <form
          className={
            "flex flex-col lg:max-w-screen-xl gap-3 border-2 border-gray-300 p-6 my-4 mx-8 lg:mx-auto"
          }
          onSubmit={handleSubmit}
        >
          <div className="flex">
            <Label option={"title"} text={"상품명"} />
            <input
              className="border-2 border-gray-300 p-1"
              id="title"
              name="title"
              type="text"
              value={product.title ?? ""}
              placeholder="상품명을 입력해주세요"
              required
              onChange={handleChange}
            />
          </div>
          <Label option={"category"} text={"카테고리"} />
          <ul className="flex gap-6" id="category">
            {CATEGORY_LIST.map((item) => (
              <label for={item.id}>
                <li>
                  <img
                    id={item.id}
                    name="url"
                    src={item.url}
                    alt={item.data}
                    value={item.url}
                    onChange={handleChange}
                  />
                </li>
                {item.text}
                <input
                  className="ml-2"
                  type="radio"
                  name="category"
                  id={item.data}
                  value={item.data}
                  checked={product.category === item.data}
                  onChange={handleChange}
                />
              </label>
            ))}
          </ul>
          <div className="flex mt-1 gap-2 justify-between flex-col md:flex-row">
            <Label option={"price"} text={"가격"} />
            <input
              className="border-2 border-gray-300 p-1"
              id="price"
              name="price"
              type="number"
              value={product.price ?? ""}
              placeholder="가격을 입력해주세요"
              required
              onChange={handleChange}
            />
            <Label option={"writer"} text={"작성자"} />
            <input
              className="border-2 border-gray-300 p-1"
              id="writer"
              name="writer"
              type="text"
              value={product.writer ?? ""}
              placeholder="작성자를 입력해주세요"
              required
              onChange={handleChange}
            />

            <Label option={"ice"} text={"아이스"} />
            <input
              id="ice"
              name="temp"
              type="radio"
              value="ice"
              onChange={handleChange}
            />
            <Label option={"hot"} text={"핫"} />
            <input
              id="hot"
              name="temp"
              type="radio"
              value="hot"
              onChange={handleChange}
            />
          </div>

          <Label option={"desc"} text={"상세설명"} />
          <input
            className="w-full h-16 border-2 border-gray-300 p-1"
            id="desc"
            name="desc"
            type="text"
            value={product.desc ?? ""}
            onChange={handleChange}
          />
          <div className="flex justify-end gap-2">
            <Button
              text={isUploading ? "등록 중..." : "등록"}
              disabled={isUploading}
            />
            <Button type={"reset"} text={"취소"} onClick={handleReset} />
          </div>
        </form>
      )}

      <UploadedList
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        refetch={refetchProductList}
      />
    </section>
  );
}
