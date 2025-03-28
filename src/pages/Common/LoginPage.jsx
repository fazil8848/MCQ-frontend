"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, PhoneInput } from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import Header from "../../components/Layout/Header";
import { login } from "../../services/authService";
import { toast } from "react-toastify";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ mobileNumber: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (eOrName, value) => {
    if (typeof eOrName === "string") {
      // If first argument is a string, it's a custom value update (PhoneInput)
      setForm((prev) => ({ ...prev, [eOrName]: value }));
    } else {
      // Otherwise, it's a regular input change event
      const e = eOrName;
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mobileRegex = /^\+\d{1,3}[6-9]\d{9}$/;

    if (!form.mobileNumber || !form.password) {
      setError("All fields are required.");
      toast.error("All fields are required.");
      return;
    }

    if (!mobileRegex.test(form.mobileNumber)) {
      setError("Invalid mobile number format.");
      toast.error("Invalid mobile number format.");
      return;
    }

    try {
      const response = await login(form);

      // Check if response has token & user data
      if (response && response?.token) {
        // Redirect based on user status
        if (response.status === "Student") {
          navigate("/student/");
        } else if (response.status === "Employee") {
          navigate("/employee/");
        } else {
          setError("Invalid user status.");
          toast.error("Login failed. Please try again.");
        }
      } else {
        setError("Invalid credentials.");
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("Login failed. Please try again.");
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-8 sm:px-6 md:py-12">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-lg shadow-md mb-6 sm:mb-10">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold relative inline-block">
              <span className="relative text-[#2A586F] z-10">Login</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-[#FAC167] z-0"></span>
            </h1>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Mobile Number
              </label>
              <PhoneInput
                value={form.mobileNumber}
                name="mobileNumber"
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, mobileNumber: value }))
                }
                countryCode={form.countryCode}
                onCountryCodeChange={(code) =>
                  setForm((prev) => ({ ...prev, countryCode: code }))
                }
              />
            </div>

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <p className="text-sm text-gray-600 mt-4 text-center">
            Don't have an account?
            <button
              className="text-blue-600 hover:underline ml-1"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
