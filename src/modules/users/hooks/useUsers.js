import { useState, useEffect, useCallback, useContext } from "react";
import UserService from "../services/UserService";
import { context } from "../../../context/Formcontext.jsx";

export const useUsers = () => {
  const { showToast } = useContext(context) || {};

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); 
    }, 450);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await UserService.getUsers({
        page,
        limit,
        search: debouncedSearch,
      });

      if (res?.success && res?.data) {
        const { users: list, pagination } = res.data;
        setUsers(list || []);
        setTotalCount(Number(pagination?.total) || 0);
        setTotalPages(Number(pagination?.totalPages) || 1);
      } else {
        throw new Error(res?.message || "خطا در دریافت لیست کاربران");
      }
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "خطا در برقراری ارتباط با سرور";
      showToast?.(message, "error");
    } finally {
      setLoading(false);
    }
  }, [page, limit, debouncedSearch, showToast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleLimitChange = (newLimit) => {
    setLimit(Number(newLimit));
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearch("");
  };

  return {
    users,
    loading,
    page,
    setPage,
    limit,
    handleLimitChange,
    search,
    setSearch,
    handleClearSearch,
    totalPages,
    totalCount,
    refreshUsers: fetchUsers,
  };
};
