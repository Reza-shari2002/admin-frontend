import React from "react";
import { Controller } from "react-hook-form";

import Progressbarandheader from "../../../../components/common/Progressbarandheader.jsx";
import UploadBoxField from "./UploadBoxField_small_preview/UploadBoxField";
import PlateTypeSelector from "./PlateTypeSelector/PlateTypeSelector";
import InsuranceCheckboxSection from "./InsuranceCheckboxSection/InsuranceCheckboxSection";
import Button_submit from "../../../../components/common/Button_submit.jsx";
import useDiscountTransfer from "../../hooks/useDiscountTransfer.js";
import DiscountTransferToggle from "./DiscountTransferToggle/DiscountTransferToggle.jsx";

function Discount_transfer_holder() {
  const {
    control,
    register,
    watch,
    handleSubmit,
    setValue,
    errors,
    isSubmitting,
    hasDiscount,
    serializeFile
  } = useDiscountTransfer();



  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto space-y-6"
    >
      <Progressbarandheader
        current_step={5}
        title="مدارک تعویض پلاک"
        body="لطفاً اطلاعات خود و مدارک مورد نیاز را بارگذاری کنید."
      />

      <Controller
        name="has_discount_transfer"
        control={control}
        render={({ field }) => (
          <DiscountTransferToggle
            label="آیا خودرو در طی بیمه نامه سال قبل تغییر مالکیت داشته است ؟"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      {hasDiscount === "0" && (
        <div className="h-[200px] w-full bg-transparent"></div>
      )}

      {hasDiscount === "1" && (
        <div className="space-y-6 animate-in fade-in duration-500">
          <UploadBoxField
            label="تصویر بیمه نامه سال قبل *"
            file={watch("prev_insurance_image_url")}
            fileName={watch("prev_insurance_image_url")?.name}
            error={errors.prev_insurance_image_url}
            onChange={(file) => serializeFile("prev_insurance_image_url", file)}
          />

          <PlateTypeSelector
            register={register}
            watch={watch}
            setValue={setValue}
            errors={errors}
          />

          <InsuranceCheckboxSection
            control={control}
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

export default Discount_transfer_holder;
