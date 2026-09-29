import React, { useState } from "react";
import { Armchair, Plus, Settings, SlidersHorizontal } from "lucide-react";
import AddSeatsModal from "../components/addSeats/addSeats_modal";
import GeneralSettingModal from "../components/Generalsetting/GeneralSettingModal";

export default function Setting_holder() {
  const [isOpenAddSeats, setIsOpenAddSeats] = useState(false);
  const [isOpenGeneralSetting, setIsOpenGeneralSetting] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* تیتر بالای صفحه */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-slate-100 text-slate-700 rounded-xl">
          <Settings size={22} />
        </div>
        <div>
          <h1 className="text-base font-bold text-slate-800">تنظیمات سیستم</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            پیکربندی سالن، مدیریت صندلی‌ها و وضعیت کلی فروش بلیت‌ها
          </p>
        </div>
      </div>

      {/* لیست کارت‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ۱. کارت افزودن صندلی */}
        <div
          onClick={() => setIsOpenAddSeats(true)}
          className="group relative bg-white border border-slate-200/90 hover:border-blue-400/80 rounded-2xl p-6 shadow-xs hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[220px]"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3.5 rounded-2xl bg-blue-50 text-blue-600 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200 shadow-xs">
                <Armchair size={30} />
              </div>
              <span className="p-1.5 rounded-lg bg-slate-50 text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition">
                <Plus size={18} />
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition">
              افزودن صندلی جدید
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              تولید و تعریف دسته‌ای صندلی‌های جدید برای سالن مسابقات شامل بخش‌های عادی، VIP و گیمرها.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
            <span>باز کردن فرم</span>
            <span className="text-lg leading-none transition-transform group-hover:-translate-x-1">
              ←
            </span>
          </div>
        </div>

        {/* ۲. کارت تنظیمات کلی بلیت‌ها */}
        <div
          onClick={() => setIsOpenGeneralSetting(true)}
          className="group relative bg-white border border-slate-200/90 hover:border-indigo-400/80 rounded-2xl p-6 shadow-xs hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[220px]"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3.5 rounded-2xl bg-indigo-50 text-indigo-600 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-200 shadow-xs">
                <SlidersHorizontal size={30} />
              </div>
              <span className="p-1.5 rounded-lg bg-slate-50 text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition">
                <Plus size={18} />
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition">
              تنظیمات کلی بلیت‌ها
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              فعال‌سازی یا بستن موقت فروش هر نوع بلیت (VIP، عادی، گیمر) و تنظیم پیام نمایش عمومی آن.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
            <span>تنظیم وضعیت</span>
            <span className="text-lg leading-none transition-transform group-hover:-translate-x-1">
              ←
            </span>
          </div>
        </div>
      </div>

      {/* مودال‌ها */}
      <AddSeatsModal
        open={isOpenAddSeats}
        onClose={() => setIsOpenAddSeats(false)}
      />

      <GeneralSettingModal
        open={isOpenGeneralSetting}
        onClose={() => setIsOpenGeneralSetting(false)}
      />
    </div>
  );
}
