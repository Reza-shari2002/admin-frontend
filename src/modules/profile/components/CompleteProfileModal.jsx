import React from "react";
import useCompleteProfile from "../hooks/useCompleteProfile";

function CompleteProfileModal({ isOpen, onClose }) {
  const { register, handleSubmit, errors, isSubmitting, isValid } =
    useCompleteProfile(onClose);

  if (!isOpen) return null;

  return (
    /* z-[100] تضمین می‌کند مودال و بک‌دراپ آن قطعا بالاتر از هدر و نوبار قرار می‌گیرند */
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-x-hidden overflow-y-auto">
      {/* Backdrop تمام صفحه با افکت تار شدن پس‌زمینه */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* باکس محتوای مودال: در موبایل Bottom Sheet و در تبلت/دسکتاپ کارت مرکزی ریسپانسیو */}
      <div
        className="relative z-10 w-full sm:max-w-md md:max-w-lg bg-white rounded-t-[32px] sm:rounded-3xl p-6 sm:p-8 shadow-2xl transition-all animate-in slide-in-from-bottom duration-300"
        dir="rtl"
      >
        {/* دستگیره بالای مودال ویژه حالت موبایل */}
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-4 sm:hidden" />

        {/* هدر مودال */}
        <div className="mb-6 text-right">
          <h2 className="text-lg sm:text-xl font-black text-gray-900">
            تکمیل اطلاعات حساب کاربری
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
            جهت صدور بلیت و پیگیری‌های بعدی، وارد کردن نام و کد ملی الزامی است.
          </p>
        </div>

        {/* فرم ورودی‌ها */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* فیلد نام و نام خانوادگی */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 text-right">
              نام و نام خانوادگی
            </label>
            <input
              {...register("full_name")}
              type="text"
              disabled={isSubmitting}
              className={`w-full h-12 sm:h-13 px-4 rounded-xl bg-gray-50 border text-sm font-medium transition-all outline-none text-right ${
                errors.full_name
                  ? "border-red-400 focus:border-red-500 bg-red-50/20"
                  : "border-gray-200 focus:border-[#00FFD6] focus:bg-white"
              }`}
            />
            {errors.full_name && (
              <p className="text-[11px] sm:text-xs text-red-500 mt-1.5 font-medium text-right">
                {errors.full_name.message}
              </p>
            )}
          </div>

          {/* فیلد کد ملی */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 text-right">
              کد ملی (۱۰ رقم)
            </label>
            <input
              {...register("national_code")}
              type="tel"
              maxLength={10}
              inputMode="numeric"
              disabled={isSubmitting}
              dir="ltr"
              className={`w-full h-12 sm:h-13 px-4 rounded-xl bg-gray-50 border text-sm font-medium transition-all outline-none text-right tracking-widest ${
                errors.national_code
                  ? "border-red-400 focus:border-red-500 bg-red-50/20"
                  : "border-gray-200 focus:border-[#00FFD6] focus:bg-white"
              }`}
            />
            {errors.national_code && (
              <p className="text-[11px] sm:text-xs text-red-500 mt-1.5 font-medium text-right">
                {errors.national_code.message}
              </p>
            )}
          </div>

          {/* دکمه ثبت اطلاعات */}
          <div className="pt-2 sm:pt-4">
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="w-full h-12 sm:h-13 bg-[#00FFD6] text-gray-900 font-black text-sm sm:text-base rounded-2xl shadow-lg shadow-[#00FFD6]/30 active:scale-[0.98] transition-all flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <span className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                "ثبت و ورود به پنل"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompleteProfileModal;
