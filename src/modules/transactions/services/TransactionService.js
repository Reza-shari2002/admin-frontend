import axiosInstance from "../../../components/commonService/axiosInstance";

const TransactionService = {
  getTransactions: async ({ page = 1, limit = 20 } = {}) => {
    const params = {
      page: Number(page),
      limit: Number(limit),
    };

    const response = await axiosInstance.get("/admin/transactions", { params });
    return response.data;
  },
};

export default TransactionService;
