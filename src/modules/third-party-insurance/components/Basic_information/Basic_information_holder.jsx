import React from "react";
import { Controller } from "react-hook-form";

import Progressbarandheader from "../../../../components/common/Progressbarandheader";
import Button_submit from "../../../../components/common/Button_submit";

import BasicInfoTextFields from "./BasicInfoTextFields/BasicInfoTextFields";
import UploadBoxField from "./UploadBoxField/UploadBoxField";
import useBasicInformation from "../../hooks/useBasicInformation";

function Basic_information_holder() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    errors,
    isSubmitting,
    serializeFile,
  } = useBasicInformation();

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center w-full max-w-2xl mx-auto px-4 pt-0 pb-32 md:pb-12"
    >
      <Progressbarandheader
        current_step={2}
        title="تکمیل اطلاعات و مدارک"
        body="لطفاً اطلاعات خود و مدارک مورد نیاز را بارگذاری کنید."
      />

      <div className="w-full space-y-6 mt-8">
        <BasicInfoTextFields
          register={register}
          control={control}
          errors={errors}
        />

        {/*<UploadBoxField
          label="صفحه اول شناسنامه/ تصویر کارت ملی *"
          fileName={watch("national_id_image_url")?.name}
          error={errors.national_id_image_url}
          onChange={serializeFile}
        />*/}
      </div>

      <div className="w-full mt-6">
        <Button_submit loading={isSubmitting} />
      </div>
    </form>
  );
}

export default Basic_information_holder;
