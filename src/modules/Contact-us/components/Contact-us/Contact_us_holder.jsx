function Contact_us_holder() {
  return (
    <div className="w-full px-4 py-8 md:py-12">
      <div className="mx-auto max-w-6xl space-y-6 md:space-y-8">
        {/* Title */}
        <div className="mx-auto max-w-2xl rounded-[2rem] bg-[#FDF0D5] px-6 py-8 text-center shadow-sm border border-orange-100">
          <h1 className="text-2xl md:text-3xl font-black text-orange-500">
            تماس با ما
          </h1>
          <p className="mt-3 text-sm md:text-base text-gray-600 leading-7">
            برای ارتباط با تیم پشتیبانی، از اطلاعات زیر استفاده کنید.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 items-stretch">
          {/* Map */}


          {/* Contact Card */}
          <div className="rounded-[1.75rem] bg-[#FDF0D5] border border-orange-100 shadow-sm p-5 md:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/80 text-orange-500 shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h.75a2.25 2.25 0 002.25-2.25v-.722a1.125 1.125 0 00-.879-1.096l-4.334-.966a1.125 1.125 0 00-1.21.502l-1.125 1.875a12.036 12.036 0 01-5.036-5.036l1.875-1.125a1.125 1.125 0 00.502-1.21l-.966-4.334a1.125 1.125 0 00-1.096-.879H4.5A2.25 2.25 0 002.25 6.75z"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">شماره تماس</p>
                  <a
                    href="tel:06191012300"
                    className="text-lg md:text-xl font-bold text-gray-900 hover:text-orange-500 transition-colors tracking-wider"
                  >
                    ۰۶۱-۹۱۰۱۲۳۰۰
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/80 text-orange-500 shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 9v6.75A2.25 2.25 0 0119.5 18H4.5A2.25 2.25 0 012.25 15.75V9m19.5 0A2.25 2.25 0 0019.5 6.75h-15A2.25 2.25 0 002.25 9m19.5 0l-8.293 5.004a2.25 2.25 0 01-2.414 0L2.25 9"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">ایمیل</p>
                  <a
                    href="mailto:Info@parand.app"
                    className="text-lg md:text-xl font-bold text-gray-900 break-all hover:text-orange-500 transition-colors"
                  >
                    Info@parand.app
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/80 text-orange-500 shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21.75s6.75-5.25 6.75-11.25A6.75 6.75 0 105.25 10.5c0 6 6.75 11.25 6.75 11.25z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 12.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">آدرس</p>
                  <p className="text-base md:text-lg font-semibold text-gray-900 leading-8">
                    ایران، استان خوزستان، ماهشهر، ناحیه صنعتی، خیابان فرهنگسرا،
                    نبش بلوار بهار، مجتمع فرحانی، طبقه ۴
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-white/60 border border-white/70 p-4 text-sm text-gray-600 leading-7">
              در صورت نیاز به راهنمایی بیشتر، از طریق تلفن یا ایمیل با ما در
              ارتباط باشید.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact_us_holder;
