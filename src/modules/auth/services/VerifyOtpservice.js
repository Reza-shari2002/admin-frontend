import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export const verifyOtpApi = async (phoneNumber, otp) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/verify-otp`, {
      phone_number: phoneNumber,
      otp: otp,
    });
    return { success: true, data: response.data };
  } catch (error) {
    const serverMessage =
      error.response?.data?.message || "خطایی در برقراری ارتباط رخ داده است";
    return { success: false, error: serverMessage };
  }
};
