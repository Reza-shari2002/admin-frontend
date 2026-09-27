import { useNavigate } from "react-router-dom";
import useProfileChecker from "../../../components/commonhook/useProfileChecker"; // یا مسیر هوک مشترک

export default function useMyaccount() {
  const navigate = useNavigate();

  // استفاده از هوک مشترک
  const {
    isLoading,
    userProfile,
    showProfileModal,
    closeProfileModal,
    checkUserProfile,
  } = useProfileChecker(true);

  // اکشن‌های ناوبری اختصاصی صفحه اکانت
  const handleEditProfile = () => {
    navigate("/editprofile");
  };

  const handleContactUs = () => {
    navigate("/Contact-us");
  };

  const handleLogout = () => {
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("access_token");
    localStorage.removeItem("token");
    window.location.href = "https://core.parand.app/";
  };

  return {
    isLoading,
    userProfile,
    showProfileModal,
    closeProfileModal,
    checkUserProfile,
    handleEditProfile,
    handleContactUs,
    handleLogout,
  };
}
