import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { context } from "../../context/Formcontext";

function Button_continue_no_robot({ path, step, isCaptchaVerified }) {
  const location = useLocation();
  const currentpath = location.pathname;
  const navigate = useNavigate();
  const { set_current_page } = useContext(context);

  return (
    <div
      className="fixed bottom-4 left-0 right-0 px-4 z-[9999] flex justify-center pointer-events-none 
                 md:static md:bottom-auto md:left-auto md:right-auto md:px-0 md:z-auto md:pointer-events-auto md:mt-12 md:w-full"
    >
      <button
        disabled={!isCaptchaVerified}
        onClick={() => {
          set_current_page(step + 1);
          navigate(path === " " ? currentpath : path);
        }}
        className={`w-full max-w-md py-4 rounded-2xl font-bold transition-all shadow-lg 
          ${
            isCaptchaVerified
              ? "bg-orange-500 text-white hover:bg-orange-600 shadow-orange-200 pointer-events-auto"
              : "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none pointer-events-none"
          }`}
      >
        {isCaptchaVerified
          ? "ادامه ←"
          : "لطفاً ابتدا تایید کنید که ربات نیستید"}
      </button>
    </div>
  );
}

export default Button_continue_no_robot;
