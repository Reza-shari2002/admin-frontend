import { Car, IdCard, MapPin, Percent, Star } from "lucide-react";

function Progressbarandheader({ current_step, title, body }) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2">
        <div className="text-orange-500 bg-orange-50 p-1.5 rounded-xl">
          <Car size={24} />
        </div>
        <h2 className="font-bold text-gray-900 text-lg">بیمه خودرو</h2>
      </div>

      <div className="mt-4 flex items-center justify-center gap-1.5">
        {[1, 2, 3, 4, 5, 6, 7 , 8 ].map((step) => (
          <span
            key={step}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step <= current_step ? "bg-orange-500 w-7" : "bg-gray-200 w-7"
            }`}
          />
        ))}
      </div>

      <h1 className="mt-5 text-2xl md:text-3xl font-black text-gray-900">
        {title}
      </h1>

      <p className="mt-2 text-gray-800 text-sm">{body}</p>
    </div>
  );
}

export default Progressbarandheader;
