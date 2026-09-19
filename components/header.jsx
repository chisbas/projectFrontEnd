'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    cartCount,
    toastMessage,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    searchQuery,
    setSearchQuery
  } = useCart();

  const [localSearch, setLocalSearch] = useState(searchQuery || '');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch);
      router.push(`/san-pham?search=${encodeURIComponent(localSearch.trim())}`);
    } else {
      router.push('/san-pham');
    }
  };

  const navLinks = [
    { href: '/', label: 'Trang Chủ' },
    { href: '/san-pham', label: 'Sản Phẩm' },
    { href: '/bai-viet', label: 'Tin Tức' },
    { href: '/gioi-thieu', label: 'Giới Thiệu' },
    { href: '/lien-he', label: 'Liên Hệ' }
  ];

  const isActive = (path) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-6 py-3.5 rounded-xl shadow-2xl border-l-4 border-amber-500 flex items-center gap-3 animate-bounce">
          <i className="fa-solid fa-circle-check text-amber-500 text-xl"></i>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span><i className="fa-solid fa-phone text-amber-500 mr-1"></i> Hotline: 1900 6868</span>
            <span className="hidden md:inline"><i className="fa-solid fa-location-dot text-amber-500 mr-1"></i> 123 Lý Thường Kiệt, Q.10, TP.HCM</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <Link href="/gioi-thieu" className="hover:text-amber-500 transition">Về Chúng Tôi</Link>
            <span>|</span>
            <Link href="/lien-he" className="hover:text-amber-500 transition">Hệ Thống Showroom</Link>
            <span>|</span>
            <Link href="/dang-nhap" className="hover:text-amber-500 transition"><i className="fa-regular fa-user mr-1"></i> Tài khoản</Link>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION BAR */}
      <header className="sticky top-0 z-50 glass-nav shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition transform">
                <i className="fa-solid fa-music"></i>
              </div>
              <div>
                <span className="font-heading font-extrabold text-2xl tracking-tight text-white block leading-none">HARMONIA</span>
                <span className="text-[10px] tracking-widest uppercase text-amber-400 font-semibold">Premium Instruments</span>
              </div>
            </Link>

            {/* Search Bar (Desktop & Tablet) */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md mx-8 relative">
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Tìm kiếm guitar, piano, saxophone..."
                className="w-full bg-slate-800/80 text-white placeholder-slate-400 text-sm rounded-full pl-5 pr-12 py-2.5 border border-slate-700 focus:outline-none focus:border-amber-500 transition"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 bg-amber-600 hover:bg-amber-500 text-white rounded-full flex items-center justify-center transition"
              >
                <i className="fa-solid fa-magnifying-glass text-sm"></i>
              </button>
            </form>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-200">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`py-1 border-b-2 text-sm font-semibold transition-all duration-200 ${
                      active
                        ? 'text-amber-400 border-amber-400'
                        : 'text-slate-200 hover:text-amber-400 border-transparent'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Utility Icons */}
            <div className="flex items-center gap-4">
              <Link
                href="/dang-nhap"
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 text-slate-300 hover:text-amber-400 hover:bg-slate-700 transition"
                title="Tài khoản"
              >
                <i className="fa-regular fa-user text-lg"></i>
              </Link>

              <Link
                href="/gio-hang"
                className="relative flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 text-slate-300 hover:text-amber-400 hover:bg-slate-700 transition"
                title="Giỏ hàng"
              >
                <i className="fa-solid fa-cart-shopping text-lg"></i>
                {cartCount > 0 && (
                  <span className="cart-badge-count absolute -top-1 -right-1 bg-amber-500 text-slate-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link
                href="/admin"
                className="hidden xl:flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 transition"
              >
                <i className="fa-solid fa-lock text-xs"></i> Admin Portal
              </Link>

              <button
                id="mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden w-10 h-10 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-700 transition"
              >
                <i className="fa-solid fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            id="mobile-menu-overlay"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div
            id="mobile-menu-drawer"
            className="relative w-80 max-w-[85vw] bg-slate-900 text-white z-10 p-6 flex flex-col justify-between shadow-2xl"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
                    <i className="fa-solid fa-music"></i>
                  </div>
                  <span className="font-heading font-bold text-lg tracking-wider text-amber-400">HARMONIA</span>
                </div>
                <button
                  id="mobile-menu-close"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-400 hover:text-white p-2 text-xl"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              {/* Mobile Search Form */}
              <form onSubmit={handleSearchSubmit} className="mt-4 relative">
                <input
                  type="text"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder="Tìm kiếm nhạc cụ..."
                  className="w-full bg-slate-800 text-white text-sm rounded-lg pl-4 pr-10 py-2 border border-slate-700 focus:outline-none focus:border-amber-500"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>

              {/* Mobile Nav Links */}
              <nav className="flex flex-col gap-1 pt-6 text-base font-medium">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`mobile-nav-link p-3 rounded-lg transition flex items-center justify-between ${
                        active ? 'bg-slate-800 text-amber-400 font-bold' : 'hover:bg-slate-800 text-slate-200'
                      }`}
                    >
                      <span>{link.label}</span>
                      <i className="fa-solid fa-chevron-right text-xs opacity-40"></i>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-slate-800 space-y-2">
              <Link
                href="/dang-nhap"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full block text-center py-2.5 rounded-lg border border-slate-700 font-semibold text-slate-200 hover:bg-slate-800 transition text-sm"
              >
                Đăng Nhập
              </Link>
              <Link
                href="/dang-ky"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full block text-center py-2.5 rounded-lg bg-amber-600 font-semibold text-white hover:bg-amber-500 transition shadow-lg shadow-amber-600/30 text-sm"
              >
                Đăng Ký Tài Khoản
              </Link>
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full block text-center py-2 text-xs font-semibold text-amber-400 hover:underline"
              >
                <i className="fa-solid fa-lock mr-1"></i> Trang Quản Trị (Admin)
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}