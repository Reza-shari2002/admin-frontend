import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { context } from "../../../context/Formcontext";
import { basicInformationSchema } from "../validation/basicInformationSchema";

function useBasicInformation() {
  const navigate = useNavigate();
  const { current_page, set_current_page, set_data, data } =
    useContext(context);

  // ۱. اسکرول نرم به بالا در اولین رندر
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ۲. گارد مسیر (Route Guard)
  useEffect(() => {
    if (current_page < 2) {
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
    resolver: yupResolver(basicInformationSchema),
    defaultValues: {
      first_name: data.first_name || "",
      last_name: data.last_name || "",
      phone_number: data.phone_number || "",
      national_code: data.national_code || "",
      birthday_date: data.birthday_date || "",
      postal_code: data.postal_code || "",
      address: data.address || "",

      // national_id_image_url: data.national_id_image_url || null,
    },
    mode: "onTouched",
  });

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
    set_current_page(3);
    set_data((prev) => ({
      ...prev,
      ...formData,
    }));
    navigate("/Owner-policyholder");
  };

  async function serializeFile(file) {
    if (!file) {
      setValue("national_id_image_url", null, { shouldValidate: true });
      return;
    }

    try {
      // تبدیل فایل به ساختار پایدار قابل ذخیره در Context
      const buffer = await file.arrayBuffer();
      const serializableFile = {
        buffer: buffer,
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
      };

      setValue("national_id_image_url", serializableFile, {
        shouldValidate: true,
      });
    } catch (err) {
      console.error("خطا در پردازش و پایدارسازی فایل:", err);
    }
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    control,
    watch,
    setValue,
    errors,
    isSubmitting,
    serializeFile,
  };
}

export default useBasicInformation;
