import './style.css'
import api from './api/index.js'
import { initMotion, motionAnimate } from './motion.js'

/* ═══════════════════════════════════════════════════════════════
   Samara Peace Forum Union — Main Application Controller
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;

  if (page === 'dashboard') {
    initPreloader();
    initDashboardPage();
    return;
  }

  initPreloader();
  initNavbar();
  initFooter();
  initScrollAnimations();
  initMotion();           // ← Framer-Motion-style whileInView
  initParallax();
  initCounters();
  initReadingProgress();
  initModals();
  initPageTransition();

  if (page === 'home')    initHomePage();
  if (page === 'news')    initNewsPage();
  if (page === 'unions')  initUnionsPage();
  if (page === 'contact') initContactPage();
});

/* ─── Page Transition Fade-in ───────────────────────────────── */

function initPageTransition() {
  const main = document.querySelector('main');
  if (!main) return;
  // CSS handles the `pageSlideIn` animation via `main {animation:...}`
  // We just need to ensure the preloader hides first.
}


/* ─── Preloader ─────────────────────────────────────────────── */

function initPreloader() {
  const el = document.getElementById('preloader');
  if (!el) return;
  window.addEventListener('load', () => {
    setTimeout(() => {
      el.classList.add('preloader--hidden');
      setTimeout(() => el.remove(), 600);
    }, 400);
  });
}

/* ─── Reading Progress ──────────────────────────────────────── */

function initReadingProgress() {
  const bar = document.getElementById('page-progress');
  if (!bar) return;
  const update = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = `${Math.min((window.scrollY / total) * 100, 100)}%`;
  };
  window.addEventListener('scroll', update, { passive: true });
}

/* ─── Navbar ────────────────────────────────────────────────── */

function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  const path = location.pathname;
  const links = [
    { href: '/',               label: 'Home' },
    { href: '/news.html',      label: 'News' },
    { href: '/mission.html',   label: 'Mission' },
    { href: '/resources.html', label: 'Resources' },
    { href: '/unions.html',    label: 'Members' },
    { href: '/contact.html',   label: 'Contact' },
  ];
  const isActive = h => h === '/' ? (path === '/' || path.endsWith('index.html')) : path.endsWith(h);

  const theme = localStorage.getItem('spf-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);

  navbar.innerHTML = `
    <div class="container">
      <div class="navbar__inner">
        <a href="/" class="navbar__brand">
          <img src="/logo.jpg" alt="Logo" width="40" height="40" style="border-radius:var(--r-lg)">
          <span class="navbar__brand-text">Samara University Peace Forum Union</span>
        </a>
        <nav class="navbar__links" aria-label="Primary navigation">
          ${links.map(l => `<a href="${l.href}" class="navbar__link${isActive(l.href) ? ' navbar__link--active' : ''}">${l.label}</a>`).join('')}
        </nav>
        <div class="navbar__actions">
          <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
            <svg class="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            <svg class="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          </button>
          <button class="navbar__menu-btn" id="menu-btn" aria-label="Toggle menu" aria-expanded="false">☰</button>
        </div>
      </div>
    </div>
    <div class="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true">
      <div class="mobile-menu__inner">
        ${links.map(l => `<a href="${l.href}" class="mobile-menu__link">${l.label}</a>`).join('')}
        <div class="mobile-menu__divider"></div>
        <button class="theme-toggle theme-toggle--mobile" id="theme-toggle-mobile" style="margin-bottom:1rem">
          <span class="theme-label">Switch Theme</span>
        </button>
        <a href="https://t.me/SUPEACEFORUMUNION" target="_blank" rel="noopener noreferrer" class="mobile-menu__social-btn">🔵 Join Telegram</a>
      </div>
    </div>
  `;

  const btn = document.getElementById('menu-btn');
  const menu = document.getElementById('mobile-menu');
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');

  const toggleTheme = () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('spf-theme', next);
  };

  themeToggle?.addEventListener('click', toggleTheme);
  themeToggleMobile?.addEventListener('click', toggleTheme);

  btn?.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    navbar.classList.toggle('menu-is-open', open);
    btn.textContent = open ? '✕' : '☰';
    btn.setAttribute('aria-expanded', open);
    btn.style.zIndex = open ? '2200' : '';
    document.body.style.overflow = open ? 'hidden' : '';
    
    // Fix: Remove transform when open to prevent containing block issue
    if (open) {
      navbar.style.transform = 'none';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
  });
  menu?.addEventListener('click', (e) => {
    if (e.target === menu) {
      menu.classList.remove('is-open');
      navbar.classList.remove('menu-is-open');
      btn.textContent = '☰';
      btn.setAttribute('aria-expanded', false);
      btn.style.zIndex = '';
      navbar.style.transform = 'translateY(0)';
      document.body.style.overflow = '';
    }
  });
  menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('is-open');
    navbar.classList.remove('menu-is-open');
    btn.textContent = '☰';
    btn.style.zIndex = '';
    navbar.style.transform = 'translateY(0)';
    document.body.style.overflow = '';
  }));

  // Scroll shrink
  let lastY = 0;
  window.addEventListener('scroll', () => {
    if (navbar.classList.contains('menu-is-open')) return;
    const y = window.scrollY;
    const scrolled = y > 30;
    navbar.classList.toggle('navbar--scrolled', scrolled);
    // Hide on scroll down, show on scroll up
    navbar.style.transform = y > lastY && y > 200 ? 'translateY(-100%)' : 'translateY(0)';
    lastY = y;
  }, { passive: true });
}

