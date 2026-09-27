import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export const sendOtpApi = async (phoneNumber) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/send-otp`, {
      phone_number: phoneNumber,
    });
    return { success: true, data: response.data };
  } catch (error) {
    // طبق فرمت بک‌اند شما: { message: err.message, status: err.status }
    const serverMessage =
      error.response?.data?.message || "خطایی در برقراری ارتباط رخ داده است";
    return { success: false, error: serverMessage };
  }
};
