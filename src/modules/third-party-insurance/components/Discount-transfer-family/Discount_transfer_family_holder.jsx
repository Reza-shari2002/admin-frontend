import React from "react";
import { Controller } from "react-hook-form";

import Progressbarandheader from "../../../../components/common/Progressbarandheader";
import Button_submit from "../../../../components/common/Button_submit";
import FamilyDiscountSection from "./FamilyDiscountSection/FamilyDiscountSection";
import useDiscountTransferFamily from "../../hooks/useDiscountTransferFamily";
import FamilyTransferToggle from "./FamilyTransferToggle/FamilyTransferToggle";
function Discount_transfer_family_holder() {
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    errors,
    isSubmitting,
    hasRelativeTransfer,
  } = useDiscountTransferFamily();

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto space-y-6"
    >
      <Progressbarandheader
        current_step={6}
        title="انتقال بیمه به بستگان"
        body="لطفاً اطلاعات خود و مدارک مورد نیاز را بارگذاری کنید."
      />
      <Controller
        name="is_relative_transfer"
        control={control}
        render={({ field }) => (
          <FamilyTransferToggle
            label="    آیا در صورت تغییر مالکیت خودرو در طی بیمه نامه سال قبل قصد انتقال تخفیف از بستگان را دارید؟"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      {hasRelativeTransfer === "0" && (
        <div className="h-[200px] w-full bg-transparent"></div>
      )}

      {hasRelativeTransfer === "1" && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <FamilyDiscountSection
            watch={watch}
            setValue={setValue}
            errors={errors}
          />
        </div>
      )}

      <div className="pt-4">
        <Button_submit loading={isSubmitting} />
      </div>
    </form>
  );
}

export default Discount_transfer_family_holder;
