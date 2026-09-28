import axiosInstance from "../../../components/commonService/axiosInstance";

const UserService = {
  getUsers: async ({ page = 1, limit = 10, search = "" } = {}) => {
    const params = {
      page: Number(page),
      limit: Number(limit),
    };

    if (search && search.trim() !== "") {
      params.search = search.trim();
    }

    const response = await axiosInstance.get("/admin/users", { params });
    return response.data;
  },
};

export default UserService;
