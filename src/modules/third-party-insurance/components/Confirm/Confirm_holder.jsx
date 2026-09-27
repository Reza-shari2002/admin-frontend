import React from "react";
import { ArcaptchaWidget } from "arcaptcha-react";
import Progressbarandheader from "../../../../components/common/Progressbarandheader";
import FinalActionButtons from "../../../../components/common/FinalActionButtons";
import CompletionCard from "./CompletionCard/CompletionCard";
import StatusModal from "./StatusModal/StatusModal";
import useConfirm from "../../hooks/useConfirm";

function Confirm_holder() {
  const {
    loading,
    statusText,
    modal,
    captchaToken,
    captchaError,
    handleVerify,
    handleExpire,
    handleError,
    handleSubmit,
    handleModalConfirm,
  } = useConfirm();

  return (
    <>
      <Progressbarandheader current_step={8} title="ثبت اطلاعات" body="" />

      <div className="w-full px-4 pb-10">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="rounded-2xl bg-white p-5 md:p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              تایید نهایی اطلاعات
            </h3>

            <p className="text-sm text-gray-500 mb-4 leading-7">
              پس از ثبت موفق آمیز اطلاعات، نتیجه از طریق پیامک ارسال خواهد
              شد.{" "}
            </p>

            <div className="mt-6 flex flex-col items-center gap-2 w-full">
              <ArcaptchaWidget
                site-key={import.meta.env.VITE_ARCAPTCHA_SITE_KEY}
                callback={handleVerify}
                expired_callback={handleExpire}
                script_loading_failed_callback={handleError}
                theme="light"
                lang="fa"
              />

              {captchaError && (
                <p className="text-red-500 text-sm">{captchaError}</p>
              )}
            </div>

            <FinalActionButtons
              loading={loading}
              captchaToken={captchaToken}
              statusText={statusText}
              onSubmit={handleSubmit}
            />

            {loading && (
              <p className="mt-3 text-center text-sm text-gray-500">
                در حال ثبت اطلاعات، صبور باشید.
              </p>
            )}
          </div>
        </div>
      </div>

      <StatusModal
        open={modal.open}
        success={modal.success}
        title={modal.title}
        message={modal.message}
        onConfirm={handleModalConfirm}
      />
    </>
  );
}

export default Confirm_holder;
