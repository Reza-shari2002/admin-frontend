import api from "./axiosInstance";
import { reconstructFile } from "../utils/fileUtils";

export async function confirm(payload, captchaToken) {
  api.defaults.headers.common["x-captcha-token"] = captchaToken;
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === null || value === undefined) return;
    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(key, reconstructFile(item)));
    } else {
      formData.append(key, reconstructFile(value));
    }
  });

  const response = await api.post("/third-party-insurance/forms", formData);
  return response.data;
}
