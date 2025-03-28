import { forwardRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const Input = forwardRef(({ label, error, className = "", ...props }, ref) => {
  return (
    <div className="w-full mb-4">
      {label && (
        <label className="block text-gray-700 font-medium mb-2">{label}</label>
      )}
      <input
        ref={ref}
        className={`
            w-full px-4 py-3 border-2 border-gray-300 rounded
            focus:outline-none focus:ring-2 focus:ring-[#2A586F] focus:border-transparent
            placeholder-gray-400
            ${error ? "border-red-500" : ""}
            ${className}
          `}
        {...props}
      />
      {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";

const Radio = forwardRef(
  ({ label, checked, onChange, className = "", ...props }, ref) => {
    return (
      <div
        className={`flex items-center p-4 rounded-md mb-2 cursor-pointer transition-colors ${
          checked ? "bg-[#f4ffda]" : "bg-white hover:bg-lime-50"
        } ${className}`}
        onClick={onChange}
      >
        <div className="relative flex items-center">
          <input
            ref={ref}
            type="radio"
            checked={checked}
            onChange={onChange}
            className="appearance-none h-5 w-5 border border-gray-300 rounded-full checked:border-[#2A586F] checked:border-2 focus:outline-none focus:ring-2 focus:ring-[#2A586F] focus:ring-opacity-25 transition-colors duration-200 cursor-pointer"
            {...props}
          />
          <div
            className={`absolute left-[5px] top-[5px] h-2.5 w-2.5 rounded-full bg-[#2A586F] transition-opacity duration-200 ${
              checked ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
        <label className="ml-3 text-gray-700 cursor-pointer">{label}</label>
      </div>
    );
  }
);

Radio.displayName = "Radio";
const PhoneInput = ({
  value,
  onChange,
  placeholder = "Enter your phone number",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const countryCodes = ["+91", "+1", "+44", "+61", "+86"];
  const [selectedCode, setSelectedCode] = useState("+91");

  const handleCountryChange = (code) => {
    setSelectedCode(code);
    setIsOpen(false);
  };

  const handlePhoneNumberChange = (e) => {
    const phoneNumber = e.target.value.replace(/\D/g, "");
    onChange(`${selectedCode}${phoneNumber}`);
  };

  return (
    <div className="w-full flex gap-2">
      <div className="relative w-[30%] min-w-[100px]">
        <button
          type="button"
          className="flex items-center justify-between w-full px-3 py-3 border-2 border-gray-300 rounded bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2A586F]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedCode}</span>
          <ChevronDown className="ml-1 h-4 w-4" />
        </button>
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            {countryCodes.map((code) => (
              <button
                key={code}
                type="button"
                className="w-full px-3 py-2 text-left hover:bg-gray-100"
                onClick={() => handleCountryChange(code)}
              >
                {code}
              </button>
            ))}
          </div>
        )}
      </div>
      <input
        type="tel"
        name="phoneNumber"
        value={value.replace(selectedCode, "")}
        onChange={handlePhoneNumberChange}
        autoComplete="tel"
        placeholder={placeholder}
        className={`flex-1 w-[70%] px-4 py-3 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2A586F] focus:border-transparent ${className}`}
      />
    </div>
  );
};

export { Input, Radio, PhoneInput };
