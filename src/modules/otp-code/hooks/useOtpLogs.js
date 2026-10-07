import { useState, useEffect, useCallback, useContext } from "react";
import OtpService from "../services/OtpService";
import { context } from "../../../context/Formcontext.jsx";

export const useOtpLogs = () => {
  const { showToast } = useContext(context) || {};

  const [otps, setOtps] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination States
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // دریافت لیست کدهای OTP
  const fetchOtps = useCallback(async () => {
    setLoading(true);
    try {
      const res = await OtpService.getOtpLogs({
        page,
        limit,
      });

      if (res?.success && res?.data) {
        const { otps: list, pagination } = res.data;
        setOtps(list || []);
        setTotalCount(Number(pagination?.total) || 0);
        setTotalPages(Number(pagination?.totalPages) || 1);
      } else {
        throw new Error(res?.message || "خطا در دریافت کدهای ورود یکبار مصرف");
      }
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "خطا در دریافت لاگ کدهای OTP";
      showToast?.(message, "error");
      setTimeout(() => {
        window.location.href = "/admin/login";
      }, 3000);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchOtps();
  }, [fetchOtps]);

  // تغییر تعداد نمایش در صفحه
  const handleLimitChange = (newLimit) => {
    setLimit(Number(newLimit));
    setPage(1);
  };

  return {
    otps,
    loading,
    page,
    setPage,
    limit,
    handleLimitChange,
    totalPages,
    totalCount,
    refreshOtps: fetchOtps,
  };
};
