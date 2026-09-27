import { Controller } from "react-hook-form";
import UploadBoxField from "../../Car-document/UploadBoxField_small_preview/UploadBoxField";

export default function InsuranceCheckboxSection({
  control,
  watch,
  setValue,
  errors,
}) {
  const hasActiveInsurance = watch("has_active_insurance_transfer");

  const handleStableFileChange = async (fieldName, file) => {
    if (!file) {
      setValue(fieldName, null, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      return;
    }

    try {
      const buffer = await file.arrayBuffer();

      setValue(
        fieldName,
        {
          buffer,
          name: file.name,
          type: file.type,
          size: file.size,
          lastModified: file.lastModified,
        },
        {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        },
      );
    } catch (error) {
      console.error("خطا در پایدارسازی فایل:", error);
    }
  };

  return (
    <div className="bg-white p-16 rounded-2xl border border-gray-100 shadow-sm">
      <Controller
        name="has_active_insurance_transfer"
        control={control}
        render={({ field }) => (
          <label className="flex items-center gap-3 cursor-pointer mb-4">
            <input
              type="checkbox"
              checked={field.value === "1"}
              onChange={(e) => {
                const value = e.target.checked ? "1" : "0";
                field.onChange(value);

                if (value === "0") {
                  setValue("endorsement_image_url", null, {
                    shouldValidate: true,
                  });
                }
              }}
              className="checkbox checkbox-warning w-10 h-10"
            />

            <span className="font-bold text-gray-700">
              بیمه‌نامه فعال روی پلاک قبلی دارم
            </span>
          </label>
        )}
      />

      {hasActiveInsurance === "1" && (
        <UploadBoxField
          label="الحاقیه بیمه نامه قبلی*"
          file={watch("endorsement_image_url")}
          fileName={watch("endorsement_image_url")?.name}
          error={errors.endorsement_image_url}
          onChange={(file) =>
            handleStableFileChange("endorsement_image_url", file)
          }
        />
      )}
    </div>
  );
}
