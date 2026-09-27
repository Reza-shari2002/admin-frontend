import React from "react";
import TicketTable from "../components/TicketTable/TicketTable";
import { useTicket } from "../hooks/useTickets";
import {
  Search,
  RotateCw,
  Filter,
  X,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Layers,
} from "lucide-react";

export default function Ticket_holder() {
  const {
    tickets,
    loading,
    actionLoadingId,
    page,
    setPage,
    limit,
    handleLimitChange,
    totalPages,
    totalCount,
    selectedType,
    handleTypeChange,
    searchQuery,
    setSearchQuery,
    isVerifying,
    verifyResult,
    isVerifyModalOpen,
    setIsVerifyModalOpen,
    handleVerify,
    handleUseTicket,
    handleCancelTicket,
    refreshTickets,
  } = useTicket();

  const onSearchSubmit = (e) => {
    e.preventDefault();
    handleVerify();
  };

  return (
    <div className="flex flex-col gap-5 p-6">
      {/* ۱. نوار استیکی چسبان در بالای صفحه */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border border-slate-200/80 p-4 rounded-2xl shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
          {/* فرم استعلام بلیت */}
          <form
            onSubmit={onSearchSubmit}
            className="lg:col-span-8 flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="استعلام سریع: کد بلیت، شماره موبایل یا کدملی..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-4 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition"
              />
              <Search
                size={18}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
            <button
              type="submit"
              disabled={isVerifying}
              className="h-11 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer shadow-xs shrink-0"
            >
              {isVerifying ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "استعلام"
              )}
            </button>
          </form>

          {/* فیلتر نوع و رفرش */}
          {/* فیلتر نوع و رفرش */}
          <div className="lg:col-span-4 flex items-center justify-end gap-2.5">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl">
              <Filter size={15} className="text-slate-400" />
              <select
                value={selectedType}
                onChange={(e) => handleTypeChange(e.target.value)}
                className="bg-transparent text-xs text-slate-700 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="">همه انواع بلیت</option>
                <option value="vip">ویژه (VIP)</option>
                <option value="gamer">گیمر (Gamer)</option>
                <option value="regular">عادی (Regular)</option>
              </select>
            </div>

            <button
              onClick={refreshTickets}
              disabled={loading}
              className="h-11 w-11 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 transition disabled:opacity-50 cursor-pointer shrink-0"
              title="بارگذاری مجدد"
            >
              <RotateCw
                size={17}
                className={loading ? "animate-spin text-blue-600" : ""}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ۲. کانتینر کارت جدول */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-2 h-5 bg-blue-600 rounded-full" />
            <h2 className="text-sm font-bold text-slate-800">
              لیست بلیت‌های صادرشده
            </h2>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full font-mono">
              {totalCount}
            </span>
          </div>

          {/* انتخاب تعداد در هر صفحه (Limit) */}
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Layers size={14} className="text-slate-400" />
            <span>تعداد در صفحه:</span>
            <select
              value={limit}
              onChange={(e) => handleLimitChange(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg px-2 py-1 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value={5}>5</option>
              <option value={10}>۱۰</option>
              <option value={20}>۲۰</option>
              <option value={50}>۵۰</option>
              <option value={100}>۱۰۰</option>
            </select>
          </div>
        </div>

        {/* جدول */}
        <TicketTable
          tickets={tickets}
          loading={loading}
          actionLoadingId={actionLoadingId}
          onUseTicket={handleUseTicket}
          onCancelTicket={handleCancelTicket}
        />

        {/* صفحه‌بندی پایین */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 mt-3 border-t border-slate-100 gap-3">
          <span className="text-xs text-slate-500">
            صفحه <strong className="text-slate-700 font-mono">{page}</strong> از{" "}
            <strong className="text-slate-700 font-mono">{totalPages}</strong>{" "}
            (مجموع{" "}
            <strong className="text-slate-700 font-mono">{totalCount}</strong>{" "}
            بلیت)
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

            {/* لیست شماره صفحات */}
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

      {/* ۳. مودال نتیجه استعلام */}
      {/* ۳. مودال نتیجه استعلام جامع بلیت */}
      {isVerifyModalOpen && verifyResult && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-2xl p-6 shadow-xl flex flex-col max-h-[85vh]">
            {/* هدر مودال */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-blue-600" size={20} />
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    نتیجه استعلام بلیت
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    تعداد یافت شده:{" "}
                    {verifyResult.total_found ??
                      (verifyResult.tickets?.length || 0)}{" "}
                    بلیت
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsVerifyModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* لیست کارت‌های بلیت */}
            <div className="overflow-y-auto py-3 space-y-3 pr-1">
              {verifyResult.tickets?.map((item) => {
                const isActing = actionLoadingId === item.ticket_id;

                // فرمت تاریخ شمسی
                const formattedDate = item.created_at
                  ? new Intl.DateTimeFormat("fa-IR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    }).format(new Date(item.created_at))
                  : "---";

                return (
                  <div
                    key={item.ticket_id}
                    className="p-4 bg-slate-50/80 border border-slate-200 rounded-xl flex flex-col gap-3.5 hover:border-slate-300 transition"
                  >
                    {/* ردیف اول: شناسه‌ها، نوع بلیت و وضعیت پرداخت */}
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* شناسه بلیت */}
                        <span className="font-mono text-xs font-bold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                          شناسه #{item.ticket_id}
                        </span>

                        {/* کد رهگیری بلیت */}
                        <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md">
                          {item.ticket_code}
                        </span>

                        {/* نوع بلیت */}
                        <span className="text-xs bg-slate-200/80 text-slate-700 px-2.5 py-0.5 rounded-md font-bold uppercase">
                          {item.ticket_type} ({item.quantity || 1} عدد)
                        </span>
                      </div>

                      {/* وضعیت سیستمی بلیت (Status) */}
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                            item.status === "active" || item.status === "paid"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : item.status === "cancelled"
                                ? "bg-rose-50 text-rose-700 border-rose-200"
                                : "bg-slate-100 text-slate-600 border-slate-200"
                          }`}
                        >
                          وضعیت: {item.status || "ثبت شده"}
                        </span>
                      </div>
                    </div>

                    {/* ردیف دوم: اطلاعات خریدار و کدملی */}
                    <div className="bg-white p-2.5 rounded-lg border border-slate-100 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-700">
                      <div className="flex items-center gap-1">
                        <span className="text-slate-400">خریدار:</span>
                        <span className="font-bold text-slate-800">
                          {item.user?.full_name || "مهمان"}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 font-mono">
                        <span className="text-slate-400 font-sans">تلفن:</span>
                        <span className="text-slate-700 font-medium">
                          {item.user?.phone || "---"}
                        </span>
                      </div>

                      {item.user?.national_code && (
                        <div className="flex items-center gap-1 font-mono">
                          <span className="text-slate-400 font-sans">
                            کدملی:
                          </span>
                          <span className="text-slate-700 font-medium">
                            {item.user.national_code}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* ردیف سوم: جزئیات مالی، تاریخ صدور و صندلی‌ها */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      {/* مبلغ کل */}
                      <div className="bg-white p-2 rounded-lg border border-slate-100 flex items-center justify-between">
                        <span className="text-slate-400 text-[11px]">
                          مبلغ پرداختی:
                        </span>
                        <span className="font-mono font-bold text-slate-800">
                          {Number(item.total_amount || 0).toLocaleString(
                            "fa-IR",
                          )}{" "}
                          <span className="text-[10px] text-slate-400 font-sans">
                            تومان
                          </span>
                        </span>
                      </div>

                      {/* تاریخ صدور */}
                      <div className="bg-white p-2 rounded-lg border border-slate-100 flex items-center justify-between">
                        <span className="text-slate-400 text-[11px]">
                          تاریخ صدور:
                        </span>
                        <span className="font-mono text-slate-600 text-[11px]">
                          {formattedDate}
                        </span>
                      </div>

                      {/* صندلی‌ها */}
                      <div className="bg-white p-2 rounded-lg border border-slate-100 flex items-center justify-between">
                        <span className="text-slate-400 text-[11px]">
                          صندلی‌ها:
                        </span>
                        <div className="flex items-center gap-1 flex-wrap">
                          {item.seats && item.seats.length > 0 ? (
                            item.seats.map((s, idx) => (
                              <span
                                key={idx}
                                className="bg-blue-50 text-blue-700 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded border border-blue-100"
                              >
                                {s.seat_number || s.seat_id}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-400 text-[11px]">
                              ندارد
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* ردیف چهارم: دکمه‌های عملیاتی و وضعیت ورود */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 mt-1">
                      {/* وضعیت ورود */}
                      <div>
                        {item.is_used ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                            ✓ این بلیت قبلاً استفاده شده است
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                            ● بلیت آماده ورود (استفاده نشده)
                          </span>
                        )}
                      </div>

                      {/* اکشن‌ها */}
                      <div className="flex items-center gap-2">
                        {!item.is_used ? (
                          <button
                            onClick={() => handleUseTicket(item.ticket_id)}
                            disabled={isActing}
                            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-xs disabled:opacity-50"
                          >
                            {isActing ? "در حال پردازش..." : "ثبت ورود"}
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400 font-medium px-2">
                            ورود ثبت شد
                          </span>
                        )}

                        <button
                          onClick={() => handleCancelTicket(item.ticket_id)}
                          disabled={isActing}
                          className="px-2.5 py-1.5 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg text-xs font-semibold transition cursor-pointer disabled:opacity-50"
                        >
                          ابطال بلیت
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
