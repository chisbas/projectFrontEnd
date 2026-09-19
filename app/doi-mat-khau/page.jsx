'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DoiMatKhauPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Mật khẩu mới không trùng khớp!');
      return;
    }
    alert('Đổi mật khẩu thành công!');
    router.push('/dang-nhap');
  };

  return (
    <div className="bg-slate-900 text-slate-100 flex items-center justify-center min-h-[85vh] p-4">
      <div className="w-full max-w-md bg-slate-800/90 border border-slate-700 rounded-3xl p-8 shadow-2xl space-y-6">
        
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-amber-500/20">
              <i className="fa-solid fa-music"></i>
            </div>
            <span className="font-heading font-extrabold text-2xl tracking-wider text-white">HARMONIA</span>
          </Link>
          <h1 className="text-xl font-bold text-white font-heading pt-2">Đổi Mật Khẩu</h1>
          <p className="text-xs text-slate-400">Cập nhật mật khẩu mới cho tài khoản Harmonia của bạn</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Mật Khẩu Hiện Tại *</label>
            <input
              type="password"
              required
              value={formData.oldPassword}
              onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Mật Khẩu Mới *</label>
            <input
              type="password"
              required
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Nhập Lại Mật Khẩu Mới *</label>
            <input
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 text-sm bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-600/20 transition"
          >
            LƯU MẬT KHẨU MỚI
          </button>
        </form>

        <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-700/60">
          <Link href="/" className="text-amber-400 font-bold hover:underline">← Quay lại trang chủ</Link>
        </div>

      </div>
    </div>
  );
}
