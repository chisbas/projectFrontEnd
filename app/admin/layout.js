'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'Tổng Quan (Dashboard)', icon: 'fa-chart-pie' },
    { href: '/admin/san-pham', label: 'Danh Sách Sản Phẩm', icon: 'fa-box' },
    { href: '/admin/san-pham/them', label: 'Thêm Sản Phẩm Mới', icon: 'fa-plus' },
    { href: '/admin/danh-muc', label: 'Danh Sách Danh Mục', icon: 'fa-folder-tree' },
    { href: '/admin/danh-muc/them', label: 'Thêm Danh Mục Mới', icon: 'fa-folder-plus' }
  ];

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen flex flex-col md:flex-row font-sans">
      
      {/* ADMIN SIDEBAR */}
      <aside className="w-full md:w-64 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold text-lg shadow-lg">
              <i className="fa-solid fa-music"></i>
            </div>
            <div>
              <span className="font-heading font-extrabold text-xl tracking-wider text-white block leading-none">HARMONIA</span>
              <span className="text-[9px] uppercase tracking-widest text-amber-400 font-bold">Admin Control</span>
            </div>
          </Link>

          {/* Admin Navigation Links */}
          <nav className="space-y-1.5 text-sm font-medium">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 p-3 rounded-xl transition ${
                    active
                      ? 'bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20'
                      : 'hover:bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <i className={`fa-solid ${item.icon} w-5 text-amber-500`}></i>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

        </div>

        <div className="pt-6 border-t border-slate-800">
          <Link href="/" className="flex items-center gap-2 text-xs text-slate-400 hover:text-amber-400 transition font-semibold">
            <i className="fa-solid fa-arrow-left"></i> Xem Website Khách Hàng
          </Link>
        </div>
      </aside>

      {/* MAIN ADMIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="h-20 bg-slate-950 border-b border-slate-800 px-6 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white font-heading">Bảng Quản Trị Hệ Thống</h1>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center border-2 border-amber-400">
                AD
              </div>
              <div className="hidden sm:block text-left">
                <span className="block text-xs font-bold text-white">Quản Trị Viên</span>
                <span className="block text-[10px] text-amber-400">admin@harmonia.vn</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Main Area */}
        <main className="p-6 sm:p-8 space-y-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
}
