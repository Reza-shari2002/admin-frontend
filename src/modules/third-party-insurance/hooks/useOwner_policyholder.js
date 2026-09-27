import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { context } from "../../../context/Formcontext";
import { samepolicy_holderSchema } from "../validation/samepolicy_holderSchema";

function useOwner_policyholder() {
  const navigate = useNavigate();
  const { current_page, set_current_page, set_data, data } = useContext(context);

  // ۱. اسکرول نرم به بالا
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ۲. گارد مسیر (Route Guard)
  useEffect(() => {
    if (current_page < 3) {
      navigate("/home");
    }
  }, [current_page, navigate]);

  // ۳. راه‌اندازی React Hook Form
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(samepolicy_holderSchema),
    defaultValues: {
      same_policyholder_owner: data.same_policyholder_owner || "1", // پیش‌فرض: مالک خودم هستم
      national_id_image_url: data.national_id_image_url || null,
      owner_national_code: data.owner_national_code || "",
      owner_birthday_date: data.owner_birthday_date || "",
      owner_full_name: data.owner_full_name || "",
      owner_phone_number: data.owner_phone_number || "",
    },
    mode: "onTouched",
  });

  const sameType = watch("same_policyholder_owner");

  // ۴. مدیریت تغییر نوع مالکیت و پاک‌کردن مقادیر اضافی
  const handleOwnerTypeChange = (value, fieldOnChange) => {
    fieldOnChange(value);

    // اگر مالک خود شخص باشد، مقادیر مربوط به شخص دیگر پاک می‌شود
    if (value === "1") {
      setValue("owner_full_name", null, { shouldValidate: false });
      setValue("owner_national_code", null, { shouldValidate: false });
      setValue("owner_birthday_date", null, { shouldValidate: false });
      setValue("owner_phone_number", null, { shouldValidate: false });
    }
  };

  // ۵. سریالایز کردن فایل جهت ذخیره در Context
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

  // ۶. اکشن سابمیت فرم
  const onSubmit = (formData) => {
    set_current_page(4);
    set_data((prev) => ({
      ...prev,
      ...formData,
    }));
    navigate("/Car-document");
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    control,
    watch,
    setValue,
    errors,
    isSubmitting,
    sameType,
    handleOwnerTypeChange,
    serializeFile,
  };
}

export default useOwner_policyholder;
