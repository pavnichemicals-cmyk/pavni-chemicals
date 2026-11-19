// ---- Motion Scrolling ----
// Using pure native smooth scrolling (scroll-behavior: smooth) for zero-lag capability.

// ---- Scroll-based animations (IntersectionObserver) ----
const animClasses = ['.anim-fade-up', '.anim-slide-left', '.anim-slide-right', '.anim-fade-in'];

const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.classList.add('is-visible');
      observer.unobserve(el.target);
    }
  });
}, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

// Function to observe new elements
function refreshAnimations() {
    document.querySelectorAll(animClasses.join(',')).forEach(el => {
        if (!el.classList.contains('is-visible')) {
            observer.observe(el);
        }
    });
}

// Initialize animations on load
document.addEventListener('DOMContentLoaded', refreshAnimations);

// Expose globally
window.refreshAnimations = refreshAnimations;


// ---- Sticky header ----
const header = document.getElementById('site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ---- Mobile menu ----
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
const mobileClose = document.getElementById('mobile-close');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  
  mobileClose?.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('active');
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
}

// ---- Active nav link based on scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[data-section]');

if (sections.length && navLinks.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === entry.target.id);
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => sectionObserver.observe(s));
}

// ---- Quote form submit ----
const quoteForm = document.getElementById('quote-form');
if (quoteForm) {
  let currentAction = 'whatsapp';
  
  // Explicitly capture which button was clicked (fallback for older browsers)
  quoteForm.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentAction = btn.dataset.action;
    });
  });

  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const action = currentAction;
    const btn = quoteForm.querySelector(`[data-action="${action}"]`) || quoteForm.querySelector('[type="submit"]');
    const originalText = btn.innerHTML;

    // Build message from form data
    const name    = quoteForm.querySelector('#fname')?.value || '';
    const phone   = quoteForm.querySelector('#fphone')?.value || '';
    const product = quoteForm.querySelector('#fproduct')?.value || '';
    const qty     = quoteForm.querySelector('#fqty')?.value || '';
    const city    = quoteForm.querySelector('#fcity')?.value || '';

    const plainMsg = `Quote Request:\nName: ${name}\nPhone: ${phone}\nProduct: ${product}\nQty: ${qty}\nCity: ${city}`;
    const encodedMsg = encodeURIComponent(plainMsg);

    btn.innerHTML = '✅ Processing…';
    btn.disabled = true;

    setTimeout(() => {
      if (action === 'email') {
        window.location.href = `mailto:sales@pavnichemicals.com?subject=New Inquiry from ${name}&body=${encodedMsg}`;
      } else {
        window.open(`https://wa.me/919687370005?text=${encodedMsg}`, '_blank');
      }
      btn.innerHTML = originalText;
      btn.disabled = false;
      quoteForm.reset();
    }, 800);
  });
}

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    }
  });
});

// ---- Counter animation on stats ----
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const step = Math.ceil(target / (duration / 16));
  let current = 0;

  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + suffix;
    if (current >= target) clearInterval(timer);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// ---- Year in footer ----
const yearEl = document.getElementById('current-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---- Floating Contact Buttons ----
const contactContainer = document.createElement('div');
contactContainer.className = 'floating-contacts';
document.body.appendChild(contactContainer);

// WhatsApp
const waFloat = document.createElement('a');
waFloat.href = 'https://wa.me/919687370005?text=Hello%20Pavni%20Chemicals';
waFloat.target = '_blank';
waFloat.className = 'whatsapp-float';
waFloat.innerHTML = `<svg viewBox="0 0 32 32" fill="white"><path d="M16.035 0C7.195 0 0 7.195 0 16.035c0 3.5 1.13 6.75 3.03 9.4L1.005 31.98l6.68-2.025C10.235 31.455 13.06 32.06 16.035 32.06c8.84 0 16.025-7.185 16.025-16.025C32.06 7.195 24.875 0 16.035 0zm9.655 22.065c-.42 1.2-2.005 2.1-3.335 2.3-.99.15-2.42.27-6.355-1.36-4.72-1.955-7.76-6.775-8-7.095-.24-.32-1.76-2.345-1.76-4.46s1.08-3.03 1.53-3.5c.41-.43 1.09-.67 1.67-.67.18 0 .34 0 .49.01.41.02.62.05.89.7.31.73 1.07 2.58 1.16 2.76.09.18.19.45.05.73-.13.28-.24.39-.44.61-.2.22-.42.51-.6.67-.2.19-.41.4-.19.79.23.39 1.07 1.77 2.31 2.88 1.6 1.43 2.89 1.88 3.32 2.09.43.21.67.18.93-.1.31-.33 1.08-1.24 1.48-1.71.4-.47.78-.41 1.19-.26.41.15 2.6 1.24 3.04 1.46.44.22.73.33.84.51.12.19.12 1.04-.2 2.055z"/></svg>`;
document.body.appendChild(waFloat);

// Email
const emailFloat = document.createElement('a');
emailFloat.href = 'mailto:sales@pavnichemicals.com';
emailFloat.className = 'email-float';
emailFloat.innerHTML = `<svg viewBox="0 0 24 24" fill="white"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`;
document.body.appendChild(emailFloat);

// Remove any legacy custom cursor DOM elements to ensure 100% native regular cursor
document.addEventListener('DOMContentLoaded', () => {
  const legacyCursor = document.getElementById('pavni-cursor');
  if (legacyCursor) legacyCursor.remove();
});
