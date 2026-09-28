import React from "react";
import {
  User,
  ShieldCheck,
  UserCheck,
  Phone,
  CreditCard,
  Calendar,
} from "lucide-react";

export default function UserTable({ users, loading }) {
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
          در حال بارگذاری لیست کاربران...
        </span>
      </div>
    );
  }

  if (!users?.length) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center text-slate-400">
        <User size={36} className="text-slate-300 mb-2" />
        <p className="text-sm font-bold text-slate-600">
          هیچ کاربری با این مشخصات یافت نشد!
        </p>
        <span className="text-xs text-slate-400 mt-1">
          عبارت جست‌وجو را بررسی یا فیلتر را پاک کنید.
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
            <th className="py-3.5 px-4">نام و نام‌خانوادگی</th>
            <th className="py-3.5 px-4">شماره همراه</th>
            <th className="py-3.5 px-4 text-center">کد ملی</th>
            <th className="py-3.5 px-4 text-center">نقش کاربری</th>
            <th className="py-3.5 px-4">تاریخ ثبت‌نام</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
          {users.map((item) => {
            const isAdmin = item.role === "admin";

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
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
                      {item.full_name ? item.full_name.charAt(0) : "؟"}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 text-xs">
                        {item.full_name || "بدون نام"}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        UID-{item.id}
                      </span>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-4">
                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-700">
                    <Phone size={13} className="text-slate-400" />
                    <span dir="ltr">{item.phone || "---"}</span>
                  </div>
                </td>

                <td className="py-4 px-4 text-center">
                  {item.national_code ? (
                    <span className="inline-flex items-center gap-1 font-mono text-xs text-slate-600 bg-slate-50 border border-slate-200/70 px-2 py-0.5 rounded-md">
                      <CreditCard size={12} className="text-slate-400" />
                      {item.national_code}
                    </span>
                  ) : (
                    <span className="text-slate-400 text-[11px]">ثبت نشده</span>
                  )}
                </td>

                <td className="py-4 px-4 text-center">
                  {isAdmin ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border bg-amber-50 text-amber-700 border-amber-200 shadow-2xs">
                      <ShieldCheck size={13} className="text-amber-600" />
                      مدیر سامانه
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">
                      <UserCheck size={13} className="text-emerald-600" />
                      کاربر عادی
                    </span>
                  )}
                </td>

                <td className="py-4 px-4 text-slate-600">
                  <div className="flex items-center gap-1.5 text-[11px]">
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
