import React, { useState, createContext, useEffect, useRef } from "react";

export const context = createContext();

function Formcontext({ children }) {
  const [data, set_data] = useState({});
  const [current_page, set_current_page] = useState(0);
  const [captchaToken, set_captcha_token] = useState("");
  const [phone_number, set_phone_number] = useState("");
  const [otp, set_otp] = useState("");
  const [ticket_type, set_ticket_type] = useState("gamer");
  const [ticketId, set_ticketId] = useState(null);
  const [reserveData, setReserveData] = useState(null); // استیت مربوط به پیام Toast
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const showToast = (message, type = "success") => {
    // پاک کردن تایمر قبلی در صورت کلیک مجدد
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setToast({ message, type });

    // محو شدن پیام بعد از ۳.۵ ثانیه
    timerRef.current = setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  return (
    <context.Provider
      value={{
        data,
        set_data,
        current_page,
        set_current_page,
        set_captcha_token,
        captchaToken,
        phone_number,
        set_phone_number,
        otp,
        set_otp,
        showToast,
        ticket_type,
        set_ticket_type,
        ticketId,
        set_ticketId,
        reserveData,
        setReserveData,
      }}
    >
      {children}

      {/* کامپوننت نمایش پیام دقیقا در بالای صفحه موبایل */}
      {toast && (
        <div className="fixed top-4 left-0 right-0 z-[9999] flex justify-center px-4 pointer-events-none">
          <div
            className={`pointer-events-auto w-full max-w-[390px] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 transform translate-y-0`}
          >
            {/* بدنه پیام */}
            <div
              className="flex items-center justify-between px-5 py-3.5"
              dir="rtl"
            >
              {/* متن پیام */}
              <span className="text-sm font-semibold text-gray-800">
                {toast.message}
              </span>

              {/* آیکون وضعیت (تیک سبز یا ضربدر قرمز) */}
              {toast.type === "success" ? (
                <div className="w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center text-white shrink-0">
                  <svg
                    className="w-3.5 h-3.5 stroke-current stroke-[3]"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white shrink-0">
                  <svg
                    className="w-3.5 h-3.5 stroke-current stroke-[3]"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* خط پیشرفت انیمیشنی زیر پیام (دقیقاً مثل اسکرین‌شات پرند) */}
            <div className="w-full bg-gray-100 h-1">
              <div
                className={`h-full ${
                  toast.type === "success" ? "bg-[#10B981]" : "bg-red-500"
                } animate-[toastProgress_3.5s_linear_forwards]`}
              />
            </div>
          </div>
        </div>
      )}
    </context.Provider>
  );
}

export default Formcontext;
