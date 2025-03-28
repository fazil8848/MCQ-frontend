import React, { useState } from "react";
import Header from "../../components/Layout/Header";
import Button from "../../components/UI/Button";
import Checkbox from "../../components/UI/Checkbox";
import { useNavigate } from "react-router-dom";

function OnBoardingPage() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate("/login/");
  };
  return (
    <>
      <Header />
      <main className="flex-1 mt-8 md:mt-30 flex flex-col items-center justify-center px-4 md:px-6">
        <div className="w-full max-w-6xl mx-auto">
          <div className="w-full font-outfit font-light relative md:h-[40vh] flex flex-col items-center text-center mb-8">
            <span className="w-full relative text-neutral-700 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4">
              Welcome{" "}
              <span className="relative whitespace-nowrap inline-block">
                <span className="relative z-10">to TSEEP Mastery B</span>
                <span className="hidden md:block absolute z-[1] bg-[#FAC167] h-4 bottom-[-0.5rem] left-0 right-0"></span>
              </span>
              ox
            </span>
            <span className="text-lg sm:text-xl md:text-2xl text-gray-600">
              Unlock your potential with{" "}
              <span className="font-semibold">AI inspired tool</span>
            </span>
          </div>

          <div className="flex justify-center mb-8 md:mb-16">
            <div className="mt-6 md:mt-10 flex flex-col sm:flex-row justify-between w-full sm:w-[90%] md:w-[80%] lg:w-[70%] border-t border-gray-300 pt-5 items-center gap-4 sm:gap-0">
              <div className="flex items-start space-x-2 mb-4 sm:mb-0 w-full sm:max-w-lg">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted(!termsAccepted)}
                  className="mt-1"
                />
                <label
                  htmlFor="terms"
                  className="text-xs sm:text-sm text-gray-700 cursor-pointer"
                >
                  I confirm that I have read and accept the terms and conditions
                  and privacy policy.
                </label>
              </div>

              <button
                disabled={!termsAccepted}
                onClick={handleGetStarted}
                className="w-full sm:w-auto bg-[#2A586F] hover:bg-teal-800 text-white px-6 py-2 sm:px-8 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default OnBoardingPage;
