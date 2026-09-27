// src/pages/Documentsholder.jsx
import { Car, IdCard, MapPin, Phone } from "lucide-react";
import Button_continue from "../../../../components/common/Button_continue";
import Progressbarandheader from "../../../../components/common/Progressbarandheader";
import DocumentItem from "./DocumentItem/DocumentItem";
import useDocumentsholder from "../../hooks/useDocumentsholder";

const requiredDocuments = [
  {
    id: 1,
    title: "کارت ملی",
    desc: "تصویر کارت ملی خود را آماده کنید و در مرحله بعد بارگزاری کنید",
    icon: IdCard,
  },
  {
    id: 2,
    title: "مدارک خودرو",
    desc: "تصویر کارت ماشین از پشت و روی کارت یا برگه سبز را آماده کنید و در مرحله بعد بارگزاری کنید",
    icon: Car,
  },
  {
    id: 3,
    title: "آدرس و کد پستی",
    desc: "آدرس محل سکونت و کد پستی ثبت شده در سامانه املاک را در مرحله بعد بارگزاری کنید",
    icon: MapPin,
  },
  { id: 4, title: "شماره تماس", desc: "شماره تماس الزامی میباشد", icon: Phone },
];

function Documentsholder() {
  useDocumentsholder();

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto px-4 pt-0 pb-32 md:pb-12">
      <Progressbarandheader
        current_step={1}
        title={"مدارک مورد نیاز"}
        body={"مدارک مورد نیاز که در مراحل بعد تکمیل میشود به شرح زیر میباشد"}
      />

      {/* این کانتینر اصلی همان جعبه بزرگ است که همه چیز را در بر می‌گیرد */}
      <div className="mt-8 w-full border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
        {requiredDocuments.map((item, index) => (
          <DocumentItem
            key={item.id}
            {...item}
            isLast={index === requiredDocuments.length - 1}
          />
        ))}
      </div>

      <Button_continue path={"/basic-information"} step={1} />
    </div>
  );
}

export default Documentsholder;
