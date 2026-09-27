import UploadBoxField from "../UploadBoxField/UploadBoxField";

function VehicleDocumentFields({ docType, errors, watch, setValue }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {docType === "0" ? (
        <>
          <UploadBoxField
            label="تصویر روی کارت ماشین *"
            fileName={watch("car_card_image_front_url")?.name}
            error={errors.car_card_image_front_url}
            onChange={(file) => {
              setValue("car_card_image_front_url", file, {
                shouldValidate: true,
              });
            }}
          />

          <UploadBoxField
            label="تصویر پشت کارت ماشین *"
            fileName={watch("car_card_image_back_url")?.name}
            error={errors.car_card_image_back_url}
            onChange={(file) => {
              setValue("car_card_image_back_url", file, {
                shouldValidate: true,
              });
            }}
          />
        </>
      ) : (
        <div className="col-span-full">
          <UploadBoxField
            label="تصویر برگه سبز *"
            fileName={watch("green_paper_image_url")?.name}
            error={errors.green_paper_image_url}
            onChange={(file) => {
              setValue("green_paper_image_url", file, { shouldValidate: true });
            }}
          />
        </div>
      )}
    </div>
  );
}

export default VehicleDocumentFields;
