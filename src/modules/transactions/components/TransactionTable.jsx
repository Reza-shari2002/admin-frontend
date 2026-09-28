import React from "react";
import {
  CheckCircle2,
  Clock,
  XCircle,
  Hash,
  Calendar,
  CreditCard,
} from "lucide-react";

const STATUS_CONFIG = {
  success: {
    title: "موفق",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: <CheckCircle2 size={13} className="text-emerald-600" />,
  },
  pending: {
    title: "در انتظار پرداخت",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    icon: <Clock size={13} className="text-amber-600" />,
  },
  failed: {
    title: "ناموفق",
    badge: "bg-rose-50 text-rose-700 border-rose-200",
    icon: <XCircle size={13} className="text-rose-600" />,
  },
};

export default function TransactionTable({ transactions, loading }) {
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
        <span className="text-xs font-semibold text-slate-500">
          در حال دریافت اطلاعات تراکنش‌ها...
        </span>
      </div>
    );
  }

  if (!transactions?.length) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center text-slate-400">
        <p className="text-sm font-bold text-slate-600">هیچ تراکنشی یافت نشد.</p>
        <span className="text-xs text-slate-400 mt-1">
          هنوز تراکنشی در سیستم ثبت نشده است.
        </span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="border-b border-slate-200/80 bg-slate-50/80 text-slate-600 text-xs font-bold">
            <th className="py-3.5 px-4 text-center">شناسه</th>
            <th className="py-3.5 px-4">کد رهگیری بلیت</th>
            <th className="py-3.5 px-4">مشخصات کاربر</th>
            <th className="py-3.5 px-4">مبلغ پرداختی</th>
            <th className="py-3.5 px-4">شماره پیگیری (Ref ID)</th>
            <th className="py-3.5 px-4">شناسه یکتا (Authority)</th>
            <th className="py-3.5 px-4">زمان تراکنش</th>
            <th className="py-3.5 px-4 text-center">وضعیت پرداخت</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
          {transactions.map((tx) => {
            const statusConf = STATUS_CONFIG[tx.status] || STATUS_CONFIG.pending;

            return (
              <tr
                key={tx.id}
                className="hover:bg-blue-50/40 transition-colors"
              >
                <td className="py-4 px-4 text-center">
                  <span className="font-mono text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    #{tx.id}
                  </span>
                </td>

                <td className="py-4 px-4">
                  {tx.ticket_code ? (
                    <div className="flex items-center gap-1 font-mono font-bold text-blue-600 bg-blue-50/80 border border-blue-100 px-2.5 py-1 rounded-lg w-fit">
                      <Hash size={13} className="text-blue-400" />
                      <span>{tx.ticket_code}</span>
                    </div>
                  ) : (
                    <span className="text-slate-400 font-mono text-xs">---</span>
                  )}
                </td>

                <td className="py-4 px-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-slate-800 text-[13px]">
                      {tx.user_name || "کاربر مهمان"}
                    </span>
                    <span className="text-slate-500 font-mono text-[11px]">
                      {tx.user_phone || "---"}
                    </span>
                  </div>
                </td>

                <td className="py-4 px-4">
                  <span className="font-bold text-slate-800 font-mono text-xs">
                    {Number(tx.amount || 0).toLocaleString("fa-IR")}
                  </span>
                  <span className="text-[10px] text-slate-400 mr-1">ریال</span>
                </td>

                <td className="py-4 px-4">
                  {tx.ref_id ? (
                    <div className="flex items-center gap-1 font-mono font-bold text-slate-700 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded w-fit text-[11px]">
                      <CreditCard size={12} className="text-slate-400" />
                      <span>{tx.ref_id}</span>
                    </div>
                  ) : (
                    <span className="text-slate-300 font-mono">---</span>
                  )}
                </td>

                {/* شناسه Authority با امکان کات/کوتاه‌سازی و تولتیپ */}
                <td className="py-4 px-4">
                  <span
                    className="font-mono text-[11px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 max-w-[130px] inline-block truncate"
                    title={tx.authority}
                  >
                    {tx.authority || "---"}
                  </span>
                </td>

                <td className="py-4 px-4 text-slate-500">
                  <div className="flex items-center gap-1 text-[11px]">
                    <Calendar size={13} className="text-slate-400" />
                    <span>{formatDate(tx.created_at)}</span>
                  </div>
                </td>

                <td className="py-4 px-4 text-center">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border ${statusConf.badge}`}
                  >
                    {statusConf.icon}
                    {statusConf.title}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
