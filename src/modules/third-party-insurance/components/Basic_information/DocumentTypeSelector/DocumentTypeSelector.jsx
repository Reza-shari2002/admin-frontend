import { CreditCard, FileText } from "lucide-react";

function DocumentTypeSelector({ value, onChange, error }) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-bold text-gray-700">
        نوع مدرک خودرو *
      </label>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onChange("0")}
          className={`flex items-center justify-between border-2 rounded-xl p-4 transition-all ${
            value === "0"
              ? "border-orange-500 bg-orange-50/30"
              : "border-gray-100 bg-white"
          }`}
        >
          <div className="flex items-center gap-2">
            <CreditCard
              size={20}
              className={value === "0" ? "text-orange-500" : "text-gray-400"}
            />
            <span className={`text-sm ${value === "0" ? "font-bold" : ""}`}>
              کارت ماشین
            </span>
          </div>

          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              value === "0" ? "border-orange-500" : "border-gray-300"
            }`}
          >
            {value === "0" && (
              <div className="w-2.5 h-2.5 bg-orange-500 rounded-full" />
            )}
          </div>
        </button>

        <button
          type="button"
          onClick={() => onChange("1")}
          className={`flex items-center justify-between border-2 rounded-xl p-4 transition-all ${
            value === "1"
              ? "border-orange-500 bg-orange-50/30"
              : "border-gray-100 bg-white"
          }`}
        >
          <div className="flex items-center gap-2">
            <FileText
              size={20}
              className={value === "1" ? "text-orange-500" : "text-gray-400"}
            />
            <span className={`text-sm ${value === "1" ? "font-bold" : ""}`}>
              برگه سبز
            </span>
          </div>

          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              value === "1" ? "border-orange-500" : "border-gray-300"
            }`}
          >
            {value === "1" && (
              <div className="w-2.5 h-2.5 bg-orange-500 rounded-full" />
            )}
          </div>
        </button>
      </div>

      {error && <p className="text-xs text-red-500">{error.message}</p>}
    </div>
  );
}

export default DocumentTypeSelector;
