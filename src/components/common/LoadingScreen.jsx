import React from "react";

export default function LoadingScreen() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center min-h-[60vh] gap-3">
      <div className="w-10 h-10 border-4 border-gray-100 border-t-[#00FFD6] rounded-full animate-spin"></div>
      <span className="text-xs font-bold text-gray-400">در حال بارگذاری...</span>
    </div>
  );
}
