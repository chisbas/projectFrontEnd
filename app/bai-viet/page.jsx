'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BaiVietPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        setArticles(data.articles || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Góc Âm Nhạc</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          Tin Tức & Kiến Thức Nhạc Cụ
        </h1>
        <p className="text-slate-500 text-sm">
          Cập nhật những hướng dẫn chọn đàn, kinh nghiệm bảo quản và tin tức âm nhạc mới nhất từ db.json.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-16 text-slate-400 font-bold text-sm">Đang tải bài viết...</div>
      ) : articles.length === 0 ? (
        <div className="text-center py-16 text-slate-400 font-medium">Chưa có bài viết nào.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <div key={art.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col justify-between group">
              <div>
                <Link href={`/bai-viet/${art.slug || art.id}`} className="block overflow-hidden h-48 bg-slate-100">
                  <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                </Link>
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="text-amber-600 font-bold uppercase">{art.category}</span>
                    <span>{art.date}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base font-heading line-clamp-2 hover:text-amber-600 transition">
                    <Link href={`/bai-viet/${art.slug || art.id}`}>{art.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {art.summary}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-0">
                <Link
                  href={`/bai-viet/${art.slug || art.id}`}
                  className="text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline inline-flex items-center gap-1.5 transition"
                >
                  <span>Đọc bài viết</span>
                  <i className="fa-solid fa-arrow-right text-[10px]"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
