import { NextResponse } from 'next/server';

const JSON_SERVER_URL = process.env.JSON_SERVER_URL || 'http://127.0.0.1:3001';

async function getRawArticlesData() {
  const urls = [
    JSON_SERVER_URL,
    'http://localhost:3001',
    'http://127.0.0.1:3001'
  ];

  for (const baseUrl of [...new Set(urls)]) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const [aRes, cRes] = await Promise.all([
        fetch(`${baseUrl}/bai_viet`, { signal: controller.signal, cache: 'no-store' }).catch(() => null),
        fetch(`${baseUrl}/danh_muc_bai_viet`, { signal: controller.signal, cache: 'no-store' }).catch(() => null),
      ]);
      clearTimeout(timeoutId);

      if (aRes && aRes.ok) {
        const rawArticles = await aRes.json();
        const rawCats = cRes && cRes.ok ? await cRes.json() : [];
        return {
          rawArticles: Array.isArray(rawArticles) ? rawArticles : [],
          rawCats: Array.isArray(rawCats) ? rawCats : [],
          serverRunning: true
        };
      }
    } catch (e) {}
  }

  // Khi server db.json chưa chạy, trả về rỗng theo yêu cầu
  return { rawArticles: [], rawCats: [], serverRunning: false };
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    const { rawArticles, rawCats } = await getRawArticlesData();
    const catMap = new Map((rawCats || []).map((c) => [c.id, c.ten]));

    const authors = [
      'Nhạc Sĩ Minh Triết',
      'Chuyên Gia Guitar Hoàng Long',
      'Nghệ Sĩ Piano Đỗ Hải',
      'Giảng Viên Thanh Nhạc Mai Chi',
      'Kỹ Thuật Viên Tuấn Vũ',
    ];

    const articles = (rawArticles || []).map((a, idx) => ({
      id: a.id,
      title: a.tieu_de || a.title || '',
      slug: a.slug || '',
      summary: a.mo_ta_ngan || a.summary || '',
      content: a.noi_dung || a.content || '',
      image: a.hinh || a.image || '/images/posts/chon-guitar.jpg',
      date: a.created_at ? new Date(a.created_at).toLocaleDateString('vi-VN') : 'Mới nhất',
      category: catMap.get(a.id_danh_muc) || 'Kiến Thức Nhạc Cụ',
      categoryId: a.id_danh_muc,
      author: authors[idx % authors.length],
      views: 1200 + ((a.id * 147) % 3500),
      isFeatured: Boolean(a.is_featured),
    }));

    if (slug) {
      const article = articles.find((a) => a.slug === slug || String(a.id) === slug);
      if (!article) {
        return NextResponse.json({ article: null, related: [] }, { status: 404 });
      }
      const related = articles
        .filter((a) => a.id !== article.id)
        .slice(0, 3);
      return NextResponse.json({ article, related });
    }

    return NextResponse.json({ articles });
  } catch (err) {
    return NextResponse.json({ articles: [] });
  }
}
