import React from "react";
import { Controller } from "react-hook-form";
import PersianWheelDatePicker from "./PersianWheelDatePicker"; // آدرس کامپوننت بالا

function BasicInfoTextFields({ register, control, errors }) {
  const baseInput =
    "border rounded-xl p-3 outline-none transition-all bg-gray-50/50";
  const ok = "border-gray-200 focus:border-orange-500";
  const bad = "border-red-400 focus:border-red-500";

  const inputClass = (name) => `${baseInput} ${errors?.[name] ? bad : ok}`;

  const ErrorText = ({ name }) =>
    errors?.[name] ? (
      <p className="text-xs text-red-500 mt-1">{errors[name].message}</p>
    ) : null;

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* نام و نام خانوادگی */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-gray-700">نام *</label>
        <input
          type="text"
          placeholder="نام"
          className={inputClass("first_name")}
          {...register("first_name")}
        />
        <ErrorText name="first_name" />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-gray-700">
          نام خانوادگی *
        </label>
        <input
          type="text"
          placeholder="نام خانوادگی"
          className={inputClass("last_name")}
          {...register("last_name")}
        />
        <ErrorText name="last_name" />
      </div>

      {/* موبایل و کد ملی */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-gray-700">
          شماره موبایل *
        </label>
        <input
          type="text"
          placeholder="09123456789"
          dir="ltr"
          className={`${inputClass("phone_number")} text-left`}
          {...register("phone_number")}
        />
        <ErrorText name="phone_number" />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-gray-700">کد ملی *</label>
        <input
          type="text"
          placeholder="1234567890"
          dir="ltr"
          className={`${inputClass("national_code")} text-left`}
          {...register("national_code")}
        />
        <ErrorText name="national_code" />
      </div>

      {/* تاریخ تولد چرخشی (Wheel Picker) */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-gray-700">
          تاریخ تولد (شمسی) *
        </label>
        <Controller
          name="birthday_date"
          control={control}
          render={({ field: { onChange, value } }) => (
            <PersianWheelDatePicker
              value={value}
              onChange={onChange}
              className={`${inputClass("birthday_date")} text-left w-full`}
              placeholder="1380/01/01"
              minYear={1320}
              maxYear={1405}
            />
          )}
        />
        <ErrorText name="birthday_date" />
      </div>

      {/* کد پستی */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-bold text-gray-700">کد پستی *</label>
        <input
          type="text"
          placeholder="کد پستی حتما در سامانه املاک ثبت شده باشد"
          dir="ltr"
          className={`${inputClass("postal_code")} text-left`}
          {...register("postal_code")}
        />
        <ErrorText name="postal_code" />
      </div>

      {/* آدرس */}
      <div className="flex flex-col gap-1 col-span-2">
        <label className="text-sm font-bold text-gray-700">آدرس *</label>
        <input
          type="text"
          placeholder="آدرس خود را وارد کنید"
          className={inputClass("address")}
          {...register("address")}
        />
        <ErrorText name="address" />
      </div>
    </div>
  );
}

export default BasicInfoTextFields;
