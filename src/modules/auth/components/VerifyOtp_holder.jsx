import React from "react";
import { KeyRound, ArrowRight, RefreshCw, CheckCircle2 } from "lucide-react";
import useVerifyOtp from "../hooks/useVerifyOtp";

const OTP_LENGTH = 6;

function VerifyOtp_holder() {
  const {
    register,
    handleSubmit,
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
  } = useVerifyOtp();

  const canResend = timeLeft <= 0;
  const { ref: formRegisterRef, ...restRegister } = register("otp");

  return (
    <div
      dir="rtl"
      className="min-h-screen w-full bg-slate-900/5 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] bg-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-vazir select-none"
    >
      {/* کانتینر اصلی کارت تأیید ادمین */}
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 sm:p-10 flex flex-col items-center">
        
        {/* نشان/آیکون پنل مدیریت */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 mb-6">
          <KeyRound size={32} strokeWidth={2.2} />
        </div>

        {/* هدر و توضیحات */}
        <div className="text-center mb-8 w-full">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            تأیید هویت مدیر
          </h1>

          <p className="text-sm font-medium text-gray-500 mt-2">
            کد ۶ رقمی ارسال‌شده به شماره{" "}
            <span dir="ltr" className="font-bold text-gray-800 bg-slate-100 px-2 py-0.5 rounded-md">
              {phone_number}
            </span>{" "}
            را وارد کنید.
          </p>
        </div>

        {/* فرم کد یکبار مصرف */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-6">
          {/* باکس‌های کد ۶ رقمی */}
          <div
            className="relative flex gap-2 sm:gap-3 justify-center w-full cursor-pointer py-1"
            onClick={() => inputRef.current?.focus()}
            dir="ltr"
          >
            {/* اینپوت مخفی */}
            <input
              {...restRegister}
              ref={(e) => {
                formRegisterRef(e);
                inputRef.current = e;
              }}
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="one-time-code"
              maxLength={OTP_LENGTH}
              disabled={isSubmitting}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
              onChange={(e) => {
                const numericOnly = e.target.value.replace(/\D/g, "").slice(0, OTP_LENGTH);
                setValue("otp", numericOnly, { shouldValidate: true });
              }}
            />

            {/* ۶ باکس نمایش ارقام */}
            {Array.from({ length: OTP_LENGTH }).map((_, index) => {
              const char = otpValue[index] || "";
              const isCurrent = index === otpValue.length && otpValue.length < OTP_LENGTH;

              return (
                <div
                  key={index}
                  className={`w-12 h-14 sm:w-14 sm:h-16 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-black transition-all ${
                    char
                      ? "border-2 border-blue-500 bg-blue-50/40 text-gray-900 shadow-sm"
                      : isCurrent
                      ? "border-2 border-cyan-500 bg-white ring-4 ring-cyan-100 shadow-sm"
                      : "border border-gray-200 bg-gray-50/60 text-gray-400"
                  }`}
                >
                  {char ? (
                    char
                  ) : isCurrent ? (
                    <span className="w-0.5 h-6 bg-cyan-500 animate-pulse rounded-full"></span>
                  ) : null}
                </div>
              );
            })}
          </div>

          {/* نوار وضعیت تایمر و ارسال مجدد */}
          <div className="w-full flex items-center justify-between text-xs sm:text-sm px-1 font-medium">
            <div className="flex items-center gap-1.5 text-gray-500">
              <span>زمان باقی‌مانده:</span>
              <span
                dir="ltr"
                className={`font-black ${
                  canResend ? "text-gray-400" : "text-blue-600 font-bold"
                }`}
              >
                {formatTime()}
              </span>
            </div>

            {canResend ? (
              <button
                type="button"
                onClick={resendOtp}
                disabled={isResending}
                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-bold transition-colors cursor-pointer disabled:opacity-50"
              >
                <RefreshCw size={14} className={isResending ? "animate-spin" : ""} />
                <span>{isResending ? "در حال ارسال..." : "ارسال مجدد کد"}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={goBackToLogin}
                className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
              >
                <ArrowRight size={14} />
                <span>ویرایش شماره</span>
              </button>
            )}
          </div>

          {/* دکمه تأیید نهایی */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
            className="w-full h-12 sm:h-13 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-blue-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>در حال اعتبارسنجی کد...</span>
              </div>
            ) : (
              <>
                <CheckCircle2 size={18} />
                <span>تأیید و ورود به پنل</span>
              </>
            )}
          </button>
        </form>

        {/* بازگشت مستقیم به مرحله قبل */}
        <div className="mt-6 pt-6 border-t border-gray-100 w-full flex justify-center">
          <button
            type="button"
            onClick={goBackToLogin}
            className="text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            بازگشت به صفحه ورود
          </button>
        </div>

      </div>
    </div>
  );
}

export default VerifyOtp_holder;
