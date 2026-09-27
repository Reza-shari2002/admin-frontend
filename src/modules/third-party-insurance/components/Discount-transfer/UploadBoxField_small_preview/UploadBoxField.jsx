import { Upload, X } from "lucide-react";
import { useEffect, useState } from "react";

function UploadBoxField({ label, error, fileName, file, onChange }) {
  const [preview, setPreview] = useState(null);

  // ساخت پیش‌نمایش از فایل
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    let objectUrl;
    if (file instanceof File) {
      objectUrl = URL.createObjectURL(file);
    } else if (file.buffer instanceof ArrayBuffer) {
      const blob = new Blob([file.buffer], { type: file.type });
      objectUrl = URL.createObjectURL(blob);
    }

    setPreview(objectUrl);
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-gray-700">{label}</label>

      {preview ? (
        // حالت نمایش پیش‌نمایش - افقی
        <div className="flex flex-row-reverse items-center gap-3 border-2 border-dashed border-green-300 rounded-2xl p-2.5 bg-green-50/30">
          <img
            src={preview}
            alt={fileName}
            className="w-12 h-12 object-cover rounded-xl flex-shrink-0"
          />
          <div className="flex flex-col gap-0.5 min-w-0 flex-1">
            <span className="text-xs font-bold text-green-700 truncate">
              {fileName}
            </span>
            <span className="text-[10px] text-green-500">
              فایل با موفقیت بارگذاری شد
            </span>
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="flex-shrink-0 text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg transition-colors"
            aria-label="حذف فایل"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        // حالت خالی (قبل از آپلود) - افقی
        <label
          className={`border-2 border-dashed rounded-2xl px-3 py-2.5 flex flex-row-reverse items-center gap-3 cursor-pointer transition-all group ${
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

          <div className="bg-orange-100 p-2 rounded-full text-orange-500 group-hover:scale-110 transition-transform flex-shrink-0">
            <Upload size={18} />
          </div>

          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-gray-800 truncate">
              برای آپلود کلیک کنید
            </span>
            <span className="text-[10px] text-gray-400">
              JPG, PNG حداکثر ۵ مگابایت
            </span>
          </div>
        </label>
      )}

      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  );
}

export default UploadBoxField;
