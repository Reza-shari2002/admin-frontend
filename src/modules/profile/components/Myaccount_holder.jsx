import React from "react";
import { User, ChevronLeft, UserPen, PhoneCall, LogOut, Loader2 } from "lucide-react";
import useMyaccount from "../hooks/useMyaccount"; // مسیر هوک
import CompleteProfileModal from "../components/CompleteProfileModal"; // مسیر کامپوننت مودال

function Myaccount_holder() {
  const {
    isLoading,
    userProfile,
    showProfileModal,
    closeProfileModal,
    handleEditProfile,
    handleContactUs,
    handleLogout,
  } = useMyaccount();

  if (isLoading) {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-cyan-500 animate-spin mb-2" />
        <span className="text-xs text-gray-400 font-medium">در حال دریافت اطلاعات...</span>
      </div>
    );
  }

  return (
    <div className="w-full px-5 py-6 flex flex-col items-center">
      {/* بخش آواتار و نام کاربر */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 mb-3 shadow-inner">
          <User size={44} className="text-gray-400" />
        </div>

        <h2 className="text-lg font-black text-gray-800 tracking-tight">
          {userProfile?.full_name || "کاربر عزیز"}
        </h2>

        <span className="text-xs text-gray-400 mt-1 font-medium">
          کاربر عزیز
        </span>
      </div>

      {/* لیست گزینه‌های منو */}
      <div className="w-full flex flex-col gap-3.5">
        {/* ۱. ویرایش اطلاعات کاربری */}
        <button
          type="button"
          onClick={handleEditProfile}
          className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between hover:bg-gray-50 active:scale-[0.99] transition-all"
        >
          {/* سمت راست: آیکون و عنوان */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center text-[#8B9EFF]">
              <UserPen size={19} />
            </div>
            <span className="text-sm font-bold text-gray-700">
              ویرایش اطلاعات کاربری
            </span>
          </div>

          {/* سمت چپ: فلش */}
          <ChevronLeft size={18} className="text-gray-300" />
        </button>

        {/* ۲. تماس با ما */}
        <button
          type="button"
          onClick={handleContactUs}
          className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between hover:bg-gray-50 active:scale-[0.99] transition-all"
        >
          {/* سمت راست: آیکون و عنوان */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-50 flex items-center justify-center text-[#8B9EFF]">
              <PhoneCall size={19} />
            </div>
            <span className="text-sm font-bold text-gray-700">
              تماس با ما
            </span>
          </div>

          {/* سمت چپ: فلش */}
          <ChevronLeft size={18} className="text-gray-300" />
        </button>

        {/* ۳. خروج از حساب کاربری */}
        <button
          type="button"
          onClick={handleLogout}
          className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between hover:bg-red-50/40 active:scale-[0.99] transition-all group"
        >
          {/* سمت راست: آیکون و عنوان */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-50 group-hover:bg-red-50 flex items-center justify-center text-[#8B9EFF] group-hover:text-red-500 transition-colors">
              <LogOut size={19} className="rotate-180" />
            </div>
            <span className="text-sm font-bold text-gray-700 group-hover:text-red-500 transition-colors">
              خروج
            </span>
          </div>

          {/* سمت چپ: فلش */}
          <ChevronLeft size={18} className="text-gray-300 group-hover:text-red-300 transition-colors" />
        </button>
      </div>

      {/* مودال در صورت نیاز به تکمیل اطلاعات */}
      {showProfileModal && (
        <CompleteProfileModal
          isOpen={showProfileModal}
          onClose={closeProfileModal}
        />
      )}
    </div>
  );
}

export default Myaccount_holder;
