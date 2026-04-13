/**
 * ═══════════════════════════════════════════════════════════════
 *  SPF Motion v2 — Framer Motion-style whileInView engine
 *  Web Animations API + IntersectionObserver
 *  18 animation variants · Spring physics · Stagger · Directional
 *
 *  Attributes (all optional except data-motion):
 *    data-motion="fadeUp|fadeDown|fadeLeft|fadeRight|
 *                 scaleUp|scaleDown|pop|blur|blurLeft|blurRight|
 *                 slideLeft|slideRight|slideUp|slideDown|
 *                 rotateIn|flipX|flipY|zoomRotate"
 *    data-motion-delay="0.1"       seconds (float)
 *    data-motion-duration="0.8"    seconds (float)
 *    data-motion-stagger="0.09"    children stagger gap (seconds)
 *    data-motion-once="false"      replay every time
 *    data-motion-threshold="0.12"  IO threshold override
 * ═══════════════════════════════════════════════════════════════
 */

/* ── Easing presets ──────────────────────────────────────────── */
const E = {
  spring:  'cubic-bezier(0.34, 1.56, 0.64, 1)',   // bouncy spring
  smooth:  'cubic-bezier(0.16, 1.00, 0.30, 1)',   // smooth snap
  expo:    'cubic-bezier(0.19, 1.00, 0.22, 1)',   // expo ease-out
  back:    'cubic-bezier(0.34, 1.40, 0.64, 1)',   // overshoot
  power:   'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // power2 easeOut
};

/* ── Default timing ──────────────────────────────────────────── */
const DEF_DUR   = 0.78;
const DEF_DELAY = 0;

/* ── Variant definitions ─────────────────────────────────────── */
// Each variant is an array of keyframes (Web Animations API format)
// plus a default easing

const VARIANTS = {
  /* ─ Fade from directions ─────────────────────────────────── */
  fadeUp: {
    frames: [
      { opacity: 0, transform: 'translateY(40px)' },
      { opacity: 1, transform: 'translateY(0px)'  },
    ],
    easing: E.smooth,
  },
  fadeDown: {
    frames: [
      { opacity: 0, transform: 'translateY(-40px)' },
      { opacity: 1, transform: 'translateY(0px)'   },
    ],
    easing: E.smooth,
  },
  fadeLeft: {
    frames: [
      { opacity: 0, transform: 'translateX(60px)' },
      { opacity: 1, transform: 'translateX(0px)'  },
    ],
    easing: E.expo,
  },
  fadeRight: {
    frames: [
      { opacity: 0, transform: 'translateX(-60px)' },
      { opacity: 1, transform: 'translateX(0px)'   },
    ],
    easing: E.expo,
  },

  /* ─ Scale variants ───────────────────────────────────────── */
  scaleUp: {
    frames: [
      { opacity: 0, transform: 'scale(0.80) translateY(20px)' },
      { opacity: 1, transform: 'scale(1.00) translateY(0px)'  },
    ],
    easing: E.spring,
  },
  scaleDown: {
    frames: [
      { opacity: 0, transform: 'scale(1.18)' },
      { opacity: 1, transform: 'scale(1.00)' },
    ],
    easing: E.smooth,
  },
  pop: {
    frames: [
      { opacity: 0, transform: 'scale(0.65)'  },
      { opacity: 1, transform: 'scale(1.06)'  },
      { opacity: 1, transform: 'scale(0.97)'  },
      { opacity: 1, transform: 'scale(1.00)'  },
    ],
    easing: E.spring,
  },

  /* ─ Blur variants ────────────────────────────────────────── */
  blur: {
    frames: [
      { opacity: 0, filter: 'blur(14px)', transform: 'translateY(24px)' },
      { opacity: 1, filter: 'blur(0px)',  transform: 'translateY(0px)'  },
    ],
    easing: E.smooth,
  },
  blurLeft: {
    frames: [
      { opacity: 0, filter: 'blur(10px)', transform: 'translateX(50px)' },
      { opacity: 1, filter: 'blur(0px)',  transform: 'translateX(0px)'  },
    ],
    easing: E.expo,
  },
  blurRight: {
    frames: [
      { opacity: 0, filter: 'blur(10px)', transform: 'translateX(-50px)' },
      { opacity: 1, filter: 'blur(0px)',  transform: 'translateX(0px)'   },
    ],
    easing: E.expo,
  },

  /* ─ Slide variants ───────────────────────────────────────── */
  slideLeft: {
    frames: [
      { opacity: 0, transform: 'translateX(80px) scaleX(0.95)' },
      { opacity: 1, transform: 'translateX(0px)  scaleX(1.00)' },
    ],
    easing: E.expo,
  },
  slideRight: {
    frames: [
      { opacity: 0, transform: 'translateX(-80px) scaleX(0.95)' },
      { opacity: 1, transform: 'translateX(0px)   scaleX(1.00)' },
    ],
    easing: E.expo,
  },
  slideUp: {
    frames: [
      { opacity: 0, transform: 'translateY(60px) scaleY(0.92)' },
      { opacity: 1, transform: 'translateY(0px)  scaleY(1.00)' },
    ],
    easing: E.spring,
  },
  slideDown: {
    frames: [
      { opacity: 0, transform: 'translateY(-60px) scaleY(0.92)' },
      { opacity: 1, transform: 'translateY(0px)   scaleY(1.00)' },
    ],
    easing: E.spring,
  },

  /* ─ Rotate + Flip ────────────────────────────────────────── */
  rotateIn: {
    frames: [
      { opacity: 0, transform: 'rotate(-8deg) translateY(32px) scale(0.9)' },
      { opacity: 1, transform: 'rotate( 1deg) translateY(-4px) scale(1.01)' },
      { opacity: 1, transform: 'rotate( 0deg) translateY(0px)  scale(1.00)' },
    ],
    easing: E.spring,
  },
  flipX: {
    frames: [
      { opacity: 0, transform: 'perspective(600px) rotateX(35deg) translateY(30px)' },
      { opacity: 1, transform: 'perspective(600px) rotateX(0deg)  translateY(0px)'  },
    ],
    easing: E.expo,
  },
  flipY: {
    frames: [
      { opacity: 0, transform: 'perspective(600px) rotateY(45deg) translateX(30px)' },
      { opacity: 1, transform: 'perspective(600px) rotateY(0deg)  translateX(0px)'  },
    ],
    easing: E.expo,
  },
  zoomRotate: {
    frames: [
      { opacity: 0, transform: 'scale(0.7) rotate(-12deg)' },
      { opacity: 1, transform: 'scale(1.0) rotate(0deg)'   },
    ],
    easing: E.back,
  },
};

