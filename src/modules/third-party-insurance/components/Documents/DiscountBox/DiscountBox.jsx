import { Car, IdCard, MapPin, Percent, Star } from "lucide-react";

function DiscountBox() {
  return (
    <div className="relative mt-8 overflow-hidden rounded-[28px] border border-orange-100 bg-orange-50/60 px-5 py-6 shadow-sm">
      <div className="absolute top-0 left-0 bg-yellow-400 text-white p-2 rounded-br-2xl">
        <Star size={20} fill="currentColor" />
      </div>

      <div className="flex items-center gap-4">
        <div>
          <h3 className="text-2xl font-black text-orange-500">
            انتقال تخفیف و تعویض پلاک
          </h3>
          <p className="mt-3 text-gray-600 text-sm md:text-base leading-8">
            مدارک مورد نیاز برای انتقال تخفیف و تعویض پلاک مورد نیاز است.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DiscountBox;
