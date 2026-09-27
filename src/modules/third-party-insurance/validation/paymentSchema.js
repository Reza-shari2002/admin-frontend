import * as yup from "yup";

const schema = yup.object({
  payment_type: yup
    .string()
    .oneOf(["0", "1", "2"])
    .required("نوع پرداخت را مشخص کنید"),
});

export default schema;
