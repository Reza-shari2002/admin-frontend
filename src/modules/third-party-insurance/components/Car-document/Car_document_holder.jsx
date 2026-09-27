import { Controller } from "react-hook-form";

import Progressbarandheader from "../../../../components/common/Progressbarandheader";
import Button_submit from "../../../../components/common/Button_submit";

import DocumentTypeSelector from "./DocumentTypeSelector/DocumentTypeSelector";
import VehicleDocumentFields from "./VehicleDocumentFields/VehicleDocumentFields";
import UploadBoxField from "./UploadBoxField_small_preview/UploadBoxField";
import useCardocument from "../../hooks/useCardocument";

function Car_document_holder() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    errors,
    isSubmitting,
    docType,
    handleDocumentTypeChange,
    serializeFile,
  } = useCardocument();

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full max-w-2xl mx-auto px-4 pt-0 pb-32 md:pb-12"
      >
        <Progressbarandheader
          current_step={4}
          title="مدارک خودرو"
          body="لطفاً اطلاعات خود و مدارک مورد نیاز را بارگذاری کنید."
        />

        <div className="w-full space-y-6 mt-8">
          <Controller
            name="document_car_type"
            control={control}
            render={({ field }) => (
              <DocumentTypeSelector
                value={field.value}
                onChange={(value) =>
                  handleDocumentTypeChange(value, field.onChange)
                }
                error={errors.document_car_type}
              />
            )}
          />

          <VehicleDocumentFields
            docType={docType}
            errors={errors}
            watch={watch}
            setValue={setValue}
            serializeFile={serializeFile}
          />







        </div>

        <div className="w-full mt-6">
          <Button_submit loading={isSubmitting} />
        </div>
      </form>
    </>
  );
}

export default Car_document_holder;
