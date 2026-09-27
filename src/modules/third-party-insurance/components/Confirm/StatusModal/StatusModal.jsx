function StatusModal({ open, success, title, message, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="relative z-10 w-[92%] max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 text-center">
        <div
          className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-2xl ${
            success ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
          }`}
        >
          {success ? "✓" : "!"}
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 leading-7 mb-5">{message}</p>

        <button
          type="button"
          onClick={onConfirm}
          className={`w-full rounded-xl py-3 font-bold text-white ${
            success
              ? "bg-green-600 hover:bg-green-700"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          تایید
        </button>
      </div>
    </div>
  );
}

export default StatusModal;
