"use client";
import React, { useState, useRef, useEffect } from "react";
import ToolButton from "./toolButton";
import { Edit, Table, Upload, LogOut } from "lucide-react";
import ExportCont from "./PopCont/exportCont";
import UploadCont from "./PopCont/uploadCont";
import EditCont from "./PopCont/editCont";
import { useAtom } from "jotai";
import { csvDataAtom, rubricAtom } from "@/app/sharedState";

export default function Tools() {
  const [csvData] = useAtom(csvDataAtom); // Accessing the shared CSV data
  const [, setRubricData] = useAtom(rubricAtom); // Accessing the rubric atom for storing selected rubric data
  const [openedDropdown, setOpenedDropdown] = useState<string | null>(null);
  const [selectedRubric, setSelectedRubric] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown open/close
  const toggleDropDown = () => {
    setOpenedDropdown((prev) => (prev === "rubric" ? null : "rubric"));
  };

  // Handle clicks outside the dropdown to close it
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      !event.composedPath().includes(dropdownRef.current)
    ) {
      setOpenedDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Extracting the rubric keys from the csvData
  const rubricKeys = Object.keys(csvData);

  // Handle rubric item click
  const handleRubricClick = (rubricKey: string) => {
    setSelectedRubric((prev) => (prev === rubricKey ? null : rubricKey));

    // Update the rubricAtom with the selected rubric data
    if (csvData[rubricKey]) {
      setRubricData(csvData[rubricKey]);
    }
  };

  return (
    <div className="flex flex-col gap-1.5 justify-center">
      <div className="mb-4 p-1.5">
        <ToolButton cont={<ExportCont />}>
          <LogOut size={22} />
        </ToolButton>
      </div>
      <div className="h-fit border rounded-2xl p-1.5 flex md:flex-col gap-1.5 justify-center">
        <ToolButton cont={<UploadCont />}>
          <Upload size={20} />
        </ToolButton>
        <ToolButton cont={<EditCont />}>
          <Edit size={20} />
        </ToolButton>
        <button
          onClick={toggleDropDown}
          aria-expanded={openedDropdown === "rubric"}
          aria-controls="dropdown-menu"
          className={`border text-rauno border p-1 rounded-lg transition ease-in-out relative z-10 ${
            openedDropdown === "rubric" ? "bg-rauno text-white" : ""
          }`}
        >
          <Table size={20} />
        </button>
      </div>
      {openedDropdown === "rubric" && (
        <div
          id="dropdown-menu"
          ref={dropdownRef}
          className="absolute left-0 top-full mt-1 bg-black/50 backdrop-blur-md rounded-2xl w-40 z-10 shadow-lg"
        >
          <ul className="list-style-none cursor-pointer text-white">
            {rubricKeys.length > 0 ? (
              rubricKeys.map((key) => (
                <li
                  key={key}
                  className={`p-2 hover:bg-rauno/10 transition-colors duration-200 rounded-lg ${
                    selectedRubric === key ? "bg-rauno/20" : ""
                  }`}
                  onClick={() => {
                    handleRubricClick(key);
                    // Keep the dropdown open when an item is clicked
                  }}
                >
                  {key}
                </li>
              ))
            ) : (
              <li className="p-2">No rubrics available</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
