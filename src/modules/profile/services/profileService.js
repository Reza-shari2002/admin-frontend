import axiosInstance from "./axiosInstance";

export const updateProfileApi = async (data) => {
  try {
    const response = await axiosInstance.patch("/user/me/profile", {
      full_name: data.full_name,
      national_code: data.national_code,
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error.response?.data?.message ||
        "خطایی در ثبت اطلاعات رخ داده است. لطفاً مجدداً تلاش کنید.",
    };
  }
};


export const getProfileApi = async () => {
  try {
    const response = await axiosInstance.get("/user/me/profile");
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "خطا در دریافت اطلاعات کاربر",
    };
  }
};