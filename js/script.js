/* Fade-in effect on scroll */
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.1,
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('visible');
      appearOnScroll.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

/* Preloader */
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  preloader.style.display = 'none';
});

/* Back to Top Button */
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
});
