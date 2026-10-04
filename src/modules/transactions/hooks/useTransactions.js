import { useState, useEffect, useCallback, useContext } from "react";
import TransactionService from "../services/TransactionService";
import { context } from "../../../context/Formcontext.jsx";

export const useTransactions = () => {
  const { showToast } = useContext(context) || {};

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await TransactionService.getTransactions({
        page,
        limit,
      });

      if (res?.success && res?.data) {
        const { transactions: list, pagination } = res.data;
        setTransactions(list || []);
        setTotalCount(Number(pagination?.total) || 0);
        setTotalPages(Number(pagination?.totalPages) || 1);
      } else {
        throw new Error(res?.message || "خطا در دریافت لیست تراکنش‌ها");
      }
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "خطا در دریافت تراکنش‌ها";
      showToast?.(message, "error");
      setTimeout(() => {
        window.location.href = "/admin/login";
      }, 3000);
    } finally {
      setLoading(false);
    }
  }, [page, limit, showToast]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleLimitChange = (newLimit) => {
    setLimit(Number(newLimit));
    setPage(1);
  };

  return {
    transactions,
    loading,
    page,
    setPage,
    limit,
    handleLimitChange,
    totalPages,
    totalCount,
    refreshTransactions: fetchTransactions,
  };
};
