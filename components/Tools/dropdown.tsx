import React, { useState, useRef, useEffect } from "react";
import { Table } from "lucide-react";

interface DropdownProps {
  items: string[];
  onSelect: (item: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ items, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setIsActive(!isActive);
  };

  const handleSelect = (item: string) => {
    onSelect(item);
    setIsOpen(false);
    setIsActive(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
      setIsActive(false);
    }
    if (buttonRef.current && event.target !== buttonRef.current) {
      setIsOpen(false);
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className={`border-rauno text-rauno border p-1 rounded-lg ccc0 transition ease-in-out relative z-2 ${
          isActive ? "bg-gray-200" : ""
        }`}
      >
        <Table size={20} />
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute left-4 top-32 mt-12 border-white border-4 rounded-2xl w-30 z-1"
        >
          <ul className="list-style-none cursor-pointer">
            {items.map((item) => (
              <li
                key={item}
                className="p-2 hover:opacity-70"
                onClick={() => handleSelect(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
