'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setCategories((data.categories || []).filter(c => c.id !== 'all'));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    if (confirm('Bạn có chắc muốn xóa danh mục này?')) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-slate-400 font-bold">Đang tải danh mục...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading">Danh Sách Danh Mục</h2>
          <p className="text-xs text-slate-400">Quản lý phân loại nhạc cụ trong hệ thống</p>
        </div>
        <Link
          href="/admin/danh-muc/them"
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i> Thêm Danh Mục Mới
        </Link>
      </div>

      <div className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-700">
              <tr>
                <th className="p-4">ID / Slug</th>
                <th className="p-4">Biểu Tượng</th>
                <th className="p-4">Tên Danh Mục</th>
                <th className="p-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-800/50 transition">
                  <td className="p-4 font-bold text-amber-400">#{cat.id}</td>
                  <td className="p-4 text-amber-400 text-lg">
                    <i className={`fa-solid ${cat.icon}`}></i>
                  </td>
                  <td className="p-4 font-bold text-white">{cat.name}</td>
                  <td className="p-4 text-right space-x-2 whitespace-nowrap">
                    <button className="px-3 py-1.5 bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white rounded-lg text-xs font-bold transition inline-flex items-center gap-1.5">
                      <i className="fa-solid fa-pen text-[10px]"></i> Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
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
