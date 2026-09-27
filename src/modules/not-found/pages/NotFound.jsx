import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
        padding: "24px",
        direction: "rtl",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "40px 32px",
          textAlign: "center",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.08)",
          border: "1px solid #e5e7eb",
        }}
      >
        <div
          style={{
            fontSize: "72px",
            fontWeight: "800",
            color: "#2563eb",
            lineHeight: "1",
            marginBottom: "16px",
          }}
        >
          404
        </div>

        <h1
          style={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#111827",
            margin: "0 0 12px",
          }}
        >
          صفحه مورد نظر یافت نشد
        </h1>

        <p
          style={{
            fontSize: "16px",
            color: "#6b7280",
            lineHeight: "1.9",
            margin: "0 0 28px",
          }}
        >
          آدرسی که وارد کرده‌اید معتبر نیست یا صفحه مورد نظر حذف شده است.
        </p>

        <Link
          to="/home"
          style={{
            display: "inline-block",
            background: "#2563eb",
            color: "#ffffff",
            textDecoration: "none",
            padding: "12px 24px",
            borderRadius: "12px",
            fontSize: "15px",
            fontWeight: "600",
            transition: "0.2s ease",
          }}
        >
          بازگشت به صفحه ورود
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
