import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { context } from "../../../context/Formcontext.jsx";
import { getProfileApi, updateProfileApi } from "../services/profileService.js";
import { profileSchema } from "../validation/profileSchema.js"; // ایمپورت اسکیما از فایل مجزا

export default function useEditprofile() {
  const { showToast } = useContext(context);
  const navigate = useNavigate();

  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      full_name: "",
      national_code: "",
    },
  });

  // ۱. دریافت اطلاعات اولیه پروفایل
  useEffect(() => {
    let isMounted = true;

    const fetchInitialData = async () => {
      setIsPageLoading(true);
      const result = await getProfileApi();

      if (isMounted) {
        if (result.success) {
          const user = result.data?.data?.user || result.data?.user || result.data;
          reset({
            full_name: user?.full_name || "",
            national_code: user?.national_code || "",
          });
        } else {
          reset({
            full_name: "",
            national_code: "",
          });
          if (result.error) {
            showToast(result.error, "error");
          }
        }
        setIsPageLoading(false);
      }
    };

    fetchInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  // ۲. ارسال اطلاعات جدید
  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    const result = await updateProfileApi(formData);
    setIsSubmitting(false);

    if (result.success) {
      showToast(result.data?.message || "اطلاعات با موفقیت ثبت شد", "success");
      navigate("/Myaccount");
    } else {
      showToast(result.error, "error");
    }
  };

  const handleCancel = () => {
    navigate("/Myaccount");
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isDirty,
    isValid,
    isPageLoading,
    isSubmitting,
    handleCancel,
  };
}
