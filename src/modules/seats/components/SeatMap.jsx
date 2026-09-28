import React from "react";
import { Crown, Armchair } from "lucide-react";

// تمایز رنگ‌ها بر اساس استاندارد خواسته شده
function getSeatStyle(seat) {
  const isLocked = seat.status === "locked" || seat.is_locked;
  if (isLocked) {
    return "bg-amber-400 border-amber-500 text-slate-900 shadow-amber-200/50";
  }
  if (seat.status === "sold") {
    return "bg-rose-500 border-rose-600 text-white shadow-rose-200/50";
  }
  return "bg-emerald-500 border-emerald-600 text-white shadow-emerald-200/50";
}

export default function SeatMap({ rows, onSeatClick }) {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs overflow-x-auto">
      {/* راهنمای رنگ‌ها (Legend) */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3 text-xs text-slate-700 font-bold">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-emerald-500 border border-emerald-600 shadow-2xs" />
            <span>قابل رزرو</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-amber-400 border border-amber-500 shadow-2xs" />
            <span>رزرو موقت (لاک)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-rose-500 border border-rose-600 shadow-2xs" />
            <span>فروخته شده</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> عادی (بالا)
          </span>
          <span className="flex items-center gap-1 text-amber-600">
            <Crown size={14} /> ردیف VIP (پایین نزدیک استیج)
          </span>
        </div>
      </div>

      {/* چیدمان صندلی‌های سالن */}
      <div className="min-w-[680px] flex flex-col items-center gap-3 py-2">
        {rows.map((row) => {
          const isVip = row.type === "vip";

          return (
            <div
              key={`${row.type}-${row.rowNumber}`}
              className={`flex items-center justify-center gap-3 w-full py-1.5 px-3 rounded-xl transition ${
                isVip ? "bg-amber-50/40 border border-amber-100/60" : ""
              }`}
            >
              {/* شماره ردیف و نشانگر نوع */}
              <div className="w-20 flex items-center gap-1 text-[11px] font-bold text-slate-400 select-none">
                {isVip && <Crown size={13} className="text-amber-500" />}
                <span>ردیف {row.rowNumber}</span>
              </div>

              {/* صندلی‌ها از چپ به راست از ۱ شروع می‌شوند */}
              <div className="flex items-center justify-center gap-2 flex-1">
                {row.seats.map((seat) => {
                  const colorClass = getSeatStyle(seat);

                  return (
                    <button
                      key={`${seat.type}-${seat.seat_number}`}
                      onClick={() => onSeatClick(seat)}
                      title={`نوع: ${seat.type.toUpperCase()} | صندلی #${seat.seat_number} | وضعیت: ${seat.status}`}
                      className={`relative w-8 h-8 md:w-9 md:h-9 rounded-lg border text-xs font-black font-mono shadow-xs flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-95 cursor-pointer ${colorClass}`}
                    >
                      {seat.seat_number}
                    </button>
                  );
                })}
              </div>

              <div className="w-20 text-left text-[10px] font-mono text-slate-300 uppercase">
                {isVip ? "VIP" : "REG"}
              </div>
            </div>
          );
        })}
      </div>

      {/* سن / استیج (در انتهای سالن پایین VIP) */}
      <div className="mt-8 max-w-xl mx-auto">
        <div className="h-10 rounded-2xl bg-linear-to-b from-slate-100 to-slate-200 border border-slate-300/80 flex items-center justify-center text-xs font-bold text-slate-600 shadow-inner">
          سن / استیج سالن مسابقات
        </div>
      </div>
    </div>
  );
}
