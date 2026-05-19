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
  const scrollIndicator = document.querySelector('.scroll-indicator');

  window.addEventListener('scroll', () => {
    const max = document.body.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    if (scrollBar) scrollBar.style.width = pct + '%';

    // Back-to-top visibility
    if (backTop) {
      backTop.classList.toggle('visible', window.scrollY > 400);
    }

    // Hide scroll indicator once user starts scrolling
    if (scrollIndicator) {
      scrollIndicator.classList.toggle('hidden', window.scrollY > 60);
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

/* ─── CONTACT FORM — sends to mohits.ug24.ec@nitp.ac.in via Web3Forms ─── */
/*
  SETUP (one-time, free):
  1. Go to https://web3forms.com
  2. Enter your email: mohits.ug24.ec@nitp.ac.in → click "Create Access Key"
  3. Check your email, copy the access key
  4. Replace "YOUR_WEB3FORMS_ACCESS_KEY" below with your actual key
  That's it — no backend, no server needed!
*/
const WEB3FORMS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";

async function handleFormSubmit(btn) {
  const form     = btn.closest('.contact-form');
  const nameEl   = form.querySelector('input[type="text"]');
  const emailEl  = form.querySelector('input[type="email"]');
  const msgEl    = form.querySelector('textarea');

  const name    = nameEl.value.trim();
  const email   = emailEl.value.trim();
  const message = msgEl.value.trim();

  // Basic validation
  if (!name || !email || !message) {
    showFormStatus(btn, '⚠ Please fill all fields', '#ffcc00', '#050e0a');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showFormStatus(btn, '⚠ Enter a valid email', '#ffcc00', '#050e0a');
    return;
  }

  // Loading state
  const originalHTML = btn.innerHTML;
  btn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10" stroke-dasharray="31.4" stroke-dashoffset="31.4" style="animation:spin 1s linear infinite"/></svg> Sending…';
  btn.disabled = true;
  btn.style.opacity = '.7';

  try {
    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: `Portfolio Contact from ${name}`,
      from_name: name,
      replyto: email,
      message: message
    };

    const res  = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    if (data.success) {
      showFormStatus(btn, '✓ Message Sent!', 'var(--neon)', '#050e0a');
      nameEl.value = '';
      emailEl.value = '';
      msgEl.value = '';
    } else {
      throw new Error(data.message || 'Send failed');
    }
  } catch (err) {
    console.error('Form error:', err);
    if (WEB3FORMS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY") {
      showFormStatus(btn, '⚙ Add your Web3Forms key', '#c084fc', '#fff');
    } else {
      showFormStatus(btn, '✗ Failed — try email directly', '#ff6b6b', '#fff');
    }
  }

  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.style.background = '';
    btn.style.color = '';
    btn.style.opacity = '';
    btn.disabled = false;
  }, 3500);
}

function showFormStatus(btn, text, bg, color) {
  btn.textContent = text;
  btn.style.background = bg;
  btn.style.color = color;
  btn.style.opacity = '1';
}

/* spin keyframe for loading icon */
const styleTag = document.createElement('style');
styleTag.textContent = '@keyframes spin { to { stroke-dashoffset: 0; } }';
document.head.appendChild(styleTag);
