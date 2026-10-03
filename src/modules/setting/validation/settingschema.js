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
    if (val === null || val === undefined) return true;
    return val === 0 || val === 1;
  });

const messageValidation = yup
  .string()
  .trim()
  .max(255, "مقدار نمی‌تواند بیشتر از ۲۵۵ کاراکتر باشد")
  .nullable()
  .transform((val) => (val === "" ? null : val));

const priceValidation = yup
  .mixed()
  .nullable()
  .transform((val) => (val === "" || val === undefined || Number.isNaN(val) ? null : Number(val)))
  .test("is-positive-integer", "قیمت باید عدد صحیح و مثبت باشد", (val) => {
    if (val === null || val === undefined) return true;
    return Number.isInteger(val) && val >= 0;
  });

// ریجکس تاریخ شمسی مطابق با بک‌اند: 1405/07/15 18:30
const jalaliRegex = /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\s([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/;

const dateValidation = yup
  .string()
  .trim()
  .nullable()
  .transform((val) => (val === "" ? null : val))
  .test("is-jalali", "فرمت تاریخ و ساعت باید به صورت شمسی معتبر باشد (مثال: 1405/07/15 18:30)", (val) => {
    if (!val) return true;
    return jalaliRegex.test(val);
  });

export const generalSettingSchema = yup
  .object({
    is_vip_active: activeStatusValidation,
    is_regular_active: activeStatusValidation,
    is_gamer_active: activeStatusValidation,
    vip_message: messageValidation,
    regular_message: messageValidation,
    gamer_message: messageValidation,
    vip_location: messageValidation,
    regular_location: messageValidation,
    gamer_location: messageValidation,
    vip_price: priceValidation,
    regular_price: priceValidation,
    gamer_price: priceValidation,
    vip_event_date: dateValidation,
    regular_event_date: dateValidation,
    gamer_event_date: dateValidation,
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
