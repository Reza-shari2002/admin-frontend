import * as yup from "yup";

export const profileSchema = yup.object().shape({
  full_name: yup
    .string()
    .trim()
    .required("لطفاً نام و نام خانوادگی را وارد کنید")
    .min(3, "نام و نام خانوادگی حداقل باید ۳ کاراکتر باشد"),
  national_code: yup
    .string()
    .trim()
    .required("لطفاً کد ملی را وارد کنید")
    .matches(/^[0-9]{10}$/, "کد ملی باید دقیقاً ۱۰ رقم باشد"),
});
