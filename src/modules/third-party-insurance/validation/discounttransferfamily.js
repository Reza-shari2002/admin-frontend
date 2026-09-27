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
  if (isSerializableFile(value))
    return value.size || value.buffer.byteLength || 0;
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
  is_relative_transfer: yup
    .string()
    .oneOf(["0", "1"])
    .required("لطفاً وضعیت انتقال تخفیف را مشخص کنید."),

  relationship_docs1_image_person1_url: yup
    .mixed()
    .when("is_relative_transfer", {
      is: "1",
      then: () => fileRequired("تصویر صفحه اول شناسنامه شما الزامی میباشد"),
      otherwise: () => yup.mixed().nullable(),
    }),

  relationship_docs2_image_person1_url: yup
    .mixed()
    .when("is_relative_transfer", {
      is: "1",
      then: () => fileRequired("تصویر صفحه دوم شناسنامه شما الزامی است"),
      otherwise: () => yup.mixed().nullable(),
    }),

  relationship_docs1_image_person2_url: yup
    .mixed()
    .when("is_relative_transfer", {
      is: "1",
      then: () => fileRequired("تصویر صفحه اول شناسنامه شخص مورد نظر الزامیست"),
      otherwise: () => yup.mixed().nullable(),
    }),

  relationship_docs2_image_person2_url: yup
    .mixed()
    .when("is_relative_transfer", {
      is: "1",
      then: () => fileRequired("تصویر صفحه دوم شناسنامه شخص مورد نظر الزامیست"),
      otherwise: () => yup.mixed().nullable(),
    }),
});

export default schema;
