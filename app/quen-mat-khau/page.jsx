'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function QuenMatKhauPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
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
          <h1 className="text-xl font-bold text-white font-heading pt-2">Khôi Phục Mật Khẩu</h1>
          <p className="text-xs text-slate-400">Nhập email đã đăng ký để nhận mã xác minh khôi phục mật khẩu</p>
        </div>

        {sent ? (
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-700 text-center space-y-3">
            <i className="fa-solid fa-paper-plane text-3xl text-amber-400"></i>
            <h3 className="font-bold text-white text-base">Đã Gửi Hướng Dẫn!</h3>
            <p className="text-xs text-slate-400">Vui lòng kiểm tra hộp thư email <strong>{email}</strong> để tạo mật khẩu mới.</p>
            <Link href="/dang-nhap" className="inline-block mt-2 text-xs font-bold text-blue-400 hover:underline">
              Quay lại Đăng nhập
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Email Đã Đăng Ký *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-3 text-sm bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-600/20 transition"
            >
              GỬI MÃ KHÔI PHỤC
            </button>
          </form>
        )}

        <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-700/60">
          Nhớ mật khẩu? <Link href="/dang-nhap" className="text-amber-400 font-bold hover:underline">Đăng nhập ngay</Link>
        </div>

      </div>
    </div>
  );
}
