'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminAddProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    brand: '',
    price: '',
    oldPrice: '',
    image: '',
    description: ''
  });

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        const cats = (data.categories || []).filter(c => c.id !== 'all');
        const brs = (data.brands || []).map(b => typeof b === 'string' ? b : b.name);
        setCategories(cats);
        setBrands(brs);
        setFormData(prev => ({
          ...prev,
          category: cats.length > 0 ? cats[0].name : '',
          brand: brs.length > 0 ? brs[0] : ''
        }));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Đã thêm sản phẩm "${formData.name}" thành công!`);
    router.push('/admin/san-pham');
  };

  if (loading) {
    return <div className="p-12 text-center text-slate-400 font-bold">Đang tải...</div>;
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white font-heading">Thêm Sản Phẩm Mới</h2>
          <p className="text-xs text-slate-400">Điền đầy đủ thông tin nhạc cụ mới vào hệ thống</p>
        </div>
        <Link href="/admin/san-pham" className="text-xs text-slate-400 hover:text-white font-bold">
          ← Quay lại danh sách
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-800/80 rounded-2xl border border-slate-700 p-6 space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Tên Sản Phẩm *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ví dụ: Fender Player Stratocaster"
            className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Danh Mục *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500 font-medium"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Thương Hiệu *</label>
            <select
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500 font-medium"
            >
              {brands.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Giá Bán (VNĐ) *</label>
            <input
              type="number"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="18500000"
              className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Giá Gốc / Cũ (Tùy chọn)</label>
            <input
              type="number"
              value={formData.oldPrice}
              onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
              placeholder="21800000"
              className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">URL Hình Ảnh *</label>
          <input
            type="text"
            required
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://images.unsplash.com/..."
            className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Mô Tả Sản Phẩm *</label>
          <textarea
            rows={4}
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Mô tả chi tiết âm thanh, chất liệu gỗ, phụ kiện đi kèm..."
            className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-lg transition"
        >
          LƯU SẢN PHẨM MỚI
        </button>
      </form>
    </div>
  );
}
