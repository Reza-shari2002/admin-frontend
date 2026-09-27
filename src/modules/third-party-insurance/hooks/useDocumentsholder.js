import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../../../context/Formcontext";

function useDocumentsholder() {
  const { current_page } = useContext(context);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (current_page < 1) {
      navigate("/home");
    }
  }, [current_page, navigate]);

  return {};
}

export default useDocumentsholder;
