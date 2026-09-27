import React from "react";
import { Controller } from "react-hook-form";

import Progressbarandheader from "../../../../components/common/Progressbarandheader";
import Button_submit from "../../../../components/common/Button_submit";

import UploadBoxField from "./UploadBoxField/UploadBoxField";
import OwnerTypeSelector from "./OwnerTypeSelector/OwnerTypeSelector";
import OwnerFields from "./OwnerFields/OwnerFields";
import useOwner_policyholder from "../../hooks/useOwner_policyholder";

function Owner_policyholder_holder() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    errors,
    isSubmitting,
    sameType,
    handleOwnerTypeChange,
    serializeFile,
  } = useOwner_policyholder();

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-full max-w-2xl mx-auto px-4 pt-0 pb-32 md:pb-12"
    >
      <Progressbarandheader
        current_step={3}
        title="تکمیل اطلاعات و مدارک"
        body="لطفاً اطلاعات خود و مدارک مورد نیاز را بارگذاری کنید."
      />

      <div className="w-full space-y-6 mt-8">
        {/* ۱. انتخاب نوع مالکیت */}
        <Controller
          name="same_policyholder_owner"
          control={control}
          render={({ field }) => (
            <OwnerTypeSelector
              value={field.value}
              onChange={(value) => handleOwnerTypeChange(value, field.onChange)}
              error={errors.same_policyholder_owner}
            />
          )}
        />

        {/* ۲. باکس آپلود کارت ملی (همیشه الزامی) */}
        <UploadBoxField
          label="تصویر کارت ملی *"
          file={watch("national_id_image_url")}
          fileName={watch("national_id_image_url")?.name}
          error={errors.national_id_image_url}
          onChange={(file) => serializeFile("national_id_image_url", file)}
        />

        {/* ۳. فیلدهای اضافی تنها در صورتی که مالک شخص دیگری باشد (sameType === "0") */}
        {sameType === "0" && (
          <OwnerFields
            register={register}
            control={control}
            errors={errors}
          />
        )}
      </div>

      <div className="w-full mt-8">
        <Button_submit loading={isSubmitting} />
      </div>
    </form>
  );
}

export default Owner_policyholder_holder;
