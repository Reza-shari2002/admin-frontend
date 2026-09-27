import React from "react";
import { Controller } from "react-hook-form";
import Progressbarandheader from "../../../../components/common/Progressbarandheader";
import Button_submit from "../../../../components/common/Button_submit";
import usePayment from "../../hooks/usePayment";

function PayMent_holder() {
  const { control, handleSubmit, errors, isSubmitting, selectedPaymentType } =
    usePayment();

  const paymentOptions = [
    { value: "0", label: "نقدی", desc: "اعلام قیمت به صورت نقد" },
    { value: "1", label: " اقساطی", desc: "اعلام قیمت به صورت اقساط" },
    { value: "2", label: "هر دو", desc: "اعلام قیمت نقد و اقساط" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto space-y-6"
    >
      <Progressbarandheader
        current_step={7}
        title="نوع پرداخت"
        body="لطفاً نحوه پرداخت ترجیحی خود را مشخص کنید."
      />

      <div className="space-y-4">
        <Controller
          name="payment_type"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-1 gap-4">
              {paymentOptions.map((option) => {
                const isSelected = field.value === option.value;
                return (
                  <label
                    key={option.value}
                    className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 shadow-sm ${
                      isSelected
                        ? "border-warning bg-orange-50/30"
                        : "border-gray-100 bg-white hover:border-gray-200"
                    }`}
                  >
                    <div className="flex flex-col space-y-1">
                      <span className="font-bold text-gray-800">
                        {option.label}
                      </span>
                      <span className="text-xs text-gray-500">
                        {option.desc}
                      </span>
                    </div>

                    <input
                      type="radio"
                      name="payment_type"
                      value={option.value}
                      checked={isSelected}
                      onChange={() => field.onChange(option.value)}
                      className="radio radio-warning w-6 h-6"
                    />
                  </label>
                );
              })}
            </div>
          )}
        />

        {errors.payment_type && (
          <p className="text-red-500 text-xs mt-1 pr-2">
            {errors.payment_type.message}
          </p>
        )}
      </div>

      <div className="pt-4">
        <Button_submit loading={isSubmitting} />
      </div>
    </form>
  );
}

export default PayMent_holder;
