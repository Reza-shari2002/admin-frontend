import axios from "axios";

const api = axios.create({
  baseURL: "/api", // یا آدرس کامل سرور
  headers: {
    "Content-Type": "multipart/form-data", // برای فرم‌هایی که فایل دارند
  },
});

// این تابع کمکی را برای اضافه کردن کپچا قبل از هر درخواست استفاده می‌کنیم
export const setCaptchaHeader = (token) => {
  api.defaults.headers.common["x-captcha-token"] = token;
};

export default api;
