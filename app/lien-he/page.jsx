'use client';

import { useState } from 'react';

export default function LienHePage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-widest">Hệ Thống Showroom & Liên Hệ</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          Kết Nối Với Harmonia Music
        </h1>
        <p className="text-slate-500 text-sm">
          Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của quý khách 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SHOWROOM LIST */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="rounded-2xl overflow-hidden h-44 w-full shadow-sm border border-slate-100">
              <img src="/images/contact/showroom-map.jpg" alt="Showroom Harmonia" className="w-full h-full object-cover" />
            </div>

            <h3 className="font-bold text-lg text-slate-900 font-heading border-b border-slate-100 pb-3 flex items-center gap-2">
              <i className="fa-solid fa-store text-amber-600"></i> Showroom Chính (TP.HCM)
            </h3>

            <div className="space-y-4 text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <i className="fa-solid fa-location-dot text-amber-600 mt-1"></i>
                <div>
                  <span className="font-bold text-slate-900 block">Harmonia Quận 10</span>
                  <span>123 Lý Thường Kiệt, Phường 7, Quận 10, TP. Hồ Chí Minh</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <i className="fa-solid fa-phone text-amber-600"></i>
                <span>Hotline: <strong className="text-slate-900">1900 6868</strong> / (028) 3868 9999</span>
              </div>

              <div className="flex items-center gap-3">
                <i className="fa-solid fa-envelope text-amber-600"></i>
                <span>Email: support@harmonia.com.vn</span>
              </div>

              <div className="flex items-center gap-3">
                <i className="fa-solid fa-clock text-amber-600"></i>
                <span>Giờ mở cửa: <strong className="text-slate-900">08:00 - 21:30</strong> (Tất cả các ngày trong tuần)</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 shadow-md space-y-3 border border-slate-800">
            <h4 className="font-bold text-base font-heading text-amber-400 flex items-center gap-2">
              <i className="fa-solid fa-screwdriver-wrench"></i> Hỗ Trợ Kỹ Thuật & Căn Chỉnh Đàn
            </h4>
            <p className="text-xs text-slate-300">
              Quý khách cần hỗ trợ lên dây, căn chỉnh action hay sửa chữa nhạc cụ? Vui lòng liên hệ bộ phận kỹ thuật theo số <strong className="text-amber-400">0909 123 456</strong>.
            </p>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <h3 className="font-bold text-xl text-slate-900 font-heading">Gửi Lời Nhắn Cho Chúng Tôi</h3>
            
            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-800 space-y-2">
                <i className="fa-solid fa-circle-check text-3xl text-emerald-600"></i>
                <h4 className="font-bold text-lg">Cảm ơn bạn đã liên hệ!</h4>
                <p className="text-xs">Lời nhắn của bạn đã được chuyển tới bộ phận chăm sóc khách hàng. Chúng tôi sẽ phản hồi sớm nhất.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Họ & Tên (*)</label>
                    <input type="text" required placeholder="Nguyễn Văn A" className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl p-3 focus:outline-none focus:border-amber-500 focus:bg-white transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Số Điện Thoại (*)</label>
                    <input type="tel" required placeholder="0901 234 567" className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl p-3 focus:outline-none focus:border-amber-500 focus:bg-white transition" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
                  <input type="email" placeholder="name@example.com" className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl p-3 focus:outline-none focus:border-amber-500 focus:bg-white transition" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nội Dung Lời Nhắn (*)</label>
                  <textarea required rows={4} placeholder="Nhập câu hỏi hoặc nhạc cụ bạn đang quan tâm..." className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl p-3 focus:outline-none focus:border-amber-500 focus:bg-white transition"></textarea>
                </div>

                <button type="submit" className="w-full py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-extrabold rounded-xl shadow-lg shadow-amber-600/20 transition">
                  Gửi Phản Hồi
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
