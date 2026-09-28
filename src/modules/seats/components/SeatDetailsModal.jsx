import React from "react";
import { X, Ticket, Armchair } from "lucide-react";

export default function SeatDetailsModal({ open, onClose, seat }) {
  if (!open || !seat) return null;

  const statusFa =
    seat.status === "sold"
      ? "فروخته شده"
      : seat.status === "locked" || seat.is_locked
      ? "لاک شده"
      : "قابل رزرو";

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Armchair size={18} />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-800">
                جزئیات صندلی
              </div>
              <div className="text-[11px] text-slate-400">
                اطلاعات این صندلی از API خوانده شده است
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-50 text-slate-500 cursor-pointer"
            title="بستن"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4 text-xs text-slate-700 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">نوع</span>
            <span className="font-bold font-mono">{seat.type}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">شماره صندلی</span>
            <span className="font-bold font-mono">{seat.seat_number}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">وضعیت</span>
            <span className="font-bold">{statusFa}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Ticket Code</span>
            <span className="font-bold font-mono">
              {seat.ticket_code || "---"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500">Ticket ID</span>
            <span className="font-bold font-mono">{seat.ticket_id ?? "---"}</span>
          </div>
        </div>

        <div className="p-4 pt-0">
          {seat.ticket_code && (
            <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 border border-slate-200 rounded-xl p-2">
              <Ticket size={14} className="text-slate-400" />
              <span>
                این صندلی به بلیط با کد{" "}
                <strong className="font-mono">{seat.ticket_code}</strong>{" "}
                متصل است.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
