const path = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('[data-nav]');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-links');

navLinks.forEach((link) => {
  const file = link.getAttribute('href');
  if (file === path) {
    link.classList.add('active');
  }
});

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}
