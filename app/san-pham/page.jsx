'use client';

import { useState, useMemo, Suspense, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';

function ProductCatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const { addToCart, formatPrice } = useCart();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serverRunning, setServerRunning] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceMax, setPriceMax] = useState(900000000);
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
    if (initialSearch !== undefined) setSearchQuery(initialSearch);
    setCurrentPage(1);
  }, [initialCategory, initialSearch]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products || []);
        setCategories(data.categories || []);
        setBrands((data.brands || []).map(b => typeof b === 'string' ? b : b.name));
        if (data.serverRunning !== undefined) setServerRunning(data.serverRunning);
        setLoading(false);
      })
      .catch(() => {
        setServerRunning(false);
        setLoading(false);
      });
  }, []);

  const handleBrandChange = (brand) => {
    setCurrentPage(1);
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handleCategoryChange = (slug) => {
    setCurrentPage(1);
    setSelectedCategory(slug);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedBrands([]);
    setPriceMax(900000000);
    setSearchQuery('');
    setSortBy('featured');
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (selectedCategory !== 'all') {
        if (product.categorySlug !== selectedCategory) return false;
      }
      if (selectedBrands.length > 0) {
        if (!selectedBrands.includes(product.brand)) return false;
      }
      if (product.price > priceMax) return false;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchCategory = product.category.toLowerCase().includes(query);
        const matchBrand = product.brand.toLowerCase().includes(query);
        if (!matchName && !matchCategory && !matchBrand) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [products, selectedCategory, selectedBrands, priceMax, sortBy, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  if (loading) {
    return <div className="p-12 text-center text-slate-500 font-bold">Đang tải sản phẩm...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* PAGE BREADCRUMB & TITLE */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <Link href="/" className="hover:text-amber-600 transition">Trang chủ</Link>
          <i className="fa-solid fa-chevron-right text-[10px] text-slate-400"></i>
          <span className="text-slate-900 font-semibold">Sản Phẩm</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 font-heading">Danh Mục Nhạc Cụ Chính Hãng</h1>
        <p className="text-sm text-slate-500 mt-1">Khám phá hơn {products.length}+ sản phẩm piano, guitar, saxophone, trống nhập khẩu chính hãng.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
        
        {/* DESKTOP FILTER SIDEBAR */}
        <aside className="hidden lg:block space-y-6 lg:col-span-1">
          
          {/* CATEGORIES */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm mb-3.5 pb-2.5 border-b border-slate-100 flex items-center gap-2 font-heading">
              <i className="fa-solid fa-list text-amber-600"></i> Danh Mục Nhạc Cụ
            </h3>
            <ul className="space-y-1 text-xs font-medium">
              {categories.map((cat) => {
                const active = selectedCategory === cat.slug || (cat.slug === '' && selectedCategory === 'all');
                const count = cat.slug === '' ? products.length : products.filter(p => p.categorySlug === cat.slug).length;
                return (
                  <li key={cat.id}>
                    <button
                      onClick={() => handleCategoryChange(cat.slug === '' ? 'all' : cat.slug)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl transition text-left ${
                        active
                          ? 'bg-amber-50 text-amber-600 font-bold'
                          : 'hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <i className={`fa-solid ${cat.icon} text-xs ${active ? 'text-amber-600' : 'text-slate-400'}`}></i>
                        {cat.name}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${active ? 'bg-amber-200 text-amber-800' : 'bg-slate-100 text-slate-500'}`}>
                        {count}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* BRAND FILTER */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm mb-3.5 pb-2.5 border-b border-slate-100 flex items-center gap-2 font-heading">
              <i className="fa-solid fa-copyright text-amber-600"></i> Thương Hiệu
            </h3>
            <div className="space-y-2 text-xs text-slate-600">
              {brands.map((brand) => (
                <label key={brand} className="flex items-center gap-2.5 cursor-pointer hover:text-amber-600 select-none">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                  />
                  <span className={selectedBrands.includes(brand) ? 'font-bold text-amber-600' : ''}>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* PRICE FILTER */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm mb-3.5 pb-2.5 border-b border-slate-100 flex items-center gap-2 font-heading">
              <i className="fa-solid fa-filter text-amber-600"></i> Khoảng Giá Tối Đa
            </h3>
            <div className="space-y-3">
              <input
                type="range"
                min={5000000}
                max={900000000}
                step={5000000}
                value={priceMax}
                onChange={(e) => {
                  setPriceMax(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between items-center text-xs text-slate-600 font-semibold">
                <span>Dưới: {formatPrice(priceMax)}</span>
              </div>
            </div>
          </div>

          {/* RESET BUTTON */}
          <button
            onClick={clearFilters}
            className="w-full py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <i className="fa-solid fa-rotate-left"></i> Xóa Bộ Lọc
          </button>

        </aside>

        {/* MAIN PRODUCT LIST */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* TOP BAR / SORTING */}
          <div className="bg-white rounded-2xl px-5 py-3.5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="text-xs sm:text-sm text-slate-500">
                Tìm thấy <span className="font-bold text-slate-900">{filteredProducts.length}</span> sản phẩm
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <label className="text-xs text-slate-500 whitespace-nowrap font-medium">Sắp xếp:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500 font-semibold cursor-pointer"
              >
                <option value="featured">Nổi bật nhất</option>
                <option value="price-low">Giá: Thấp đến Cao</option>
                <option value="price-high">Giá: Cao đến Thấp</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>
          </div>

          {/* PRODUCTS GRID */}
          {filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {paginatedProducts.map((product) => (
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
                        <span className="text-xs text-amber-600 font-semibold uppercase tracking-wider">{product.category}</span>
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
                            <span className="block text-xs text-slate-400 line-through leading-tight">{formatPrice(product.oldPrice)}</span>
                          ) : (
                            <span className="block text-xs text-transparent select-none leading-tight">-</span>
                          )}
                          <span className="text-base sm:text-lg font-extrabold text-amber-600 font-heading leading-tight">{formatPrice(product.price)}</span>
                        </div>
                        <button
                          onClick={() => addToCart(product)}
                          className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-amber-600 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm active:scale-95"
                          title="Thêm vào giỏ hàng"
                        >
                          <i className="fa-solid fa-cart-plus"></i>
                          <span>+ Giỏ hàng</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* PAGINATION (1 2 3 ->) */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-8">
                  <button
                    onClick={() => {
                      setCurrentPage(p => Math.max(1, p - 1));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    disabled={currentPage === 1}
                    aria-label="Trang trước"
                    className="w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-300 disabled:opacity-30 disabled:pointer-events-none transition flex items-center justify-center font-bold text-sm shadow-sm"
                  >
                    <i className="fa-solid fa-chevron-left text-xs"></i>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => {
                        setCurrentPage(page);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-10 h-10 rounded-xl font-bold text-sm transition flex items-center justify-center shadow-sm ${
                        currentPage === page
                          ? 'bg-amber-600 text-white shadow-amber-600/25 ring-2 ring-amber-600/30'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-300'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => {
                      setCurrentPage(p => Math.min(totalPages, p + 1));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    disabled={currentPage === totalPages}
                    aria-label="Trang sau"
                    className="w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-300 disabled:opacity-30 disabled:pointer-events-none transition flex items-center justify-center font-bold text-sm shadow-sm"
                  >
                    <i className="fa-solid fa-arrow-right text-xs"></i>
                  </button>
                </div>
              )}
            </>
          ) : !serverRunning ? (
            <div className="bg-white rounded-3xl p-10 border-2 border-dashed border-amber-300 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-3xl mx-auto">
                <i className="fa-solid fa-server"></i>
              </div>
              <h3 className="font-extrabold text-xl text-slate-900 font-heading">Chưa Khởi Động Server db.json</h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                Để nạp dữ liệu từ file <code className="bg-slate-100 text-amber-600 font-bold px-2 py-0.5 rounded">db.json</code>, vui lòng mở terminal và chạy lệnh:
              </p>
              <div className="bg-slate-900 text-amber-400 font-mono text-sm px-6 py-3 rounded-2xl inline-block shadow-md">
                npm run server
              </div>
              <p className="text-xs text-slate-400">
                Server JSON đang được cấu hình lắng nghe tại: <strong className="text-slate-600">http://localhost:3001</strong>
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
            <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-2xl mx-auto">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <h3 className="font-bold text-lg text-slate-800">Không tìm thấy sản phẩm nào</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto">Rất tiếc, không có nhạc cụ nào phù hợp với bộ lọc hiện tại của bạn.</p>
              <button
                onClick={clearFilters}
                className="px-6 py-2.5 rounded-xl bg-amber-600 text-white text-sm font-bold shadow-md hover:bg-amber-500 transition"
              >
                Xóa Tất Cả Bộ Lọc
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default function SanPhamPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500 font-bold">Đang tải sản phẩm...</div>}>
      <ProductCatalogContent />
    </Suspense>
  );
}
