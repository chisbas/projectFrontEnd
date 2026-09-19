'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminAddCategoryPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    icon: 'fa-guitar'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Đã thêm danh mục "${formData.name}" thành công!`);
    router.push('/admin/danh-muc');
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading">Thêm Danh Mục Mới</h2>
          <p className="text-xs text-slate-400">Tạo danh mục phân loại mới cho kho nhạc cụ</p>
        </div>
        <Link href="/admin/danh-muc" className="text-xs text-slate-400 hover:text-white font-bold">
          ← Quay lại danh sách
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-800/80 rounded-2xl border border-slate-700 p-6 space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Tên Danh Mục *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ví dụ: Kèn Saxophone & Flute"
            className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Đường Dẫn Slug *</label>
          <input
            type="text"
            required
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="ken-flute"
            className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Mã Icon FontAwesome *</label>
          <input
            type="text"
            required
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            placeholder="fa-wind"
            className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-lg transition"
        >
          LƯU DANH MỤC MỚI
        </button>
      </form>
    </div>
  );
}
