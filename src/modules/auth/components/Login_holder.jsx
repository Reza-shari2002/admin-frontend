import React from "react";
import { ShieldCheck, Phone, ArrowLeft } from "lucide-react";
import useLogin from "../hooks/useLogin";

function Login_holder() {
  const { register, handleSubmit, errors, isSubmitting } = useLogin();

  return (
    <div
      dir="rtl"
      className="min-h-screen w-full bg-slate-900/5 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] bg-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-vazir select-none"
    >
      {/* کانتینر اصلی کارت لاگین ادمین */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 sm:p-10 flex flex-col items-center">
        
        {/* نشان/آیکون پنل مدیریت */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 mb-6">
          <ShieldCheck size={34} strokeWidth={2.2} />
        </div>

        {/* عنوان و توضیحات */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            پنل ادمین پرند بلیط
          </h1>
          <p className="text-sm font-medium text-gray-500 mt-2">
            ورود به بخش مدیریت و کنترل سامانه
          </p>
        </div>

        {/* فرم ورود */}
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          {/* اینپوت شماره موبایل همراه با لیبل */}
          <div className="w-full space-y-2 text-right">
            <label
              htmlFor="phone_number"
              className="block text-xs font-bold text-gray-700 mr-1"
            >
              شماره موبایل مدیر
            </label>

            <div className="relative">
              <input
                id="phone_number"
                type="tel"
                dir="ltr"
                maxLength={11}
                placeholder="09123456789"
                disabled={isSubmitting}
                {...register("phone_number")}
                className={`w-full h-12 sm:h-13 px-4 pl-11 text-center font-bold text-gray-800 rounded-xl outline-none transition-all border ${
                  errors.phone_number
                    ? "border-red-400 bg-red-50/30 focus:ring-4 focus:ring-red-100 text-red-600"
                    : "border-gray-200 bg-gray-50/50 hover:bg-white focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                }`}
              />

              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Phone size={18} />
              </div>
            </div>

            {/* نمایش خطا */}
            {errors.phone_number && (
              <p className="text-xs text-red-500 font-medium pt-1 mr-1">
                {errors.phone_number.message}
              </p>
            )}
          </div>

          {/* دکمه ارسال و ورود */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 sm:h-13 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-blue-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>در حال بررسی و ارسال کد...</span>
              </div>
            ) : (
              <>
                <span>ورود به پنل</span>
                <ArrowLeft size={18} />
              </>
            )}
          </button>
        </form>

        {/* فوتر کوچک کارت */}
        <div className="mt-8 pt-6 border-t border-gray-100 w-full text-center">
          <p className="text-xs text-gray-400 font-medium">
            سامانه رزرواسیون و صدور بلیط رویدادها
          </p>
        </div>

      </div>
    </div>
  );
}

export default Login_holder;
