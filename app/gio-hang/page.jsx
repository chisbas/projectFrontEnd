'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, formatPrice } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    note: ''
  });

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'HARMONIA2026') {
      setDiscount(cartTotal * 0.1);
      alert('Đã áp dụng mã giảm giá 10%!');
    } else {
      alert('Mã giảm giá không hợp lệ. Thử nhập: HARMONIA2026');
    }
  };

  const finalTotal = Math.max(0, cartTotal - discount);

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setOrderSuccess(true);
    setTimeout(() => {
      clearCart();
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* BREADCRUMB */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-amber-600 transition">Trang chủ</Link>
        <i className="fa-solid fa-chevron-right text-[10px]"></i>
        <span className="text-slate-900 font-semibold">Giỏ Hàng</span>
      </div>

      <h1 className="text-3xl font-extrabold text-slate-900 mb-8 font-heading">
        Giỏ Hàng Của Bạn
      </h1>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* CART ITEMS LIST */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-xl bg-slate-100 shrink-0"
                    />
                    <div>
                      <span className="text-[11px] text-amber-600 font-bold uppercase">{item.product.category}</span>
                      <h3 className="font-bold text-slate-900 text-sm font-heading line-clamp-1">
                        <Link href={`/san-pham/${item.product.slug || item.product.id}`} className="hover:text-amber-600 transition">
                          {item.product.name}
                        </Link>
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">Đơn giá: {formatPrice(item.product.price)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                    {/* QUANTITY PICKER */}
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 font-bold text-sm"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-bold text-slate-800 text-xs">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-200 font-bold text-sm"
                      >
                        +
                      </button>
                    </div>

                    {/* ITEM TOTAL */}
                    <div className="text-right min-w-[100px]">
                      <span className="font-extrabold text-amber-600 text-base font-heading">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>

                    {/* REMOVE BUTTON */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-slate-400 hover:text-red-500 text-sm p-1.5 rounded-lg hover:bg-red-50 transition"
                      title="Xóa sản phẩm"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <Link href="/san-pham" className="text-sm font-bold text-amber-600 hover:underline flex items-center gap-2">
                <i className="fa-solid fa-arrow-left text-xs"></i> Tiếp tục chọn nhạc cụ
              </Link>
              <button
                onClick={clearCart}
                className="text-xs text-red-500 font-semibold hover:underline"
              >
                Xóa tất cả giỏ hàng
              </button>
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
              <h3 className="font-bold text-slate-900 text-lg border-b border-slate-100 pb-3 font-heading">
                Tóm Tắt Đơn Hàng
              </h3>

              {/* PROMO FORM */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Mã giảm giá (ví dụ: HARMONIA2026)"
                  className="flex-1 bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500"
                />
                <button type="submit" className="px-4 py-2.5 bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs rounded-xl transition">
                  Áp Dụng
                </button>
              </form>

              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Tạm tính ({cart.length} món):</span>
                  <span className="font-bold text-slate-900">{formatPrice(cartTotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Giảm giá (10%):</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Phí vận chuyển bảo hiểm:</span>
                  <span className="text-emerald-600 font-bold">Miễn phí</span>
                </div>
                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                  <span className="font-bold text-slate-900">Tổng Thanh Toán:</span>
                  <span className="text-2xl font-extrabold text-amber-600 font-heading">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowCheckoutModal(true)}
                className="w-full py-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold shadow-lg shadow-amber-600/25 transition text-center flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-credit-card"></i>
                <span>Tiến Hành Đặt Hàng</span>
              </button>
            </div>
          </div>

        </div>
      ) : (
        <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 shadow-sm max-w-xl mx-auto space-y-4">
          <div className="w-20 h-20 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-3xl mx-auto">
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
          <h2 className="text-xl font-bold text-slate-900 font-heading">Giỏ Hàng Đang Trống</h2>
          <p className="text-slate-500 text-sm">Bạn chưa thêm nhạc cụ nào vào giỏ hàng. Hãy khám phá ngay hàng ngàn sản phẩm cao cấp tại Harmonia!</p>
          <Link
            href="/san-pham"
            className="inline-block px-8 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold shadow-md transition"
          >
            Khám Phá Nhạc Cụ
          </Link>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCheckoutModal(false)}></div>
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 z-10 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-extrabold text-xl text-slate-900 font-heading">Thông Tin Đặt Hàng</h3>
              <button onClick={() => setShowCheckoutModal(false)} className="text-slate-400 hover:text-slate-600">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>

            {orderSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto animate-bounce">
                  <i className="fa-solid fa-check"></i>
                </div>
                <h4 className="text-2xl font-extrabold text-slate-900 font-heading">Đặt Hàng Thành Công!</h4>
                <p className="text-slate-600 text-sm">
                  Cảm ơn bạn đã lựa chọn Harmonia Music. Chuyên viên của chúng tôi sẽ gọi điện xác nhận đơn hàng trong vòng 15 phút.
                </p>
                <button
                  onClick={() => setShowCheckoutModal(false)}
                  className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-md shadow-amber-600/20 transition"
                >
                  Hoàn Tất
                </button>
              </div>
            ) : (
              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Họ và Tên (*)</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl p-3 focus:outline-none focus:border-amber-500 focus:bg-white transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Số Điện Thoại (*)</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0901 234 567"
                      className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl p-3 focus:outline-none focus:border-amber-500 focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl p-3 focus:outline-none focus:border-amber-500 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Địa Chỉ Giao Hàng (*)</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Số nhà, Tên đường, Quận/Huyện, TP"
                    className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl p-3 focus:outline-none focus:border-amber-500 focus:bg-white transition"
                  />
                </div>

                <div className="p-4 rounded-xl bg-amber-50 text-slate-800 text-xs flex justify-between items-center font-semibold border border-amber-200">
                  <span>Tổng tiền thanh toán:</span>
                  <span className="text-base font-extrabold text-amber-600 font-heading">{formatPrice(finalTotal)}</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold shadow-lg shadow-amber-600/25 transition"
                >
                  Xác Nhận Đặt Hàng
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
