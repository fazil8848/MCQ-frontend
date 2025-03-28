import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center p-4 md:p-6  z-50 ">
      <div className="flex items-center space-x-2">
        <Link to="/" className="font-semibold text-lg">
          <img src="/tseep PNG 1.png" alt="Logo" />
        </Link>
      </div>

      <div className="relative">
        {isAuthenticated && (
          <div className="flex items-center space-x-4">
            <div
              className="rounded-full border h-16 w-16 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <img
                src="/user.png"
                className="rounded-full h-16 w-16"
                alt="User Avatar"
              />
            </div>

            {isOpen && (
              <div className="absolute right-0 top-18 w-40 bg-white border rounded-lg shadow-lg">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-1 right-2 text-red-500 text-lg cursor-pointer"
                >
                  ✖
                </button>

                <span className="block px-4 py-2 text-gray-700">
                  Hello, {user?.fullName?.split(" ")[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
