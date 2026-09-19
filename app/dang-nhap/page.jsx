'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DangNhapPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    alert('Đăng nhập thành công!');
    router.push('/');
  };

  return (
    <div className="bg-slate-900 text-slate-100 flex items-center justify-center min-h-[85vh] p-4">
      <div className="w-full max-w-md bg-slate-800/90 border border-slate-700 rounded-3xl p-8 shadow-2xl space-y-6">
        
        {/* LOGO HEADER */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-amber-500/20">
              <i className="fa-solid fa-music"></i>
            </div>
            <span className="font-heading font-extrabold text-2xl tracking-wider text-white">HARMONIA</span>
          </Link>
          <h1 className="text-xl font-bold text-white font-heading pt-2">Đăng Nhập Tài Khoản</h1>
          <p className="text-xs text-slate-400">Chào mừng bạn quay trở lại với Harmonia Music</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Email hoặc Số điện thoại</label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-4 py-3 text-sm bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-bold text-slate-300 uppercase">Mật khẩu</label>
              <Link href="/quen-mat-khau" className="text-xs text-amber-400 hover:underline">Quên mật khẩu?</Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 text-sm bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <input type="checkbox" id="remember" className="rounded border-slate-700 bg-slate-900 text-blue-600" />
            <label htmlFor="remember">Ghi nhớ đăng nhập</label>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-600/20 transition"
          >
            ĐĂNG NHẬP
          </button>
        </form>

        <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-700/60">
          Chưa có tài khoản? <Link href="/dang-ky" className="text-amber-400 font-bold hover:underline">Đăng ký tài khoản mới</Link>
        </div>

      </div>
    </div>
  );
}
