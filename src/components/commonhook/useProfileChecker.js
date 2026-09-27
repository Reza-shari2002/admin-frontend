import { useState, useEffect, useContext } from "react";
import { context } from "../../context/Formcontext.jsx";
import { getProfileApi } from "../../modules/profile/services/profileService";

export default function useProfileChecker() {
  const { showToast } = useContext(context);

  const [isLoading, setIsLoading] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  // بررسی وضعیت پروفایل و اعتبار توکن به محض ماونت
  const checkUserProfile = async () => {
    setIsLoading(true);
    const result = await getProfileApi();

    if (result.success) {
      const user = result.data?.data?.user;
      setUserProfile(user);

      // اگر فول‌نیم یا کد ملی نال/خالی بود، مودال تکمیل اطلاعات باز شود
      if (!user?.full_name || !user?.national_code) {
        setShowProfileModal(true);
      }
    } else {
      // خطای غیر از 401 (که اینترسپتور هندل می‌کند و به لاگین هدایت می‌کند)
      showToast(result.error, "error");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkUserProfile();
  }, []);

  const closeProfileModal = () => {
    setShowProfileModal(false);
    // واکشی مجدد وضعیت پروفایل پس از بستن مودال
    checkUserProfile();
  };

  return {
    isLoading,
    userProfile,
    showProfileModal,
    setShowProfileModal,
    checkUserProfile,
    closeProfileModal,
  };
}
