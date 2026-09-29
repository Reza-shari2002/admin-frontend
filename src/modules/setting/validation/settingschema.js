import * as yup from "yup";

const countValidation = yup
  .number()
  .transform((value, originalValue) => (originalValue === "" ? 0 : value))
  .typeError("تعداد باید یک مقدار عددی باشد")
  .integer("تعداد باید عدد صحیح باشد")
  .min(0, "تعداد نمی‌تواند منفی باشد")
  .required("این فیلد الزامی است");

export const addseatsSchema = yup
  .object({
    gamer: countValidation,
    vip: countValidation,
    regular: countValidation,
  })
  .test(
    "at-least-one-positive",
    "حداقل باید برای یکی از بخش‌ها تعداد صندلی بزرگتر از صفر وارد کنید",
    (values) => {
      const { gamer = 0, vip = 0, regular = 0 } = values || {};
      return Number(gamer) > 0 || Number(vip) > 0 || Number(regular) > 0;
    }
  );


  const activeStatusValidation = yup
  .mixed()
  .nullable()
  .transform((val) => (val === "" || val === undefined ? null : Number(val)))
  .test("is-zero-or-one", "وضعیت فقط می‌تواند ۰ (غیرفعال) یا ۱ (فعال) باشد", (val) => {
    if (val === null || val === undefined) return true; // اختیاری بودن
    return val === 0 || val === 1;
  });

const messageValidation = yup
  .string()
  .trim()
  .max(255, "پیام نمی‌تواند بیشتر از ۲۵۵ کاراکتر باشد")
  .nullable()
  .transform((val) => (val === "" ? null : val));

export const generalSettingSchema = yup
  .object({
    is_vip_active: activeStatusValidation,
    is_regular_active: activeStatusValidation,
    is_gamer_active: activeStatusValidation,
    vip_message: messageValidation,
    regular_message: messageValidation,
    gamer_message: messageValidation,
  })
  .test(
    "at-least-one-field",
    "حداقل باید یکی از فیلدها برای به‌روزرسانی ارسال شود",
    (values) => {
      if (!values) return false;
      return Object.values(values).some(
        (val) => val !== null && val !== undefined && val !== ""
      );
    }
  );


