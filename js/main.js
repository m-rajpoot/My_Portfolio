/* ═══════════════════════════════════════════════
   MOHIT KUMAR SINGH — PORTFOLIO
   main.js
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── LIVE CLOCK ─── */
  const clockEl = document.getElementById('sb-clock');
  function updateClock() {
    const now = new Date();
    if (clockEl) {
      clockEl.textContent =
        now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) + ' IST';
    }
  }
  updateClock();
  setInterval(updateClock, 1000);

  /* ─── SCROLL PROGRESS BAR ─── */
  const scrollBar = document.getElementById('scroll-bar');
  const backTop   = document.getElementById('back-top');

  window.addEventListener('scroll', () => {
    const max = document.body.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    if (scrollBar) scrollBar.style.width = pct + '%';

    // Back-to-top visibility
    if (backTop) {
      backTop.classList.toggle('visible', window.scrollY > 400);
    }
  }, { passive: true });

  /* ─── BACK TO TOP BUTTON ─── */
  if (backTop) {
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─── BRAND NAME → SCROLL TO TOP ─── */
  const brandName = document.getElementById('brand-name');
  if (brandName) {
    brandName.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─── CURSOR GLOW ─── */
  const glow = document.getElementById('cursor-glow');
  if (glow) {
    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    }, { passive: true });
  }

  /* ─── REVEAL ON SCROLL ─── */
  const revealEls = document.querySelectorAll('.reveal');
  const revIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('in-view');
    });
  }, { threshold: 0.08 });
  revealEls.forEach(r => revIO.observe(r));

  /* ─── ACTIVE NAV HIGHLIGHT ─── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.sb-link');
  const navIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        navLinks.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(s => navIO.observe(s));

  /* ─── COUNT-UP ANIMATION ─── */
  document.querySelectorAll('.count-up').forEach(el => {
    const cIO = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const target = +el.dataset.target;
        let startTime = null;
        const dur = 1600;
        const step = (ts) => {
          if (!startTime) startTime = ts;
          const prog = Math.min((ts - startTime) / dur, 1);
          el.textContent = Math.floor(prog * target);
          if (prog < 1) requestAnimationFrame(step);
          else el.textContent = target;
        };
        requestAnimationFrame(step);
        cIO.unobserve(el);
      }
    }, { threshold: 0.5 });
    cIO.observe(el);
  });

  /* ─── MOBILE SIDEBAR ─── */
  const hamburger = document.getElementById('hamburger');
  const sidebar   = document.getElementById('sidebar');
  const overlay   = document.getElementById('overlay');

  if (hamburger && sidebar && overlay) {
    hamburger.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('open');
    });
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    });
    navLinks.forEach(l => l.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    }));
  }

});

/* ─── CONTACT FORM FEEDBACK ─── */
function handleFormSubmit(btn) {
  const originalHTML = btn.innerHTML;
  btn.textContent = 'Message Sent ✓';
  btn.style.background = '#a8ff3e';
  btn.style.color = '#050e0a';
  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.style.background = '';
    btn.style.color = '';
  }, 3000);
}
