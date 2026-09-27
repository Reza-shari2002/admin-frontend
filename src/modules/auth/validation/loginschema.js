import * as yup from "yup";

export const loginSchema = yup.object({
  phone_number: yup
    .string()
    .required("شماره موبایل الزامی است")
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست (مثال: ۰۹۳۸۳۳۴۶۶۹۴)"),
});

export default loginSchema;
