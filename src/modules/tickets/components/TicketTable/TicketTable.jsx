import React from "react";
import { CheckCircle2, XCircle, Trash2, UserCheck, Calendar, Hash } from "lucide-react";

const TYPE_CONFIG = {
  vip: {
    title: "VIP",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
  },
  gamer: {
    title: "گیمر",
    badge: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  regular: {
    title: "عادی",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
  },
};

export default function TicketTable({
  tickets,
  loading,
  actionLoadingId,
  onUseTicket,
  onCancelTicket,
}) {
  const formatDate = (dateStr) => {
    if (!dateStr) return "---";
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat("fa-IR", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="w-full h-80 flex flex-col items-center justify-center gap-3 text-slate-400">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-semibold text-slate-500">در حال دریافت اطلاعات...</span>
      </div>
    );
  }

  if (!tickets?.length) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center text-slate-400">
        <p className="text-sm font-bold text-slate-600">هیچ بلیتی یافت نشد.</p>
        <span className="text-xs text-slate-400 mt-1">با فیلتر یا صفحات دیگر مجدد بررسی کنید.</span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="border-b border-slate-200/80 bg-slate-50/80 text-slate-600 text-xs font-bold">
            <th className="py-3.5 px-4 text-center">شناسه</th>
            <th className="py-3.5 px-4">کد رهگیری</th>
            <th className="py-3.5 px-4">خریدار و کدملی</th>
            <th className="py-3.5 px-4">نوع و تعداد</th>
            <th className="py-3.5 px-4">صندلی‌های انتخابی</th>
            <th className="py-3.5 px-4">مبلغ پرداختی</th>
            <th className="py-3.5 px-4">زمان ثبت</th>
            <th className="py-3.5 px-4 text-center">وضعیت ورود</th>
            <th className="py-3.5 px-4 text-center">عملیات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
          {tickets.map((ticket) => {
            const typeConf = TYPE_CONFIG[ticket.ticket_type] || TYPE_CONFIG.regular;
            const isActing = actionLoadingId === ticket.ticket_id;

            return (
              <tr
                key={ticket.ticket_id}
                className="hover:bg-blue-50/40 transition-colors"
              >
                {/* شناسه */}
                <td className="py-4 px-4 text-center">
                  <span className="font-mono text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    #{ticket.ticket_id}
                  </span>
                </td>

                {/* کد رهگیری */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1 font-mono font-bold text-blue-600 bg-blue-50/80 border border-blue-100 px-2.5 py-1 rounded-lg w-fit">
                    <Hash size={13} className="text-blue-400" />
                    <span>{ticket.ticket_code}</span>
                  </div>
                </td>

                {/* اطلاعات خریدار */}
                <td className="py-4 px-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-slate-800 text-[13px]">
                      {ticket.user?.full_name || "کاربر مهمان"}
                    </span>
                    <div className="flex items-center gap-2 text-slate-500 font-mono text-[11px]">
                      <span>{ticket.user?.phone || "---"}</span>
                      {ticket.user?.national_code && (
                        <span className="text-slate-400 border-r border-slate-200 pr-2">
                          کدملی: {ticket.user.national_code}
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                {/* نوع و تعداد */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-md font-bold text-[11px] border ${typeConf.badge}`}
                    >
                      {typeConf.title}
                    </span>
                    <span className="text-slate-500 font-medium">
                      ({ticket.quantity || 1} عدد)
                    </span>
                  </div>
                </td>

                {/* صندلی‌ها */}
                <td className="py-4 px-4">
                  {ticket.seats && ticket.seats.length > 0 ? (
                    <div className="flex flex-wrap gap-1 max-w-[180px]">
                      {ticket.seats.map((seat, idx) => (
                        <span
                          key={idx}
                          className="bg-white text-slate-700 font-mono text-[11px] font-semibold px-2 py-0.5 rounded border border-slate-200 shadow-2xs"
                        >
                          صندلی {seat.seat_number || seat.seat_id}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-slate-400 italic">بدون صندلی</span>
                  )}
                </td>

                {/* مبلغ */}
                <td className="py-4 px-4">
                  <span className="font-bold text-slate-800 font-mono text-xs">
                    {Number(ticket.total_amount || 0).toLocaleString("fa-IR")}
                  </span>
                  <span className="text-[10px] text-slate-400 mr-1">ریال</span>
                </td>

                {/* تاریخ */}
                <td className="py-4 px-4 text-slate-500">
                  <div className="flex items-center gap-1 text-[11px]">
                    <Calendar size={13} className="text-slate-400" />
                    <span>{formatDate(ticket.created_at)}</span>
                  </div>
                </td>

                {/* وضعیت ورود */}
                <td className="py-4 px-4 text-center">
                  {ticket.is_used ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                      <CheckCircle2 size={13} />
                      استفاده شده
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                      <XCircle size={13} />
                      استفاده نشده
                    </span>
                  )}
                </td>

                {/* عملیات */}
                <td className="py-4 px-4">
                  <div className="flex items-center justify-center gap-1.5">
                    {!ticket.is_used ? (
                      <button
                        onClick={() => onUseTicket(ticket.ticket_id)}
                        disabled={isActing}
                        className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs transition flex items-center gap-1 disabled:opacity-50 cursor-pointer shadow-xs"
                        title="ثبت ورود"
                      >
                        <UserCheck size={14} />
                        ثبت ورود
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-medium px-2">
                        وارد شده
                      </span>
                    )}

                    <button
                      onClick={() => onCancelTicket(ticket.ticket_id)}
                      disabled={isActing}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg transition disabled:opacity-50 cursor-pointer"
                      title="ابطال و استرداد صندلی"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
