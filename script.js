/* ============================================================
   EP VIDROS — script.js
   ============================================================ */

'use strict';

// ---- NAVBAR SCROLL ----
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ---- ACTIVE NAV LINK ----
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
})();

// ---- HAMBURGER / MOBILE MENU ----
(function initMobileMenu() {
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!hamburger || !mobileMenu) return;

  const toggleMenu = () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  hamburger.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });

  // Fecha o menu se a janela for redimensionada para desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });
})();

// ---- SCROLL REVEAL ----
(function initScrollReveal() {
  const elements = document.querySelectorAll(
    '.service-card, .diff-card, .about-feature, .contact-item, ' +
    '.stat-item, .float-card, .about-visual, .about-content'
  );

  elements.forEach((el, i) => {
    el.setAttribute('data-reveal', '');
    el.style.transitionDelay = (i * 0.07) + 's';
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
})();

// ---- STATS COUNTER ----
(function initCounter() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let started = false;

  function easeOutQuad(t) { return t * (2 - t); }

  function startCounters() {
    if (started) return;
    started = true;
    const duration = 2000;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuad(progress);

      statNumbers.forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        el.textContent = Math.floor(eased * target).toLocaleString('pt-BR');
      });

      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const statsBar = document.getElementById('stats-bar');
  if (!statsBar) return;

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      startCounters();
      observer.disconnect();
    }
  }, { threshold: 0.4 });
  observer.observe(statsBar);
})();

// ---- FOOTER YEAR ----
(function initYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();

// ---- SMOOTH SCROLL (polyfill for older browsers) ----
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

// ---- WHATSAPP FLOAT PULSING ----
(function initWAFloat() {
  const wa = document.getElementById('whatsapp-float');
  if (!wa) return;

  // Add pulse ring
  const ring = document.createElement('span');
  ring.style.cssText = `
    position:absolute;inset:-8px;border-radius:50%;
    border:2px solid rgba(37,211,102,0.5);
    animation:wa-pulse 2s ease-out infinite;
    pointer-events:none;
  `;
  wa.appendChild(ring);

  const style = document.createElement('style');
  style.textContent = `
    @keyframes wa-pulse {
      0%   { transform:scale(1); opacity:0.8; }
      70%  { transform:scale(1.4); opacity:0; }
      100% { transform:scale(1.4); opacity:0; }
    }
  `;
  document.head.appendChild(style);
})();

// ---- HERO PARALLAX ----
(function initParallax() {
  const heroImg = document.getElementById('hero-bg-img');
  if (!heroImg) return;

  const onScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroImg.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// ---- SECTION HEADER REVEAL ----
(function initHeaderReveal() {
  const headers = document.querySelectorAll('.section-header');
  headers.forEach(h => {
    h.style.opacity = '0';
    h.style.transform = 'translateY(30px)';
    h.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  headers.forEach(h => observer.observe(h));
})();
