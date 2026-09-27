import React from "react";
import { useNavigate } from "react-router-dom";

function FinalActionButtons({ loading, captchaToken, statusText, onSubmit }) {
  const navigate = useNavigate();

  return (
    <div
      className="fixed bottom-0 left-0 right-0 p-4 pb-6 bg-white/80 backdrop-blur-md border-t border-gray-100 z-[9999] flex justify-center gap-3
      md:static md:bg-transparent md:border-none md:p-0 md:z-auto md:mt-8 md:w-full"
    >
      <div className="flex w-full max-w-md gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          disabled={loading}
          className={`flex-[1] py-4 rounded-2xl font-bold transition-all border 
          ${
            loading
              ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed"
              : "bg-gray-100 text-gray-500 border-gray-200 hover:bg-gray-200"
          }`}
        >
          → بازگشت
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={!captchaToken || loading}
          className={`flex-[2] py-4 rounded-2xl font-bold text-white transition-all shadow-lg flex items-center justify-center gap-2
          ${
            !captchaToken || loading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600 shadow-orange-200"
          }`}
        >
          {loading ? (
            <>
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              <span>{statusText || "در حال ثبت..."}</span>
            </>
          ) : captchaToken ? (
            "ثبت اطلاعات"
          ) : (
            "تایید امنیتی الزامی است"
          )}
        </button>
      </div>
    </div>
  );
}

export default FinalActionButtons;
