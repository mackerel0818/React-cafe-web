import * as React from "react";
import { getProducts } from "../api/firebase";
import { useState } from "react";
import { useEffect } from "react";
import { BsSnow2, BsFire } from "react-icons/bs";
import Button from "./Button";
import CategoryIcon from "./CategoryIcon";
import { useQuery } from "@tanstack/react-query";

const headers = [
  {
    text: "NO",
    value: "index",
  },
  {
    text: "",
    value: "temp",
  },
  {
    text: "상품명",
    value: "title",
  },
  {
    text: "",
    value: "category",
  },
  {
    text: "작성자",
    value: "writer",
  },
  {
    text: "작성일",
    value: "date",
  },
  {
    text: "",
    value: "update",
  },
  {
    text: "",
    value: "delete",
  },
];

export default function UploadedList({ onUpdate, onDelete, refetch }) {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(["products"], getProducts);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchFilter, setSearchFilter] = useState("title");
  const [items, setItems] = useState([]);

  const filteredItems = items.filter((item) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    const filterKey = searchFilter.toLowerCase();

    if (filterKey === "title") {
      return item.title.toLowerCase().includes(searchTermLowerCase);
    } else if (filterKey === "writer") {
      return item.writer.toLowerCase().includes(searchTermLowerCase);
    } else if (filterKey === "date") {
      return item.date.toLowerCase().includes(searchTermLowerCase);
    }

    return true;
  });

  const handleDelete = (item) => {
    onDelete(item);
    refetch();
  };
  const handleUpdate = (item) => {
    onUpdate(item);
    refetch();
  };

  useEffect(() => {
    if (!isLoading && !error && products) {
      setItems(products);
    }
  }, [isLoading, error, products]);

  if (!headers || !headers.length) {
    throw new Error("headers is required");
  }

  const headerKey = headers.map((header) => header.value);
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="flex my-2 mx-8">
        <select
          id="searchFilter"
          className="border-2 border-gray-300 p-1 mr-2"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        >
          <option value="title">상품명</option>
          <option value="writer">작성자</option>
          <option value="date">작성일</option>
        </select>
        <input
          type="text"
          id="search"
          className="border-2 border-gray-300 p-1 mr-2"
          placeholder="검색어를 입력하세요..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button text={"검색"} />
      </div>
      <table className="min-w-full bg-white border divide-y divide-gray-200 mt-4">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header) => (
              <th
                key={header.text}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header.text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredItems.map((item, index) => (
            <tr key={index}>
              {headerKey.map((key) => (
                <td key={key + index} className="px-6 py-4 whitespace-nowrap">
                  {key === "index" && index}
                  {key !== "temp" && key !== "category" && item[key]}
                  {key === "temp" && item[key] === "ice" && <BsSnow2 />}
                  {key === "temp" && item[key] === "hot" && <BsFire />}
                  {key === "category" && <CategoryIcon item={item} />}
                  {key === "update" && (
                    <Button text={"수정"} onClick={() => handleUpdate(item)} />
                  )}
                  {key === "delete" && (
                    <Button text={"삭제"} onClick={() => handleDelete(item)} />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
