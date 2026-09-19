'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BlogDetailPage({ params: paramsPromise }) {
  const [slugParam, setSlugParam] = useState('');
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Promise.resolve(paramsPromise).then((resolved) => {
      if (resolved?.slug) {
        setSlugParam(resolved.slug);
      }
    });
  }, [paramsPromise]);

  useEffect(() => {
    if (!slugParam) return;
    setLoading(true);

    fetch(`/api/articles?slug=${encodeURIComponent(slugParam)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.article) {
          setArticle(data.article);
          setRelatedArticles(data.related || []);
        } else {
          setArticle(null);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setArticle(null);
      });
  }, [slugParam]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="inline-block w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-slate-600 font-bold text-base">Đang tải bài viết...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl border border-amber-200">
          <i className="fa-solid fa-file-circle-xmark"></i>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 font-heading">Không tìm thấy bài viết!</h2>
        <p className="text-slate-500 mt-2 text-sm max-w-md mx-auto">
          Bài viết bạn đang truy cập với đường dẫn &quot;{slugParam}&quot; không tồn tại hoặc đã được chuyển mục.
        </p>
        <Link
          href="/bai-viet"
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-md transition"
        >
          <i className="fa-solid fa-arrow-left"></i>
          <span>Quay Lại Danh Sách Tin Tức</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* BREADCRUMB */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-slate-500 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-amber-600 transition">Trang Chủ</Link>
          <i className="fa-solid fa-chevron-right text-[10px] text-slate-400"></i>
          <Link href="/bai-viet" className="hover:text-amber-600 transition">Tin Tức</Link>
          <i className="fa-solid fa-chevron-right text-[10px] text-slate-400"></i>
          <span className="text-slate-900 font-semibold truncate max-w-md">{article.title}</span>
        </div>
      </div>

      {/* ARTICLE HEADER HERO BANNER (MATCHING FRAME) */}
      <div className="bg-slate-900 text-white py-14 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 text-center space-y-4 relative z-10">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full inline-block">
            {article.category || 'Góc Kiến Thức'}
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-heading leading-tight max-w-3xl mx-auto">
            {article.title}
          </h1>
          <div className="flex items-center justify-center gap-4 sm:gap-6 text-xs text-slate-400 pt-2 flex-wrap">
            <span><i className="fa-regular fa-user mr-1.5 text-amber-400"></i> Tác giả: {article.author}</span>
            <span><i className="fa-regular fa-calendar mr-1.5 text-amber-400"></i> Ngày đăng: {article.date}</span>
            <span><i className="fa-regular fa-eye mr-1.5 text-amber-400"></i> {article.views?.toLocaleString('vi-VN')} Lượt xem</span>
          </div>
        </div>
      </div>

      {/* MAIN ARTICLE BODY (MATCHING FRAME) */}
      <main className="max-w-4xl mx-auto px-4 py-12 flex-1 w-full space-y-10">
        <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
          {/* FEATURED IMAGE */}
          <div className="rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-80 sm:h-[420px] object-cover"
            />
          </div>

          {/* LEAD INTRO PARAGRAPH */}
          <p className="font-semibold text-slate-900 text-base sm:text-lg leading-relaxed pt-2">
            {article.summary ||
              'Chọn lựa một cây đàn nhạc cụ phù hợp trong bước khởi đầu quyết định tới 80% cảm hứng tập luyện lâu dài của bạn. Dưới đây là phân tích chi tiết từ đội ngũ kỹ thuật viên của Harmonia Music.'}
          </p>

          {/* CONTENT SECTIONS */}
          <div className="space-y-6 pt-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading pt-6 border-t border-slate-100">
              1. Tìm Hiểu Về Thiết Kế &amp; Cảm Giác Chơi
            </h2>
            <p>
              Mỗi nhạc cụ đều sở hữu cấu trúc và đặc tính vật lý riêng biệt. Đối với người mới làm quen, yếu tố quan trọng nhất cần chú ý chính là <strong>độ êm ái khi tiếp xúc</strong>, khoảng cách phím đàn (Action) vừa vặn và trọng lượng tổng thể giúp bạn có thể duy trì tư thế đúng trong suốt buổi tập.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading pt-6 border-t border-slate-100">
              2. Chất Lượng Gỗ &amp; Công Nghệ Chế Tác
            </h2>
            <p>
              Chất lượng của thùng đàn hay thân nhạc cụ phụ thuộc rất lớn vào tuổi thọ và quy trình xử lý gỗ nguyên tấm (Solid Wood) so với gỗ ép (Laminate). Gỗ nguyên tấm mang lại âm thanh ấm, sâu và càng chơi lâu năm thì chất gỗ sẽ càng nở nang, tạo nên âm sắc đặc trưng riêng biệt.
            </p>

            {/* EXPERT ADVICE CALLOUT BOX (MATCHING FRAME) */}
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 my-8 space-y-2">
              <h3 className="font-bold text-amber-900 text-base mb-1 flex items-center gap-2 font-heading">
                <i className="fa-solid fa-lightbulb text-amber-600"></i>
                Lời Khuyên Từ Chuyên Gia Harmonia:
              </h3>
              <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                Hãy luôn thử bấm phím đàn trực tiếp tại showroom để đảm bảo khoảng cách Action không quá cao, giúp bạn không bị đau tay trong những tuần đầu tiên tiếp cận với nhạc cụ.
              </p>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading pt-6 border-t border-slate-100">
              3. Chế Độ Bảo Trì &amp; Hậu Mãi Lâu Dài
            </h2>
            <p>
              Nhạc cụ là người bạn đồng hành theo năm tháng. Một cây đàn được bảo quản đúng độ ẩm, thường xuyên được vệ sinh phím và căn chỉnh định kỳ 6 tháng một lần sẽ luôn giữ vững cao độ chuẩn xác và độ bền trên 10 năm.
            </p>
          </div>

          {/* SHARE & BACK NAVIGATION */}
          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/bai-viet"
              className="text-sm font-bold text-amber-600 hover:text-amber-700 flex items-center gap-2 transition"
            >
              <i className="fa-solid fa-arrow-left text-xs"></i>
              <span>Xem Tất Cả Bài Viết</span>
            </Link>

            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span>Chia sẻ:</span>
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-700 transition flex items-center gap-1.5 font-medium cursor-pointer"
                title="Sao chép liên kết"
              >
                <i className="fa-solid fa-link text-xs"></i>
                <span>{copied ? 'Đã sao chép!' : 'Sao chép link'}</span>
              </button>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-amber-600 text-white flex items-center justify-center transition"
                title="Chia sẻ lên Facebook"
              >
                <i className="fa-brands fa-facebook-f text-xs"></i>
              </a>
            </div>
          </div>
        </article>

        {/* RELATED ARTICLES */}
        {relatedArticles.length > 0 && (
          <div className="space-y-6 pt-4">
            <h3 className="text-2xl font-extrabold text-slate-900 font-heading">
              Bài Viết Liên Quan Khác
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <Link href={`/bai-viet/${rel.slug || rel.id}`} className="block overflow-hidden h-44">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                  </Link>
                  <div className="p-5 flex flex-col flex-1 justify-between space-y-3">
                    <div>
                      <span className="text-[11px] font-bold uppercase text-amber-600 tracking-wider">
                        {rel.category}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm mt-1 line-clamp-2 hover:text-amber-600 transition font-heading">
                        <Link href={`/bai-viet/${rel.slug || rel.id}`}>{rel.title}</Link>
                      </h4>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{rel.date}</span>
                      <Link
                        href={`/bai-viet/${rel.slug || rel.id}`}
                        className="font-bold text-amber-600 hover:underline"
                      >
                        Đọc tiếp →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
