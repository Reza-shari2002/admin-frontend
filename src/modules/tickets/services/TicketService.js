import axiosInstance from "../../../components/commonService/axiosInstance";

const TicketService = {
  // دریافت لیست بلیت‌های پرداخت‌شده با فیلتر نوع و صفحه‌بندی
  getTickets: async ({ page = 1, limit = 10, type = "" } = {}) => {
    const params = {
      page: Number(page),
      limit: Number(limit),
    };

    // فقط در صورتی که تایپ انتخاب شده باشد ارسال شود
    if (type && type.trim() !== "") {
      params.type = type.trim();
    }

    const response = await axiosInstance.get("/admin/tickets", { params });
    return response.data;
  },

  // استعلام بلیت با کد، شماره تماس یا متن
  verifyTicket: async (query) => {
    const response = await axiosInstance.get("/admin/verify-ticket", {
      params: { query },
    });
    return response.data;
  },

  // ثبت ورود / استفاده از بلیت
  useTicket: async (id) => {
    const response = await axiosInstance.patch(`/admin/ticket/${id}/use`);
    return response.data;
  },

  // لغو/استرداد بلیت و آزادسازی صندلی‌ها
  cancelTicket: async (id) => {
    const response = await axiosInstance.patch(`/admin/tickets/${id}/cancel`);
    return response.data;
  },
};

export default TicketService;
