import * as yup from "yup";

const FILE_SIZE = 5 * 1024 * 1024;

const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "application/pdf",
];

const isNativeFile = (value) =>
  typeof File !== "undefined" && value instanceof File;

const isSerializableFile = (value) => {
  return (
    value &&
    value.buffer instanceof ArrayBuffer &&
    typeof value.name === "string" &&
    typeof value.type === "string"
  );
};

const getFileSize = (value) => {
  if (!value) return 0;
  if (isNativeFile(value)) return value.size;
  if (isSerializableFile(value)) {
    return value.size || value.buffer.byteLength || 0;
  }
  return 0;
};

const getFileType = (value) => {
  if (!value) return "";
  if (isNativeFile(value)) return value.type;
  if (isSerializableFile(value)) return value.type || "";
  return "";
};

const fileRequired = (message) =>
  yup
    .mixed()
    .required(message)
    .test("fileExists", message, (value) => {
      return isNativeFile(value) || isSerializableFile(value);
    })
    .test("fileSize", "حجم فایل باید کمتر از ۵ مگابایت باشد", (value) => {
      if (!value) return false;
      return getFileSize(value) <= FILE_SIZE;
    })
    .test("fileFormat", "فرمت فایل باید JPG، PNG یا PDF باشد", (value) => {
      if (!value) return false;
      return SUPPORTED_FORMATS.includes(getFileType(value));
    });

const schema = yup.object({
  has_discount_transfer: yup
    .string()
    .oneOf(["0", "1"])
    .required("لطفاً وضعیت انتقال تخفیف را مشخص کنید."),

  plate_history_type: yup.string().when("has_discount_transfer", {
    is: "1",
    then: (schema) =>
      schema
        .oneOf(["0", "1", "2"], "نوع سابقه پلاک نامعتبر است.")
        .required("انتخاب نوع سابقه پلاک الزامی است."),
    otherwise: (schema) => schema.nullable(),
  }),

  plate_history_code: yup
    .string()
    .when(["has_discount_transfer", "plate_history_type"], {
      is: (hasDiscount, type) => hasDiscount === "1" && type === "0",
      then: (schema) =>
        schema
          .min(2, "کد را کامل وارد کنید")
          .max(50, "کد بیش از حد طولانی است")
          .required("وارد کردن کد الزامی است."),
      otherwise: (schema) => schema.nullable(),
    }),

  plate_history_image_url: yup
    .mixed()
    .when(["has_discount_transfer", "plate_history_type"], {
      is: (hasDiscount, type) => hasDiscount === "1" && type === "1",
      then: () => fileRequired("تصویر تاریخچه پلاک الزامی است."),
      otherwise: (schema) => schema.nullable(),
    }),

    prev_insurance_image_url: yup.mixed().when("has_discount_transfer", {
      is: "1",
      then: () => fileRequired("تصویر بیمه نامه سال قبل الزامی است"),
      otherwise: () => yup.mixed().nullable(),
    }),


  has_active_insurance_transfer: yup
    .string()
    .oneOf(["0", "1"])
    .required("مشخص شود"),

  endorsement_image_url: yup
    .mixed()
    .when(["has_discount_transfer", "has_active_insurance_transfer"], {
      is: (hasDiscount, hasActiveInsurance) =>
        hasDiscount === "1" && hasActiveInsurance === "1",
      then: () => fileRequired("الحاقیه بیمه نامه قبلی الزامی است."),
      otherwise: (schema) => schema.nullable(),
    }),
});

export default schema;
