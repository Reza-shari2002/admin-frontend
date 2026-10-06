import React, { useState } from "react";
import {
  CreditCard,
  Phone,
  User,
  Ticket,
  Calendar,
  Copy,
  Check,
  Clock,
  CheckCircle2,
  XCircle,
  Banknote,
  FileText,
} from "lucide-react";

export default function RefundTable({ refunds, loading }) {
  const [copiedKey, setCopiedKey] = useState(null);

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

  const handleCopy = (key, text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };


  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border bg-amber-50 text-amber-700 border-amber-200">
            <Clock size={12} className="text-amber-600" />
            در انتظار بررسی
          </span>
        );
      case "approved":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border bg-blue-50 text-blue-700 border-blue-200">
            <CheckCircle2 size={12} className="text-blue-600" />
            تایید شده (در صف واریز)
          </span>
        );
      case "refunded":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">
            <Banknote size={12} className="text-emerald-600" />
            مبلغ مسترد شد
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border bg-rose-50 text-rose-700 border-rose-200">
            <XCircle size={12} className="text-rose-600" />
            رد شده
          </span>
        );
      default:
        return <span className="text-slate-500 font-mono text-xs">{status}</span>;
    }
  };

  if (loading) {
    return (
      <div className="w-full h-80 flex flex-col items-center justify-center gap-3 text-slate-400">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-semibold text-slate-500">
          در حال بارگذاری درخواست‌های استرداد...
        </span>
      </div>
    );
  }

  if (!refunds?.length) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center text-slate-400">
        <p className="text-sm font-bold text-slate-600">
          هیچ درخواست استردادی با این شرایط یافت نشد.
        </p>
        <span className="text-xs text-slate-400 mt-1">
          درخواست‌های ثبت‌شده توسط کاربران پس از ارسال در اینجا نمایش داده خواهند شد.
        </span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="border-b border-slate-200/80 bg-slate-50/80 text-slate-600 text-xs font-bold whitespace-nowrap">
            <th className="py-3.5 px-4 text-center">شناسه</th>
            <th className="py-3.5 px-4 text-center">کد تیکت</th>
            <th className="py-3.5 px-4">کاربر و اطلاعات هویتی</th>
            <th className="py-3.5 px-4">شماره کارت و شبا</th>
            <th className="py-3.5 px-4 text-center">وضعیت</th>
            <th className="py-3.5 px-4">توضیحات مدیر</th>
            <th className="py-3.5 px-4">تاریخ ثبت</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
          {refunds.map((item) => {
            const isCardCopied = copiedKey === `card_${item.id}`;
            const isIbanCopied = copiedKey === `iban_${item.id}`;

            return (
              <tr
                key={item.id}
                className="hover:bg-blue-50/40 transition-colors"
              >
                {/* شناسه درخواست */}
                <td className="py-4 px-4 text-center whitespace-nowrap">
                  <span className="font-mono text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    #{item.id}
                  </span>
                </td>

                {/* شناسه تیکت مرجع */}
                <td className="py-4 px-4 text-center whitespace-nowrap">
                  <div className="inline-flex items-center gap-1 font-mono text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded-lg">
                    <Ticket size={12} className="text-blue-500" />
                    <span>#{item.ticket_id}</span>
                  </div>
                </td>

                {/* اطلاعات هویتی کاربر */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 font-bold text-slate-800">
                      <User size={13} className="text-slate-400" />
                      <span>{item.full_name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                      <span className="flex items-center gap-1" dir="ltr">
                        <Phone size={11} className="text-slate-400" />
                        {item.phone}
                      </span>
                      <span>•</span>
                      <span>کدملی: {item.national_code}</span>
                    </div>
                  </div>
                </td>

                {/* اطلاعات کارت و شبا بانکی با دکمه کپی */}
                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="flex flex-col gap-1.5">
                    {/* کارت */}
                    <div className="flex items-center gap-1.5 font-mono text-xs text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/60 w-fit">
                      <CreditCard size={12} className="text-slate-400" />
                      <span dir="ltr">{item.card_number}</span>
                      <button
                        onClick={() =>
                          handleCopy(`card_${item.id}`, item.card_number)
                        }
                        title="کپی شماره کارت"
                        className="hover:text-blue-600 transition cursor-pointer"
                      >
                        {isCardCopied ? (
                          <Check size={12} className="text-emerald-600" />
                        ) : (
                          <Copy size={12} />
                        )}
                      </button>
                    </div>

                    {/* شبا (اختیاری) */}
                    {item.iban && (
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/60 w-fit">
                        <span className="font-sans text-[10px] text-slate-400">
                          شبا:
                        </span>
                        <span dir="ltr">{item.iban}</span>
                        <button
                          onClick={() =>
                            handleCopy(`iban_${item.id}`, item.iban)
                          }
                          title="کپی شبا"
                          className="hover:text-blue-600 transition cursor-pointer"
                        >
                          {isIbanCopied ? (
                            <Check size={11} className="text-emerald-600" />
                          ) : (
                            <Copy size={11} />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </td>

                {/* وضعیت استرداد */}
                <td className="py-4 px-4 text-center whitespace-nowrap">
                  {getStatusBadge(item.status)}
                </td>

                {/* یادداشت ادمین */}
                <td className="py-4 px-4 max-w-xs">
                  {item.admin_note ? (
                    <div className="flex items-start gap-1 text-[11px] text-slate-600 bg-slate-50 p-1.5 rounded border border-slate-100">
                      <FileText size={12} className="text-slate-400 mt-0.5 shrink-0" />
                      <span className="line-clamp-2" title={item.admin_note}>
                        {item.admin_note}
                      </span>
                    </div>
                  ) : (
                    <span className="text-slate-300 font-mono">---</span>
                  )}
                </td>

                {/* تاریخ ثبت */}
                <td className="py-4 px-4 text-slate-500 whitespace-nowrap">
                  <div className="flex items-center gap-1 text-[11px]">
                    <Calendar size={13} className="text-slate-400" />
                    <span>{formatDate(item.created_at)}</span>
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
