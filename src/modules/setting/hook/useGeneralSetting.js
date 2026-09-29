import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateGeneralSettings } from "../services/SettingService.js";
import { generalSettingSchema } from "../validation/settingschema.js";
import { context } from "../../../context/Formcontext.jsx";

const defaultValues = {
  is_vip_active: "",
  is_regular_active: "",
  is_gamer_active: "",
  vip_message: "",
  regular_message: "",
  gamer_message: "",
};

export default function useGeneralSetting(onSuccess) {
  const { showToast } = useContext(context) || {};
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues,
    resolver: yupResolver(generalSettingSchema),
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
      // فیلتر کردن مقادیر خالی تا فقط فیلدهای مقداردهی‌شده در PATCH ارسال شوند
      const payload = {};

      if (values.is_vip_active !== "" && values.is_vip_active !== null) {
        payload.is_vip_active = Number(values.is_vip_active);
      }
      if (
        values.is_regular_active !== "" &&
        values.is_regular_active !== null
      ) {
        payload.is_regular_active = Number(values.is_regular_active);
      }
      if (values.is_gamer_active !== "" && values.is_gamer_active !== null) {
        payload.is_gamer_active = Number(values.is_gamer_active);
      }

      if (values.vip_message !== "" && values.vip_message !== null) {
        payload.vip_message = values.vip_message.trim();
      }
      if (values.regular_message !== "" && values.regular_message !== null) {
        payload.regular_message = values.regular_message.trim();
      }
      if (values.gamer_message !== "" && values.gamer_message !== null) {
        payload.gamer_message = values.gamer_message.trim();
      }

      const response = await updateGeneralSettings(payload);

      // بر اساس ریسپانس موفقیت که فرستادید: response.data وجود دارد
      if (response && response.data) {
        showToast?.(
          response.message || "تنظیمات با موفقیت بروزرسانی شد",
          "success",
        );
        reset(defaultValues);
        if (typeof onSuccess === "function") {
          onSuccess(response.data);
        }
      } else {
        throw new Error(response?.message || "خطا در بروزرسانی تنظیمات");
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "خطایی در ارسال اطلاعات رخ داد";
      showToast?.(message, "error");
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
