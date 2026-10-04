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
  // مقادیر جدید
  vip_location: "",
  regular_location: "",
  gamer_location: "",
  vip_price: "",
  regular_price: "",
  gamer_price: "",
  vip_event_date: "",
  regular_event_date: "",
  gamer_event_date: "",
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

      // مکان‌ها
      if (values.vip_location !== "" && values.vip_location !== null) {
        payload.vip_location = values.vip_location.trim();
      }
      if (values.regular_location !== "" && values.regular_location !== null) {
        payload.regular_location = values.regular_location.trim();
      }
      if (values.gamer_location !== "" && values.gamer_location !== null) {
        payload.gamer_location = values.gamer_location.trim();
      }

      // قیمت‌ها (باید عدد صحیح باشند)
      if (
        values.vip_price !== "" &&
        values.vip_price !== null &&
        values.vip_price !== undefined
      ) {
        payload.vip_price = Number(values.vip_price);
      }
      if (
        values.regular_price !== "" &&
        values.regular_price !== null &&
        values.regular_price !== undefined
      ) {
        payload.regular_price = Number(values.regular_price);
      }
      if (
        values.gamer_price !== "" &&
        values.gamer_price !== null &&
        values.gamer_price !== undefined
      ) {
        payload.gamer_price = Number(values.gamer_price);
      }

      // تاریخ‌ها
      if (values.vip_event_date !== "" && values.vip_event_date !== null) {
        payload.vip_event_date = values.vip_event_date.trim();
      }
      if (
        values.regular_event_date !== "" &&
        values.regular_event_date !== null
      ) {
        payload.regular_event_date = values.regular_event_date.trim();
      }
      if (values.gamer_event_date !== "" && values.gamer_event_date !== null) {
        payload.gamer_event_date = values.gamer_event_date.trim();
      }

      const response = await updateGeneralSettings(payload);

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
