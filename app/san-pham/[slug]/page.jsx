'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage({ params: paramsPromise }) {
  const router = useRouter();
  const { addToCart, formatPrice } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('desc'); // 'desc' | 'specs' | 'reviews'
  const [selectedImage, setSelectedImage] = useState('');
  const [slugParam, setSlugParam] = useState('');

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

    fetch(`/api/products?slug=${encodeURIComponent(slugParam)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.product) {
          setProduct(data.product);
          setSelectedImage(data.product.image);

          // Fetch related products in the same category
          fetch('/api/products')
            .then((r) => r.json())
            .then((allData) => {
              const all = allData.products || [];
              const related = all
                .filter((p) => p.id !== data.product.id && p.categorySlug === data.product.categorySlug)
                .slice(0, 4);
              setRelatedProducts(related);
            })
            .catch(() => {});
        } else {
          setProduct(null);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setProduct(null);
      });
  }, [slugParam]);

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleBuyNow = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    router.push('/thanh-toan');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="inline-block w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-slate-600 font-bold text-base">Đang tải thông tin sản phẩm...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl border border-amber-200">
          <i className="fa-solid fa-triangle-exclamation"></i>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 font-heading">Không tìm thấy sản phẩm!</h2>
        <p className="text-slate-500 mt-2 text-sm max-w-md mx-auto">
          Sản phẩm bạn đang tìm kiếm với đường dẫn &quot;{slugParam}&quot; không tồn tại hoặc đã ngừng kinh doanh.
        </p>
        <Link
          href="/san-pham"
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-md transition"
        >
          <i className="fa-solid fa-arrow-left"></i>
          <span>Quay Lại Danh Sách Sản Phẩm</span>
        </Link>
      </div>
    );
  }

  // Generate 4 gallery images for the thumbnail picker
  const galleryImages = [
    product.image,
    product.image,
    product.image,
    product.image,
  ];

  const savingsAmount = product.oldPrice && product.oldPrice > product.price
    ? product.oldPrice - product.price
    : null;

  const specsList = Object.entries(product.specs || {});

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* BREADCRUMB */}
      <div className="bg-white border-b border-slate-200 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-slate-500 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-amber-600 transition">Trang Chủ</Link>
          <i className="fa-solid fa-chevron-right text-[10px] text-slate-400"></i>
          <Link href="/san-pham" className="hover:text-amber-600 transition">Sản Phẩm</Link>
          <i className="fa-solid fa-chevron-right text-[10px] text-slate-400"></i>
          {product.category && (
            <>
              <Link href={`/san-pham?category=${product.categorySlug}`} className="hover:text-amber-600 transition">
                {product.category}
              </Link>
              <i className="fa-solid fa-chevron-right text-[10px] text-slate-400"></i>
            </>
          )}
          <span className="text-slate-900 font-semibold truncate max-w-sm">{product.name}</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-12">
        {/* MAIN PRODUCT DETAIL CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          {/* LEFT: IMAGE GALLERY (BASED ON FRAME) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 h-[380px] sm:h-[460px] flex items-center justify-center p-6 group">
              {product.discount && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm z-10">
                  {product.discount} OFF
                </span>
              )}
              {product.badge && !product.discount && (
                <span className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm z-10">
                  {product.badge}
                </span>
              )}
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="w-full h-full object-contain transition duration-500 group-hover:scale-105"
              />
            </div>

            {/* Thumbnail selector */}
            <div className="grid grid-cols-4 gap-3">
              {galleryImages.map((img, idx) => {
                const isActive = (selectedImage || product.image) === img && idx === 0;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`rounded-xl overflow-hidden h-20 bg-slate-50 p-2 border-2 transition duration-200 flex items-center justify-center cursor-pointer ${
                      isActive || selectedImage === img
                        ? 'border-amber-600 ring-2 ring-amber-500/20'
                        : 'border-slate-200 hover:border-amber-400'
                    }`}
                  >
                    <img src={img} alt={`Góc chụp ${idx + 1}`} className="w-full h-full object-contain" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO (BASED ON FRAME) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-lg">
                  Thương hiệu: {product.brand || 'Harmonia'}
                </span>
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-check"></i> Còn hàng ({product.stock || 8} sản phẩm có sẵn)
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mt-3 flex-wrap text-sm">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fa-solid ${
                        i < Math.floor(product.rating || 5)
                          ? 'fa-star'
                          : (product.rating || 5) % 1 >= 0.5
                          ? 'fa-star-half-stroke'
                          : 'fa-star text-slate-300'
                      }`}
                    ></i>
                  ))}
                </div>
                <span className="font-bold text-slate-800">{product.rating || 5.0} / 5</span>
                <span className="text-slate-300">|</span>
                <span className="text-xs text-slate-500 font-medium">
                  {product.reviews || 42} đánh giá &amp; {product.sold || 118} đã bán
                </span>
              </div>
            </div>

            {/* PRICE BANNER */}
            <div className="bg-amber-50/80 p-4 sm:p-5 rounded-2xl border border-amber-200 flex items-baseline gap-4 flex-wrap">
              <span className="text-3xl sm:text-4xl font-extrabold text-amber-600 font-heading leading-none">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-sm sm:text-base text-slate-400 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
              {savingsAmount && (
                <span className="text-xs font-bold text-red-600 bg-red-100 px-2.5 py-1 rounded-md">
                  Tiết kiệm {formatPrice(savingsAmount)}
                </span>
              )}
            </div>

            {/* KEY BULLET POINTS */}
            <div className="space-y-2 text-xs sm:text-sm text-slate-600 border-y border-slate-100 py-4">
              <p>
                <i className="fa-solid fa-check text-amber-600 mr-2"></i>
                <strong>Thương hiệu:</strong> {product.brand || 'Harmonia Music'}
              </p>
              <p>
                <i className="fa-solid fa-check text-amber-600 mr-2"></i>
                <strong>Danh mục:</strong> {product.category || 'Nhạc cụ cao cấp'}
              </p>
              {specsList.slice(0, 3).map(([key, val]) => (
                <p key={key}>
                  <i className="fa-solid fa-check text-amber-600 mr-2"></i>
                  <strong>{key}:</strong> {val}
                </p>
              ))}
              <p>
                <i className="fa-solid fa-check text-amber-600 mr-2"></i>
                <strong>Bảo hành:</strong> Bảo hành chính hãng 5 năm, bảo dưỡng định kỳ miễn phí
              </p>
            </div>

            {/* QUANTITY & ACTIONS (MATCHING FRAME) */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-slate-700">Số lượng:</span>
                <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-lg transition flex items-center justify-center cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    className="w-14 text-center text-sm font-bold border-none text-slate-900 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-lg transition flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-sm shadow-lg shadow-amber-600/25 transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <i className="fa-solid fa-cart-plus text-base"></i>
                  <span>THÊM VÀO GIỎ HÀNG</span>
                </button>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95"
                >
                  <span>MUA NGAY (GIAO TẬN NƠI)</span>
                </button>
              </div>
            </div>

            {/* SERVICE GUARANTEES */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-[11px] text-slate-600">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-shield-halved text-amber-600 text-base"></i>
                <span>100% Chính Hãng</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-truck-fast text-amber-600 text-base"></i>
                <span>Freeship Đơn &gt; 2Tr</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-wrench text-amber-600 text-base"></i>
                <span>Bảo Hành 5 Năm</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-rotate-left text-amber-600 text-base"></i>
                <span>Đổi Mới 30 Ngày</span>
              </div>
            </div>
          </div>
        </div>

        {/* TABS SECTION (MÔ TẢ - THÔNG SỐ - ĐÁNH GIÁ) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex border-b border-slate-200 gap-6 sm:gap-10 font-heading font-bold text-sm sm:text-base overflow-x-auto">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-3 border-b-2 transition font-bold whitespace-nowrap cursor-pointer ${
                activeTab === 'desc'
                  ? 'border-amber-600 text-amber-600'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Mô Tả Sản Phẩm
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 border-b-2 transition font-bold whitespace-nowrap cursor-pointer ${
                activeTab === 'specs'
                  ? 'border-amber-600 text-amber-600'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Thông Số Kỹ Thuật
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 border-b-2 transition font-bold whitespace-nowrap cursor-pointer ${
                activeTab === 'reviews'
                  ? 'border-amber-600 text-amber-600'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Đánh Giá ({product.reviews || 42})
            </button>
          </div>

          {/* TAB 1: MÔ TẢ CHI TIẾT */}
          {activeTab === 'desc' && (
            <div className="py-4 space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
              <h3 className="text-xl font-bold text-slate-900 font-heading">
                Âm Thanh Đột Phá Chuẩn Mực - Trải Nghiệm Tuyệt Hảo Cùng {product.name}
              </h3>
              <p>
                {product.description ||
                  `Dòng nhạc cụ ${product.name} được chế tác tỉ mỉ từ các vật liệu tuyển chọn cao cấp nhất. Sở hữu chất âm tươi sáng, độ ngân vang tự nhiên và bàn phím bấm êm ái, đây là nhạc cụ lý tưởng cho cả người mới bắt đầu lẫn các nghệ sĩ biểu diễn chuyên nghiệp.`}
              </p>

              <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 my-6 space-y-2">
                <h4 className="font-bold text-amber-900 text-base flex items-center gap-2 font-heading">
                  <i className="fa-solid fa-lightbulb text-amber-600"></i>
                  Lời Khuyên Từ Chuyên Gia Harmonia:
                </h4>
                <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                  Để nhạc cụ luôn đạt trạng thái âm thanh tốt nhất, quý khách nên duy trì độ ẩm môi trường từ 45% - 55%, tránh để nhạc cụ tiếp xúc trực tiếp với ánh nắng mặt trời và thường xuyên vệ sinh bằng khăn mềm chuyên dụng đi kèm.
                </p>
              </div>

              <p>
                Toàn bộ sản phẩm phân phối bởi <strong>Harmonia Music Store</strong> đều được nhập khẩu nguyên chiếc chính ngạch, có đầy đủ chứng nhận xuất xứ CO/CQ và được kỹ thuật viên căn chỉnh chuẩn xác trước khi bàn giao tới tay khách hàng.
              </p>
            </div>
          )}

          {/* TAB 2: THÔNG SỐ KỸ THUẬT */}
          {activeTab === 'specs' && (
            <div className="py-4">
              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <tbody>
                    <tr className="bg-slate-50/70 border-b border-slate-200">
                      <th className="py-3.5 px-5 font-bold text-slate-800 border-r border-slate-200 w-1/3">
                        Tên sản phẩm
                      </th>
                      <td className="py-3.5 px-5 text-slate-700 font-medium">{product.name}</td>
                    </tr>
                    <tr className="bg-white border-b border-slate-200">
                      <th className="py-3.5 px-5 font-bold text-slate-800 border-r border-slate-200">
                        Thương hiệu
                      </th>
                      <td className="py-3.5 px-5 text-slate-700">{product.brand}</td>
                    </tr>
                    <tr className="bg-slate-50/70 border-b border-slate-200">
                      <th className="py-3.5 px-5 font-bold text-slate-800 border-r border-slate-200">
                        Danh mục
                      </th>
                      <td className="py-3.5 px-5 text-slate-700">{product.category}</td>
                    </tr>
                    {specsList.map(([key, value], idx) => (
                      <tr
                        key={key}
                        className={idx % 2 === 0 ? 'bg-white border-b border-slate-200' : 'bg-slate-50/70 border-b border-slate-200'}
                      >
                        <th className="py-3.5 px-5 font-bold text-slate-800 border-r border-slate-200">
                          {key}
                        </th>
                        <td className="py-3.5 px-5 text-slate-700">{value}</td>
                      </tr>
                    ))}
                    <tr className="bg-slate-50/70">
                      <th className="py-3.5 px-5 font-bold text-slate-800 border-r border-slate-200">
                        Xuất xứ &amp; Bảo hành
                      </th>
                      <td className="py-3.5 px-5 text-slate-700">Chính hãng - Bảo hành 5 năm tại showroom</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ĐÁNH GIÁ KHÁCH HÀNG */}
          {activeTab === 'reviews' && (
            <div className="py-4 space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-amber-50/60 border border-amber-200">
                <div className="text-center sm:text-left">
                  <div className="text-4xl font-extrabold text-amber-600 font-heading leading-none">
                    {product.rating || 4.8} / 5
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400 text-sm mt-2">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star-half-stroke"></i>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Dựa trên {product.reviews || 42} lượt đánh giá thực tế</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">Trần Văn Hoàng</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                        <i className="fa-solid fa-check mr-0.5"></i> Đã mua hàng
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">12/08/2026</span>
                  </div>
                  <div className="text-amber-400 text-xs">★★★★★</div>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Đàn âm thanh cực kỳ vang và sáng, phím đàn bấm rất êm tay. Nhân viên hỗ trợ căn chỉnh action chuẩn chỉ trước khi giao. Rất hài lòng!
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">Lê Thu Trang</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                        <i className="fa-solid fa-check mr-0.5"></i> Đã mua hàng
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">25/07/2026</span>
                  </div>
                  <div className="text-amber-400 text-xs">★★★★★</div>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Giao hàng nhanh trong ngày tại TP.HCM, đóng gói hộp gỗ và bọc chống sốc cẩn thận. Tặng kèm đầy đủ phụ kiện dây và bao đàn cao cấp.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RELATED PRODUCTS SECTION */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-extrabold text-slate-900 font-heading">
                Sản Phẩm Cùng Danh Mục
              </h3>
              <Link
                href={`/san-pham?category=${product.categorySlug}`}
                className="text-xs sm:text-sm font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1.5"
              >
                <span>Xem thêm</span>
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  className="product-card bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between shadow-sm relative group h-full"
                >
                  <div className="relative overflow-hidden bg-slate-50 h-52 flex items-center justify-center p-4 border-b border-slate-100">
                    <img src={rel.image} alt={rel.name} className="img-zoom object-contain w-full h-full" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-3">
                      <Link
                        href={`/san-pham/${rel.slug || rel.id}`}
                        className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center hover:bg-amber-500 hover:text-white transition shadow-md"
                        title="Xem chi tiết"
                      >
                        <i className="fa-regular fa-eye"></i>
                      </Link>
                      <button
                        onClick={() => addToCart(rel)}
                        className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center hover:bg-amber-500 transition shadow-md cursor-pointer"
                        title="Thêm vào giỏ"
                      >
                        <i className="fa-solid fa-cart-plus"></i>
                      </button>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <span className="text-xs text-amber-600 font-semibold uppercase tracking-wider">{rel.category}</span>
                      <h3 className="font-bold text-slate-900 text-base mt-1 line-clamp-2 hover:text-amber-600 transition font-heading min-h-[3rem] leading-snug">
                        <Link href={`/san-pham/${rel.slug || rel.id}`}>{rel.name}</Link>
                      </h3>
                      <div className="flex items-center justify-between text-xs mt-2 text-slate-500">
                        <span className="font-medium text-slate-600 truncate max-w-[120px]">{rel.brand || 'Chính hãng'}</span>
                        <div className="flex items-center gap-1 text-amber-500">
                          <i className="fa-solid fa-star text-[11px]"></i>
                          <span className="font-bold text-slate-800 text-xs">{rel.rating || 5.0}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="min-h-[2.6rem] flex flex-col justify-end">
                        {rel.oldPrice ? (
                          <span className="block text-xs text-slate-400 line-through leading-tight">{formatPrice(rel.oldPrice)}</span>
                        ) : (
                          <span className="block text-xs text-transparent select-none leading-tight">-</span>
                        )}
                        <span className="text-base sm:text-lg font-extrabold text-amber-600 font-heading leading-tight">{formatPrice(rel.price)}</span>
                      </div>
                      <Link
                        href={`/san-pham/${rel.slug || rel.id}`}
                        className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-amber-600 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm active:scale-95"
                      >
                        Chi tiết
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
