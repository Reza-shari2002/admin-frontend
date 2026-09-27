import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { context } from "../../../context/Formcontext";
import { profileSchema } from "../validation/profileSchema";
import { updateProfileApi } from "../services/profileService";

export default function useCompleteProfile(onClose) {
  const navigate = useNavigate();
  const { showToast } = useContext(context);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      full_name: "",
      national_code: "",
    },
  });

  const onSubmit = async (data) => {
    const result = await updateProfileApi(data);

    if (result.success) {
      showToast(result.data?.message || "اطلاعات با موفقیت ثبت شد.", "success");
      reset();
      if (onClose) onClose();
      navigate("/home");
    } else {
      showToast(result.error, "error");
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    isValid,
  };
}
