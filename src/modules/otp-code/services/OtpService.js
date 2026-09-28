import axiosInstance from "../../../components/commonService/axiosInstance";

const OtpService = {
  // دریافت لاگ کدهای یکبار مصرف همراه با صفحه‌بندی
  getOtpLogs: async ({ page = 1, limit = 10 } = {}) => {
    const params = {
      page: Number(page),
      limit: Number(limit),
    };

    const response = await axiosInstance.get("/admin/otp-logs", { params });
    return response.data;
  },
};

export default OtpService;
