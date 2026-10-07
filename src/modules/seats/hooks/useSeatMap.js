import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import SeatService from "../services/SeatService";
import { context } from "../../../context/Formcontext.jsx";

export const useSeatMap = (seatsPerRow = 14) => {
  const { showToast } = useContext(context) || {};

  const [loading, setLoading] = useState(false);
  const [capacity, setCapacity] = useState(null);
  const [seatsData, setSeatsData] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [capRes, seatsRes] = await Promise.all([
        SeatService.getCapacity(),
        SeatService.getSeatsList({ page: 1, limit: 1000 }),
      ]);

      if (capRes?.status === "success" && capRes?.data) {
        setCapacity(capRes.data);
      } else {
        throw new Error("خطا در دریافت اطلاعات ظرفیت سالن");
      }

      if (seatsRes?.success && seatsRes?.data) {
        setSeatsData(seatsRes.data.seats || []);
      } else {
        throw new Error("خطا در دریافت لیست وضعیت صندلی‌ها");
      }
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "خطا در دریافت اطلاعات صندلی‌ها";
      showToast?.(message, "error");
      setTimeout(() => {
        window.location.href = "/admin/login";
      }, 3000);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // مپ کردن داده‌های ای‌پی‌آی دوم برای دسترسی O(1) سریع
  const seatsLookup = useMemo(() => {
    const map = new Map();
    seatsData.forEach((s) => {
      // کلید یکتا بر اساس type و seat_number
      map.set(`${s.type}_${s.seat_number}`, s);
    });
    return map;
  }, [seatsData]);

  // ساخت ردیف‌ها و سالن یکپارچه
  const hallLayout = useMemo(() => {
    if (!capacity) return { regularRows: [], vipRows: [], allRows: [] };

    // تابع کمکی برای ایجاد ردیف‌ها
    const buildCategoryRows = (type, totalCount, startRowIndex = 1) => {
      const rows = [];
      let currentSeatNum = 1;
      let currentRowNum = startRowIndex;

      while (currentSeatNum <= totalCount) {
        const rowSeats = [];
        for (let col = 1; col <= seatsPerRow; col++) {
          if (currentSeatNum > totalCount) break;

          const seatKey = `${type}_${currentSeatNum}`;
          const seatDetail = seatsLookup.get(seatKey);

          rowSeats.push({
            id: seatDetail?.id || `${type}-${currentSeatNum}`,
            seat_number: currentSeatNum,
            type: type,
            status: seatDetail
              ? seatDetail.is_locked
                ? "locked"
                : seatDetail.status
              : "available",
            ticket_id: seatDetail?.ticket_id || null,
            ticket_code: seatDetail?.ticket_code || null,
            is_locked: seatDetail?.is_locked || false,
            locked_at: seatDetail?.locked_at || null,
          });

          currentSeatNum++;
        }

        rows.push({
          rowNumber: currentRowNum,
          type: type,
          seats: rowSeats,
        });
        currentRowNum++;
      }

      return rows;
    };

    // طبق خواسته شما:
    // بالا: ردیف‌های عادی (Regular)
    const totalRegular = capacity.regular?.total || 0;
    const regularRows = buildCategoryRows("regular", totalRegular, 1);

    // پایین: ردیف‌های وی‌آی‌پی (VIP) که ادامه‌ی ردیف‌های بالاست
    const totalVip = capacity.vip?.total || 0;
    const nextRowNumber = regularRows.length + 1;
    const vipRows = buildCategoryRows("vip", totalVip, nextRowNumber);

    return {
      regularRows,
      vipRows,
      allRows: [...regularRows, ...vipRows], // چیدمان یکپارچه کل سالن از بالا به پایین
    };
  }, [capacity, seatsLookup, seatsPerRow]);

  // آمار کلی
  const stats = useMemo(() => {
    let sold = 0;
    let locked = 0;
    let available = 0;

    hallLayout.allRows.forEach((r) => {
      r.seats.forEach((s) => {
        if (s.status === "sold") sold++;
        else if (s.status === "locked" || s.is_locked) locked++;
        else available++;
      });
    });

    return {
      total: sold + locked + available,
      sold,
      locked,
      available,
    };
  }, [hallLayout]);

  return {
    loading,
    refresh: fetchData,
    hallLayout,
    stats,
    selectedSeat,
    setSelectedSeat,
    closeModal: () => setSelectedSeat(null),
  };
};
