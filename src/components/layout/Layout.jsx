import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  KeyRound,
  Armchair,
  Ticket,
  ReceiptText,
  Users,
  LayoutDashboard, Settings , Undo
} from "lucide-react";

const menuItems = [
  {
    label: "داشبورد",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "رمزهای موقت",
    path: "/otplogs",
    icon: KeyRound,
  },
  {
    label: "صندلی‌ها",
    path: "/seats",
    icon: Armchair,
  },
  {
    label: "بلیط‌ها",
    path: "/tickets",
    icon: Ticket,
  },
  {
    label: "تراکنش‌ها",
    path: "/transaction",
    icon: ReceiptText,
  },
  {
    label: "کاربران",
    path: "/users",
    icon: Users,
  },
   {
    label: "تنظیمات",
    path: "/Setting",
    icon: Settings,
  },{
    label:"درخواست های استرداد بلیط",
    path:"/refund" ,
    icon: Undo,
  }
];

function Layout({ children, customTitle }) {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  const activeItem =
    menuItems.find((item) => isActive(item.path)) || menuItems[0];

  return (
    <div
      dir="rtl"
      className="min-h-screen w-full bg-slate-100 text-right font-vazir text-gray-800"
    >
      <div className="flex min-h-screen w-full">
        {/* Sidebar */}
        <aside className="fixed right-0 top-0 z-40 flex h-screen w-64 shrink-0 flex-col border-l border-gray-200 bg-white shadow-sm">
          {/* Logo */}
          <div className="flex h-20 items-center border-b border-gray-100 px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-md shadow-blue-500/20">
                <Ticket className="text-white" size={24} />
              </div>

              <div>
                <h1 className="text-lg font-black text-gray-900">
                  پرند بلیط
                </h1>
                <p className="mt-0.5 text-[11px] font-medium text-gray-400">
                  پنل مدیریت
                </p>
              </div>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 px-4 py-6">
            <p className="mb-3 px-3 text-[11px] font-bold text-gray-400">
              مدیریت سامانه
            </p>

            <div className="space-y-1.5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group flex h-12 items-center gap-3 rounded-xl px-4 text-sm font-bold transition-all ${
                      active
                        ? "bg-blue-50 text-blue-600 shadow-sm"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon
                      size={20}
                      strokeWidth={active ? 2.5 : 2}
                      className={
                        active
                          ? "text-blue-600"
                          : "text-gray-400 group-hover:text-gray-700"
                      }
                    />

                    <span>{item.label}</span>

                    {active && (
                      <span className="mr-auto h-2 w-2 rounded-full bg-blue-500" />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="border-t border-gray-100 p-4">
            <div className="rounded-xl bg-slate-50 px-4 py-3">
              <p className="text-xs font-bold text-gray-700">
                پنل مدیریت پرند بلیط
              </p>
              <p className="mt-1 text-[10px] text-gray-400">
                مدیریت رویدادها و کاربران
              </p>
            </div>
          </div>
        </aside>

        {/* Main Area */}
        <div className="mr-64 flex min-h-screen min-w-0 flex-1 flex-col">
          {/* Top Header */}
          <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white/95 px-8 shadow-sm backdrop-blur">
            <div>
              <h2 className="text-xl font-black text-gray-900">
                {customTitle || activeItem.label}
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                مدیریت و کنترل بخش‌های سامانه
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-left lg:block">
                <p className="text-xs font-bold text-gray-700">
                  مدیر سامانه
                </p>
                <p className="mt-1 text-[11px] text-gray-400">
                  پرند بلیط
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-black text-blue-600">
                م
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
