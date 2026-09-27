import React from "react";
import UploadBoxField from "../../Basic_information/UploadBoxField/UploadBoxField";

export default function FamilyDiscountSection({ watch, setValue, errors }) {
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
    <div
      className="w-full bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm"
      dir="rtl"
    >
      <div className="flex flex-col items-center md:items-start text-center md:text-right mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold text-gray-800">
            انتقال تخفیف به بستگان
          </span>

          <svg
            className="w-6 h-6 text-orange-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>

        <p className="text-sm text-gray-500 leading-7">
          برای انتقال تخفیف بیمه به بستگان همسر-فرزند-پدر یا مادر تصاویر صفحه
          اول شناسنامه خود و شخص مورد نظر را اپلود نمایید
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative">
        <div className="flex flex-col items-center p-4">
          <h4 className="font-bold text-orange-600 mb-6 text-center text-sm md:text-base">
            شناسنامه خودم
          </h4>

          <div className="grid grid-cols-2 gap-4 w-full">
            <UploadBoxField
              label="صفحه ۱"
              fileName={watch("relationship_docs1_image_person1_url")?.name}
              error={errors.relationship_docs1_image_person1_url}
              onChange={(file) =>
                handleStableFileChange(
                  "relationship_docs1_image_person1_url",
                  file,
                )
              }
            />

            <UploadBoxField
              label="صفحه ۲"
              fileName={watch("relationship_docs2_image_person1_url")?.name}
              error={errors.relationship_docs2_image_person1_url}
              onChange={(file) =>
                handleStableFileChange(
                  "relationship_docs2_image_person1_url",
                  file,
                )
              }
            />
          </div>
        </div>

        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-gray-200 -translate-x-1/2" />

        <div className="flex flex-col items-center p-4">
          <h4 className="font-bold text-orange-600 mb-6 text-center text-sm md:text-base">
            شناسنامه شخص مورد نظر
          </h4>

          <div className="grid grid-cols-2 gap-4 w-full">
            <UploadBoxField
              label="صفحه ۱"
              fileName={watch("relationship_docs1_image_person2_url")?.name}
              error={errors.relationship_docs1_image_person2_url}
              onChange={(file) =>
                handleStableFileChange(
                  "relationship_docs1_image_person2_url",
                  file,
                )
              }
            />

            <UploadBoxField
              label="صفحه ۲"
              fileName={watch("relationship_docs2_image_person2_url")?.name}
              error={errors.relationship_docs2_image_person2_url}
              onChange={(file) =>
                handleStableFileChange(
                  "relationship_docs2_image_person2_url",
                  file,
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
