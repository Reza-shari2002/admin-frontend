import * as yup from "yup";

export const verifyOtpSchema = yup.object({
  otp: yup
    .string()
    .required("کد تأیید الزامی است")
    .matches(/^\d{6}$/, "کد تأیید باید دقیقاً ۶ رقم باشد"),
});

export default verifyOtpSchema;