/* ─── Footer ────────────────────────────────────────────────── */

function initFooter() {
  const footer = document.getElementById('footer');
  if (!footer) return;
  const navLinks = [
    { href: '/', l: 'Home' }, { href: '/news.html', l: 'News & Updates' }, 
    { href: '/mission.html', l: 'Our Mission' }, { href: '/resources.html', l: 'Knowledge Base' },
    { href: '/unions.html', l: 'Member Registry' }, { href: '/contact.html', l: 'Contact Support' }
  ];
  footer.innerHTML = `
    <div class="footer__top">
      <div class="container">
        <div class="footer__brand-area">
          <div class="footer__logo-wrap">
            <img src="/logo.jpg" alt="Logo" class="footer__logo-img">
            <div class="footer__brand-text-wrap">
              <h2 class="footer__brand-name">Samara University<br/>Peace Forum Union</h2>
              <p class="footer__brand-tag">Cultivating Structural Harmony</p>
            </div>
          </div>
          <p class="footer__description">
            The official platform dedicated to conflict resolution, civic leadership, and the 
            proactive mediation of disputes within the Samara University student community.
          </p>
        </div>

        <div class="footer__grid-container">
          <div class="footer__col">
            <h4 class="footer__col-title">The Platform</h4>
            <div class="footer__links">
              <a href="/" class="footer__link">Home</a>
              <a href="/news.html" class="footer__link">News & Updates</a>
              <a href="/mission.html" class="footer__link">Our Mission</a>
            </div>
          </div>
          <div class="footer__col">
            <h4 class="footer__col-title">Resources</h4>
            <div class="footer__links">
              <a href="/resources.html" class="footer__link">Knowledge Base</a>
              <a href="/unions.html" class="footer__link">Member Registry</a>
              <a href="/mission.html#join" class="footer__link">Become a Peacemaker</a>
            </div>
          </div>
          <div class="footer__col">
            <h4 class="footer__col-title">Governance</h4>
            <div class="footer__links">
              <a href="/developer.html" class="footer__link" style="color:var(--primary);font-weight:700">Developer Portal</a>
              <a href="/mission.html#framework" class="footer__link">Framework</a>
              <a href="/unions.html" class="footer__link">Chapter Registry</a>
            </div>
          </div>
          <div class="footer__col">
            <h4 class="footer__col-title">Connect</h4>
            <div class="footer__socials-grid">
              <a href="https://t.me/SUPEACEFORUMUNION" target="_blank" class="footer__social-btn">Telegram</a>
              <a href="mailto:su.peaceforumunion@gmail.com" class="footer__social-btn">Email Us</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="footer__bottom">
      <div class="container">
        <div class="footer__bottom-inner">
          <div class="footer__copy">© 2024 Samara University Peace Forum Union. Built natively by <a href="/developer.html" class="footer__author-link">Awash-Dev</a></div>
          <div class="footer__legal">
            <a href="#" class="footer__legal-link">Privacy Policy</a>
            <span class="footer__dot"></span>
            <a href="#" class="footer__legal-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ─── Scroll Animations ─────────────────────────────────────── */

function initScrollAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Just make everything visible immediately
    document.querySelectorAll('[data-reveal],[data-stagger]').forEach(el => { el.style.opacity = '1'; });
    document.querySelectorAll('[data-stagger] > *').forEach(el => { el.style.opacity = '1'; });
    return;
  }

  const EASING = 'cubic-bezier(0.16,1,0.3,1)';
  const DUR = '0.85s';

  // ── Individual element reveals ──────────────────────
  const revealMap = {
    '':      `revealUp ${DUR} ${EASING} forwards`,
    'right': `revealRight ${DUR} ${EASING} forwards`,
    'left':  `revealLeft ${DUR} ${EASING} forwards`,
    'scale': `revealScale ${DUR} ${EASING} forwards`,
    'fade':  `revealFade ${DUR} ${EASING} forwards`,
  };

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const dir = el.dataset.reveal ?? '';
      el.style.animation = revealMap[dir] || revealMap[''];
      revealObs.unobserve(el);
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el));

  // ── Stagger groups ──────────────────────────────────
  const staggerObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const children = Array.from(entry.target.children);
      children.forEach((child, i) => {
        setTimeout(() => {
          child.style.animation = `revealUp 0.7s ${EASING} forwards`;
        }, i * 80);
      });
      staggerObs.unobserve(entry.target);
    });
  }, { threshold: 0.04, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('[data-stagger]').forEach(wrap => staggerObs.observe(wrap));

  // ── Section border parallax glow ────────────────────
  const sections = document.querySelectorAll('.section, .section--subtle');
  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.style.transition = 'opacity 0.6s ease';
      entry.target.style.opacity = entry.isIntersecting ? '1' : '0.6';
    });
  }, { threshold: 0.1 });
  sections.forEach(s => sectionObs.observe(s));
}


/* ─── Parallax ──────────────────────────────────────────────── */

function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // Hero image subtle parallax
  const heroImg = document.querySelector('.hero__image img');
  const orbs = document.querySelectorAll('.page-hero__orb');
  if (!heroImg && !orbs.length) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (heroImg) {
        heroImg.style.transform = `translateY(${y * 0.08}px) scale(1.02)`;
      }
      orbs.forEach((orb, i) => {
        orb.style.transform = `translateY(${y * (i === 0 ? 0.07 : -0.04)}px)`;
      });
      ticking = false;
    });
    ticking = true;
  }, { passive: true });
}


/* ─── Counters ──────────────────────────────────────────────── */

function initCounters() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      animateCount(el, 0, +el.dataset.count, 2200, el.dataset.suffix || '');
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => obs.observe(el));
}

function animateCount(el, from, to, dur, suffix) {
  let t0;
  const step = ts => {
    if (!t0) t0 = ts;
    const p = Math.min((ts - t0) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 4);
    el.textContent = Math.floor(ease * (to - from) + from).toLocaleString() + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ─── Modal System ──────────────────────────────────────────── */

let newsModal, memberModal;

function initModals() {
  newsModal = createModal('news-modal', 'spf-modal__box--article');
  memberModal = createModal('member-modal', 'spf-modal__box--member');

  newsModal.backdrop.addEventListener('click', closeNewsModal);
  newsModal.close.addEventListener('click', closeNewsModal);
  memberModal.backdrop.addEventListener('click', closeMemberModal);
  memberModal.close.addEventListener('click', closeMemberModal);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeNewsModal(); closeMemberModal(); }
  });
}

function createModal(id, boxClass) {
  const wrap = document.createElement('div');
  wrap.className = 'spf-modal'; wrap.id = id;
  wrap.setAttribute('role', 'dialog'); wrap.setAttribute('aria-modal', 'true');
  const backdrop = document.createElement('div');
  backdrop.className = 'spf-modal__backdrop';
  const box = document.createElement('div');
  box.className = `spf-modal__box ${boxClass}`;
  const closeBtn = document.createElement('button');
  closeBtn.className = 'spf-modal__close'; closeBtn.textContent = '✕'; closeBtn.setAttribute('aria-label', 'Close');
  const body = document.createElement('div');
  body.className = 'spf-modal__body';
  box.append(closeBtn, body);
  wrap.append(backdrop, box);
  document.body.appendChild(wrap);
  return { wrap, backdrop, box, close: closeBtn, body };
}

function openNewsModal(post) {
  newsModal.body.innerHTML = `
    ${post.image ? `<div class="nmd-hero"><img src="${post.image}" alt="" class="nmd-hero__img" loading="lazy"><div class="nmd-hero__overlay"></div></div>` : ''}
    <div class="nmd-content">
      <div class="nmd-meta">
        <span class="nmd-cat">${escHTML(post.category || 'General')}</span>
        <span class="nmd-date">📅 ${post.date}</span>
      </div>
      <h2 class="nmd-title">${escHTML(post.title)}</h2>
      <div class="nmd-author">
        <div class="nmd-author__avatar">${(post.author || 'A')[0].toUpperCase()}</div>
        <div>
          <div class="nmd-author__name">${escHTML(post.author)}</div>
          <div class="nmd-author__role">Contributor</div>
        </div>
      </div>
      <div class="nmd-divider"></div>
      <div class="nmd-body">${escHTML(post.content).replace(/\n/g, '<br>')}</div>
      <div class="nmd-actions">
        <a href="https://t.me/SUPEACEFORUMUNION" target="_blank" rel="noopener noreferrer" class="nmd-btn nmd-btn--tg">🔵 Share on Telegram</a>
      </div>
    </div>
  `;
  newsModal.wrap.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => newsModal.close.focus(), 50);
}
function closeNewsModal() {
  newsModal.wrap.classList.remove('is-open');
  document.body.style.overflow = '';
}

function openMemberModal(m) {
  const initials = (m.name || '?').split(' ').slice(0,2).map(w => w[0]).join('').toUpperCase();
  memberModal.body.innerHTML = `
    <div class="mmd-profile">
      ${m.image ? `<img src="${m.image}" alt="${escHTML(m.name)}" class="mmd-avatar">` : `<div class="mmd-avatar mmd-avatar--initials">${initials}</div>`}
      <div class="mmd-badge">${escHTML(m.category || 'Member')}</div>
      <h2 class="mmd-name">${escHTML(m.name)}</h2>
      <div class="mmd-grade">📚 ${escHTML(m.grade || 'Student')}</div>
    </div>
    <div class="mmd-contacts">
      ${m.email ? `<a href="mailto:${escHTML(m.email)}" class="mmd-contact-btn"><span class="mmd-contact-btn__icon">📧</span><div><div class="mmd-contact-btn__label">Email</div><div class="mmd-contact-btn__value">${escHTML(m.email)}</div></div></a>` : ''}
      ${m.phone ? `<a href="tel:${escHTML(m.phone)}" class="mmd-contact-btn"><span class="mmd-contact-btn__icon">📞</span><div><div class="mmd-contact-btn__label">Call</div><div class="mmd-contact-btn__value">${escHTML(m.phone)}</div></div></a>` : ''}
      ${!m.email && !m.phone ? '<p style="color:#94a3b8;text-align:center;padding:1rem">No contact info provided.</p>' : ''}
    </div>
    <p style="text-align:center;padding-bottom:1.25rem;font-size:0.75rem;color:#94a3b8">Member since ${m.joinedDate || 'N/A'}</p>
  `;
  memberModal.wrap.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}
function closeMemberModal() {
  memberModal.wrap.classList.remove('is-open');
  document.body.style.overflow = '';
}

/* ═══════════════════════════════════════════════════════════════
   PAGE: Home
   ═══════════════════════════════════════════════════════════════ */

async function initHomePage() {
  const grid = document.getElementById('latest-news-grid');
  if (!grid) return;
  grid.innerHTML = shimmerCards(3);
  try {
    const posts = await api.posts.list();
    if (!posts.length) { grid.innerHTML = emptyState('No stories published yet.'); return; }
    grid.innerHTML = posts.slice(0, 3).map(p => newsCardHTML(p)).join('');
    attachNewsCards(grid, posts.slice(0, 3));
    animateNewCards(grid);
    // Apply motion to freshly injected home news cards — alternating directions
    grid.querySelectorAll('.news-card').forEach((card, i) => {
      const variant = ['slideRight', 'slideUp', 'slideLeft'][i % 3];
      motionAnimate(card, variant, i * 0.1, 0.75);
    });
  } catch { grid.innerHTML = errorState('Could not load news.'); }
}

/* ═══════════════════════════════════════════════════════════════
   PAGE: News
   ═══════════════════════════════════════════════════════════════ */

async function initNewsPage() {
  const grid = document.getElementById('news-grid');
  const bar = document.getElementById('news-filter-bar');
  if (!grid) return;
  grid.innerHTML = shimmerCards(6);

  try {
    const posts = await api.posts.list();
    const cats = [...new Set(posts.map(p => p.category).filter(Boolean))];
    if (bar) {
      bar.innerHTML = `<button class="filter-btn is-active" data-filter="All">All</button>` +
        cats.map(c => `<button class="filter-btn" data-filter="${escHTML(c)}">${escHTML(c)}</button>`).join('');
      bar.addEventListener('click', e => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const f = btn.dataset.filter;
        render(f === 'All' ? posts : posts.filter(p => p.category === f));
      });
    }
    render(posts);
    function render(items) {
      if (!items.length) { grid.innerHTML = emptyState('No stories in this category.'); return; }
      grid.innerHTML = items.map(p => newsCardHTML(p)).join('');
      attachNewsCards(grid, items);
      // Framer-Motion-style staggered entrance — alternates blurLeft / blurRight
      grid.querySelectorAll('.news-card').forEach((card, i) => {
        const variant = i % 2 === 0 ? 'blurRight' : 'blurLeft';
        motionAnimate(card, variant, i * 0.09, 0.75);
      });
    }
  } catch { grid.innerHTML = errorState('Failed to load news.'); }
}

/* ═══════════════════════════════════════════════════════════════
   PAGE: Unions/Members
   ═══════════════════════════════════════════════════════════════ */

async function initUnionsPage() {
  const grid = document.getElementById('members-grid');
  const bar = document.getElementById('unions-filter-bar');
  const search = document.getElementById('members-search');
  if (!grid) return;
  grid.innerHTML = shimmerCards(8, 'member');

  try {
    const members = await api.members.list();
    const cats = [...new Set(members.map(m => m.category).filter(Boolean))];
    let activeFilter = 'All Divisions';

    if (bar) {
      bar.innerHTML = `<button class="filter-btn is-active" data-filter="All Divisions">All Divisions</button>` +
        cats.map(c => `<button class="filter-btn" data-filter="${escHTML(c)}">${escHTML(c)}</button>`).join('');
      bar.addEventListener('click', e => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        activeFilter = btn.dataset.filter;
        render();
      });
    }
    search?.addEventListener('input', render);

    render();
    function render() {
      const q = (search?.value || '').toLowerCase();
      let filtered = activeFilter === 'All Divisions' ? members : members.filter(m => m.category === activeFilter);
      if (q) filtered = filtered.filter(m =>
        m.name.toLowerCase().includes(q) ||
        (m.email || '').toLowerCase().includes(q) ||
        (m.category || '').toLowerCase().includes(q)
      );
      if (!filtered.length) { grid.innerHTML = emptyState('No members found.'); return; }
      grid.innerHTML = filtered.map(m => memberCardHTML(m)).join('');
      grid.querySelectorAll('[data-member-id]').forEach((card, i) => {
        const m = filtered.find(x => String(x.id) === card.dataset.memberId);
        card.addEventListener('click', () => { if (m) openMemberModal(m); });
        card.style.cursor = 'pointer';
        // Alternate directions: col 0→slideRight, col 1→slideUp, col 2→slideLeft, col 3→scaleUp
        const variants = ['slideRight', 'slideUp', 'slideLeft', 'scaleUp'];
        const variant  = variants[i % 4];
        motionAnimate(card, variant, i * 0.055, 0.72);
      });
    }
  } catch { grid.innerHTML = errorState('Failed to load members.'); }
}

/* ═══════════════════════════════════════════════════════════════
   PAGE: Contact
   ═══════════════════════════════════════════════════════════════ */

function initContactPage() {
  const form = document.getElementById('contact-form');
  const btn = document.getElementById('contact-submit');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (!data.name || !data.email || !data.message) { showToast('Fill in all required fields.', 'error'); return; }
    btn.disabled = true; btn.textContent = '⏳ Sending…';
    try {
      await api.contact.send(data);
      showToast('Message sent! We will reply within 48h. ✅', 'success');
      form.reset();
    } catch (err) { showToast(err.message || 'Failed. Try again.', 'error'); }
    finally { btn.disabled = false; btn.textContent = '📤 Send Message'; }
  });
}

/* ═══════════════════════════════════════════════════════════════
   DASHBOARD — with full Edit support
   ═══════════════════════════════════════════════════════════════ */

// Track edit state
const editState = { news: null, member: null };

async function initDashboardPage() {
  // Sidebar nav
  const navItems = document.querySelectorAll('.dash-nav__item');
  const panels = document.querySelectorAll('.dash-panel');
  const titleEl = document.getElementById('dash-page-title');
  const subEl = document.querySelector('.dash-header__sub');
  const meta = {
    news: { title: '📰 News Management', sub: 'Manage posts published to the public site' },
    members: { title: '👥 Members Registry', sub: 'Register and manage union members' },
    categories: { title: '🏷 Chapter Management', sub: 'Create and organize forum chapters' },
  };

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(n => { n.classList.remove('is-active'); n.setAttribute('aria-selected', 'false'); });
      panels.forEach(p => p.classList.remove('is-active'));
      item.classList.add('is-active'); item.setAttribute('aria-selected', 'true');
      const tab = item.dataset.tab;
      document.getElementById(`${tab}-panel`)?.classList.add('is-active');
      if (meta[tab] && titleEl) { titleEl.textContent = meta[tab].title; subEl.textContent = meta[tab].sub; }
      closeSidebar();
    });
  });

  // Mobile sidebar
  const menuBtn = document.getElementById('dash-menu-btn');
  const sidebar = document.getElementById('dash-sidebar');
  const overlay = document.getElementById('dash-overlay');
  menuBtn?.addEventListener('click', () => { sidebar.classList.toggle('is-open'); overlay.classList.toggle('is-visible'); });
  overlay?.addEventListener('click', closeSidebar);
  function closeSidebar() { sidebar?.classList.remove('is-open'); overlay?.classList.remove('is-visible'); }

  // File label updates
  ['news-image:news-file-label', 'add-m-image:add-m-file-label', 'add-m-id:add-m-id-label'].forEach(pair => {
    const [inputId, labelId] = pair.split(':');
    setupFileLabel(inputId, labelId);
  });

  // ── NEWS FORM (Create + Edit) ──
  const newsForm = document.getElementById('news-form');
  const newsCancelBtn = document.getElementById('news-cancel');

  newsForm?.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = newsForm.querySelector('[type=submit]');
    btn.disabled = true; btn.textContent = editState.news ? '⏳ Updating…' : '⏳ Publishing…';

    try {
      const fd = new FormData(newsForm);
      if (editState.news) {
        await api.posts.update(editState.news, fd);
        showToast('Post updated!', 'success');
        resetNewsForm();
      } else {
        await api.posts.add(fd);
        showToast('Post published!', 'success');
        newsForm.reset();
        document.getElementById('news-file-label').textContent = 'Attach Image';
      }
      loadDashboardNews();
    } catch (err) { showToast(err.message || 'Failed.', 'error'); }
    finally { btn.disabled = false; btn.textContent = editState.news ? '💾 Update Story' : '📤 Publish to Site'; }
  });

  newsCancelBtn?.addEventListener('click', resetNewsForm);

  function resetNewsForm() {
    editState.news = null;
    newsForm.reset();
    document.getElementById('news-file-label').textContent = 'Attach Image';
    document.getElementById('news-form-heading').textContent = 'Publish New Story';
    newsForm.querySelector('[type=submit]').textContent = '📤 Publish to Site';
    newsCancelBtn?.classList.add('is-hidden');
  }

  // ── MEMBER FORM (Create + Edit) ──
  const memberForm = document.getElementById('add-member-form');
  const memberCancelBtn = document.getElementById('member-cancel');

  memberForm?.addEventListener('submit', async e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('name', document.getElementById('add-m-name').value);
    fd.append('email', document.getElementById('add-m-email').value);
    fd.append('phone', document.getElementById('add-m-phone')?.value || '');
    fd.append('category', document.getElementById('add-m-category').value);
    fd.append('grade', document.getElementById('add-m-grade').value);
    const img = document.getElementById('add-m-image')?.files[0];
    const idImg = document.getElementById('add-m-id')?.files[0];
    if (img) fd.append('image', img);
    if (idImg) fd.append('idImage', idImg);

    const btn = memberForm.querySelector('[type=submit]');
    btn.disabled = true; btn.textContent = editState.member ? '⏳ Updating…' : '⏳ Registering…';

    try {
      if (editState.member) {
        await api.members.update(editState.member, fd);
        showToast('Member updated!', 'success');
        resetMemberForm();
      } else {
        await api.members.add(fd);
        showToast('Member registered!', 'success');
        memberForm.reset();
      }
      loadDashboardMembers();
    } catch (err) { showToast(err.message || 'Failed.', 'error'); }
    finally { btn.disabled = false; btn.textContent = editState.member ? '💾 Update Member' : '➕ Add to Registry'; }
  });

  memberCancelBtn?.addEventListener('click', resetMemberForm);

  function resetMemberForm() {
    editState.member = null;
    memberForm.reset();
    memberForm.querySelector('h2 .d-card__title').textContent = 'Register New Member';
    memberForm.querySelector('[type=submit]').textContent = '➕ Add to Registry';
    memberCancelBtn?.classList.add('is-hidden');
  }

  // ── CATEGORY FORM ──
  document.getElementById('create-cat-form')?.addEventListener('submit', async e => {
    e.preventDefault();
    const input = document.getElementById('cat-input');
    const name = input.value.trim();
    if (!name) return;
    try {
      await api.categories.add(name);
      showToast(`Chapter "${name}" created!`, 'success');
      input.value = '';
      loadDashboardCategories();
    } catch (err) { showToast(err.message, 'error'); }
  });

  await loadDashboardCategories();
  loadDashboardNews();
  loadDashboardMembers();
}

/* ─── Dashboard: News ───────────────────────────────────────── */

async function loadDashboardNews() {
  const tbody = document.getElementById('news-tbody');
  if (!tbody) return;
  tbody.innerHTML = `<tr><td colspan="5" class="d-table__empty"><span class="d-spinner"></span> Loading…</td></tr>`;
  try {
    const posts = await api.posts.list();
    if (!posts.length) { tbody.innerHTML = `<tr><td colspan="5" class="d-table__empty">No posts yet.</td></tr>`; return; }
    tbody.innerHTML = posts.map(s => `
      <tr style="animation:revealUp 0.4s ease forwards;opacity:0">
        <td style="display:flex;align-items:center;gap:0.75rem;min-width:180px">
          ${s.image ? `<img src="${s.image}" style="width:42px;height:42px;border-radius:0.5rem;object-fit:cover;flex-shrink:0">` : `<div style="width:42px;height:42px;border-radius:0.5rem;background:#f1f5f9;display:flex;align-items:center;justify-content:center;font-size:1.25rem;flex-shrink:0">📰</div>`}
          <div><div style="font-weight:600;font-size:0.875rem;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden">${escHTML(s.title)}</div><div style="font-size:0.75rem;color:#94a3b8">${escHTML(s.author)}</div></div>
        </td>
        <td><span class="d-badge">${escHTML(s.category || '—')}</span></td>
        <td style="color:#64748b;font-size:0.8125rem;white-space:nowrap">${s.date}</td>
        <td>
          <button class="d-btn d-btn--outline d-btn--sm" data-edit-post='${escJSON(s)}'>✏️ Edit</button>
        </td>
        <td>
          <button class="d-btn d-btn--danger d-btn--sm" data-delete-post="${s.id}">🗑️</button>
        </td>
      </tr>
    `).join('');

    // Stagger row entrance
    tbody.querySelectorAll('tr').forEach((row, i) => {
      setTimeout(() => { row.style.animationDelay = '0s'; }, i * 40);
    });

    // Edit handlers
    tbody.querySelectorAll('[data-edit-post]').forEach(btn => {
      btn.addEventListener('click', () => {
        const post = JSON.parse(btn.dataset.editPost);
        populateNewsForm(post);
      });
    });

    // Delete handlers
    tbody.querySelectorAll('[data-delete-post]').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('Delete this post?')) return;
        btn.disabled = true;
        try { await api.posts.remove(btn.dataset.deletePost); showToast('Post deleted.', 'success'); loadDashboardNews(); }
        catch (err) { showToast(err.message, 'error'); btn.disabled = false; }
      });
    });
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="5" class="d-table__empty" style="color:#ef4444">⚠ ${escHTML(err.message)}</td></tr>`;
  }
}

