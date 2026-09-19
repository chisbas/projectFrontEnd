'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setCategories((data.categories || []).filter(c => c.slug !== ''));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  return (
    <div className="space-y-8">
      
      {/* METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase">Tổng Doanh Thu</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-lg">
              <i className="fa-solid fa-sack-dollar"></i>
            </div>
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-white font-heading">850.400.000đ</span>
          <span className="text-xs text-emerald-400 font-bold block"><i className="fa-solid fa-arrow-trend-up mr-1"></i> +18.4% so với tháng trước</span>
        </div>

        <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase">Tổng Đơn Hàng</span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-lg">
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-white font-heading">324 Đơn</span>
          <span className="text-xs text-amber-400 font-bold block"><i className="fa-solid fa-arrow-trend-up mr-1"></i> +12 đơn mới hôm nay</span>
        </div>

        <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase">Tổng Sản Phẩm</span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-lg">
              <i className="fa-solid fa-box"></i>
            </div>
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            {loading ? '...' : `${products.length} Mẫu`}
          </span>
          <span className="text-xs text-slate-400 font-bold block">
            {loading ? '...' : `${categories.length} Danh mục nhạc cụ`}
          </span>
        </div>

        <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase">Khách Hàng Mới</span>
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-lg">
              <i className="fa-solid fa-users"></i>
            </div>
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-white font-heading">1.450</span>
          <span className="text-xs text-emerald-400 font-bold block"><i className="fa-solid fa-arrow-trend-up mr-1"></i> +8.2% tăng trưởng</span>
        </div>

      </div>

      {/* RECENT ORDERS TABLE */}
      <div className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-700/80 flex items-center justify-between">
          <h2 className="font-bold text-white text-lg font-heading">Đơn Hàng Mới Nhất</h2>
          <Link href="/admin/san-pham" className="text-xs font-bold text-amber-400 hover:underline">
            Xem tất cả
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-700">
              <tr>
                <th className="p-4">Mã Đơn</th>
                <th className="p-4">Khách Hàng</th>
                <th className="p-4">Sản Phẩm Chi Tiết</th>
                <th className="p-4">Tổng Tiền</th>
                <th className="p-4">Trạng Thái</th>
                <th className="p-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60">
              {!loading && products.length >= 2 && (
                <>
                  <tr>
                    <td className="p-4 font-bold text-amber-400">#HAR-98231</td>
                    <td className="p-4 font-medium text-white">Nguyễn Văn Anh</td>
                    <td className="p-4">{products[0].name}</td>
                    <td className="p-4 font-bold text-white">{formatPrice(products[0].price + products[1].price)}</td>
                    <td className="p-4"><span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold">Chờ xử lý</span></td>
                    <td className="p-4 text-right">
                      <button className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-bold">Xem</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-amber-400">#HAR-98230</td>
                    <td className="p-4 font-medium text-white">Trần Thị Bích</td>
                    <td className="p-4">{products[2]?.name || products[1].name}</td>
                    <td className="p-4 font-bold text-white">{formatPrice(products[2]?.price || products[1].price)}</td>
                    <td className="p-4"><span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">Đã hoàn thành</span></td>
                    <td className="p-4 text-right">
                      <button className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-bold">Xem</button>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
