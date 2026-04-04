/* ============================================================
   GOLDEN CAMP SOLUTIONS — Main JavaScript
   ============================================================ */

// ─── NAVBAR SCROLL ───
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar && navbar.classList.add('scrolled');
  } else {
    navbar && navbar.classList.remove('scrolled');
  }
});

// Hamburger
hamburger && hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu && mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger && hamburger.classList.remove('open');
    mobileMenu && mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ─── STATS COUNTER ───
function animateCounter(el, target, suffix = '', duration = 2000) {
  const start = performance.now();
  const startVal = 0;
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.round(startVal + (target - startVal) * eased);
    el.textContent = current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// Intersection Observer for stats
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = 'true';
      const target = parseInt(entry.target.dataset.target, 10);
      if (isNaN(target)) return; // skip non-numeric data-target (e.g. nav links)
      const suffix = entry.target.dataset.suffix || '';
      animateCounter(entry.target, target, suffix);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => statObserver.observe(el));

// ─── FADE IN ON SCROLL ───
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// ─── ACTIVE NAV LINK ───
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ─── CONTACT FORM ───
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#25D366';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });
}

// ─── SERVICES NAV (services page) ───
const srvNavLinks = document.querySelectorAll('.srv-nav-link');
if (srvNavLinks.length > 0) {
  srvNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      srvNavLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      const targetId = link.dataset.target;
      const target = document.getElementById(targetId);
      if (target) {
        const offset = 140;
        const pos = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    });
  });

  // Highlight srv nav on scroll
  const sections = document.querySelectorAll('.service-detail[id]');
  const scrollSrvObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        srvNavLinks.forEach(l => {
          l.classList.toggle('active', l.dataset.target === entry.target.id);
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => scrollSrvObserver.observe(s));
}

// ─── YEAR IN FOOTER ───
document.querySelectorAll('.year').forEach(el => {
  el.textContent = new Date().getFullYear();
});
