import React from "react";
import {
  RotateCw,
  Layers,
  ChevronLeft,
  ChevronRight,
  RotateCcw, // به جای ReceiptRefund
  Filter,
} from "lucide-react";
import { useRefundRequests } from "../hooks/useRefundRequests";
import RefundTable from "./RefundTable";

export default function Refund_holder() {
  const {
    refunds,
    loading,
    page,
    setPage,
    limit,
    handleLimitChange,
    status,
    handleStatusChange,
    totalPages,
    totalCount,
    refreshRefunds,
  } = useRefundRequests();

  return (
    <div className="flex flex-col gap-5 p-6">
      {/* ۱. نوار بالای صفحه (Header) */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border border-slate-200/80 p-4 rounded-2xl shadow-xs flex items-center justify-between">
        {/* نوار بالای صفحه */}
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
            <RotateCcw size={22} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800">
              مدیریت درخواست‌های استرداد وجه (Refund Requests)
            </h2>
            <span className="text-[11px] text-slate-400">
              بررسی و پایش درخواست‌های عودت وجه و شماره کارت کاربران
            </span>
          </div>
        </div>

        {/* دکمه رفرش */}
        <button
          onClick={refreshRefunds}
          disabled={loading}
          className="h-10 px-4 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 transition disabled:opacity-50 cursor-pointer shadow-2xs"
          title="بارگذاری مجدد"
        >
          <RotateCw
            size={15}
            className={loading ? "animate-spin text-blue-600" : ""}
          />
          <span>بروزرسانی</span>
        </button>
      </div>

      {/* ۲. کارت کانتینر جدول */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-2 h-5 bg-blue-600 rounded-full" />
            <h3 className="text-sm font-bold text-slate-800">
              لیست درخواست‌ها
            </h3>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full font-mono">
              {totalCount}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* فیلتر وضعیت استرداد */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Filter size={13} className="text-slate-400" />
              <span>وضعیت:</span>
              <select
                value={status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg px-2.5 py-1 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="">همه وضعیت‌ها</option>
                <option value="pending">در انتظار بررسی (Pending)</option>
                <option value="approved">تایید شده (Approved)</option>
                <option value="refunded">مسترد شده (Refunded)</option>
                <option value="rejected">رد شده (Rejected)</option>
              </select>
            </div>

            {/* تعداد در هر صفحه */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Layers size={13} className="text-slate-400" />
              <span>تعداد:</span>
              <select
                value={limit}
                onChange={(e) => handleLimitChange(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg px-2 py-1 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value={10}>۱۰</option>
                <option value={20}>۲۰</option>
                <option value={50}>۵۰</option>
                <option value={100}>۱۰۰</option>
              </select>
            </div>
          </div>
        </div>

        {/* جدول */}
        <RefundTable refunds={refunds} loading={loading} />

        {/* صفحه‌بندی پایین */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 mt-3 border-t border-slate-100 gap-3">
          <span className="text-xs text-slate-500">
            صفحه <strong className="text-slate-700 font-mono">{page}</strong> از{" "}
            <strong className="text-slate-700 font-mono">{totalPages}</strong>{" "}
            (مجموع{" "}
            <strong className="text-slate-700 font-mono">{totalCount}</strong>{" "}
            درخواست ثبت‌شده)
          </span>

          <div className="flex items-center gap-1.5">
            <button
              disabled={page <= 1 || loading}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition shadow-2xs"
            >
              <ChevronRight size={15} />
              صفحه قبل
            </button>

            {/* صفحات */}
            <div className="flex items-center gap-1 px-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
                )
                .map((p, idx, arr) => (
                  <React.Fragment key={p}>
                    {idx > 0 && arr[idx - 1] !== p - 1 && (
                      <span className="text-slate-300 px-1 text-xs">...</span>
                    )}
                    <button
                      onClick={() => setPage(p)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold font-mono transition cursor-pointer ${
                        page === p
                          ? "bg-blue-600 text-white shadow-xs"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      {p}
                    </button>
                  </React.Fragment>
                ))}
            </div>

            <button
              disabled={page >= totalPages || loading}
              onClick={() => setPage((p) => p + 1)}
              className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition shadow-2xs"
            >
              صفحه بعد
              <ChevronLeft size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