/* ── Hidden state per variant ────────────────────────────────── */
function getHiddenStyle(variant) {
  const v = VARIANTS[variant];
  if (!v) return { opacity: '0' };
  const first = v.frames[0];
  const style = {};
  if (first.opacity  !== undefined) style.opacity   = String(first.opacity);
  if (first.transform !== undefined) style.transform = first.transform;
  if (first.filter    !== undefined) style.filter    = first.filter;
  return style;
}

function applyHidden(el, variant) {
  const s = getHiddenStyle(variant || 'fadeUp');
  Object.assign(el.style, s);
}

/* ── Run animation using WAAPI ───────────────────────────────── */
function runAnimation(el, variant, delay, duration) {
  const v = VARIANTS[variant] || VARIANTS.fadeUp;
  return el.animate(v.frames, {
    duration:  duration * 1000,
    delay:     delay    * 1000,
    easing:    v.easing,
    fill:      'forwards',
    composite: 'replace',
  });
}

/* ── Main init ───────────────────────────────────────────────── */
export function initMotion() {
  // Honor prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('[data-motion]').forEach(el => {
      el.style.opacity  = '1';
      el.style.transform = 'none';
      el.style.filter    = 'none';
    });
    return;
  }

  /**
   * @type {Map<Element, {
   *   variant: string, delay: number, duration: number,
   *   once: boolean, stagger: number, threshold: number,
   *   isStaggerParent: boolean
   * }>}
   */
  const registry = new Map();

  /* ── Register all [data-motion] elements ─────────────────── */
  document.querySelectorAll('[data-motion]').forEach(el => {
    const variant   = el.dataset.motion         || 'fadeUp';
    const delay     = parseFloat(el.dataset.motionDelay     || DEF_DELAY);
    const duration  = parseFloat(el.dataset.motionDuration  || DEF_DUR);
    const once      = el.dataset.motionOnce !== 'true'; // default: replay every entry
    const stagger   = parseFloat(el.dataset.motionStagger   || '0');
    const threshold = parseFloat(el.dataset.motionThreshold || '0.10');

    registry.set(el, { variant, delay, duration, once, stagger, threshold, isStaggerParent: stagger > 0 });

    // Pre-hide the element
    applyHidden(el, variant);

    // Pre-hide stagger children too
    if (stagger > 0) {
      Array.from(el.children).forEach(child => {
        if (!child.dataset.motion) applyHidden(child, variant);
      });
    }
  });

  /* ── Group by threshold for efficient observation ─────────── */
  const thresholdGroups = new Map();
  registry.forEach((cfg, el) => {
    const t = cfg.threshold;
    if (!thresholdGroups.has(t)) thresholdGroups.set(t, []);
    thresholdGroups.get(t).push(el);
  });

  /* ── Create one IntersectionObserver per unique threshold ─── */
  thresholdGroups.forEach((els, threshold) => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el  = entry.target;
        const cfg = registry.get(el);
        if (!cfg) return;

        if (entry.isIntersecting) {
          /* Animate the parent element */
          runAnimation(el, cfg.variant, cfg.delay, cfg.duration);

          /* Animate stagger children */
          if (cfg.isStaggerParent) {
            Array.from(el.children).forEach((child, i) => {
              if (!child.dataset.motion) {
                runAnimation(child, cfg.variant, cfg.delay + i * cfg.stagger, cfg.duration);
              }
            });
          }

          if (cfg.once) obs.unobserve(el);

        } else if (!cfg.once) {
          /* Re-hide on scroll past when once=false */
          applyHidden(el, cfg.variant);
          if (cfg.isStaggerParent) {
            Array.from(el.children).forEach(child => {
              if (!child.dataset.motion) applyHidden(child, cfg.variant);
            });
          }
        }
      });
    }, {
      threshold,
      rootMargin: '0px 0px -40px 0px',
    });

    els.forEach(el => obs.observe(el));
  });
}

/* ── Imperative animate — for dynamically injected elements ─── */
export function motionAnimate(el, variant = 'fadeUp', delay = 0, duration = DEF_DUR) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.style.opacity = '1';
    el.style.transform = 'none';
    return;
  }
  applyHidden(el, variant);
  // Small rAF to ensure the hidden state is painted first
  requestAnimationFrame(() => {
    requestAnimationFrame(() => runAnimation(el, variant, delay, duration));
  });
}

/* ── Export variant list for external reference ──────────────── */
export const motionVariants = Object.keys(VARIANTS);
