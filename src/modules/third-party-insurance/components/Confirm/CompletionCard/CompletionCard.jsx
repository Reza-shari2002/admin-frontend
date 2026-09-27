function CompletionCard() {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 p-5 md:p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center text-xl">
          ✓
        </div>

        <div className="flex-1">
          <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1">
            شما مراحل را با موفقیت تکمیل کرده‌اید
          </h3>
          <p className="text-sm md:text-base text-gray-600 leading-7">
            فقط یک مرحله‌ی نهایی باقی مانده است.لطفا بر روی دکمه ثبت اطلاعات
            کلیک کنید و صبور باشید
          </p>
        </div>
      </div>
    </div>
  );
}

export default CompletionCard;
