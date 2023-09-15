import React from "react";
import { Link } from "react-router-dom";
import { IoIosCafe } from "react-icons/io";
import { BsPencilSquare, BsReceiptCutoff } from "react-icons/bs";
import User from "./User";
import Button from "./Button";
import { useAuthContext } from "./context/AuthContext";
import CartStatus from "./CartStatus";

export default function Navbar() {
  const { user, login, logout } = useAuthContext();

  return (
    <header className="flex justify-between border-b border-gray-300 p-2">
      <Link to="/" className="flex items-center text-4xl text-brand">
        <IoIosCafe />
        <h1>Cafe</h1>
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        <Link to="/products">MENU</Link>
        {user && (
          <>
            <Link to="/ordered" className="text-2xl">
              <BsReceiptCutoff />
            </Link>
            <Link to="/carts" className="text-2xl">
              <CartStatus />
            </Link>
          </>
        )}
        {user && user.isAdmin && (
          <Link to="/products/new" className="text-2xl">
            <BsPencilSquare />
          </Link>
        )}
        {user && <User user={user} />}
        {!user && <Button text={"Login"} onClick={login} />}
        {user && <Button text={"Logout"} onClick={logout} />}
      </nav>
    </header>
  );
}
