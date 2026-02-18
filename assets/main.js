const path = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('[data-nav]');

navLinks.forEach((link) => {
  const file = link.getAttribute('href');
  if (file === path) {
    link.classList.add('active');
  }
});
