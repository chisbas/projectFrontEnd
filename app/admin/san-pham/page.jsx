'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminProductsPage() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProductList(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      setProductList(productList.filter((p) => p.id !== id));
    }
  };

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  if (loading) {
    return <div className="p-12 text-center text-slate-400 font-bold">Đang tải sản phẩm...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading">Danh Sách Sản Phẩm</h2>
          <p className="text-xs text-slate-400">Quản lý toàn bộ thông tin sản phẩm trong cửa hàng</p>
        </div>
        <Link
          href="/admin/san-pham/them"
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i> Thêm Sản Phẩm Mới
        </Link>
      </div>

      <div className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-700">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Hình Ảnh</th>
                <th className="p-4">Tên Sản Phẩm</th>
                <th className="p-4">Danh Mục</th>
                <th className="p-4">Thương Hiệu</th>
                <th className="p-4">Giá Bán</th>
                <th className="p-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60">
              {productList.map((product) => (
                <tr key={product.id} className="hover:bg-slate-800/50 transition">
                  <td className="p-4 font-bold text-amber-400">#{product.id}</td>
                  <td className="p-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 overflow-hidden flex items-center justify-center p-1">
                      <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                    </div>
                  </td>
                  <td className="p-4 font-bold text-white max-w-xs">{product.name}</td>
                  <td className="p-4 text-slate-400">{product.category}</td>
                  <td className="p-4 text-slate-400">{product.brand}</td>
                  <td className="p-4 font-bold text-amber-400">{formatPrice(product.price)}</td>
                  <td className="p-4 text-right space-x-2 whitespace-nowrap">
                    <button className="px-3 py-1.5 bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-bold transition inline-flex items-center gap-1.5">
                      <i className="fa-solid fa-pen text-[10px]"></i> Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="px-3 py-1.5 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white rounded-lg text-xs font-bold transition inline-flex items-center gap-1.5"
                    >
                      <i className="fa-solid fa-trash text-[10px]"></i> Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
