import { useContext, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { context } from "../../../context/Formcontext";
import { verifyOtpApi } from "../services/VerifyOtpservice";
import { sendOtpApi } from "../services/SendOtpservice";
import verifyOtpSchema from "../validation/verifyOtpSchema";

const RESEND_TIMER = 180; // ۳ دقیقه

export default function useVerifyOtp() {
  const navigate = useNavigate();
  const { phone_number, set_otp, showToast } = useContext(context);
  const [timeLeft, setTimeLeft] = useState(RESEND_TIMER);
  const [isResending, setIsResending] = useState(false);
  const inputRef = useRef(null);

  // ستاپ React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({
    resolver: yupResolver(verifyOtpSchema),
    mode: "onChange",
    defaultValues: { otp: "" },
  });

  const otpValue = watch("otp") || "";

  // فوکوس اولیه روی اینپوت
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // محافظت از روت در صورت نبود شماره موبایل
  useEffect(() => {
    if (!phone_number) {
      navigate("/login", { replace: true });
    }
  }, [phone_number, navigate]);

  // مدیریت تایمر ۳ دقیقه‌ای
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = () => {
    const m = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const s = String(timeLeft % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // ارسال فرم به بک‌اند
  const onSubmit = async (data) => {
    set_otp(data.otp);
    const result = await verifyOtpApi(phone_number, data.otp);

    if (result.success) {
      if (result.data?.accesstoken) {
        localStorage.setItem("accesstoken", result.data.accesstoken);
      }
      showToast("ورود با موفقیت انجام شد", "success");
      navigate("/home");
    } else {
      showToast(result.error || "کد وارد شده صحیح نمی‌باشد", "error");
      reset({ otp: "" });
      inputRef.current?.focus();
    }
  };

  // ارسال مجدد کد
  const resendOtp = async (e) => {
    if (e) e.preventDefault();
    if (timeLeft > 0 || isResending) return;

    setIsResending(true);
    try {
      const result = await sendOtpApi(phone_number);
      if (result.success) {
        showToast("کد تأیید مجدداً ارسال شد", "success");
        setTimeLeft(RESEND_TIMER);
        reset({ otp: "" });
        inputRef.current?.focus();
      } else {
        showToast(result.error || "خطا در ارسال مجدد کد", "error");
      }
    } catch (err) {
      showToast("خطای ارتباط با سرور", "error");
    } finally {
      setIsResending(false);
    }
  };

  const goBackToLogin = (e) => {
    if (e) e.preventDefault();
    navigate("/login");
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    setValue,
    otpValue,
    inputRef,
    timeLeft,
    formatTime,
    isSubmitting,
    isResending,
    isValid,
    phone_number,
    resendOtp,
    goBackToLogin,
  };
}
