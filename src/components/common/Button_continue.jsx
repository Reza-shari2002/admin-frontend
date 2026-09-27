import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { context } from "../../context/Formcontext";

function Button_continue({ path, step }) {
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
        onClick={() => {
          set_current_page(step + 1);
          navigate(path === " " ? currentpath : path);
        }}
        className="w-full max-w-md bg-orange-500 text-white py-4 rounded-2xl font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200 pointer-events-auto"
      >
        ادامه ←
      </button>
    </div>
  );
}

export default Button_continue;
