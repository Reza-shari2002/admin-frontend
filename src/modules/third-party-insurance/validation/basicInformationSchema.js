import * as yup from "yup";

const FILE_SIZE = 5 * 1024 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const fileRequired = (message) =>
  yup
    .mixed()
    .required(message)
    .test("fileExists", message, (value) => {
      if (!value) return false;
      // اعتبارسنجی هم برای File معمولی و هم برای ساختار پایدار با بافر
      return value instanceof File || value.buffer instanceof ArrayBuffer;
    })
    .test("fileSize", "حجم فایل باید کمتر از ۵ مگابایت باشد", (value) => {
      if (!value) return false;
      return value.size <= FILE_SIZE;
    })
    .test("fileFormat", "فرمت فایل باید JPG یا PNG باشد", (value) => {
      if (!value) return false;
      return SUPPORTED_FORMATS.includes(value.type);
    });

export const basicInformationSchema = yup.object({
  /*
  full_name: yup
    .string()
    .required("نام و نام خانوادگی الزامی است")
    .min(3, "نام باید حداقل ۳ کاراکتر باشد")
    .max(50, "نام بیش از حد طولانی"),
*/
  first_name: yup
    .string()
    .required("نام الزامی است")
    .min(3, "نام باید حداقل ۳ کاراکتر باشد")
    .max(50, "نام بیش از حد طولانی"),

  last_name: yup
    .string()
    .required(" نام خانوادگی الزامی است")
    .min(3, "نام باید حداقل ۳ کاراکتر باشد")
    .max(50, "نام بیش از حد طولانی"),

  phone_number: yup
    .string()
    .required("شماره موبایل الزامی است")
    .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست - به انگلیسی وارد کنید"),

  //national_id_image_url: fileRequired("تصویر کارت ملی الزامی است"),

  address: yup
    .string()
    .required("وارد کردن آدرس ضروری است")
    .min(3, "آدرس را کامل وارد کنید")
    .max(100, "بیش از حد زیاد است"),

  national_code: yup
    .string()
    .trim()
    .matches(/^\d{10}$/, "کد ملی نا معتبر است - به انگلیسی وارد کنید")
    .required("کد ملی الزامی میباشد"),

  birthday_date: yup
    .string()
    .required("تاریخ تولد الزامی است")
    .matches(
      /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/,
      "فرمت تاریخ معتبر نیست (مثال: 1381/01/05)",
    )
    .test(
      "not-current-year",
      "تاریخ تولد نامعتبر است (سال جاری قابل قبول نیست)",
      (value) => {
        if (!value) return false;
        const year = parseInt(value.split("/")[0], 10);
        // سال نباید 1405 یا بزرگتر از آن باشد
        return year < 1405;
      },
    )
    .test(
      "valid-year-range",
      "سال تولد باید بین 1300 تا 1404 باشد",
      (value) => {
        if (!value) return false;
        const year = parseInt(value.split("/")[0], 10);
        return year >= 1300 && year <= 1404;
      },
    ),

  postal_code: yup
    .string()
    .matches(/^\d{10}$/,"کد پستی معتبر وارد کنید و به اعداد انگلیسی")
    .required("کد پستی خود را وارد کنید ")
    .min(3, "کد پستی را کامل وارد کنید")
    .max(50, "به درستی وارد کنید "),
});
