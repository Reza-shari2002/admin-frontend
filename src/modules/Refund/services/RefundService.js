import axiosInstance from "../../../components/commonService/axiosInstance";

const RefundService = {
  // دریافت لیست درخواست‌های استرداد همراه با صفحه‌بندی و فیلترها
  getRefundRequests: async ({
    page = 1,
    limit = 20,
    status = "",
    phone = "",
    national_code = "",
    ticket_id = "",
  } = {}) => {
    const params = {
      page: Number(page),
      limit: Number(limit),
    };

    if (status) params.status = status;
    if (phone) params.phone = phone;
    if (national_code) params.national_code = national_code;
    if (ticket_id) params.ticket_id = ticket_id;

    const response = await axiosInstance.get("/admin/refund-requests", {
      params,
    });
    return response.data;
  },
};

export default RefundService;
