import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { context } from "../../../context/Formcontext";
import paymentSchema from "../validation/paymentSchema";

function usePayment() {
  const navigate = useNavigate();
  const { current_page, set_current_page, set_data, data } =
    useContext(context);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // هدایت کاربر به صفحه اصلی اگر مراحل قبلی طی نشده باشد
  useEffect(() => {
    if (current_page < 7) {
      navigate("/home");
    }
  }, [current_page, navigate]);

  const {
    control,
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(paymentSchema),
    defaultValues: {
      // استفاده از مقدار ذخیره شده قبلی در صورت وجود، در غیر این صورت مقدار پیش‌فرض نقد (0)
      payment_type: data?.payment_type ?? "0",
    },
    mode: "onTouched",
  });

  const selectedPaymentType = watch("payment_type");

  const onSubmit = (formData) => {
    set_current_page(8);
    set_data((prev) => ({ ...prev, ...formData }));
    // اگر مرحله بعدی صفحه تایید است، به مسیر مربوطه هدایت می‌شود
    navigate("/Confirm");
  };

  return {
    control,
    register,
    watch,
    handleSubmit: handleSubmit(onSubmit),
    setValue,
    errors,
    isSubmitting,
    selectedPaymentType,
  };
}

export default usePayment;
