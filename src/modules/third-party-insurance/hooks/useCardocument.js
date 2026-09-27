import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { context } from "../../../context/Formcontext";
import { cardocumentSchema } from "../validation/cardocumentSchema";
function useCardocument() {
  const navigate = useNavigate();
  const { current_page, set_current_page, set_data, data } =
    useContext(context);

  // ۱. اسکرول نرم به بالا در اولین رندر
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ۲. گارد مسیر (Route Guard)
  useEffect(() => {
    if (current_page < 4) {
      navigate("/home");
    }
  }, [current_page, navigate]);

  // ۳. راه‌اندازی React Hook Form با مقادیر پیش‌فرض
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(cardocumentSchema),
    defaultValues: {
      document_car_type: data.document_car_type || "0",
      car_card_image_front_url: data.car_card_image_front_url || null,
      car_card_image_back_url: data.car_card_image_back_url || null,
      green_paper_image_url: data.green_paper_image_url || null,
      has_prev_insurance: data.has_prev_insurance ?? "1",
    },
    mode: "onTouched",
  });

  const docType = watch("document_car_type");

  // ۴. مدیریت تغییر نوع مدرک و پاک‌کردن مقادیر قبلی برای جلوگیری از ارسال داده‌های اضافی
  const handleDocumentTypeChange = (value, fieldOnChange) => {
    fieldOnChange(value);

    if (value === "0") {
      setValue("green_paper_image_url", null, { shouldValidate: false });
    } else {
      setValue("car_card_image_front_url", null, { shouldValidate: false });
      setValue("car_card_image_back_url", null, { shouldValidate: false });
    }
  };

  // ۵. اکشن سابمیت فرم
  const onSubmit = (formData) => {
    set_current_page(5);
    set_data((prev) => ({
      ...prev,
      ...formData,
    }));
    navigate("/Discount_transfer");
  };

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
  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    control,
    watch,
    setValue,
    errors,
    isSubmitting,
    docType,
    handleDocumentTypeChange,
    serializeFile,
  };
}

export default useCardocument;
