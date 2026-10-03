import React from "react";
import {
  SlidersHorizontal,
  X,
  Save,
  Crown,
  Ticket,
  Gamepad2,
  DollarSign,
  MapPin,
  CalendarClock,
} from "lucide-react";
import useGeneralSetting from "../../hook/useGeneralSetting";

export default function GeneralSettingModal({ open, onClose }) {
  const { register, handleSubmit, errors, handleClose, loading } =
    useGeneralSetting(() => {
      onClose?.();
    });

  if (!open) return null;

  const handleModalClose = () => {
    if (loading) return;
    handleClose();
    onClose?.();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleModalClose();
      }}
    >
      <div className="w-full max-w-3xl bg-white rounded-2xl border border-slate-100 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* هدر مودال */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
              <SlidersHorizontal size={22} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                تنظیمات کلی بلیت‌ها و رویداد
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                تغییر وضعیت فروش، پیام‌ها، قیمت‌ها، مکان‌ها و زمان برگزاری
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleModalClose}
            disabled={loading}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* بدنه فرم */}
        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto space-y-5"
        >
          {/* ================= بخش VIP ================= */}
          <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-100/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700 flex items-center gap-1.5">
                <Crown size={15} />
                بلیت VIP
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {/* وضعیت فروش */}
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  وضعیت فروش
                </label>
                <select
                  disabled={loading}
                  {...register("is_vip_active")}
                  className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:border-indigo-500 transition"
                >
                  <option value="">بدون تغییر</option>
                  <option value="1">فعال (فروش باز است)</option>
                  <option value="0">غیرفعال (فروش بسته است)</option>
                </select>
                {errors.is_vip_active && (
                  <span className="text-[10px] text-rose-500 mt-1 block">
                    {errors.is_vip_active.message}
                  </span>
                )}
              </div>

              {/* قیمت (تومان) */}
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1 flex items-center gap-1">
                  <DollarSign size={13} className="text-slate-400" />
                  قیمت (تومان)
                </label>
                <input
                  type="number"
                  placeholder="مثال: 500000"
                  disabled={loading}
                  {...register("vip_price")}
                  className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:border-indigo-500 transition"
                />
                {errors.vip_price && (
                  <span className="text-[10px] text-rose-500 mt-1 block">
                    {errors.vip_price.message}
                  </span>
                )}
              </div>

              {/* تاریخ و ساعت رویداد */}
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1 flex items-center gap-1">
                  <CalendarClock size={13} className="text-slate-400" />
                  تاریخ و ساعت رویداد
                </label>
                <input
                  type="text"
                  dir="ltr"
                  placeholder="1405/07/15 18:30"
                  disabled={loading}
                  {...register("vip_event_date")}
                  className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:border-indigo-500 text-right transition placeholder:text-slate-300"
                />
                {errors.vip_event_date && (
                  <span className="text-[10px] text-rose-500 mt-1 block">
                    {errors.vip_event_date.message}
                  </span>
                )}
              </div>

              {/* مکان برگزاری */}
              <div className="sm:col-span-2 md:col-span-1">
                <label className="block text-[11px] font-medium text-slate-600 mb-1 flex items-center gap-1">
                  <MapPin size={13} className="text-slate-400" />
                  مکان برگزاری
                </label>
                <input
                  type="text"
                  placeholder="مثال: سالن همایش، ردیف اختصاصی"
                  disabled={loading}
                  {...register("vip_location")}
                  className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:border-indigo-500 transition"
                />
                {errors.vip_location && (
                  <span className="text-[10px] text-rose-500 mt-1 block">
                    {errors.vip_location.message}
                  </span>
                )}
              </div>

              {/* پیام وضعیت */}
              <div className="sm:col-span-2 md:col-span-2">
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  پیام وضعیت
                </label>
                <input
                  type="text"
                  placeholder="مثال: ظرفیت بلیت VIP محدود است"
                  disabled={loading}
                  {...register("vip_message")}
                  className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:border-indigo-500 transition"
                />
                {errors.vip_message && (
                  <span className="text-[10px] text-rose-500 mt-1 block">
                    {errors.vip_message.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ================= بخش بلیت عادی (Regular) ================= */}
          <div className="p-4 rounded-xl bg-blue-50/40 border border-blue-100/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-700 flex items-center gap-1.5">
                <Ticket size={15} />
                بلیت عادی (Regular)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {/* وضعیت فروش */}
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  وضعیت فروش
                </label>
                <select
                  disabled={loading}
                  {...register("is_regular_active")}
                  className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:border-indigo-500 transition"
                >
                  <option value="">بدون تغییر</option>
                  <option value="1">فعال (فروش باز است)</option>
                  <option value="0">غیرفعال (فروش بسته است)</option>
                </select>
                {errors.is_regular_active && (
                  <span className="text-[10px] text-rose-500 mt-1 block">
                    {errors.is_regular_active.message}
                  </span>
                )}
              </div>

              {/* قیمت (تومان) */}
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1 flex items-center gap-1">
                  <DollarSign size={13} className="text-slate-400" />
                  قیمت (تومان)
                </label>
                <input
                  type="number"
                  placeholder="مثال: 200000"
                  disabled={loading}
                  {...register("regular_price")}
                  className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:border-indigo-500 transition"
                />
                {errors.regular_price && (
                  <span className="text-[10px] text-rose-500 mt-1 block">
                    {errors.regular_price.message}
                  </span>
                )}
              </div>

              {/* تاریخ و ساعت رویداد */}
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1 flex items-center gap-1">
                  <CalendarClock size={13} className="text-slate-400" />
                  تاریخ و ساعت رویداد
                </label>
                <input
                  type="text"
                  dir="ltr"
                  placeholder="1405/07/15 18:30"
                  disabled={loading}
                  {...register("regular_event_date")}
                  className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:border-indigo-500 text-right transition placeholder:text-slate-300"
                />
                {errors.regular_event_date && (
                  <span className="text-[10px] text-rose-500 mt-1 block">
                    {errors.regular_event_date.message}
                  </span>
                )}
              </div>

              {/* مکان برگزاری */}
              <div className="sm:col-span-2 md:col-span-1">
                <label className="block text-[11px] font-medium text-slate-600 mb-1 flex items-center gap-1">
                  <MapPin size={13} className="text-slate-400" />
                  مکان برگزاری
                </label>
                <input
                  type="text"
                  placeholder="مثال: سالن اصلی، صندلی‌های همکف"
                  disabled={loading}
                  {...register("regular_location")}
                  className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:border-indigo-500 transition"
                />
                {errors.regular_location && (
                  <span className="text-[10px] text-rose-500 mt-1 block">
                    {errors.regular_location.message}
                  </span>
                )}
              </div>

              {/* پیام وضعیت */}
              <div className="sm:col-span-2 md:col-span-2">
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  پیام وضعیت
                </label>
                <input
                  type="text"
                  placeholder="مثال: فروش بلیت عادی فعال است"
                  disabled={loading}
                  {...register("regular_message")}
                  className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:border-indigo-500 transition"
                />
                {errors.regular_message && (
                  <span className="text-[10px] text-rose-500 mt-1 block">
                    {errors.regular_message.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ================= بخش بلیت گیمر (Gamer) ================= */}
          <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                <Gamepad2 size={15} />
                بلیت شرکت‌کننده (Gamer)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {/* وضعیت فروش */}
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  وضعیت فروش
                </label>
                <select
                  disabled={loading}
                  {...register("is_gamer_active")}
                  className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:border-indigo-500 transition"
                >
                  <option value="">بدون تغییر</option>
                  <option value="1">فعال (فروش باز است)</option>
                  <option value="0">غیرفعال (فروش بسته است)</option>
                </select>
                {errors.is_gamer_active && (
                  <span className="text-[10px] text-rose-500 mt-1 block">
                    {errors.is_gamer_active.message}
                  </span>
                )}
              </div>

              {/* قیمت (تومان) */}
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1 flex items-center gap-1">
                  <DollarSign size={13} className="text-slate-400" />
                  قیمت (تومان)
                </label>
                <input
                  type="number"
                  placeholder="مثال: 350000"
                  disabled={loading}
                  {...register("gamer_price")}
                  className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:border-indigo-500 transition"
                />
                {errors.gamer_price && (
                  <span className="text-[10px] text-rose-500 mt-1 block">
                    {errors.gamer_price.message}
                  </span>
                )}
              </div>

              {/* تاریخ و ساعت رویداد */}
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1 flex items-center gap-1">
                  <CalendarClock size={13} className="text-slate-400" />
                  تاریخ و ساعت رویداد
                </label>
                <input
                  type="text"
                  dir="ltr"
                  placeholder="1405/07/15 18:30"
                  disabled={loading}
                  {...register("gamer_event_date")}
                  className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:border-indigo-500 text-right transition placeholder:text-slate-300"
                />
                {errors.gamer_event_date && (
                  <span className="text-[10px] text-rose-500 mt-1 block">
                    {errors.gamer_event_date.message}
                  </span>
                )}
              </div>

              {/* مکان برگزاری */}
              <div className="sm:col-span-2 md:col-span-1">
                <label className="block text-[11px] font-medium text-slate-600 mb-1 flex items-center gap-1">
                  <MapPin size={13} className="text-slate-400" />
                  مکان برگزاری
                </label>
                <input
                  type="text"
                  placeholder="مثال: استیج مسابقات - سالن B"
                  disabled={loading}
                  {...register("gamer_location")}
                  className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:border-indigo-500 transition"
                />
                {errors.gamer_location && (
                  <span className="text-[10px] text-rose-500 mt-1 block">
                    {errors.gamer_location.message}
                  </span>
                )}
              </div>

              {/* پیام وضعیت */}
              <div className="sm:col-span-2 md:col-span-2">
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  پیام وضعیت
                </label>
                <input
                  type="text"
                  placeholder="مثال: فقط مخصوص شرکت‌کنندگان تورنمنت"
                  disabled={loading}
                  {...register("gamer_message")}
                  className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:border-indigo-500 transition"
                />
                {errors.gamer_message && (
                  <span className="text-[10px] text-rose-500 mt-1 block">
                    {errors.gamer_message.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* خطای اعتبارسنجی کلی (در صورتی که هیچ فیلدی پر نشده باشد) */}
          {errors[""] && (
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100 text-[11px] text-rose-600 font-medium text-center">
              {errors[""]?.message}
            </div>
          )}

          {/* فوتر و دکمه‌های عملیات */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 shrink-0">
            <button
              type="button"
              onClick={handleModalClose}
              disabled={loading}
              className="h-10 px-4 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer disabled:opacity-50"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={loading}
              className="h-10 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-md shadow-indigo-500/20 disabled:opacity-50"
            >
              <Save size={16} />
              <span>{loading ? "در حال ذخیره..." : "ثبت تغییرات"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
