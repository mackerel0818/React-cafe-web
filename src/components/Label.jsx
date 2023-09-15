import React from "react";

export default function Label({ option, text }) {
  return (
    <label className="my-1 font-semibold mr-3" for={option}>
      {text}
    </label>
  );
}
