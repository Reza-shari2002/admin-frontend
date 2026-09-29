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


