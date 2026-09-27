import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { context } from "../../../context/Formcontext";
import schema from "../validation/discounttransferfamily";

function useDiscountTransferFamily() {
  const navigate = useNavigate();
  const { current_page, set_current_page, set_data, data } =
    useContext(context);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (current_page < 5) {
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
    resolver: yupResolver(schema),
    defaultValues: {
      relationship_docs1_image_person1_url:
        data?.relationship_docs1_image_person1_url ?? null,
      relationship_docs2_image_person1_url:
        data?.relationship_docs2_image_person1_url ?? null,
      relationship_docs1_image_person2_url:
        data?.relationship_docs1_image_person2_url ?? null,
      relationship_docs2_image_person2_url:
        data?.relationship_docs2_image_person2_url ?? null,
      is_relative_transfer: data?.is_relative_transfer ?? "0",
    },
    mode: "onTouched",
  });

  const hasRelativeTransfer = watch("is_relative_transfer");

  useEffect(() => {
    if (hasRelativeTransfer === "0") {
      setValue("relationship_docs1_image_person1_url", null);
      setValue("relationship_docs2_image_person1_url", null);
      setValue("relationship_docs1_image_person2_url", null);
      setValue("relationship_docs2_image_person2_url", null);
    }
  }, [hasRelativeTransfer, setValue]);

  const onSubmit = (formData) => {
    set_current_page(7);
    set_data((prev) => ({ ...prev, ...formData }));
    navigate("/Payment-type");
  };

  return {
    control,
    register,
    watch,
    handleSubmit: handleSubmit(onSubmit),
    setValue,
    errors,
    isSubmitting,
    hasRelativeTransfer,
  };
}

export default useDiscountTransferFamily;
