'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function ThanhToanPage() {
  const router = useRouter();
  const { cart, cartTotal, formatPrice, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [formData, setFormData] = useState({
    fullName: 'Nguyễn Văn Anh',
    phone: '0909123456',
    email: 'nguyenvana@gmail.com',
    city: 'TP. Hồ Chí Minh',
    district: 'Quận 10',
    ward: 'Phường 7',
    address: '123 Lý Thường Kiệt',
    note: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      clearCart();
    }, 1000);
  };

  const finalTotal = cartTotal > 0 ? cartTotal : 35400000;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* CHECKOUT BANNER */}
      <div className="bg-slate-900 text-white py-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-extrabold font-heading">Thanh Toán & Đặt Hàng</h1>
          <p className="text-xs text-slate-400 mt-1">An toàn - Bảo mật SSL 256-bit</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        {isSuccess ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xl max-w-lg mx-auto space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-4xl mx-auto animate-bounce">
              <i className="fa-solid fa-check"></i>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 font-heading">Đặt Hàng Thành Công!</h2>
            <div className="p-4 bg-slate-50 rounded-2xl text-xs text-slate-600 space-y-1 text-left">
              <p>Mã đơn hàng: <strong className="text-amber-600">#HAR-98231</strong></p>
              <p>Khách hàng: <strong>{formData.fullName}</strong> ({formData.phone})</p>
              <p>Địa chỉ: {formData.address}, {formData.ward}, {formData.district}, {formData.city}</p>
              <p>Phương thức: <strong>{paymentMethod === 'cod' ? 'Thanh toán COD' : paymentMethod === 'qr' ? 'Chuyển khoản VietQR' : 'Ví MoMo/ZaloPay'}</strong></p>
            </div>
            <button
              onClick={() => router.push('/')}
              className="w-full py-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold shadow-lg shadow-amber-600/25 transition"
            >
              Trở Về Trang Chủ
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: RECEIVER & PAYMENT */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* STEP 1: RECEIVER INFO */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                <h2 className="font-bold text-slate-900 text-lg font-heading flex items-center gap-3 pb-3 border-b border-slate-100">
                  <span className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 text-xs flex items-center justify-center font-extrabold">1</span>
                  <span>Thông Tin Người Nhận</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Họ và tên *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Số điện thoại *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email nhận thông tin đơn hàng *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:bg-white transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tỉnh / Thành phố *</label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 font-medium"
                    >
                      <option>TP. Hồ Chí Minh</option>
                      <option>Hà Nội</option>
                      <option>Đà Nẵng</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Quận / Huyện *</label>
                    <select
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 font-medium"
                    >
                      <option>Quận 10</option>
                      <option>Quận 1</option>
                      <option>Quận 3</option>
                      <option>Quận 7</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phường / Xã *</label>
                    <select
                      value={formData.ward}
                      onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 font-medium"
                    >
                      <option>Phường 7</option>
                      <option>Phường 8</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Địa chỉ cụ thể *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Ghi chú đơn hàng (Tùy chọn)</label>
                  <textarea
                    rows={2}
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi giao 15 phút..."
                    className="w-full px-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                  ></textarea>
                </div>
              </div>

              {/* STEP 2: PAYMENT METHOD */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                <h2 className="font-bold text-slate-900 text-lg font-heading flex items-center gap-3 pb-3 border-b border-slate-100">
                  <span className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 text-xs flex items-center justify-center font-extrabold">2</span>
                  <span>Phương Thức Thanh Toán</span>
                </h2>

                <div className="space-y-3 text-sm">
                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition ${
                      paymentMethod === 'cod' ? 'border-amber-500 bg-amber-50/50' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="text-amber-600 focus:ring-amber-500 w-4 h-4"
                    />
                    <div className="flex items-center gap-3">
                      <i className="fa-solid fa-money-bill-wave text-amber-600 text-xl"></i>
                      <div>
                        <span className="font-bold text-slate-900 block">Thanh toán khi nhận hàng (COD)</span>
                        <span className="text-xs text-slate-500">Kiểm tra nhạc cụ thoải mái trước khi thanh toán</span>
                      </div>
                    </div>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('qr')}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition ${
                      paymentMethod === 'qr' ? 'border-amber-500 bg-amber-50/50' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === 'qr'}
                      onChange={() => setPaymentMethod('qr')}
                      className="text-amber-600 focus:ring-amber-500 w-4 h-4"
                    />
                    <div className="flex items-center gap-3">
                      <i className="fa-solid fa-qrcode text-amber-600 text-xl"></i>
                      <div>
                        <span className="font-bold text-slate-900 block">Chuyển khoản Ngân hàng (Mã QR VietQR)</span>
                        <span className="text-xs text-slate-500">Tự động xác nhận giao dịch trong 30 giây</span>
                      </div>
                    </div>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('wallet')}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition ${
                      paymentMethod === 'wallet' ? 'border-amber-500 bg-amber-50/50' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === 'wallet'}
                      onChange={() => setPaymentMethod('wallet')}
                      className="text-amber-600 focus:ring-amber-500 w-4 h-4"
                    />
                    <div className="flex items-center gap-3">
                      <i className="fa-solid fa-wallet text-amber-600 text-xl"></i>
                      <div>
                        <span className="font-bold text-slate-900 block">Ví điện tử MoMo / ZaloPay</span>
                        <span className="text-xs text-slate-500">Thanh toán nhanh chóng bằng ứng dụng di động</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: ORDER SUMMARY */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 sticky top-24">
                <h3 className="font-bold text-slate-900 text-lg font-heading pb-3 border-b border-slate-100">
                  Đơn Hàng Của Bạn
                </h3>

                {/* ITEMS PREVIEW */}
                <div className="space-y-3 divide-y divide-slate-100">
                  {cart.length > 0 ? (
                    cart.map((item) => (
                      <div key={item.product.id} className="pt-2 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-3">
                          <img src={item.product.image} className="w-12 h-12 rounded-lg object-cover bg-slate-100" />
                          <div>
                            <h4 className="font-bold text-slate-900 line-clamp-1">{item.product.name}</h4>
                            <span className="text-slate-500">Số lượng: {item.quantity}</span>
                          </div>
                        </div>
                        <span className="font-bold text-slate-900">{formatPrice(item.product.price * item.quantity)}</span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="pt-2 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-3">
                          <img src="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=200&auto=format&fit=crop" class="w-12 h-12 rounded-lg object-cover bg-slate-100" />
                          <div>
                            <h4 className="font-bold text-slate-900 line-clamp-1">Fender Player Stratocaster</h4>
                            <span className="text-slate-500">Số lượng: 1</span>
                          </div>
                        </div>
                        <span className="font-bold text-slate-900">18.500.000đ</span>
                      </div>
                      <div className="pt-3 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-3">
                          <img src="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=200&auto=format&fit=crop" class="w-12 h-12 rounded-lg object-cover bg-slate-100" />
                          <div>
                            <h4 className="font-bold text-slate-900 line-clamp-1">Piano Điện Yamaha P-125B</h4>
                            <span className="text-slate-500">Số lượng: 1</span>
                          </div>
                        </div>
                        <span className="font-bold text-slate-900">16.900.000đ</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
                  <div className="flex justify-between">
                    <span>Tạm tính tiền hàng:</span>
                    <span className="font-bold text-slate-900">{formatPrice(finalTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vận chuyển bảo đảm:</span>
                    <span className="font-bold text-emerald-600">MIỄN PHÍ</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-3 border-t border-slate-200">
                    <span className="font-bold text-slate-900 text-sm font-heading">TỔNG CỘNG:</span>
                    <span className="font-extrabold text-2xl text-amber-600 font-heading">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-sm shadow-lg shadow-amber-600/25 transition"
                >
                  XÁC NHẬN ĐẶT HÀNG ({formatPrice(finalTotal)})
                </button>
              </div>

            </div>

          </form>
        )}
      </main>
    </div>
  );
}
