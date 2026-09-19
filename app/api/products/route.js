import { NextResponse } from 'next/server';

const JSON_SERVER_URL = process.env.JSON_SERVER_URL || 'http://127.0.0.1:3001';

function normalizeProduct(p) {
  if (!p) return null;
  return {
    id: p.id,
    name: p.ten || p.name || '',
    slug: p.slug || '',
    category: p.danh_muc || p.category || '',
    categorySlug: p.slug_danh_muc || p.categorySlug || '',
    brand: p.thuong_hieu || p.brand || '',
    price: p.gia ?? p.price ?? 0,
    oldPrice: p.gia_cu ?? p.oldPrice ?? null,
    discount: p.giam_gia || p.discount || null,
    badge: p.nhan || p.badge || null,
    rating: p.danh_gia ?? p.rating ?? 5.0,
    reviews: p.luot_danh_gia ?? p.reviews ?? 0,
    image: p.hinh_anh || p.image || '',
    gallery: Array.isArray(p.gallery) && p.gallery.length > 0
      ? p.gallery
      : [p.hinh_anh || p.image || ''],
    description: p.mo_ta || p.description || '',
    specs: p.thong_so_ky_thuat || p.specs || {},
    inStock: p.con_hang ?? p.inStock ?? true,
    stock: p.ton_kho || p.stock || 8,
    sold: p.da_ban || p.sold || Math.floor(((p.id || 1) * 19) % 180 + 32),
  };
}

function normalizeCategory(c) {
  if (!c) return null;
  return {
    id: c.id,
    name: c.ten || c.name || '',
    icon: c.bieu_tuong || c.icon || 'fa-music',
    slug: c.slug || '',
  };
}

function normalizeBrand(b) {
  if (!b) return null;
  if (typeof b === 'string') return { id: b, name: b };
  return {
    id: b.id,
    name: b.ten || b.name || '',
  };
}

async function fetchFromJsonServer() {
  const urls = [
    JSON_SERVER_URL,
    'http://localhost:3001',
    'http://127.0.0.1:3001'
  ];

  for (const baseUrl of [...new Set(urls)]) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const [pRes, cRes, bRes] = await Promise.all([
        fetch(`${baseUrl}/products`, { signal: controller.signal, cache: 'no-store' }).catch(() => null),
        fetch(`${baseUrl}/danh_muc`, { signal: controller.signal, cache: 'no-store' }).catch(() => null),
        fetch(`${baseUrl}/thuong_hieu`, { signal: controller.signal, cache: 'no-store' }).catch(() => null),
      ]);
      clearTimeout(timeoutId);

      if (pRes && pRes.ok) {
        const rawProducts = await pRes.json();
        const rawCats = cRes && cRes.ok ? await cRes.json() : [];
        const rawBrands = bRes && bRes.ok ? await bRes.json() : [];
        return {
          rawProducts: Array.isArray(rawProducts) ? rawProducts : [],
          rawCats: Array.isArray(rawCats) ? rawCats : [],
          rawBrands: Array.isArray(rawBrands) ? rawBrands : [],
          serverRunning: true,
          serverUrl: baseUrl
        };
      }
    } catch (e) {}
  }

  // Khi server db.json chưa chạy, trả về rỗng để đúng yêu cầu: phải chạy db.json mới có data
  return { rawProducts: [], rawCats: [], rawBrands: [], serverRunning: false };
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const category = searchParams.get('category');

    const { rawProducts, rawCats, rawBrands, serverRunning, serverUrl } = await fetchFromJsonServer();

    let products = (rawProducts || []).map(normalizeProduct);
    const categories = (rawCats || []).map(normalizeCategory);
    const brands = (rawBrands || []).map(normalizeBrand);

    if (slug) {
      const product = products.find(p => p.slug === slug || String(p.id) === slug);
      return NextResponse.json({
        product: product || null,
        serverRunning,
        message: serverRunning ? 'OK' : 'Vui lòng chạy server db.json: npm run server'
      });
    }

    if (category && category !== 'all') {
      products = products.filter(p => p.categorySlug === category);
    }

    return NextResponse.json({
      products,
      categories,
      brands,
      serverRunning,
      serverUrl: serverRunning ? serverUrl : null,
      message: serverRunning
        ? 'Dữ liệu được nạp thành công từ server db.json đang chạy'
        : 'Chưa khởi động server db.json. Vui lòng chạy lệnh: npm run server'
    });
  } catch (error) {
    return NextResponse.json(
      {
        products: [],
        categories: [],
        brands: [],
        serverRunning: false,
        error: 'Lỗi kết nối server db.json: ' + error.message,
        message: 'Vui lòng chạy server db.json: npm run server'
      },
      { status: 200 }
    );
  }
}
