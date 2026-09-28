import React, { useState } from "react";
import { RotateCw, Armchair, Layers } from "lucide-react";
import { useSeatMap } from "../hooks/useSeatMap";
import SeatMap from "./SeatMap";
import SeatDetailsModal from "./SeatDetailsModal";

export default function SeatMap_holder() {
  const [seatsPerRow, setSeatsPerRow] = useState(14); // مقدار متغیر دلخواه شما
  const {
    loading,
    refresh,
    hallLayout,
    stats,
    selectedSeat,
    setSelectedSeat,
    closeModal,
  } = useSeatMap(seatsPerRow);

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* نوار ابزار و آمار سالن */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border border-slate-200/80 p-4 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <Armchair size={22} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800">
              نقشه استاتیک و زنده صندلی‌های سالن
            </h2>
            <span className="text-[11px] text-slate-400">
              بالا: صندلی‌های عادی | پایین: صندلی‌های VIP
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* تغییر پویای تعداد در هر ردیف */}
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-600">
            <Layers size={14} className="text-slate-400" />
            <span>هر ردیف:</span>
            <select
              value={seatsPerRow}
              onChange={(e) => setSeatsPerRow(Number(e.target.value))}
              className="bg-transparent font-bold font-mono text-slate-800 outline-none cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={12}>12</option>
              <option value={14}>14</option>
              <option value={16}>16</option>
            </select>
          </div>

          {/* آمار صندلی‌ها */}
          <div className="flex items-center gap-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
            <span className="text-slate-500">کل: <strong className="text-slate-800 font-mono">{stats.total}</strong></span>
            <span className="text-slate-300">|</span>
            <span className="text-emerald-700">سبز: <strong className="font-mono">{stats.available}</strong></span>
            <span className="text-slate-300">|</span>
            <span className="text-amber-700">زرد: <strong className="font-mono">{stats.locked}</strong></span>
            <span className="text-slate-300">|</span>
            <span className="text-rose-700">قرمز: <strong className="font-mono">{stats.sold}</strong></span>
          </div>

          {/* دکمه رفرش */}
          <button
            onClick={refresh}
            disabled={loading}
            className="h-10 px-4 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 transition cursor-pointer disabled:opacity-50 shadow-2xs"
          >
            <RotateCw size={15} className={loading ? "animate-spin text-blue-600" : ""} />
            <span>بروزرسانی</span>
          </button>
        </div>
      </div>

      {/* کامپوننت نقشه کلی سالن */}
      <SeatMap
        rows={hallLayout.allRows}
        onSeatClick={setSelectedSeat}
      />

      {/* مودال جزئیات کلیک روی صندلی */}
      <SeatDetailsModal
        open={Boolean(selectedSeat)}
        seat={selectedSeat}
        onClose={closeModal}
      />
    </div>
  );
}
