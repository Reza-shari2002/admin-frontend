import React, { useState } from "react";
import { Armchair, Plus, Settings } from "lucide-react";
import AddSeatsModal from "../components/addSeats/addSeats_modal";

export default function Setting_holder() {
  const [isOpenAddSeats, setIsOpenAddSeats] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-slate-100 text-slate-700 rounded-xl">
          <Settings size={22} />
        </div>
        <div>
          <h1 className="text-base font-bold text-slate-800">تنظیمات سیستم</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            پیکربندی سالن و مدیریت ظرفیت صندلی‌ها
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>

      <AddSeatsModal
        open={isOpenAddSeats}
        onClose={() => setIsOpenAddSeats(false)}
      />
    </div>
  );
}
