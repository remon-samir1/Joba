import { Icon } from "@iconify-icon/react";
import { useState } from "react";

const CustomSelect = ({ options, label, iconName, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(label);

  const handleSelect = (option) => {
    setSelected(option.label);
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-36">
      <button
        className="bg-white px-8 py-3 rounded text-text2 w-full text-center flex items-center justify-center shadow"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-center gap-2">
          <Icon icon={iconName} className="text-text2" width="20" height="20" />
          <span>{selected}</span>
        </div>
        {/* <Icon icon="iconamoon:arrow-down-2-bold" width="18" height="18" /> */}
      </button>

      {isOpen && (
        <ul className="absolute left-0 top-full w-full bg-white mt-1 rounded shadow z-10">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4 whitespace-nowrap py-2 border-b text-center hover:bg-main hover:text-white cursor-pointer transition"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
