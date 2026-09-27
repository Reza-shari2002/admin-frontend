import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // حالا 'vazir' به کلاس‌های تیلویند اضافه شد
        vazir: ["Vazirmatn", "sans-serif"],
      },
    },
  },
  plugins: [react(), tailwindcss()],
});
