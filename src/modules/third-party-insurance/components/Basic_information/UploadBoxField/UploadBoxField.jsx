import { Upload } from "lucide-react";

function UploadBoxField({ label, error, fileName, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-gray-700">{label}</label>

      <label
        className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all group ${
          error
            ? "border-red-300 bg-red-50/40"
            : "border-gray-200 hover:bg-orange-50/30 hover:border-orange-300"
        }`}
      >
        <input
          type="file"
          className="hidden"
          accept=".jpg,.jpeg,.png,image/png,image/jpeg"
          onChange={(e) => onChange(e.target.files?.[0] || null)}
        />

        <div className="bg-orange-100 p-3 rounded-full text-orange-500 group-hover:scale-110 transition-transform">
          <Upload size={24} />
        </div>

        <span className="text-sm font-bold text-gray-800">
          برای آپلود کلیک کنید
        </span>

        <span className="text-[10px] text-gray-400 mt-2">
          JPG, PNG حداکثر ۵ مگابایت
        </span>

        {fileName && (
          <span className="text-xs text-green-600 font-bold mt-2">
            {fileName}
          </span>
        )}
      </label>

      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  );
}

export default UploadBoxField;
