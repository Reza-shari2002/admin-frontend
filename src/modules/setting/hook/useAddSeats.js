import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SeatService } from "../services/SettingService.js";
import { addseatsSchema } from "../validation/settingschema";
import { context } from "../../../context/Formcontext.jsx";

const defaultValues = {
  gamer: 0,
  vip: 0,
  regular: 0,
};

export default function useAddSeats(onSuccess) {
  const { showToast } = useContext(context) || {};
  const [loading, setLoading] = useState(false);

  // تعریف React Hook Form همراه با Yup Resolver
  const form = useForm({
    defaultValues,
    resolver: yupResolver(addseatsSchema),
    mode: "onTouched",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = {
        gamer: Number(values.gamer) || 0,
        vip: Number(values.vip) || 0,
        regular: Number(values.regular) || 0,
      };

      const response = await SeatService(payload);

      if (response?.success) {
        showToast?.(
          response.message || "صندلی‌ها با موفقیت ایجاد شدند.",
          "success",
        );
        reset(defaultValues);
        if (typeof onSuccess === "function") {
          onSuccess(response.data);
        }
      } else {
        throw new Error(response?.message || "خطا در ایجاد صندلی‌ها");
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "خطایی در ارسال اطلاعات رخ داد";
      showToast?.(message, "error");
      setTimeout(() => {
        window.location.href = "/admin/login";
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    reset(defaultValues);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    reset,
    handleClose,
    loading,
  };
}
