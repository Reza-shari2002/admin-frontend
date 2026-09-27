import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../../../context/Formcontext";
import { confirm } from "../services/confirmService";
import { processPayload } from "../utils/payloadProcessor";



function useConfirm() {
 

  const navigate = useNavigate();
  const contextValue = useContext(context);

  const {
    set_current_page,
    data,
    current_page,
    set_captcha_token,
  } = contextValue || {};



  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  const [modal, setModal] = useState({
    open: false,
    success: false,
    title: "",
    message: "",
    status: 200,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (typeof current_page === "number" && current_page < 8) {
      console.warn("⚠️ Redirecting to /home because current_page < 8");
      navigate("/home");
    }
  }, [current_page, navigate]);

  const handleVerify = (token) => {
    setCaptchaToken(token);
    setCaptchaError("");

    if (set_captcha_token) {
      set_captcha_token(token);
    }
  };

  const handleExpire = () => {
    setCaptchaToken("");
    setCaptchaError("اعتبار کپچا تمام شد. لطفاً دوباره تایید کنید.");

    if (set_captcha_token) {
      set_captcha_token("");
    }
  };

  const handleError = () => {
    setCaptchaToken("");
    setCaptchaError("خطا در بارگذاری کپچا. لطفاً دوباره تلاش کنید.");

    if (set_captcha_token) {
      set_captcha_token("");
    }
  };

  const handleSubmit = async () => {



    if (!captchaToken) {
      setModal({
        open: true,
        success: false,
        title: "تایید امنیتی ناقص است",
        message: "لطفاً ابتدا تایید امنیتی را انجام دهید.",
        status: 403,
      });
      return;
    }

    try {
      setLoading(true);
      setStatusText("در حال بررسی و آماده‌سازی فایل‌ها...");

      console.log("⚙️ [SUBMIT] Calling processPayload...");
      const payload = await processPayload(data);
      console.log("✅ [SUBMIT] processPayload completed successfully:", payload);

      setStatusText("در حال ارسال اطلاعات...");
      console.log("📡 [SUBMIT] Sending request via confirm service...");
      const responseData = await confirm(payload, captchaToken);
      console.log("🎉 [SUBMIT] confirm response received:", responseData);

      setModal({
        open: true,
        success: true,
        title: "ثبت موفق",
        message: responseData?.message || "اطلاعات شما با موفقیت ثبت شد.",
        status: 200,
      });

      setCaptchaToken("");
      setCaptchaError("");
    } catch (error) {
      console.error("💥 [SUBMIT ERROR] Detailed error:", error);

      const status = error?.response?.status;
      setModal({
        open: true,
        success: false,
        title: status === 403 ? "تایید امنیتی نامعتبر است" : "خطا در پردازش",
        status,
        message:
          error?.message ||
          error?.response?.data?.message ||
          "خطایی در فایل‌ها یا ارسال رخ داد.",
      });
    } finally {
      console.log("🏁 [SUBMIT] Flow finished (finally block)");
      setLoading(false);
      setStatusText("");
    }
  };

  const handleModalConfirm = () => {
    console.log("🔘 [MODAL] handleModalConfirm clicked");
    setModal((prev) => ({ ...prev, open: false }));

    if (modal.success) {
      navigate("/home");
    }
  };

  return {
    loading,
    statusText,
    modal,
    captchaToken,
    captchaError,
    handleVerify,
    handleExpire,
    handleError,
    handleSubmit,
    handleModalConfirm,
  };
}

export default useConfirm;
