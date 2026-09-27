import React from "react";
import { Link } from "react-router-dom";
import useHome from "../hooks/useHome";
import CompleteProfileModal from "../../profile/components/CompleteProfileModal";
import LoadingScreen from "../../../components/common/LoadingScreen";

function Home_holder() {
  const { isLoading, showProfileModal, goToParandCup, closeProfileModal } =
    useHome();

  if (isLoading) return <LoadingScreen />;

  // ۵ باکس خالی برای پر کردن دو ردیف ۳ تایی
  const emptySlots = Array.from({ length: 5 });

  return (
    <div className="w-full max-w-[430px] mx-auto min-h-[calc(100vh-140px)] flex flex-col justify-between px-4 py-3 pb-24 select-none">
      {/* بخش بالا: گرید سرویس‌ها */}
      <div className="w-full">
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {/* کارت پرند کاپ */}
          <div
            onClick={goToParandCup}
            className="group relative aspect-square bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md flex flex-col items-center justify-center p-2.5 cursor-pointer active:scale-95 transition-all duration-200 hover:border-cyan-400"
          >
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-cyan-50/70 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform overflow-hidden relative border border-cyan-100/50">
              {/* تغییر سایز تصویر در اینجا انجام شد */}
              <img
                src="/daste_white_bg.png"
                alt="پرند کاپ"
                className="w-16 h-16 object-contain relative z-10"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="absolute text-2xl">🎮</span>
            </div>

            <span className="text-xs font-black text-gray-800 text-center">
              پرند کاپ
            </span>
          </div>

          {/* خانه‌های خالی با استایل ملایم‌تر */}
          {emptySlots.map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-white/70 rounded-2xl border border-gray-100/80 shadow-xs"
            />
          ))}
        </div>
      </div>

      {/* بخش پایین: بنر مسابقات */}
      <div className="w-full pt-4">
        <Link
          to="/Selectticket"
          className="block relative w-full aspect-[2.1/1] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg shadow-blue-500/10 border border-gray-100 bg-gray-50 active:scale-[0.98] transition-transform duration-150"
        >
          <img
            src="/parandcup_banner.png"
            alt="بنر مسابقات پرند کاپ"
            className="w-full h-full object-cover select-none pointer-events-none"
          />
        </Link>
      </div>

      {/* مودال تکمیل اطلاعات */}
      <CompleteProfileModal
        isOpen={showProfileModal}
        onClose={closeProfileModal}
      />
    </div>
  );
}

export default Home_holder;
