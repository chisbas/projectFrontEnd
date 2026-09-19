// Main Application JS for Harmonia Music Store

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initToast();
  initQuantityControls();
  updateCartBadge();
  highlightActiveNav();
});

// Mobile Drawer Menu
function initMobileMenu() {
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
function showToast(message, type = 'success') {
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
function initQuantityControls() {
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
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('harmonia_cart') || '[]');
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += product.quantity || 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: product.quantity || 1
    });
  }
  localStorage.setItem('harmonia_cart', JSON.stringify(cart));
  updateCartBadge();
  showToast(`Đã thêm "${product.name}" vào giỏ hàng!`);
}

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem('harmonia_cart') || '[]');
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
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
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('text-amber-500', 'font-semibold');
    }
  });
}