function populateNewsForm(post) {
  editState.news = post.id;
  document.getElementById('news-title').value = post.title || '';
  document.getElementById('news-author').value = post.author || '';
  document.getElementById('news-content').value = post.content || '';
  // Set category if possible
  const catSel = document.getElementById('news-category');
  if (catSel) Array.from(catSel.options).forEach(o => { o.selected = o.value === post.category; });

  const heading = document.getElementById('news-form-heading');
  if (heading) heading.textContent = '✏️ Edit Story';
  document.getElementById('news-file-label').textContent = post.image ? '🖼 Image already set' : 'Attach Image';

  const submitBtn = document.getElementById('news-form')?.querySelector('[type=submit]');
  if (submitBtn) submitBtn.textContent = '💾 Update Story';
  document.getElementById('news-cancel')?.classList.remove('is-hidden');

  // Scroll to form
  document.getElementById('news-form')?.closest('.d-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ─── Dashboard: Members ────────────────────────────────────── */

async function loadDashboardMembers() {
  const tbody = document.getElementById('members-tbody');
  if (!tbody) return;
  tbody.innerHTML = `<tr><td colspan="5" class="d-table__empty"><span class="d-spinner"></span> Loading…</td></tr>`;
  try {
    const members = await api.members.list();
    if (!members.length) { tbody.innerHTML = `<tr><td colspan="5" class="d-table__empty">No members registered yet.</td></tr>`; return; }
    tbody.innerHTML = members.map(m => `
      <tr style="animation:revealUp 0.4s ease forwards;opacity:0">
        <td style="display:flex;align-items:center;gap:0.75rem;min-width:180px">
          ${m.image ? `<img src="${m.image}" style="width:38px;height:38px;border-radius:50%;object-fit:cover;flex-shrink:0">` : `<div style="width:38px;height:38px;border-radius:50%;background:#e2e8f0;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.875rem;flex-shrink:0;color:#64748b">${(m.name||'?')[0].toUpperCase()}</div>`}
          <div><div style="font-weight:600;font-size:0.875rem">${escHTML(m.name)}</div><div style="font-size:0.75rem;color:#94a3b8">${escHTML(m.email)}</div></div>
        </td>
        <td><span class="d-badge">${escHTML(m.category || '—')}</span></td>
        <td style="color:#64748b;font-size:0.8125rem">${escHTML(m.grade || '—')}</td>
        <td>
          <button class="d-btn d-btn--outline d-btn--sm" data-edit-member='${escJSON(m)}'>✏️ Edit</button>
        </td>
        <td>
          <button class="d-btn d-btn--danger d-btn--sm" data-delete-member="${m.id}">🗑️</button>
        </td>
      </tr>
    `).join('');

    tbody.querySelectorAll('[data-edit-member]').forEach(btn => {
      btn.addEventListener('click', () => {
        const member = JSON.parse(btn.dataset.editMember);
        populateMemberForm(member);
      });
    });

    tbody.querySelectorAll('[data-delete-member]').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('Remove this member?')) return;
        btn.disabled = true;
        try { await api.members.remove(btn.dataset.deleteMember); showToast('Member removed.', 'success'); loadDashboardMembers(); }
        catch (err) { showToast(err.message, 'error'); btn.disabled = false; }
      });
    });
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="5" class="d-table__empty" style="color:#ef4444">⚠ ${escHTML(err.message)}</td></tr>`;
  }
}

function populateMemberForm(member) {
  editState.member = member.id;
  document.getElementById('add-m-name').value = member.name || '';
  document.getElementById('add-m-email').value = member.email || '';
  document.getElementById('add-m-phone').value = member.phone || '';
  const gradeSel = document.getElementById('add-m-grade');
  if (gradeSel) Array.from(gradeSel.options).forEach(o => { o.selected = o.value === member.grade; });
  const catSel = document.getElementById('add-m-category');
  if (catSel) Array.from(catSel.options).forEach(o => { o.selected = o.value === member.category; });

  const cardTitle = document.querySelector('#members-panel .d-card:first-child .d-card__title');
  if (cardTitle) cardTitle.textContent = '✏️ Edit Member';
  const submitBtn = document.getElementById('add-member-form')?.querySelector('[type=submit]');
  if (submitBtn) submitBtn.textContent = '💾 Update Member';
  document.getElementById('member-cancel')?.classList.remove('is-hidden');

  document.getElementById('add-member-form')?.closest('.d-card')?.scrollIntoView({ behavior:'smooth', block:'start' });
}

/* ─── Dashboard: Categories ─────────────────────────────────── */

async function loadDashboardCategories() {
  const listEl = document.getElementById('cat-list');
  const selNews = document.getElementById('news-category');
  const selMember = document.getElementById('add-m-category');
  try {
    const cats = await api.categories.list();
    if (listEl) {
      listEl.innerHTML = cats.length ? cats.map((c, i) => `
        <div class="cat-item" style="animation:revealUp 0.4s ease ${i * 0.04}s forwards;opacity:0">
          <span style="font-weight:600;font-size:0.9rem">${escHTML(c)}</span>
          <button class="d-btn d-btn--danger d-btn--sm" data-delete-cat="${escHTML(c)}">✕ Remove</button>
        </div>
      `).join('') : '<p style="color:#94a3b8;text-align:center;padding:1rem">No chapters yet. Create one above.</p>';

      listEl.querySelectorAll('[data-delete-cat]').forEach(btn => {
        btn.addEventListener('click', async () => {
          if (!confirm(`Delete chapter "${btn.dataset.deleteCat}"?`)) return;
          btn.disabled = true;
          try { await api.categories.remove(btn.dataset.deleteCat); showToast('Chapter deleted.', 'success'); loadDashboardCategories(); }
          catch (err) { showToast(err.message, 'error'); btn.disabled = false; }
        });
      });
    }
    [selNews, selMember].forEach(sel => {
      if (!sel) return;
      const ph = sel === selMember ? '<option value="">Select chapter…</option>' : '';
      sel.innerHTML = ph + cats.map(c => `<option value="${escHTML(c)}">${escHTML(c)}</option>`).join('');
    });
  } catch (err) { console.error('Categories load failed:', err); }
}

/* ═══════════════════════════════════════════════════════════════
   Shared Helpers
   ═══════════════════════════════════════════════════════════════ */

function escHTML(str) {
  const d = document.createElement('div'); d.textContent = String(str ?? ''); return d.innerHTML;
}
function escJSON(obj) {
  return JSON.stringify(obj).replace(/'/g, '&#39;').replace(/"/g, '&quot;');
}

function newsCardHTML(p) {
  return `
    <article class="news-card" data-post-id="${p.id}" tabindex="0" role="button" aria-label="Read: ${escHTML(p.title)}">
      <div class="news-card__image-wrap">
        <img class="news-card__image" src="${p.image || '/logo.jpg'}" alt="" loading="lazy">
        <div class="news-card__image-overlay"></div>
        <span class="news-card__cat-badge">${escHTML(p.category || 'General')}</span>
      </div>
      <div class="news-card__body">
        <div class="news-card__meta">
          <span class="news-card__date">📅 ${p.date}</span>
          <span class="news-card__author">✍ ${escHTML(p.author)}</span>
        </div>
        <h3 class="news-card__title">${escHTML(p.title)}</h3>
        <p class="news-card__excerpt">${escHTML(p.content)}</p>
        <div class="news-card__read-more">Read Full Story →</div>
      </div>
    </article>
  `;
}

function memberCardHTML(m) {
  const initials = (m.name || '?').split(' ').slice(0,2).map(n => n[0]).join('').toUpperCase();
  return `
    <div class="member-card" data-member-id="${m.id}" tabindex="0" role="button" aria-label="Contact ${escHTML(m.name)}">
      <div class="member-card__avatar-wrap">
        ${m.image
          ? `<img class="member-card__avatar" src="${m.image}" alt="${escHTML(m.name)}" loading="lazy">`
          : `<div class="member-card__avatar member-card__avatar--initials">${initials}</div>`}
      </div>
      <div class="member-card__name">${escHTML(m.name)}</div>
      <div class="member-card__chapter">${escHTML(m.category || 'Member')}</div>
      <div class="member-card__grade">${escHTML(m.grade || '')}</div>
      <div class="member-card__hint">Tap to contact →</div>
    </div>
  `;
}

function attachNewsCards(container, posts) {
  container.querySelectorAll('[data-post-id]').forEach(card => {
    const p = posts.find(x => String(x.id) === card.dataset.postId);
    if (p) card.addEventListener('click', () => openNewsModal(p));
    card.style.cursor = 'pointer';
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') card.click(); });
  });
}

function animateNewCards(container, delay = 60) {
  container.querySelectorAll('.news-card, .member-card, .shimmer-card').forEach((card, i) => {
    card.style.opacity = '0';
    setTimeout(() => { card.style.animation = `revealUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards`; }, i * delay);
  });
}

function shimmerCards(count, type = 'news') {
  return Array.from({ length: count }, (_, i) => `
    <div class="shimmer-card" style="animation-delay:${i * 0.07}s">
      ${type === 'news'
        ? `<div class="shimmer-card__image shimmer-anim"></div>`
        : `<div class="shimmer-card__avatar shimmer-anim" style="margin:1.5rem auto 1rem"></div>`}
      <div class="shimmer-card__body">
        <div class="shimmer-line shimmer-anim" style="width:35%"></div>
        <div class="shimmer-line shimmer-anim" style="width:88%;height:1.1rem"></div>
        <div class="shimmer-line shimmer-anim" style="width:70%"></div>
        <div class="shimmer-line shimmer-anim" style="width:55%"></div>
      </div>
    </div>
  `).join('');
}

function emptyState(msg) {
  return `<div class="state-msg" style="grid-column:1/-1">🕊️ ${escHTML(msg)}</div>`;
}
function errorState(msg) {
  return `<div class="state-msg state-msg--error" style="grid-column:1/-1">⚠ ${escHTML(msg)}</div>`;
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const colors = { success: '#10b981', error: '#ef4444', info: 'var(--accent)' };
  const icons = { success: '✅', error: '⚠️', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.borderLeft = `4px solid ${colors[type] || colors.info}`;
  toast.innerHTML = `${icons[type] || icons.info} ${escHTML(message)}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = 'all 0.35s ease';
    toast.style.opacity = '0'; toast.style.transform = 'translateY(4px)';
    setTimeout(() => toast.remove(), 360);
  }, 4500);
}

function setupFileLabel(inputId, labelId) {
  const input = document.getElementById(inputId);
  const label = document.getElementById(labelId);
  if (!input || !label) return;
  input.addEventListener('change', () => {
    label.textContent = input.files[0]?.name || label.dataset.default || 'Select file';
  });
}
