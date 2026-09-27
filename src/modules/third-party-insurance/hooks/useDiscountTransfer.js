import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { context } from "../../../context/Formcontext";
import schema from "../validation/discounttransferschema";

function useDiscountTransfer() {
  const navigate = useNavigate();
  const { current_page, set_current_page, set_data, data } =
    useContext(context);

  // ۱. اسکرول نرم به بالای صفحه در اولین رندر
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ۲. گارد مسیر (Route Guard)
  useEffect(() => {
    if (current_page < 5) {
      navigate("/home");
    }
  }, [current_page, navigate]);




const serializeFile = async (fieldName, file) => {
    if (!file) {
      setValue(fieldName, null, { shouldValidate: true });
      return;
    }

    try {
      const buffer = await file.arrayBuffer();
      const serializableFile = {
        buffer: buffer,
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
      };

      setValue(fieldName, serializableFile, {
        shouldValidate: true,
      });
    } catch (err) {
      console.error(`خطا در پردازش فایل ${fieldName}:`, err);
    }
  };

  // ۳. کانفیگ React Hook Form با مقادیر پیش‌فرض
  const {
    control,
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      has_discount_transfer: data.has_discount_transfer || "0",
      plate_history_type: data.plate_history_type || "2",
      has_active_insurance_transfer: data.has_active_insurance_transfer || "0",
      plate_history_code: data.plate_history_code || "",
      plate_history_image_url: data.plate_history_image_url || null,
      endorsement_image_url: data.endorsement_image_url || null,
      prev_insurance_image_url: data.prev_insurance_image_url || null,

    },
    mode: "onTouched",
  });

  const hasDiscount = watch("has_discount_transfer");
  const hasActiveInsurance = watch("has_active_insurance_transfer");

  // ۴. ریست کردن هوشمند مقادیر پلاک و بیمه در صورت انصراف از انتقال تخفیف
  useEffect(() => {
    if (hasDiscount === "0") {
      setValue("plate_history_type", "2");
      setValue("plate_history_code", "");
      setValue("plate_history_image_url", null);
      setValue("endorsement_image_url", null);
      setValue("prev_insurance_image_url" , null);
      setValue("has_active_insurance_transfer", "0");
    }
  }, [hasDiscount, setValue]);

  // ۵. ریست کردن الحاقیه در صورت عدم نیاز به انتقال بیمه فعال
  useEffect(() => {
    if (hasActiveInsurance === "0") {
      setValue("endorsement_image_url", null);
    }
  }, [hasActiveInsurance, setValue]);

  // ۶. اکشن سابمیت و رفتن به مرحله بعد
  const onSubmit = (formData) => {
    set_current_page(6);
    set_data((prev) => ({ ...prev, ...formData }));
    navigate("/Discount-transfer-family");
  };

  return {
    control,
    register,
    watch,
    handleSubmit: handleSubmit(onSubmit),
    setValue,
    errors,
    isSubmitting,
    hasDiscount,
    serializeFile
  };
}

export default useDiscountTransfer;
