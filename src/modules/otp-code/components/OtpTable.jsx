import React, { useState } from "react";
import {
  KeyRound,
  CheckCircle2,
  Clock,
  AlertCircle,
  Copy,
  Check,
  Phone,
  Calendar,
} from "lucide-react";

export default function OtpTable({ otps, loading }) {
  const [copiedId, setCopiedId] = useState(null);

  const formatDate = (dateStr) => {
    if (!dateStr) return "---";
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat("fa-IR", {
        dateStyle: "short",
        timeStyle: "medium",
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  const handleCopyCode = (id, code) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  if (loading) {
    return (
      <div className="w-full h-80 flex flex-col items-center justify-center gap-3 text-slate-400">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-semibold text-slate-500">
          در حال بارگذاری کدهای تأیید...
        </span>
      </div>
    );
  }

  if (!otps?.length) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center text-slate-400">
        <p className="text-sm font-bold text-slate-600">
          هیچ کدی در سیستم ثبت نشده است.
        </p>
        <span className="text-xs text-slate-400 mt-1">
          لاگ درخواست‌های کد ورود پس از ارسال در اینجا نمایش داده می‌شود.
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
            <th className="py-3.5 px-4">شماره همراه کاربر</th>
            <th className="py-3.5 px-4 text-center">کد تایید (OTP)</th>
            <th className="py-3.5 px-4 text-center">وضعیت استفاده</th>
            <th className="py-3.5 px-4 text-center">وضعیت انقضا</th>
            <th className="py-3.5 px-4">زمان ارسال کد</th>
            <th className="py-3.5 px-4">مهلت انقضا</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
          {otps.map((item) => {
            const isCopied = copiedId === item.id;

            return (
              <tr
                key={item.id}
                className="hover:bg-blue-50/40 transition-colors"
              >
      
                <td className="py-4 px-4 text-center">
                  <span className="font-mono text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    #{item.id}
                  </span>
                </td>

           
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1.5 font-mono text-[13px] font-bold text-slate-800">
                    <Phone size={13} className="text-slate-400" />
                    <span dir="ltr">{item.phone || "---"}</span>
                  </div>
                </td>

       
                <td className="py-4 px-4 text-center">
                  <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200/80 px-2.5 py-1 rounded-xl shadow-2xs">
                    <KeyRound size={13} className="text-blue-500" />
                    <span className="font-mono text-sm font-extrabold tracking-widest text-blue-700">
                      {item.code}
                    </span>
                    <button
                      onClick={() => handleCopyCode(item.id, item.code)}
                      title="کپی کد"
                      className="p-1 hover:bg-blue-100 text-blue-600 rounded-md transition cursor-pointer"
                    >
                      {isCopied ? (
                        <Check size={13} className="text-emerald-600" />
                      ) : (
                        <Copy size={13} />
                      )}
                    </button>
                  </div>
                </td>

          
                <td className="py-4 px-4 text-center">
                  {item.is_used ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">
                      <CheckCircle2 size={12} className="text-emerald-600" />
                      مصرف شده
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border bg-slate-100 text-slate-600 border-slate-200">
                      <Clock size={12} className="text-slate-400" />
                      استفاده نشده
                    </span>
                  )}
                </td>

                <td className="py-4 px-4 text-center">
                  {item.is_expired ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border bg-rose-50 text-rose-700 border-rose-200">
                      <AlertCircle size={12} className="text-rose-500" />
                      منقضی شده
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border bg-cyan-50 text-cyan-700 border-cyan-200 animate-pulse">
                      <Clock size={12} className="text-cyan-600" />
                      معتبر و فعال
                    </span>
                  )}
                </td>

             
                <td className="py-4 px-4 text-slate-600">
                  <div className="flex items-center gap-1 text-[11px]">
                    <Calendar size={13} className="text-slate-400" />
                    <span>{formatDate(item.created_at)}</span>
                  </div>
                </td>

             
                <td className="py-4 px-4 text-slate-500">
                  <div className="flex items-center gap-1 text-[11px]">
                    <Clock size={13} className="text-slate-400" />
                    <span>{formatDate(item.expires_at)}</span>
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
