import React from "react";
import { useNavigate } from "react-router-dom";

function Button_submit({
  disabled = false,
  loading = false,
  showBack = true,
  onBack,
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 p-4 pb-6 bg-white/80 backdrop-blur-md border-t border-gray-100 z-[9999] flex justify-center gap-3
      md:static md:bg-transparent md:border-none md:p-0 md:z-auto md:mt-12 md:w-full"
    >
      <div className="flex w-full max-w-md gap-3">
        {showBack && (
          <button
            type="button"
            onClick={handleBack}
            className="flex-[1] py-4 rounded-2xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all border border-gray-200"
          >
            → بازگشت
          </button>
        )}

        <button
          type="submit"
          disabled={disabled || loading}
          className={`flex-[2] py-4 rounded-2xl font-bold text-white transition-all shadow-lg
          ${
            disabled || loading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600 shadow-orange-200"
          }`}
        >
          {loading ? "در حال بررسی..." : "ادامه ←"}
        </button>
      </div>
    </div>
  );
}

export default Button_submit;
