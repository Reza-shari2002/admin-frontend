import React from "react";
import { Armchair, X, PlusCircle } from "lucide-react";
import useAddSeats from "../../hook/useAddSeats";

export default function AddSeatsModal({ open, onClose }) {
  // هوک مستقیماً فرم و هندلر سابمیت را در اختیار مودال می‌گذارد
  const {
    register,
    handleSubmit,
    errors,
    handleClose,
    loading,
  } = useAddSeats(() => {
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
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-100 shadow-2xl overflow-hidden">
        {/* هدر مودال */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
              <Armchair size={22} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                افزودن صندلی به سالن
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                تعداد صندلی‌های جدید را برای هر بخش مشخص کنید
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* صندلی VIP */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              تعداد صندلی VIP
            </label>
            <input
              type="number"
              min="0"
              placeholder="مثال: 5"
              disabled={loading}
              {...register("vip")}
              className={`w-full h-11 px-3.5 bg-slate-50 border rounded-xl text-sm font-mono text-slate-800 outline-none transition focus:bg-white ${
                errors.vip
                  ? "border-rose-300 focus:border-rose-500"
                  : "border-slate-200 focus:border-blue-500"
              }`}
            />
            {errors.vip && (
              <span className="text-[11px] text-rose-500 mt-1 block">
                {errors.vip.message}
              </span>
            )}
          </div>

          {/* صندلی عادی (Regular) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              تعداد صندلی عادی (Regular)
            </label>
            <input
              type="number"
              min="0"
              placeholder="مثال: 8"
              disabled={loading}
              {...register("regular")}
              className={`w-full h-11 px-3.5 bg-slate-50 border rounded-xl text-sm font-mono text-slate-800 outline-none transition focus:bg-white ${
                errors.regular
                  ? "border-rose-300 focus:border-rose-500"
                  : "border-slate-200 focus:border-blue-500"
              }`}
            />
            {errors.regular && (
              <span className="text-[11px] text-rose-500 mt-1 block">
                {errors.regular.message}
              </span>
            )}
          </div>

          {/* صندلی گیمر (Gamer) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              تعداد صندلی گیمر (Gamer)
            </label>
            <input
              type="number"
              min="0"
              placeholder="مثال: 4"
              disabled={loading}
              {...register("gamer")}
              className={`w-full h-11 px-3.5 bg-slate-50 border rounded-xl text-sm font-mono text-slate-800 outline-none transition focus:bg-white ${
                errors.gamer
                  ? "border-rose-300 focus:border-rose-500"
                  : "border-slate-200 focus:border-blue-500"
              }`}
            />
            {errors.gamer && (
              <span className="text-[11px] text-rose-500 mt-1 block">
                {errors.gamer.message}
              </span>
            )}
          </div>

          {/* خطای اعتبارسنجی کلی (حداقل یک صندلی > 0) */}
          {errors[""] && (
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100 text-[11px] text-rose-600 font-medium text-center">
              {errors[""]?.message}
            </div>
          )}

          {/* فوتر و دکمه‌ها */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
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
              className="h-10 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-md shadow-blue-500/20 disabled:opacity-50"
            >
              <PlusCircle size={16} />
              <span>{loading ? "در حال ایجاد..." : "افزودن صندلی‌ها"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
