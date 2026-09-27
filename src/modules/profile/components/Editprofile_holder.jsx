import React from "react";
import { User, CreditCard, Loader2 } from "lucide-react";
import useEditprofile from "../hooks/useEditprofile";
import LoadingScreen  from "../../../components/common/LoadingScreen"
function Editprofile_holder() {
  const {
    register,
    handleSubmit,
    errors,
    isDirty,
    isValid,
    isPageLoading,
    isSubmitting,
    handleCancel,
  } = useEditprofile();

  if (isPageLoading) {
    return (
<LoadingScreen></LoadingScreen>
    );
  }

  return (
    <div className="px-5 py-6">
      {/* کارت فرم */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h1 className="text-lg font-bold text-center text-gray-800 mb-6">
          ویرایش پروفایل
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* نام و نام خانوادگی */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-600 pr-1">
              نام و نام خانوادگی
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="نام و نام خانوادگی"
                {...register("full_name")}
                className={`w-full h-12 bg-white text-gray-800 text-sm font-medium rounded-2xl pr-11 pl-4 border transition-all duration-200 outline-none ${
                  errors.full_name
                    ? "border-red-400 focus:border-red-500 bg-red-50/20"
                    : "border-gray-200 focus:border-[#8B9EFF] focus:ring-2 focus:ring-[#8B9EFF]/20"
                }`}
              />
              <div className="absolute right-3.5 pointer-events-none text-gray-400">
                <User size={18} />
              </div>
            </div>
            {errors.full_name && (
              <span className="text-xs text-red-500 pr-1">
                {errors.full_name.message}
              </span>
            )}
          </div>

          {/* کد ملی */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-600 pr-1">
              کد ملی
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                maxLength={10}
                placeholder="کد ملی ۱۰ رقمی"
                {...register("national_code")}
                className={`w-full h-12 bg-white text-gray-800 text-sm font-medium rounded-2xl pr-11 pl-4 border transition-all duration-200 outline-none tracking-wider ${
                  errors.national_code
                    ? "border-red-400 focus:border-red-500 bg-red-50/20"
                    : "border-gray-200 focus:border-[#8B9EFF] focus:ring-2 focus:ring-[#8B9EFF]/20"
                }`}
              />
              <div className="absolute right-3.5 pointer-events-none text-gray-400">
                <CreditCard size={18} />
              </div>
            </div>
            {errors.national_code && (
              <span className="text-xs text-red-500 pr-1">
                {errors.national_code.message}
              </span>
            )}
          </div>

          {/* اکشن‌ها */}
          <div className="pt-4 space-y-2.5">
            {/* دکمه با رنگ #8B9EFF و فعال‌سازی با تاچ/تغییر فرم */}
            <button
              type="submit"
              disabled={!isDirty || !isValid || isSubmitting}
              className={`w-full h-12 rounded-2xl font-bold text-sm text-white flex items-center justify-center transition-all duration-200 shadow-md ${
                !isDirty || !isValid || isSubmitting
                  ? "bg-gray-300 cursor-not-allowed shadow-none"
                  : "bg-[#8B9EFF] hover:bg-[#7a8fe8] active:scale-[0.99] shadow-[#8B9EFF]/30"
              }`}
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "ثبت اطلاعات"
              )}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="w-full h-12 rounded-2xl font-bold text-sm text-gray-500 bg-gray-50 hover:bg-gray-100 active:scale-[0.99] transition-all duration-200"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Editprofile_holder;
