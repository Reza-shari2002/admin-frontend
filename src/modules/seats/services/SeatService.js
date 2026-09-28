import axiosInstance from "../../../components/commonService/axiosInstance";

const SeatService = {
  getCapacity: async () => {
    const response = await axiosInstance.get("/seats/capacity");
    return response.data;
  },

  getSeatsList: async ({ page = 1, limit = 1000 } = {}) => {
    const params = { page: Number(page), limit: Number(limit) };
    const response = await axiosInstance.get("/admin/seats", { params });
    return response.data;
  },
};

export default SeatService;
