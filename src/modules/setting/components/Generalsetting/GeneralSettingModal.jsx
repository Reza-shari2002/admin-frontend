import React from "react";
import { SlidersHorizontal, X, Save } from "lucide-react";
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
      <div className="w-full max-w-xl bg-white rounded-2xl border border-slate-100 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* هدر مودال */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
              <SlidersHorizontal size={22} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">تنظیمات کلی بلیت‌ها</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                تغییر وضعیت فعال/غیرفعال بودن فروش و پیام وضعیت برای کاربران
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
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {/* بخش VIP */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-600 flex items-center gap-1.5">
                ★ بلیت VIP
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  پیام وضعیت
                </label>
                <input
                  type="text"
                  placeholder="مثال: باز است یا ظرفیت تکمیل شد"
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

          {/* بخش بلیت عادی (Regular) */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-600">
                بلیت عادی (Regular)
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  پیام وضعیت
                </label>
                <input
                  type="text"
                  placeholder="مثال: باز است"
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

          {/* بخش بلیت گیمر (Gamer) */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-600">
                بلیت شرکت‌کننده (Gamer)
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  پیام وضعیت
                </label>
                <input
                  type="text"
                  placeholder="مثال: باز است"
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

          {/* خطای اعتبارسنجی کلی (حداقل یک فیلد باید پر باشد) */}
          {errors[""] && (
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100 text-[11px] text-rose-600 font-medium text-center">
              {errors[""]?.message}
            </div>
          )}

          {/* فوتر دکمه‌ها */}
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
