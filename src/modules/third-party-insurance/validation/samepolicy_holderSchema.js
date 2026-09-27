import * as yup from "yup";

const FILE_SIZE = 5 * 1024 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const isFileLike = (value) => {
  if (!value) return false;
  if (value instanceof File) return true;
  return value.buffer instanceof ArrayBuffer && typeof value.name === "string";
};

const getFileSize = (value) => {
  if (!value) return 0;
  if (value instanceof File) return value.size;
  if (value.buffer instanceof ArrayBuffer)
    return value.size || value.buffer.byteLength || 0;
  return 0;
};

const getFileType = (value) => {
  if (!value) return "";
  if (value instanceof File) return value.type;
  return value.type || "";
};

const fileRequired = (message) =>
  yup
    .mixed()
    .required(message)
    .test("fileExists", message, (value) => isFileLike(value))
    .test("fileSize", "حجم فایل باید کمتر از ۵ مگابایت باشد", (value) => {
      if (!value) return false;
      return getFileSize(value) <= FILE_SIZE;
    })
    .test("fileFormat", "فرمت فایل باید JPG یا PNG باشد", (value) => {
      if (!value) return false;
      return SUPPORTED_FORMATS.includes(getFileType(value));
    });

export const samepolicy_holderSchema = yup.object({
  same_policyholder_owner: yup
    .string()
    .required("انتخاب نوع مالکیت الزامی میباشد")
    .oneOf(["0", "1"]),

  national_id_image_url: fileRequired("تصویر کارت ملی الزامی است"),

  owner_full_name: yup.string().when("same_policyholder_owner", {
    is: "0",
    then: (schema) =>
      schema
        .min(2, "معتبر وارد کنید ")
        .max(50, "نام بیش از حد طولانی هست")
        .required("وارد کردن نام و نام خانوادگی الزامیست"),
    otherwise: (schema) => schema.nullable(),
  }),

  owner_national_code: yup.string().when("same_policyholder_owner", {
    is: "0",
    then: (schema) =>
      schema
        .matches(/^\d{10}$/, "کد ملی نا معتبر است")
        .required("وارد کردن کد ملی الزامی است"),
    otherwise: (schema) => schema.nullable(),
  }),

  owner_birthday_date: yup.string().when("same_policyholder_owner", {
    is: "0",
    then: (schema) =>
      schema
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
    otherwise: (schema) => schema.nullable(),
  }),

  owner_phone_number: yup.string().when("same_policyholder_owner", {
    is: "0",
    then: (schema) =>
      schema
        .required("شماره موبایل الزامی است")
        .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
    otherwise: (schema) => schema.nullable(),
  }),
});
