import Link from 'next/link';

export default function GioiThieuPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* HERO BANNER */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white p-8 sm:p-16 overflow-hidden shadow-xl border border-slate-800">
        <div className="absolute inset-0 opacity-25 bg-cover bg-center pointer-events-none" style={{ backgroundImage: "url('/images/about/about-hero.jpg')" }}></div>
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="text-amber-400 text-xs uppercase font-extrabold tracking-widest px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full inline-block">Thành Lập Từ 2012</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-heading leading-tight">
            Về Harmonia Music Store
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Hành trình 14 năm theo đuổi sứ mệnh nâng tầm âm nhạc Việt Nam. Chúng tôi tự hào là đơn vị phân phối nhạc cụ chính hãng uy tín bậc nhất với hơn 50.000+ sản phẩm trao tới tay các nghệ sĩ.
          </p>
        </div>
      </div>

      {/* SHOWROOM IMAGE HIGHLIGHT */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200">
        <img src="/images/about/showroom.jpg" alt="Showroom Harmonia" className="w-full h-80 sm:h-96 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent flex items-end p-8">
          <div className="text-white">
            <span className="text-xs uppercase font-bold text-amber-400">Không Gian Trải Nghiệm</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading">Hệ Thống Showroom Đạt Chuẩn Quốc Tế</h2>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">Hơn 500m² trưng bày piano cơ, guitar, trống điện và phòng cách âm thử nhạc cụ chuyên nghiệp.</p>
          </div>
        </div>
      </div>

      {/* CORE VALUES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4 text-center hover:border-amber-300 hover:shadow-md transition">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl mx-auto">
            <i className="fa-solid fa-award"></i>
          </div>
          <h3 className="font-extrabold text-xl text-slate-900 font-heading">Chính Hãng 100%</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Cam kết hoàn tiền 200% nếu phát hiện hàng giả, hàng nhái. Tất cả nhạc cụ đều đầy đủ CO/CQ từ hãng sản xuất.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4 text-center hover:border-amber-300 hover:shadow-md transition">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl mx-auto">
            <i className="fa-solid fa-headphones-simple"></i>
          </div>
          <h3 className="font-extrabold text-xl text-slate-900 font-heading">Chuyên Viên Đào Tạo</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Đội ngũ tư vấn viên đều là các nhạc công, giảng viên âm nhạc sẵn sàng hỗ trợ bạn chọn được nhạc cụ ưng ý nhất.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4 text-center hover:border-amber-300 hover:shadow-md transition">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl mx-auto">
            <i className="fa-solid fa-screwdriver-wrench"></i>
          </div>
          <h3 className="font-extrabold text-xl text-slate-900 font-heading">Bảo Trì Trọn Đời</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Dịch vụ căn chỉnh dây, vệ sinh đàn, bảo dưỡng định kỳ hoàn toàn miễn phí cho tất cả khách hàng của Harmonia.
          </p>
        </div>
      </div>

      {/* CALL TO ACTION */}
      <div className="bg-amber-50/70 rounded-3xl p-8 sm:p-12 text-center border border-amber-200 space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">Ghé Thăm Showroom Trực Tiếp</h2>
        <p className="text-slate-600 text-sm max-w-xl mx-auto">Trải nghiệm không gian âm nhạc hiện đại với đầy đủ phòng thử âm thanh chuyên nghiệp.</p>
        <Link href="/lien-he" className="inline-block px-8 py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-md shadow-amber-600/20 transition">
          Xem Hệ Thống Showroom
        </Link>
      </div>

    </div>
  );
}
