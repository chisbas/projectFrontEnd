'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Home() {
  const { addToCart, formatPrice } = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serverRunning, setServerRunning] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setCategories((data.categories || []).filter(c => c.slug !== '' && c.id !== 'all'));
        if (data.serverRunning !== undefined) setServerRunning(data.serverRunning);
        setLoading(false);
      })
      .catch(() => {
        setServerRunning(false);
        setLoading(false);
      });

    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        if (data.articles && data.articles.length > 0) {
          setBlogPosts(data.articles.slice(0, 3));
        }
      })
      .catch(() => {});
  }, []);

  const filteredProducts = products.filter(p => {
    if (activeTab === 'all') return true;
    if (activeTab === 'guitar') return p.categorySlug === 'guitar' || p.category?.toLowerCase().includes('guitar');
    if (activeTab === 'piano') return p.categorySlug === 'piano' || p.category?.toLowerCase().includes('piano');
    if (activeTab === 'saxophone') return p.categorySlug === 'ken-flute' || p.category?.toLowerCase().includes('kèn') || p.category?.toLowerCase().includes('sax');
    return true;
  }).slice(0, 8);

  return (
    <div className="flex flex-col min-h-screen">

      {/* ===== HERO BANNER SLIDER SECTION ===== */}
      <section className="relative bg-slate-950 text-white overflow-hidden pt-16 pb-24 lg:pt-20 lg:pb-28">
        {/* Ambient Background Glow matching frame */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-600/20 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                <i className="fa-solid fa-sparkles"></i> Bộ Sưu Tập 2026 Mới Nhất
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight font-heading text-white">
                Khơi Nguồn Cảm Tác <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
                  Âm Nhạc Đỉnh Cao
                </span>
              </h1>

              <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Khám phá hơn 1.500+ mẫu nhạc cụ chính hãng từ các thương hiệu trứ danh Fender, Yamaha, Steinway &amp; Sons, Roland. Bảo hành chính hãng lên tới 5 năm.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  href="/san-pham"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-extrabold shadow-xl shadow-amber-500/25 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
                >
                  <span>Xem Sản Phẩm</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
                <Link
                  href="/lien-he"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-white font-semibold transition flex items-center justify-center gap-3"
                >
                  <i className="fa-solid fa-store text-amber-400"></i>
                  <span>Thử Nhạc Cụ Tại Store</span>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800/80 text-center lg:text-left">
                <div>
                  <span className="block text-2xl sm:text-3xl font-extrabold text-amber-400 font-heading">100%</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Chính Hãng</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-extrabold text-amber-400 font-heading">15+</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Năm Kinh Nghiệm</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-extrabold text-amber-400 font-heading">50.000+</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Khách Hàng Hài Lòng</span>
                </div>
              </div>
            </div>

            {/* Right Image Highlight */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-xs sm:max-w-sm">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/30 to-amber-600/0 rounded-3xl transform rotate-3 scale-105 blur-lg pointer-events-none"></div>
                <img
                  src="/images/banner/hero-guitar.jpg"
                  alt="Guitar Premium"
                  className="relative rounded-3xl shadow-2xl border border-slate-800 object-cover w-full h-[320px] sm:h-[360px] lg:h-[380px]"
                />

                {/* Floating Badge matching frame */}
                <div className="absolute -bottom-5 -left-5 z-20 glass-card-dark p-3.5 shadow-2xl border border-amber-500/30 hidden sm:flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-xl shrink-0">
                    <i className="fa-solid fa-award"></i>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400">Đại Lý Ủy Quyền</p>
                    <p className="font-bold text-xs text-white whitespace-nowrap">Yamaha &amp; Fender Global</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== CATEGORIES SECTION ===== */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Danh Mục Sản Phẩm</span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-1 font-heading">Khám Phá Theo Nhạc Cụ</h2>
            </div>
            <Link href="/san-pham" className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700">
              <span>Xem tất cả danh mục</span>
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-8 text-slate-400">Đang tải...</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {categories.map((cat) => {
                const subDesc = {
                  guitar: 'Guitar Điện, Acoustic',
                  piano: 'Grand Piano, Điện',
                  'ken-flute': 'Saxophone, Flute',
                  drum: 'Trống Cơ, Trống Điện',
                  trong: 'Trống Cơ, Trống Điện',
                  violin: 'Violin, Cello',
                  acc: 'Amply, Dây Đàn, Bao',
                };
                return (
                  <Link
                    key={cat.id}
                    href={`/san-pham?category=${cat.slug}`}
                    className="group bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 rounded-2xl p-6 text-center transition duration-300 shadow-sm hover:shadow-md"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center text-3xl group-hover:scale-110 transition duration-300">
                      <i className={`fa-solid ${cat.icon}`}></i>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-amber-600 transition font-heading">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">{subDesc[cat.slug] || 'Nhạc cụ cao cấp'}</p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS SECTION ===== */}
      <section className="py-16 bg-slate-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Sản Phẩm Nổi Bật</span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-1 font-heading">Bán Chạy Nhất Tại Showroom</h2>
            </div>

            {/* Filter Tabs matching frame */}
            <div className="flex flex-wrap gap-2 text-sm font-semibold">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-full transition shadow-sm ${
                  activeTab === 'all'
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200'
                }`}
              >
                Tất Cả
              </button>
              <button
                onClick={() => setActiveTab('guitar')}
                className={`px-4 py-2 rounded-full transition shadow-sm ${
                  activeTab === 'guitar'
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200'
                }`}
              >
                Guitar
              </button>
              <button
                onClick={() => setActiveTab('piano')}
                className={`px-4 py-2 rounded-full transition shadow-sm ${
                  activeTab === 'piano'
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200'
                }`}
              >
                Piano
              </button>
              <button
                onClick={() => setActiveTab('saxophone')}
                className={`px-4 py-2 rounded-full transition shadow-sm ${
                  activeTab === 'saxophone'
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-200'
                }`}
              >
                Saxophone
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8 text-slate-400">Đang tải sản phẩm...</div>
          ) : !serverRunning || products.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 border-2 border-dashed border-amber-300 text-center space-y-4 shadow-sm max-w-2xl mx-auto my-8">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-3xl mx-auto">
                <i className="fa-solid fa-server"></i>
              </div>
              <h3 className="font-extrabold text-xl text-slate-900 font-heading">Chưa Khởi Động Server db.json</h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                Để nạp dữ liệu sản phẩm từ file <code className="bg-slate-100 text-amber-600 font-bold px-2 py-0.5 rounded">db.json</code>, vui lòng mở terminal và chạy lệnh:
              </p>
              <div className="bg-slate-900 text-amber-400 font-mono text-sm px-6 py-3 rounded-2xl inline-block shadow-md">
                npm run server
              </div>
              <p className="text-xs text-slate-400">
                Server JSON đang lắng nghe tại: <strong className="text-slate-600">http://localhost:3001</strong>
              </p>
              <div>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 text-sm font-bold shadow-lg transition"
                >
                  <i className="fa-solid fa-rotate-right mr-2"></i> Đã bật server, tải lại trang
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="product-card bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between shadow-sm relative group h-full"
                >
                  {product.discount && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full z-10 shadow-sm">
                      {product.discount}
                    </span>
                  )}
                  {product.badge && !product.discount && (
                    <span className="absolute top-3 left-3 bg-amber-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full z-10 shadow-sm">
                      {product.badge}
                    </span>
                  )}

                  <div className="relative overflow-hidden bg-slate-50 h-48 sm:h-52 flex items-center justify-center p-4 border-b border-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="img-zoom object-contain w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-3">
                      <Link
                        href={`/san-pham/${product.slug || product.id}`}
                        className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center hover:bg-amber-500 hover:text-white transition shadow-md"
                        title="Xem nhanh"
                      >
                        <i className="fa-regular fa-eye"></i>
                      </Link>
                      <button
                        onClick={() => addToCart(product)}
                        className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center hover:bg-amber-500 transition shadow-md"
                        title="Thêm vào giỏ"
                      >
                        <i className="fa-solid fa-cart-plus"></i>
                      </button>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <span className="text-xs text-amber-600 font-semibold uppercase tracking-wider">
                        {product.category}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base mt-1 line-clamp-2 hover:text-amber-600 transition font-heading min-h-[3rem] leading-snug">
                        <Link href={`/san-pham/${product.slug || product.id}`}>{product.name}</Link>
                      </h3>

                      <div className="flex items-center justify-between text-xs mt-2 text-slate-500">
                        <span className="font-medium text-slate-600 truncate max-w-[120px]">{product.brand || 'Chính hãng'}</span>
                        <div className="flex items-center gap-1 text-amber-500">
                          <i className="fa-solid fa-star text-[11px]"></i>
                          <span className="font-bold text-slate-800 text-xs">{product.rating || 5.0}</span>
                          <span className="text-[11px] text-slate-400">({product.reviews || 0})</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="min-h-[2.6rem] flex flex-col justify-end">
                        {product.oldPrice ? (
                          <span className="block text-xs text-slate-400 line-through leading-tight">
                            {formatPrice(product.oldPrice)}
                          </span>
                        ) : (
                          <span className="block text-xs text-transparent select-none leading-tight">
                            -
                          </span>
                        )}
                        <span className="text-base sm:text-lg font-extrabold text-amber-600 font-heading leading-tight">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-amber-600 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm active:scale-95"
                        title="Thêm vào giỏ"
                      >
                        <i className="fa-solid fa-cart-plus"></i>
                        <span>+ Giỏ hàng</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== WHY CHOOSE US / FEATURES SECTION ===== */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-2xl">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <h4 className="font-bold text-slate-900 text-lg mb-1 font-heading">100% Chính Hãng</h4>
              <p className="text-xs text-slate-500">Cam kết đền tiền x10 nếu phát hiện hàng giả, hàng nhái</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-2xl">
                <i className="fa-solid fa-truck-fast"></i>
              </div>
              <h4 className="font-bold text-slate-900 text-lg mb-1 font-heading">Miễn Phí Giao Hàng</h4>
              <p className="text-xs text-slate-500">Miễn phí vận chuyển toàn quốc cho đơn hàng từ 2 triệu</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-2xl">
                <i className="fa-solid fa-wrench"></i>
              </div>
              <h4 className="font-bold text-slate-900 text-lg mb-1 font-heading">Bảo Hành Lên 5 Năm</h4>
              <p className="text-xs text-slate-500">Chế độ bảo trì định kỳ &amp; bảo hành chính hãng lâu dài</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-2xl">
                <i className="fa-solid fa-arrows-rotate"></i>
              </div>
              <h4 className="font-bold text-slate-900 text-lg mb-1 font-heading">Đổi Trả 30 Ngày</h4>
              <p className="text-xs text-slate-500">Đổi mới trong 30 ngày nếu có lỗi kỹ thuật từ nhà sản xuất</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LATEST ARTICLES / BLOG PREVIEW SECTION ===== */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Góc Kiến Thức</span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-1 font-heading">Bài Viết &amp; Hướng Dẫn Mới Nhất</h2>
            </div>
            <Link href="/bai-viet" className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700">
              <span>Xem tất cả bài viết</span>
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition">
                <Link href={`/bai-viet/${post.slug || post.id}`} className="block overflow-hidden h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </Link>
                <div className="p-6">
                  <span className="text-xs text-amber-600 font-semibold">{post.category || post.tag || 'Góc Kiến Thức'}</span>
                  <h3 className="font-bold text-slate-900 text-lg mt-2 hover:text-amber-600 transition line-clamp-2 font-heading">
                    <Link href={`/bai-viet/${post.slug || post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2">{post.summary || post.desc || ''}</p>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span><i className="fa-regular fa-calendar mr-1"></i> {post.date}</span>
                    <span><i className="fa-regular fa-user mr-1"></i> {post.author || 'Ban Biên Tập'}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
