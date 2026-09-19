// Main Application JS Utilities for Harmonia Music Store

// Mobile Drawer Menu
export function initMobileMenu() {
  if (typeof document === 'undefined') return;
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-menu-drawer');
  const closeBtn = document.getElementById('mobile-menu-close');
  const overlay = document.getElementById('mobile-menu-overlay');

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.remove('-translate-x-full');
    if (overlay) overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.add('-translate-x-full');
    if (overlay) overlay.classList.add('hidden');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);
}

// Toast notification helper
export function showToast(message, type = 'success') {
  if (typeof document === 'undefined') return;
  let toastContainer = document.getElementById('toast-notification');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-notification';
    toastContainer.className = 'toast-notification';
    document.body.appendChild(toastContainer);
  }

  const icon = type === 'success' 
    ? '<i class="fa-solid fa-circle-check text-amber-500 text-xl"></i>' 
    : '<i class="fa-solid fa-circle-info text-amber-500 text-xl"></i>';

  toastContainer.innerHTML = `${icon} <span class="font-medium text-sm">${message}</span>`;
  toastContainer.classList.add('show');

  setTimeout(() => {
    toastContainer.classList.remove('show');
  }, 3000);
}

// Quantity selector handler
export function initQuantityControls() {
  if (typeof document === 'undefined') return;
  document.querySelectorAll('.qty-btn-minus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const input = e.currentTarget.parentNode.querySelector('.qty-input');
      if (input && parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
      }
    });
  });

  document.querySelectorAll('.qty-btn-plus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const input = e.currentTarget.parentNode.querySelector('.qty-input');
      if (input) {
        input.value = parseInt(input.value) + 1;
      }
    });
  });
}

// Cart local storage helpers
export function addToCart(product) {
  if (typeof window === 'undefined') return;
  let cart = JSON.parse(localStorage.getItem('harmonia_cart') || '[]');
  const existing = cart.find(item => (item.id === product.id || item.product?.id === product.id));
  if (existing) {
    existing.quantity = (existing.quantity || 1) + (product.quantity || 1);
  } else {
    cart.push({
      id: product.id,
      product: product,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: product.quantity || 1
    });
  }
  localStorage.setItem('harmonia_cart', JSON.stringify(cart));
  updateCartBadge();
  showToast(`Đã thêm "${product.name}" vào giỏ hàng!`);
  
  window.dispatchEvent(new Event('harmonia_cart_updated'));
}

export function updateCartBadge() {
  if (typeof document === 'undefined') return;
  const cart = JSON.parse(localStorage.getItem('harmonia_cart') || '[]');
  const totalCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  document.querySelectorAll('.cart-badge-count').forEach(el => {
    el.textContent = totalCount;
    if (totalCount > 0) {
      el.classList.remove('hidden');
    } else {
      el.classList.add('hidden');
    }
  });
}

// Highlight active menu item based on window location
export function highlightActiveNav() {
  if (typeof window === 'undefined') return;
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('text-amber-500', 'font-semibold');
    }
  });
}

// Global browser window bindings
if (typeof window !== 'undefined') {
  window.addToCart = addToCart;
  window.showToast = showToast;
  window.updateCartBadge = updateCartBadge;
  window.initMobileMenu = initMobileMenu;
  window.initQuantityControls = initQuantityControls;
  window.highlightActiveNav = highlightActiveNav;
}
