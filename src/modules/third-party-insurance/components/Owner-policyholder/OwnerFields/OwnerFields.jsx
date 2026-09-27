import React from "react";
import { Controller } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Calendar } from "lucide-react";

function OwnerFields({ register, control, errors }) {
  const baseInput = "border rounded-xl p-3 outline-none transition-all bg-gray-50/50";
  const ok = "border-gray-200 focus:border-orange-500";
  const bad = "border-red-400 focus:border-red-500";

  const inputClass = (name) => `${baseInput} ${errors?.[name] ? bad : ok}`;

  const ErrorText = ({ name }) =>
    errors?.[name] ? (
      <p className="text-xs text-red-500 mt-1">{errors[name].message}</p>
    ) : null;

  return (
    <div className="grid grid-cols-2 gap-4 border-t pt-6 mt-4 border-gray-100">
      {/* نام و نام خانوادگی مالک */}
      <div className="flex flex-col gap-1 col-span-2 sm:col-span-1">
        <label className="text-sm font-bold text-gray-700">نام و نام خانوادگی مالک *</label>
        <input
          type="text"
          placeholder="نام و نام خانوادگی"
          className={inputClass("owner_full_name")}
          {...register("owner_full_name")}
        />
        <ErrorText name="owner_full_name" />
      </div>

      {/* کد ملی مالک */}
      <div className="flex flex-col gap-1 col-span-2 sm:col-span-1">
        <label className="text-sm font-bold text-gray-700">کد ملی مالک *</label>
        <input
          type="text"
          placeholder="1234567890"
          dir="ltr"
          className={`${inputClass("owner_national_code")} text-left`}
          {...register("owner_national_code")}
        />
        <ErrorText name="owner_national_code" />
      </div>

      {/* تاریخ تولد مالک */}
      <div className="flex flex-col gap-1 col-span-2 sm:col-span-1">
        <label className="text-sm font-bold text-gray-700">تاریخ تولد مالک (شمسی) *</label>
        <Controller
          name="owner_birthday_date"
          control={control}
          render={({ field: { onChange, value } }) => (
            <div className="relative w-full">
              <DatePicker
                value={value || ""}
                onChange={(date) => {
                  if (date) {
                    const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
                    const formatted = date.format("YYYY/MM/DD", englishDigits);
                    onChange(formatted);
                  } else {
                    onChange("");
                  }
                }}
                digits={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="top-right"
                format="YYYY/MM/DD"
                containerClassName="w-full"
                inputClass={`${inputClass("owner_birthday_date")} text-left w-full pl-10 cursor-pointer`}
                placeholder="1381/01/05"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Calendar size={18} />
              </div>
            </div>
          )}
        />
        <ErrorText name="owner_birthday_date" />
      </div>

      {/* شماره موبایل مالک */}
      <div className="flex flex-col gap-1 col-span-2 sm:col-span-1">
        <label className="text-sm font-bold text-gray-700">شماره موبایل مالک *</label>
        <input
          type="text"
          placeholder="09123456789"
          dir="ltr"
          className={`${inputClass("owner_phone_number")} text-left`}
          {...register("owner_phone_number")}
        />
        <ErrorText name="owner_phone_number" />
      </div>
    </div>
  );
}

export default OwnerFields;
