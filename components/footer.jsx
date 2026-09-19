import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-amber-500/20">
                <i className="fa-solid fa-music"></i>
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white font-heading">HARMONIA</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Harmonia Music Store là nhà phân phối nhạc cụ cao cấp chính hãng hàng đầu Việt Nam. Chuyên phân phối Piano, Guitar, Saxophone, Trống từ các thương hiệu Fender, Yamaha, Roland, Steinway & Sons.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-amber-600 hover:border-amber-600 transition">
                <i className="fa-brands fa-facebook-f text-sm"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-red-600 hover:border-red-600 transition">
                <i className="fa-brands fa-youtube text-sm"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-pink-600 hover:border-pink-600 transition">
                <i className="fa-brands fa-instagram text-sm"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition">
                <i className="fa-brands fa-tiktok text-sm"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 font-heading">Danh Mục Nhạc Cụ</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/san-pham?category=guitar" className="hover:text-amber-400 transition">Đàn Guitar Điện & Acoustic</Link></li>
              <li><Link href="/san-pham?category=piano" className="hover:text-amber-400 transition">Đàn Piano Cơ & Điện</Link></li>
              <li><Link href="/san-pham?category=ken-flute" className="hover:text-amber-400 transition">Kèn Saxophone & Flute</Link></li>
              <li><Link href="/san-pham?category=trong" className="hover:text-amber-400 transition">Bộ Trống Điện & Cơ</Link></li>
              <li><Link href="/san-pham?category=violin" className="hover:text-amber-400 transition">Violin & Cello</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 font-heading">Hỗ Trợ Khách Hàng</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/gio-hang" className="hover:text-amber-400 transition">Chính Sách Bảo Hành 5 Năm</Link></li>
              <li><Link href="/gio-hang" className="hover:text-amber-400 transition">Hướng Dẫn Mua Trả Góp 0%</Link></li>
              <li><Link href="/lien-he" className="hover:text-amber-400 transition">Chính Sách Vận Chuyển</Link></li>
              <li><Link href="/gioi-thieu" className="hover:text-amber-400 transition">Câu Hỏi Thường Gặp (FAQ)</Link></li>
            </ul>
          </div>

          {/* Showroom & Contact */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 font-heading">Hệ Thống Showroom</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <i className="fa-solid fa-location-dot text-amber-400 mt-1"></i>
                <span>123 Lý Thường Kiệt, Phường 7, Quận 10, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <i className="fa-solid fa-phone text-amber-400"></i>
                <span className="text-white font-semibold">1900 6868 - (028) 3868 9999</span>
              </li>
              <li className="flex items-center gap-2.5">
                <i className="fa-solid fa-envelope text-amber-400"></i>
                <span>support@harmonia.com.vn</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Harmonia Music Store. Tất cả quyền được bảo lưu.</p>
          <div className="flex items-center gap-6">
            <Link href="/gioi-thieu" className="hover:text-slate-400 transition">Điều Khoản Sử Dụng</Link>
            <Link href="/gioi-thieu" className="hover:text-slate-400 transition">Bảo Mật Thông Tin</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}