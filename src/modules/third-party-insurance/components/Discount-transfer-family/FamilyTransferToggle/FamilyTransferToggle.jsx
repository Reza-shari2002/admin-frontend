import React from "react";

const FamilyTransferToggle = ({ value, onChange, label }) => {
  return (
    <div className="bg-white p-5 rounded-[24px] border border-orange-100 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm transition-all duration-300 hover:shadow-md">
      <span className="font-bold text-gray-700 text-[15px] pr-2">{label}</span>

      <div className="flex bg-gray-50 p-1.5 rounded-2xl w-full md:w-48 border border-gray-100">
        {/* گزینه بله */}
        <button
          type="button"
          onClick={() => onChange("1")}
          className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-black transition-all duration-300 ${
            value === "1"
              ? "bg-blue-400 text-black shadow-[0_4px_12px_rgba(0,0,0,0.05)] ring-1 ring-black/5"
              : "text-gray-400 hover:text-gray-500"
          }`}
        >
          بله
        </button>

        {/* گزینه خیر */}
        <button
          type="button"
          onClick={() => onChange("0")}
          className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-black transition-all duration-300 ${
            value === "0"
              ? "bg-blue-400 text-black shadow-[0_4px_12px_rgba(0,0,0,0.05)] ring-1 ring-black/5"
              : "text-gray-400 hover:text-gray-500"
          }`}
        >
          خیر
        </button>
      </div>
    </div>
  );
};

export default FamilyTransferToggle;
