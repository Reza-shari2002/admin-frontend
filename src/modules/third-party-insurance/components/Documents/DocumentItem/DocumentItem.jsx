// src/Documents/DocumentItem/DocumentItem.jsx
function DocumentItem({ id, title, desc, icon: Icon, isLast }) {
  return (
    // حذف border و rounded از اینجا و اضافه کردن border-b برای جداکننده
    <div
      className={`w-full p-4 flex items-center gap-3 text-right cursor-default select-none bg-white ${!isLast ? "border-b border-slate-100" : ""}`}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-600 text-xs font-bold">
        {id}
      </span>

      <Icon size={22} className="shrink-0 text-orange-500" strokeWidth={2} />

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-slate-800 text-sm md:text-base">
          {title}
        </h3>
        <p className="mt-0.5 text-slate-500 text-xs md:text-sm leading-5">
          {desc}
        </p>
      </div>
    </div>
  );
}

export default DocumentItem;
