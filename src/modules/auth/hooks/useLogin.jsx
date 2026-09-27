import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { context } from "../../../context/Formcontext";
import { loginSchema } from "../validation/loginschema";
import { sendOtpApi } from "../services/SendOtpservice";

function useLogin() {
  const navigate = useNavigate();
  const { phone_number, set_phone_number, showToast } = useContext(context);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      phone_number: phone_number || "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (formData) => {
    setApiError(""); // ریست کردن خطای قبلی

    // فراخوانی سرویس لاگین
    const result = await sendOtpApi(formData.phone_number);

    if (result.success) {
      // ۱. نمایش پیام موفقیت با توست
      if (showToast) {
        showToast(result.message || "کد تأیید با موفقیت ارسال شد", "success");
      }

      // ۲. ذخیره شماره موبایل در کانتکست جهت استفاده در مرحله OTP
      if (set_phone_number) {
        set_phone_number(formData.phone_number);
      }

      // ۳. هدایت کاربر به صفحه تایید کد OTP
      navigate("/verify");
    } else {
      // پیغام خطای سرور
      const errorMessage = result.error || "خطایی در ارسال کد رخ داد";

      // ۱. نمایش توست خطا بالای صفحه
      if (showToast) {
        showToast(errorMessage, "error");
      }

      // ۲. تنظیم خطای دریافت شده در استیت و اینپوت
      setApiError(errorMessage);
      setError("phone_number", {
        type: "server",
        message: errorMessage,
      });
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    apiError,
    setValue,
    watch,
  };
}

export default useLogin;
