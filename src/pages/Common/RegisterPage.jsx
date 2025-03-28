"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, PhoneInput } from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import Header from "../../components/Layout/Header";
import { register } from "../../services/authService";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "", // Single field for both number & country code
    status: "Student",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Phone number is required";
    }

    const mobileRegex = /^\+\d{1,3}[6-9]\d{9}$/;

    if (!mobileRegex.test(formData.mobileNumber)) {
      newErrors.mobileNumber =
        "Invalid mobile number format (e.g., +919876543210).";
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    const response = await register(formData);

    console.log(response);

    if (response) {
      console.log("Form submitted:", formData);
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center py-6 px-4 sm:py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
              <span className="relative z-10">Register</span>
              <span className="absolute bottom-0 left-0 w-full h-1.5 bg-[#FAC167] z-0"></span>
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your name"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              error={errors.fullName}
            />

            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={errors.email}
            />

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Mobile Number
              </label>
              <PhoneInput
                value={formData.mobileNumber}
                name="mobileNumber"
                onChange={(value) => handleChange("mobileNumber", value)}
              />
              {errors.mobileNumber && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors.mobileNumber}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Current Status
              </label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="Student"
                    checked={formData.status === "Student"}
                    onChange={() => handleChange("status", "Student")}
                    className="h-4 w-4 text-[#2A586F] focus:ring-[#2A586F]"
                  />
                  <span className="ml-2 text-gray-700">Student</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="Employee"
                    checked={formData.status === "Employee"}
                    onChange={() => handleChange("status", "Employee")}
                    className="h-4 w-4 text-[#2A586F] focus:ring-[#2A586F]"
                  />
                  <span className="ml-2 text-gray-700">Employee</span>
                </label>
              </div>
            </div>

            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              error={errors.password}
            />

            <Button type="submit" className="w-full mt-4" size="lg">
              Save
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-[#2A586F] hover:underline font-medium"
              >
                Login Now
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
