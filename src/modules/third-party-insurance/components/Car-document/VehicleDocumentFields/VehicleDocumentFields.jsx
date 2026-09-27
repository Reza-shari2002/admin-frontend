import UploadBoxField from "../UploadBoxField_small_preview/UploadBoxField";

function VehicleDocumentFields({
  docType,
  errors,
  watch,
  setValue,
  serializeFile,
}) {
  // تابع کمکی برای پایدارسازی فایل‌ها قبل از ذخیره در Context

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {docType === "0" ? (
        <>
<UploadBoxField
  label="تصویر روی کارت ماشین *"
  file={watch("car_card_image_front_url")}
  fileName={watch("car_card_image_front_url")?.name}
  error={errors.car_card_image_front_url}
  onChange={(file) => serializeFile("car_card_image_front_url", file)}
/>

<UploadBoxField
  label="تصویر پشت کارت ماشین *"
  file={watch("car_card_image_back_url")}
  fileName={watch("car_card_image_back_url")?.name}
  error={errors.car_card_image_back_url}
  onChange={(file) => serializeFile("car_card_image_back_url", file)}
/>

        </>
      ) : (
        <div className="col-span-full">
<UploadBoxField
  label="تصویر برگه سبز *"
  file={watch("green_paper_image_url")}
  fileName={watch("green_paper_image_url")?.name}
  error={errors.green_paper_image_url}
  onChange={(file) => serializeFile("green_paper_image_url", file)}
/>

        </div>
      )}
    </div>
  );
}

export default VehicleDocumentFields;
