// Main Application JS for Harmonia Music Store - Static Browser Script

if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    if (typeof window.initMobileMenu === 'function') window.initMobileMenu();
    if (typeof window.initQuantityControls === 'function') window.initQuantityControls();
    if (typeof window.updateCartBadge === 'function') window.updateCartBadge();
    if (typeof window.highlightActiveNav === 'function') window.highlightActiveNav();
  });
}
