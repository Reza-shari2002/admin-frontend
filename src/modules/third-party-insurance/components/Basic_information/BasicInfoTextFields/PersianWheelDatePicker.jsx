// components/PersianWheelDatePicker.jsx
import React, { useState, useEffect, useRef } from "react";
import { Calendar, ChevronUp, ChevronDown } from "lucide-react";

const PERSIAN_MONTHS = [
  { id: "01", name: "فروردین" },
  { id: "02", name: "اردیبهشت" },
  { id: "03", name: "خرداد" },
  { id: "04", name: "تیر" },
  { id: "05", name: "مرداد" },
  { id: "06", name: "شهریور" },
  { id: "07", name: "مهر" },
  { id: "08", name: "آبان" },
  { id: "09", name: "آذر" },
  { id: "10", name: "دی" },
  { id: "11", name: "بهمن" },
  { id: "12", name: "اسفند" },
];

const toFarsiDigits = (num) =>
  String(num).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

// دریافت تاریخ امروز شمسی با Intl (برای مقدار اولیه ستون‌ها)
const getTodayPersian = () => {
  const parts = new Intl.DateTimeFormat("fa-IR-u-ca-persian-nu-latn", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const y = parts.find((p) => p.type === "year")?.value || "1404";
  const m = parts.find((p) => p.type === "month")?.value || "01";
  const d = parts.find((p) => p.type === "day")?.value || "01";
  return {
    year: parseInt(y, 10),
    month: m.padStart(2, "0"),
    day: parseInt(d, 10),
  };
};

export default function PersianWheelDatePicker({
  value,
  onChange,
  placeholder = "1380/01/01",
  className = "",
  minYear = 1320,
  maxYear = 1405,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const today = getTodayPersian();

  const [selectedYear, setSelectedYear] = useState(today.year);
  const [selectedMonth, setSelectedMonth] = useState(today.month);
  const [selectedDay, setSelectedDay] = useState(today.day);

  // هماهنگ‌سازی مقدار ورودی اولیه
  useEffect(() => {
    if (value && typeof value === "string" && value.includes("/")) {
      const [y, m, d] = value.split("/");
      if (y && m && d) {
        setSelectedYear(parseInt(y, 10));
        setSelectedMonth(m.padStart(2, "0"));
        setSelectedDay(parseInt(d, 10));
      }
    }
  }, [value]);

  // بستن پاپ‌آپ با کلیک بیرون
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // محاسبه تعداد روزهای ماه
  const getDaysInMonth = (monthStr) => {
    const m = parseInt(monthStr, 10);
    if (m <= 6) return 31;
    if (m <= 11) return 30;
    return 29; // اسفند
  };

  const daysCount = getDaysInMonth(selectedMonth);
  const daysList = Array.from({ length: daysCount }, (_, i) => i + 1);

  // لیست سال‌ها (از جدید به قدیم)
  const yearsList = [];
  for (let y = maxYear; y >= minYear; y--) {
    yearsList.push(y);
  }

  const handleConfirm = () => {
    const dayFormatted = String(Math.min(selectedDay, daysCount)).padStart(2, "0");
    const formatted = `${selectedYear}/${selectedMonth}/${dayFormatted}`;
    onChange(formatted);
    setIsOpen(false);
  };

  const itemClass = (isSelected) =>
    `text-sm py-1 px-3 rounded-lg transition-all w-full text-center ${
      isSelected
        ? "font-bold text-orange-600 bg-orange-50 text-base"
        : "text-gray-400 hover:text-gray-700"
    }`;

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* اینپوت اصلی */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between cursor-pointer ${className}`}
      >
        <span className={value ? "text-gray-900 font-medium" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <Calendar size={18} className="text-gray-400" />
      </div>

      {/* پاپ‌آپ چرخشی */}
      {isOpen && (
        <div className="absolute z-50 bottom-full mb-2 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 animate-in fade-in zoom-in-95">
          {/* ستون‌های انتخاب */}
          <div className="grid grid-cols-3 gap-2 py-3">
            {/* ستون سال */}
            <div className="flex flex-col items-center">
              <ChevronUp size={16} className="text-gray-300 mb-1" />
              <div className="h-36 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 w-full flex flex-col items-center py-12 gap-2">
                {yearsList.map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => setSelectedYear(year)}
                    className={itemClass(year === selectedYear)}
                  >
                    {toFarsiDigits(year)}
                  </button>
                ))}
              </div>
              <ChevronDown size={16} className="text-gray-300 mt-1" />
            </div>

            {/* ستون ماه */}
            <div className="flex flex-col items-center border-x border-gray-100">
              <ChevronUp size={16} className="text-gray-300 mb-1" />
              <div className="h-36 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 w-full flex flex-col items-center py-12 gap-2">
                {PERSIAN_MONTHS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMonth(m.id)}
                    className={itemClass(m.id === selectedMonth)}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
              <ChevronDown size={16} className="text-gray-300 mt-1" />
            </div>

            {/* ستون روز */}
            <div className="flex flex-col items-center">
              <ChevronUp size={16} className="text-gray-300 mb-1" />
              <div className="h-36 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 w-full flex flex-col items-center py-12 gap-2">
                {daysList.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={itemClass(day === selectedDay)}
                  >
                    {toFarsiDigits(day)}
                  </button>
                ))}
              </div>
              <ChevronDown size={16} className="text-gray-300 mt-1" />
            </div>
          </div>

          {/* نوار دکمه‌ها */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={handleConfirm}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-all"
            >
              تایید
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
