import React from "react";

export default function CategoryIcon({ item }) {
  const { category } = item;

  return (
    <div>
      {category === "americano" && (
        <img
          className="w-5 h-5"
          src={
            "https://res.cloudinary.com/dnbf7czsn/image/upload/v1694529562/americano_icon_m8etva.png"
          }
          alt={category}
        ></img>
      )}
      {category === "cafelatte" && (
        <img
          className="w-5 h-5"
          src={
            "https://res.cloudinary.com/dnbf7czsn/image/upload/v1694529562/cafe_latte_icon_ixrwff.png"
          }
          alt={category}
        ></img>
      )}
      {category === "frappuccino" && (
        <img
          className="w-5 h-5"
          src={
            "https://res.cloudinary.com/dnbf7czsn/image/upload/v1694529563/frappuccino_icon_by1eyf.png"
          }
          alt={category}
        ></img>
      )}
      {category === "smoothie" && (
        <img
          className="w-5 h-5"
          src={
            "https://res.cloudinary.com/dnbf7czsn/image/upload/v1694529562/smoothie_icon_cyhfeg.png"
          }
          alt={category}
        ></img>
      )}
      {category === "ade" && (
        <img
          className="w-5 h-5"
          src={
            "https://res.cloudinary.com/dnbf7czsn/image/upload/v1694529562/ade_icon_ygnmop.png"
          }
          alt={category}
        ></img>
      )}
      {category === "coke" && (
        <img
          className="w-5 h-5"
          src={
            "https://res.cloudinary.com/dnbf7czsn/image/upload/v1694529562/coke_icon_ue5e1z.png"
          }
          alt={category}
        ></img>
      )}
    </div>
  );
}
