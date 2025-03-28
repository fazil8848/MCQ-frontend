const Checkbox = ({ label, checked, onChange, disabled }) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        className="w-5 h-5 accent-blue-600 cursor-pointer"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      {label && <span className="text-gray-800">{label}</span>}
    </label>
  );
};

export default Checkbox;
