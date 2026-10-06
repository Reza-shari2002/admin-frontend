import { useState, useEffect, useCallback, useContext } from "react";
import RefundService from "../services/RefundService";
import { context } from "../../../context/Formcontext.jsx";

export const useRefundRequests = () => {
  const { showToast } = useContext(context) || {};

  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination & Filter States
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [status, setStatus] = useState("pending"); // دیفالت روی pending
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // دریافت لیست درخواست‌های استرداد
  const fetchRefunds = useCallback(async () => {
    setLoading(true);
    try {
      const res = await RefundService.getRefundRequests({
        page,
        limit,
        status,
      });

      if (res?.success && res?.data) {
        const { refunds: list, pagination } = res.data;
        setRefunds(list || []);
        setTotalCount(Number(pagination?.total) || 0);
        setTotalPages(Number(pagination?.totalPages) || 1);
      } else {
        throw new Error(
          res?.message || "خطا در دریافت لیست درخواست‌های استرداد"
        );
      }
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "خطا در دریافت درخواست‌های استرداد";
      showToast?.(message, "error");
    } finally {
      setLoading(false);
    }
  }, [page, limit, status, showToast]);

  useEffect(() => {
    fetchRefunds();
  }, [fetchRefunds]);

  // تغییر تعداد نمایش در صفحه
  const handleLimitChange = (newLimit) => {
    setLimit(Number(newLimit));
    setPage(1);
  };

  // تغییر فیلتر وضعیت
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setPage(1);
  };

  return {
    refunds,
    loading,
    page,
    setPage,
    limit,
    handleLimitChange,
    status,
    handleStatusChange,
    totalPages,
    totalCount,
    refreshRefunds: fetchRefunds,
  };
};
