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

export const cardocumentSchema = yup.object({
  document_car_type: yup
    .string()
    .required("انتخاب نوع مدرک الزامی است")
    .oneOf(["0", "1"]),

  car_card_image_front_url: yup.mixed().when("document_car_type", {
    is: "0",
    then: () => fileRequired("تصویر روی کارت ماشین الزامی است"),
    otherwise: () => yup.mixed().nullable(),
  }),

  car_card_image_back_url: yup.mixed().when("document_car_type", {
    is: "0",
    then: () => fileRequired("تصویر پشت کارت ماشین الزامی است"),
    otherwise: () => yup.mixed().nullable(),
  }),

  green_paper_image_url: yup.mixed().when("document_car_type", {
    is: "1",
    then: () => fileRequired("تصویر برگه سبز الزامی است"),
    otherwise: () => yup.mixed().nullable(),
  }),


has_prev_insurance: yup
  .string()
  .required()
  .oneOf(["0", "1"]),

});
