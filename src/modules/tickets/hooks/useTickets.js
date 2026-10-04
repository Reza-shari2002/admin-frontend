import { useState, useEffect, useCallback, useContext } from "react";
import TicketService from "../services/TicketService";
import { context } from "../../../context/Formcontext.jsx";

export const useTicket = () => {
  const { showToast } = useContext(context) || {};

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  // Pagination & Filter States
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedType, setSelectedType] = useState("");

  // Search & Modal Verification States
  const [searchQuery, setSearchQuery] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState(null);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);

  // ۱. دریافت لیست بلیت‌ها
  const fetchTickets = useCallback(async () => {
    setLoading(true);
    try {
      const res = await TicketService.getTickets({
        page,
        limit,
        type: selectedType,
      });

      const data = res?.data || res;

      // دریافت لیست بلیت‌ها
      const ticketList =
        data?.tickets || data?.rows || (Array.isArray(data) ? data : []);
      setTickets(ticketList);

      // پوشش تمام حالات ساختار صفحه‌بندی بک‌اند
      const total =
        data?.totalCount ??
        data?.total ??
        data?.count ??
        data?.pagination?.total ??
        ticketList.length;
      const pages =
        data?.totalPages ??
        data?.pagination?.totalPages ??
        Math.ceil(total / limit) ??
        1;

      setTotalCount(Number(total) || 0);
      setTotalPages(Number(pages) || 1);
    } catch (err) {
      const message =
        err?.response?.data?.message || "خطا در دریافت لیست بلیت‌ها";
      showToast?.(message, "error");
    } finally {
      setLoading(false);
    }
  }, [page, limit, selectedType, showToast]);

  // فراخوانی در زمان تغییر page, limit یا selectedType
  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  // تغییر نوع بلیت (VIP, Gamer, Regular, همه)
  const handleTypeChange = (type) => {
    setSelectedType(type);
    setPage(1); // برگشت به صفحه اول هنگام تغییر فیلتر
  };

  // تغییر تعداد در صفحه
  const handleLimitChange = (newLimit) => {
    const parsedLimit = Number(newLimit);
    setLimit(parsedLimit);
    setPage(1); // برگشت به صفحه اول هنگام تغییر limit
  };

  // ۲. استعلام بلیت
  const handleVerify = async (queryToSearch) => {
    const query = queryToSearch || searchQuery;
    if (!query?.trim()) {
      showToast?.("لطفاً کد بلیت یا شماره تماس را وارد کنید.", "warning");
      return;
    }

    setIsVerifying(true);
    try {
      const res = await TicketService.verifyTicket(query.trim());
      const data = res?.data || res;
      setVerifyResult(data);
      setIsVerifyModalOpen(true);

      const foundCount = data?.total_found ?? (data?.tickets?.length || 0);
      showToast?.(`تعداد ${foundCount} بلیت یافت شد.`, "success");
    } catch (err) {
      const message =
        err?.response?.data?.message || "موردی با این مشخصات یافت نشد.";
      showToast?.(message, "error");
    } finally {
      setIsVerifying(false);
    }
  };

  // ۳. ثبت ورود
  const handleUseTicket = async (ticketId) => {
    setActionLoadingId(ticketId);
    try {
      await TicketService.useTicket(ticketId);
      showToast?.(
        "ورود با موفقیت ثبت شد و بلیت باطل/استفاده گردید.",
        "success",
      );

      setTickets((prev) =>
        prev.map((t) =>
          t.ticket_id === ticketId ? { ...t, is_used: true } : t,
        ),
      );

      if (verifyResult?.tickets) {
        setVerifyResult((prev) => ({
          ...prev,
          tickets: prev.tickets.map((t) =>
            t.ticket_id === ticketId ? { ...t, is_used: true } : t,
          ),
        }));
      }
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "این بلیت قبلاً استفاده شده است و امکان ورود مجدد وجود ندارد.";
      showToast?.(message, "error");
      setTimeout(() => {
        window.location.href = "/admin/login";
      }, 3000);
    } finally {
      setActionLoadingId(null);
    }
  };

  // ۴. لغو / ابطال بلیت
  const handleCancelTicket = async (ticketId) => {
    if (
      !window.confirm("آیا از ابطال بلیت و آزادسازی صندلی‌ها اطمینان دارید؟")
    ) {
      return;
    }

    setActionLoadingId(ticketId);
    try {
      const res = await TicketService.cancelTicket(ticketId);
      const successMessage =
        res?.message || "بلیط با موفقیت ابطال و صندلی‌ها آزاد شدند.";
      showToast?.(successMessage, "success");

      fetchTickets();
      setIsVerifyModalOpen(false);
    } catch (err) {
      const message =
        err?.response?.data?.message || "خطا در لغو بلیت و آزادسازی صندلی.";
      showToast?.(message, "error");
    } finally {
      setActionLoadingId(null);
    }
  };

  return {
    tickets,
    loading,
    actionLoadingId,
    page,
    setPage,
    limit,
    handleLimitChange,
    totalPages,
    totalCount,
    selectedType,
    handleTypeChange,
    searchQuery,
    setSearchQuery,
    isVerifying,
    verifyResult,
    isVerifyModalOpen,
    setIsVerifyModalOpen,
    handleVerify,
    handleUseTicket,
    handleCancelTicket,
    refreshTickets: fetchTickets,
  };
};
