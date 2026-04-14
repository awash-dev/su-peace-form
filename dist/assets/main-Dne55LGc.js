(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const K="https://su-peace-form-backend.vercel.app",$=new Map,J=3e4;async function y(e,a={},t={}){const n=`${K}${e}`,s=`${a.method??"GET"}:${n}`,r=t.cache!==!1&&(!a.method||a.method==="GET");if(r){const d=$.get(s);if(d&&Date.now()-d.ts<(t.cacheTTL??J))return d.data}const o={...a.headers};!(a.body instanceof FormData)&&!o["Content-Type"]&&(o["Content-Type"]="application/json");const c=await fetch(n,{...a,headers:o});if(!c.ok){let d=`HTTP ${c.status}`;try{const u=await c.json();d=u.error||u.message||d}catch{}const l=new Error(d);throw l.status=c.status,l}const i=c.status===204?null:await c.json();return r&&$.set(s,{data:i,ts:Date.now()}),i}function v(e=""){for(const a of $.keys())a.includes(e)&&$.delete(a)}const V={list:()=>y("/api/categories",{},{cache:!0}),add:e=>(v("/api/categories"),y("/api/categories",{method:"POST",body:JSON.stringify({name:e})})),update:(e,a)=>(v("/api/categories"),y(`/api/categories/${encodeURIComponent(e)}`,{method:"PUT",body:JSON.stringify({newName:a})})),remove:e=>(v("/api/categories"),y(`/api/categories/${encodeURIComponent(e)}`,{method:"DELETE"}))},W={list:()=>y("/api/members",{},{cache:!0}),add:e=>(v("/api/members"),y("/api/members",{method:"POST",body:e,headers:{}})),update:(e,a)=>(v("/api/members"),y(`/api/members/${e}`,{method:"PUT",body:a,headers:{}})),remove:e=>(v("/api/members"),y(`/api/members/${e}`,{method:"DELETE"}))},Q={list:()=>y("/api/posts",{},{cache:!0}),add:e=>(v("/api/posts"),y("/api/posts",{method:"POST",body:e,headers:{}})),update:(e,a)=>(v("/api/posts"),y(`/api/posts/${e}`,{method:"PUT",body:a,headers:{}})),remove:e=>(v("/api/posts"),y(`/api/posts/${e}`,{method:"DELETE"}))},Z={send:e=>y("/api/contact",{method:"POST",body:JSON.stringify(e)})},ee={check:()=>y("/api/health",{},{cacheTTL:5e3})},g={categories:V,members:W,posts:Q,contact:Z,health:ee},p={spring:"cubic-bezier(0.34, 1.56, 0.64, 1)",smooth:"cubic-bezier(0.16, 1.00, 0.30, 1)",expo:"cubic-bezier(0.19, 1.00, 0.22, 1)",back:"cubic-bezier(0.34, 1.40, 0.64, 1)"},Y=.78,te=0,k={fadeUp:{frames:[{opacity:0,transform:"translateY(40px)"},{opacity:1,transform:"translateY(0px)"}],easing:p.smooth},fadeDown:{frames:[{opacity:0,transform:"translateY(-40px)"},{opacity:1,transform:"translateY(0px)"}],easing:p.smooth},fadeLeft:{frames:[{opacity:0,transform:"translateX(60px)"},{opacity:1,transform:"translateX(0px)"}],easing:p.expo},fadeRight:{frames:[{opacity:0,transform:"translateX(-60px)"},{opacity:1,transform:"translateX(0px)"}],easing:p.expo},scaleUp:{frames:[{opacity:0,transform:"scale(0.80) translateY(20px)"},{opacity:1,transform:"scale(1.00) translateY(0px)"}],easing:p.spring},scaleDown:{frames:[{opacity:0,transform:"scale(1.18)"},{opacity:1,transform:"scale(1.00)"}],easing:p.smooth},pop:{frames:[{opacity:0,transform:"scale(0.65)"},{opacity:1,transform:"scale(1.06)"},{opacity:1,transform:"scale(0.97)"},{opacity:1,transform:"scale(1.00)"}],easing:p.spring},blur:{frames:[{opacity:0,filter:"blur(14px)",transform:"translateY(24px)"},{opacity:1,filter:"blur(0px)",transform:"translateY(0px)"}],easing:p.smooth},blurLeft:{frames:[{opacity:0,filter:"blur(10px)",transform:"translateX(50px)"},{opacity:1,filter:"blur(0px)",transform:"translateX(0px)"}],easing:p.expo},blurRight:{frames:[{opacity:0,filter:"blur(10px)",transform:"translateX(-50px)"},{opacity:1,filter:"blur(0px)",transform:"translateX(0px)"}],easing:p.expo},slideLeft:{frames:[{opacity:0,transform:"translateX(80px) scaleX(0.95)"},{opacity:1,transform:"translateX(0px)  scaleX(1.00)"}],easing:p.expo},slideRight:{frames:[{opacity:0,transform:"translateX(-80px) scaleX(0.95)"},{opacity:1,transform:"translateX(0px)   scaleX(1.00)"}],easing:p.expo},slideUp:{frames:[{opacity:0,transform:"translateY(60px) scaleY(0.92)"},{opacity:1,transform:"translateY(0px)  scaleY(1.00)"}],easing:p.spring},slideDown:{frames:[{opacity:0,transform:"translateY(-60px) scaleY(0.92)"},{opacity:1,transform:"translateY(0px)   scaleY(1.00)"}],easing:p.spring},rotateIn:{frames:[{opacity:0,transform:"rotate(-8deg) translateY(32px) scale(0.9)"},{opacity:1,transform:"rotate( 1deg) translateY(-4px) scale(1.01)"},{opacity:1,transform:"rotate( 0deg) translateY(0px)  scale(1.00)"}],easing:p.spring},flipX:{frames:[{opacity:0,transform:"perspective(600px) rotateX(35deg) translateY(30px)"},{opacity:1,transform:"perspective(600px) rotateX(0deg)  translateY(0px)"}],easing:p.expo},flipY:{frames:[{opacity:0,transform:"perspective(600px) rotateY(45deg) translateX(30px)"},{opacity:1,transform:"perspective(600px) rotateY(0deg)  translateX(0px)"}],easing:p.expo},zoomRotate:{frames:[{opacity:0,transform:"scale(0.7) rotate(-12deg)"},{opacity:1,transform:"scale(1.0) rotate(0deg)"}],easing:p.back}};function ae(e){const a=k[e];if(!a)return{opacity:"0"};const t=a.frames[0],n={};return t.opacity!==void 0&&(n.opacity=String(t.opacity)),t.transform!==void 0&&(n.transform=t.transform),t.filter!==void 0&&(n.filter=t.filter),n}function x(e,a){const t=ae(a||"fadeUp");Object.assign(e.style,t)}function M(e,a,t,n){const s=k[a]||k.fadeUp;return e.animate(s.frames,{duration:n*1e3,delay:t*1e3,easing:s.easing,fill:"forwards",composite:"replace"})}function ne(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){document.querySelectorAll("[data-motion]").forEach(t=>{t.style.opacity="1",t.style.transform="none",t.style.filter="none"});return}const e=new Map;document.querySelectorAll("[data-motion]").forEach(t=>{const n=t.dataset.motion||"fadeUp",s=parseFloat(t.dataset.motionDelay||te),r=parseFloat(t.dataset.motionDuration||Y),o=t.dataset.motionOnce!=="true",c=parseFloat(t.dataset.motionStagger||"0"),i=parseFloat(t.dataset.motionThreshold||"0.10");e.set(t,{variant:n,delay:s,duration:r,once:o,stagger:c,threshold:i,isStaggerParent:c>0}),x(t,n),c>0&&Array.from(t.children).forEach(d=>{d.dataset.motion||x(d,n)})});const a=new Map;e.forEach((t,n)=>{const s=t.threshold;a.has(s)||a.set(s,[]),a.get(s).push(n)}),a.forEach((t,n)=>{const s=new IntersectionObserver(r=>{r.forEach(o=>{const c=o.target,i=e.get(c);i&&(o.isIntersecting?(M(c,i.variant,i.delay,i.duration),i.isStaggerParent&&Array.from(c.children).forEach((d,l)=>{d.dataset.motion||M(d,i.variant,i.delay+l*i.stagger,i.duration)}),i.once&&s.unobserve(c)):i.once||(x(c,i.variant),i.isStaggerParent&&Array.from(c.children).forEach(d=>{d.dataset.motion||x(d,i.variant)})))})},{threshold:n,rootMargin:"0px 0px -40px 0px"});t.forEach(r=>s.observe(r))})}function T(e,a="fadeUp",t=0,n=Y){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){e.style.opacity="1",e.style.transform="none";return}x(e,a),requestAnimationFrame(()=>{requestAnimationFrame(()=>M(e,a,t,n))})}const L={reveal:null,stagger:null,section:null,lazy:null},h={news:null,member:null};document.addEventListener("DOMContentLoaded",()=>{const e=document.body.dataset.page;if(e==="dashboard"){D(),we();return}D(),ie(),ce(),le(),ne(),me(),ue(),oe(),pe(),re(),de(),e==="home"&&ye(),e==="news"&&he(),e==="unions"&&ve(),e==="contact"&&_e()});window.addEventListener("beforeunload",se);function se(){Object.values(L).forEach(e=>e==null?void 0:e.disconnect()),document.querySelectorAll("[data-reveal], [data-stagger]").forEach(e=>{e.style.animation=""})}function re(){document.querySelector("main")}function D(){const e=document.getElementById("preloader");e&&window.addEventListener("load",()=>{setTimeout(()=>{e.classList.add("preloader--hidden"),setTimeout(()=>e.remove(),600)},400)})}function oe(){const e=document.getElementById("page-progress");if(!e)return;const a=()=>{const t=document.documentElement.scrollHeight-window.innerHeight;e.style.width=`${Math.min(window.scrollY/t*100,100)}%`};window.addEventListener("scroll",a,{passive:!0})}function ie(){const e=document.getElementById("navbar");if(!e)return;const a=[{href:"/",label:"Home"},{href:"/news.html",label:"News"},{href:"/mission.html",label:"Mission"},{href:"/resources.html",label:"Resources"},{href:"/unions.html",label:"Members"},{href:"/contact.html",label:"Contact"}],t=location.pathname,n=l=>{const u=t==="/"||t.endsWith("index.html")?"/":t;return l==="/"?u==="/":u.endsWith(l)||u.includes(l.replace(".html",""))};e.innerHTML=`
    <div class="container navbar__inner">
      <a href="/" class="navbar__brand" aria-label="SPF Home">
        <img src="/logo.jpg" alt="" class="navbar__brand-img" width="40" height="40">
        <div class="navbar__brand-text">
          <span class="brand-title">Peace Forum Union</span>
          <span class="brand-sub">Samara University</span>
        </div>
      </a>

      <nav class="navbar__nav" aria-label="Desktop navigation">
        <ul class="navbar__list">
          ${a.map(l=>`
            <li>
              <a href="${l.href}" class="navbar__link${n(l.href)?" navbar__link--active":""}" 
                 ${n(l.href)?'aria-current="page"':""}>
                ${l.label}
              </a>
            </li>
          `).join("")}
        </ul>
      </nav>

      <div class="navbar__actions">
        <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
          <svg class="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          <svg class="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>

        <button class="navbar__menu-btn" id="menu-btn" aria-label="Toggle mobile menu" aria-expanded="false" aria-controls="mobile-menu">
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
      </div>
    </div>
  `;let s=document.getElementById("mobile-menu");s||(s=document.createElement("div"),s.id="mobile-menu",s.className="mobile-menu",s.innerHTML=`
      <div class="mobile-menu__backdrop" data-close></div>
      <div class="mobile-menu__inner">
        <nav class="mobile-menu__nav" aria-label="Mobile navigation">
          <ul class="mobile-menu__list">
            ${a.map(l=>`
              <li>
                <a href="${l.href}" class="mobile-menu__link${n(l.href)?" mobile-menu__link--active":""}"
                   ${n(l.href)?'aria-current="page"':""}>
                  ${l.label}
                </a>
              </li>
            `).join("")}
          </ul>
        </nav>
        <div class="mobile-menu__footer">
          <a href="/contact.html" class="btn btn--primary btn--full">✉ Get Involved</a>
          <div class="mobile-menu__social">
             <a href="https://t.me/SUPEACEFORUMUNION" class="btn btn--secondary btn--full btn--sm">Telegram</a>
          </div>
        </div>
      </div>
    `,document.body.appendChild(s));const r=document.getElementById("menu-btn"),o=document.getElementById("theme-toggle"),c=()=>{const u=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",u),localStorage.setItem("spf-theme",u)};o==null||o.addEventListener("click",c);const i=l=>{const u=typeof l=="boolean"?l:!s.classList.contains("is-open");s.classList.toggle("is-open",u),r.classList.toggle("is-active",u),r.setAttribute("aria-expanded",u),document.documentElement.classList.toggle("lock-scroll",u),u?setTimeout(()=>{var b;(b=s.querySelector(".mobile-menu__link"))==null||b.focus()},300):r.focus()};r==null||r.addEventListener("click",()=>i()),s.querySelectorAll("[data-close]").forEach(l=>{l.addEventListener("click",()=>i(!1))}),s.querySelectorAll(".mobile-menu__link").forEach(l=>{l.addEventListener("click",()=>i(!1))}),window.addEventListener("keydown",l=>{l.key==="Escape"&&s.classList.contains("is-open")&&i(!1)});let d=0;window.addEventListener("scroll",()=>{if(s.classList.contains("is-open"))return;const l=window.scrollY;e.classList.toggle("navbar--scrolled",l>20),l>400&&l>d?e.style.transform="translateY(-100%)":e.style.transform="translateY(0)",d=l},{passive:!0})}function ce(){const e=document.getElementById("footer");e&&(e.innerHTML=`
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
  `)}function le(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){document.querySelectorAll("[data-reveal],[data-stagger]").forEach(c=>{c.style.opacity="1"}),document.querySelectorAll("[data-stagger] > *").forEach(c=>{c.style.opacity="1"});return}const e="cubic-bezier(0.16,1,0.3,1)",a="0.85s",t={"":`revealUp ${a} ${e} forwards`,right:`revealRight ${a} ${e} forwards`,left:`revealLeft ${a} ${e} forwards`,scale:`revealScale ${a} ${e} forwards`,fade:`revealFade ${a} ${e} forwards`},n=new IntersectionObserver(c=>{c.forEach(i=>{if(!i.isIntersecting)return;const d=i.target,l=d.dataset.reveal??"";d.style.animation=t[l]||t[""],n.unobserve(d)})},{threshold:.06,rootMargin:"0px 0px -40px 0px"});document.querySelectorAll("[data-reveal]").forEach(c=>n.observe(c));const s=new IntersectionObserver(c=>{c.forEach(i=>{if(!i.isIntersecting)return;Array.from(i.target.children).forEach((l,u)=>{setTimeout(()=>{l.style.animation=`revealUp 0.7s ${e} forwards`},u*80)}),s.unobserve(i.target)})},{threshold:.04,rootMargin:"0px 0px -30px 0px"});document.querySelectorAll("[data-stagger]").forEach(c=>s.observe(c));const r=document.querySelectorAll(".section, .section--subtle"),o=new IntersectionObserver(c=>{c.forEach(i=>{i.target.style.transition="opacity 0.6s ease",i.target.style.opacity=i.isIntersecting?"1":"0.6"})},{threshold:.1});r.forEach(c=>o.observe(c)),L.reveal=n,L.stagger=s,L.section=o}function de(){if("loading"in HTMLImageElement.prototype)return;const e=new IntersectionObserver(a=>{a.forEach(t=>{if(!t.isIntersecting)return;const n=t.target;n.dataset.src&&(n.src=n.dataset.src,n.removeAttribute("data-src")),e.unobserve(n)})},{rootMargin:"50px"});document.querySelectorAll("img[data-src]").forEach(a=>e.observe(a)),L.lazy=e}function me(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=document.querySelector(".hero__image img"),a=document.querySelectorAll(".page-hero__orb");if(!e&&!a.length)return;let t=!1;window.addEventListener("scroll",()=>{t||(requestAnimationFrame(()=>{const n=window.scrollY;e&&(e.style.transform=`translateY(${n*.08}px) scale(1.02)`),a.forEach((s,r)=>{s.style.transform=`translateY(${n*(r===0?.07:-.04)}px)`}),t=!1}),t=!0)},{passive:!0})}function ue(){const e=new IntersectionObserver(a=>{a.forEach(t=>{if(!t.isIntersecting)return;const n=t.target;fe(n,0,+n.dataset.count,2200,n.dataset.suffix||""),e.unobserve(n)})},{threshold:.5});document.querySelectorAll("[data-count]").forEach(a=>e.observe(a))}function fe(e,a,t,n,s){let r;const o=c=>{r||(r=c);const i=Math.min((c-r)/n,1),d=1-Math.pow(1-i,4);e.textContent=Math.floor(d*(t-a)+a).toLocaleString()+s,i<1&&requestAnimationFrame(o)};requestAnimationFrame(o)}let _,w;function pe(){_=N("news-modal","spf-modal__box--article"),w=N("member-modal","spf-modal__box--member"),_.backdrop.addEventListener("click",I),_.close.addEventListener("click",I),w.backdrop.addEventListener("click",S),w.close.addEventListener("click",S),document.addEventListener("keydown",e=>{e.key==="Escape"&&(I(),S())})}function N(e,a){const t=document.createElement("div");t.className="spf-modal",t.id=e,t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true");const n=document.createElement("div");n.className="spf-modal__backdrop";const s=document.createElement("div");s.className=`spf-modal__box ${a}`;const r=document.createElement("button");r.className="spf-modal__close",r.textContent="✕",r.setAttribute("aria-label","Close");const o=document.createElement("div");return o.className="spf-modal__body",s.append(r,o),t.append(n,s),document.body.appendChild(t),{wrap:t,backdrop:n,box:s,close:r,body:o}}function ge(e){const a=window.scrollY;document.body.style.position="fixed",document.body.style.top=`-${a}px`,document.body.style.width="100%",_.body.innerHTML=`
    ${e.image?`<div class="nmd-hero"><img src="${e.image}" alt="" class="nmd-hero__img" loading="lazy"><div class="nmd-hero__overlay"></div></div>`:""}
    <div class="nmd-content">
      <div class="nmd-meta">
        <span class="nmd-cat">${m(e.category||"General")}</span>
        <span class="nmd-date">📅 ${e.date}</span>
      </div>
      <h2 class="nmd-title">${m(e.title)}</h2>
      <div class="nmd-author">
        <div class="nmd-author__avatar">${(e.author||"A")[0].toUpperCase()}</div>
        <div>
          <div class="nmd-author__name">${m(e.author)}</div>
          <div class="nmd-author__role">Contributor</div>
        </div>
      </div>
      <div class="nmd-divider"></div>
      <div class="nmd-body">${m(e.content).replace(/\n/g,"<br>")}</div>
      <div class="nmd-actions">
        <a href="https://t.me/SUPEACEFORUMUNION" target="_blank" rel="noopener noreferrer" class="nmd-btn nmd-btn--tg">🔵 Share on Telegram</a>
      </div>
    </div>
  `,_.wrap.classList.add("is-open"),requestAnimationFrame(()=>{_.body.scrollTop=0,setTimeout(()=>_.close.focus(),50)})}function I(){const e=document.body.style.top;document.body.style.position="",document.body.style.top="",document.body.style.width="",window.scrollTo(0,parseInt(e||"0")*-1),_.wrap.classList.remove("is-open")}function be(e){const a=window.scrollY;document.body.style.position="fixed",document.body.style.top=`-${a}px`,document.body.style.width="100%";const t=(e.name||"?").split(" ").slice(0,2).map(n=>n[0]).join("").toUpperCase();w.body.innerHTML=`
    <div class="mmd-profile">
      ${e.image?`<img src="${e.image}" alt="${m(e.name)}" class="mmd-avatar">`:`<div class="mmd-avatar mmd-avatar--initials">${t}</div>`}
      <div class="mmd-badge">${m(e.category||"Member")}</div>
      <h2 class="mmd-name">${m(e.name)}</h2>
      <div class="mmd-grade">📚 ${m(e.grade||"Student")}</div>
    </div>
    <div class="mmd-contacts">
      ${e.email?`<a href="mailto:${m(e.email)}" class="mmd-contact-btn"><span class="mmd-contact-btn__icon">📧</span><div><div class="mmd-contact-btn__label">Email</div><div class="mmd-contact-btn__value">${m(e.email)}</div></div></a>`:""}
      ${e.phone?`<a href="tel:${m(e.phone)}" class="mmd-contact-btn"><span class="mmd-contact-btn__icon">📞</span><div><div class="mmd-contact-btn__label">Call</div><div class="mmd-contact-btn__value">${m(e.phone)}</div></div></a>`:""}
      ${!e.email&&!e.phone?'<p style="color:#94a3b8;text-align:center;padding:1rem">No contact info provided.</p>':""}
    </div>
    <p style="text-align:center;padding-bottom:1.25rem;font-size:0.75rem;color:#94a3b8">Member since ${e.joinedDate||"N/A"}</p>
  `,w.wrap.classList.add("is-open"),requestAnimationFrame(()=>w.body.scrollTop=0)}function S(){const e=document.body.style.top;document.body.style.position="",document.body.style.top="",document.body.style.width="",window.scrollTo(0,parseInt(e||"0")*-1),w.wrap.classList.remove("is-open")}async function ye(){const e=document.getElementById("latest-news-grid");if(e){e.innerHTML=F(3);try{const a=await g.posts.list();if(!a.length){e.innerHTML=U("No stories published yet.");return}e.innerHTML=a.slice(0,3).map(t=>R(t)).join(""),z(e,a.slice(0,3)),Fe(e),e.querySelectorAll(".news-card").forEach((t,n)=>{const s=["slideRight","slideUp","slideLeft"][n%3];T(t,s,n*.1,.75)})}catch{e.innerHTML=P("Could not load news.")}}}async function he(){const e=document.getElementById("news-grid"),a=document.getElementById("news-filter-bar");if(e){e.innerHTML=F(6);try{let r=function(o){if(!o.length){e.innerHTML=U("No stories in this category.");return}e.innerHTML=o.map(c=>R(c)).join(""),z(e,o),e.querySelectorAll(".news-card").forEach((c,i)=>{const d=i%2===0?"blurRight":"blurLeft";T(c,d,i*.09,.75)})};var t=r;const n=await g.posts.list(),s=[...new Set(n.map(o=>o.category).filter(Boolean))];a&&(a.innerHTML='<button class="filter-btn is-active" data-filter="All">All</button>'+s.map(o=>`<button class="filter-btn" data-filter="${m(o)}">${m(o)}</button>`).join(""),a.addEventListener("click",o=>{const c=o.target.closest(".filter-btn");if(!c)return;a.querySelectorAll(".filter-btn").forEach(d=>d.classList.remove("is-active")),c.classList.add("is-active");const i=c.dataset.filter;r(i==="All"?n:n.filter(d=>d.category===i))})),r(n)}catch{e.innerHTML=P("Failed to load news.")}}}async function ve(){const e=document.getElementById("members-grid"),a=document.getElementById("unions-filter-bar"),t=document.getElementById("members-search");if(e){e.innerHTML=F(8,"member");try{let c=function(){const i=((t==null?void 0:t.value)||"").toLowerCase();let d=o==="All Divisions"?s:s.filter(l=>l.category===o);if(i&&(d=d.filter(l=>l.name.toLowerCase().includes(i)||(l.email||"").toLowerCase().includes(i)||(l.category||"").toLowerCase().includes(i))),!d.length){e.innerHTML=U("No members found.");return}e.innerHTML=d.map(l=>qe(l)).join(""),e.querySelectorAll("[data-member-id]").forEach((l,u)=>{const b=d.find(G=>String(G.id)===l.dataset.memberId);l.addEventListener("click",()=>{b&&be(b)}),l.style.cursor="pointer";const X=["slideRight","slideUp","slideLeft","scaleUp"][u%4];T(l,X,u*.055,.72)})};var n=c;const s=await g.members.list(),r=[...new Set(s.map(i=>i.category).filter(Boolean))];let o="All Divisions";a&&(a.innerHTML='<button class="filter-btn is-active" data-filter="All Divisions">All Divisions</button>'+r.map(i=>`<button class="filter-btn" data-filter="${m(i)}">${m(i)}</button>`).join(""),a.addEventListener("click",i=>{const d=i.target.closest(".filter-btn");d&&(a.querySelectorAll(".filter-btn").forEach(l=>l.classList.remove("is-active")),d.classList.add("is-active"),o=d.dataset.filter,c())})),t==null||t.addEventListener("input",Ce(c,300)),c()}catch{e.innerHTML=P("Failed to load members.")}}}function _e(){const e=document.getElementById("contact-form"),a=document.getElementById("contact-submit");e&&e.addEventListener("submit",async t=>{t.preventDefault();const n=new FormData(e),s=Object.fromEntries(n),r=Be(n,{name:{required:!0,minLength:2},email:{required:!0,email:!0},message:{required:!0,minLength:10}});if(r.length){f(r[0],"error");return}E(e,!0),a.disabled=!0,a.textContent="⏳ Sending…";try{await g.contact.send(s),f("Message sent! We will reply within 48h. ✅","success"),e.reset()}catch(o){f(o.message||"Failed. Try again.","error")}finally{E(e,!1),a.disabled=!1,a.textContent="📤 Send Message"}})}async function we(){try{Ee(),xe(),Le(),Ie(),Se(),ke(),Me(),await Promise.all([B(),A(),C()])}catch(e){console.error("Dashboard initialization failed:",e),f("Failed to load dashboard. Please refresh.","error")}}function Ee(){const e=document.querySelectorAll(".dash-nav__item"),a=document.querySelectorAll(".dash-panel"),t=document.getElementById("dash-page-title"),n=document.querySelector(".dash-header__sub"),s={news:{title:"📰 News Management",sub:"Manage posts published to the public site"},members:{title:"👥 Members Registry",sub:"Register and manage union members"},categories:{title:"🏷 Chapter Management",sub:"Create and organize forum chapters"}};e.forEach(r=>{r.addEventListener("click",()=>{var c;e.forEach(i=>{i.classList.remove("is-active"),i.setAttribute("aria-selected","false")}),a.forEach(i=>i.classList.remove("is-active")),r.classList.add("is-active"),r.setAttribute("aria-selected","true");const o=r.dataset.tab;(c=document.getElementById(`${o}-panel`))==null||c.classList.add("is-active"),s[o]&&t&&(t.textContent=s[o].title,n.textContent=s[o].sub),closeSidebar()})})}function xe(){const e=document.getElementById("dash-menu-btn"),a=document.getElementById("dash-close-btn"),t=document.getElementById("dash-sidebar"),n=document.getElementById("dash-overlay");e==null||e.addEventListener("click",()=>{t==null||t.classList.toggle("is-open"),n==null||n.classList.toggle("is-visible")}),a==null||a.addEventListener("click",s),n==null||n.addEventListener("click",s);function s(){t==null||t.classList.remove("is-open"),n==null||n.classList.remove("is-visible")}}function Le(){[{inputId:"news-image",labelId:"news-file-label",default:"Attach Image"},{inputId:"add-m-image",labelId:"add-m-file-label",default:"Upload Photo"},{inputId:"add-m-id",labelId:"add-m-id-label",default:"Upload ID Card"}].forEach(({inputId:a,labelId:t,default:n})=>{$e(a,t,n)})}function $e(e,a,t){const n=document.getElementById(e),s=document.getElementById(a);!n||!s||(s.dataset.default=t,n.addEventListener("change",()=>{var r;s.textContent=((r=n.files[0])==null?void 0:r.name)||t}))}function Ie(){const e=document.getElementById("news-form"),a=document.getElementById("news-cancel");e&&(e.addEventListener("submit",async t=>{t.preventDefault();const n=e.querySelector("[type=submit]");E(e,!0),n.disabled=!0,n.textContent=h.news?"⏳ Updating…":"⏳ Publishing…";try{const s=new FormData(e);h.news?(await g.posts.update(h.news,s),f("Post updated successfully!","success"),H()):(await g.posts.add(s),f("Post published successfully!","success"),e.reset(),document.getElementById("news-file-label").textContent="Attach Image"),await A()}catch(s){f(s.message||"Failed to save post.","error")}finally{E(e,!1),n.disabled=!1,n.textContent=h.news?"💾 Update Story":"📤 Publish to Site"}}),a==null||a.addEventListener("click",H))}function H(){var a;h.news=null;const e=document.getElementById("news-form");e.reset(),document.getElementById("news-file-label").textContent="Attach Image",document.getElementById("news-form-heading").textContent="Publish New Story",e.querySelector("[type=submit]").textContent="📤 Publish to Site",(a=document.getElementById("news-cancel"))==null||a.classList.add("is-hidden")}function Se(){const e=document.getElementById("add-member-form"),a=document.getElementById("member-cancel");e&&(e.addEventListener("submit",async t=>{var c,i,d;t.preventDefault();const n=new FormData;n.append("name",document.getElementById("add-m-name").value),n.append("email",document.getElementById("add-m-email").value),n.append("phone",((c=document.getElementById("add-m-phone"))==null?void 0:c.value)||""),n.append("category",document.getElementById("add-m-category").value),n.append("grade",document.getElementById("add-m-grade").value);const s=(i=document.getElementById("add-m-image"))==null?void 0:i.files[0],r=(d=document.getElementById("add-m-id"))==null?void 0:d.files[0];s&&n.append("image",s),r&&n.append("idImage",r);const o=e.querySelector("[type=submit]");E(e,!0),o.disabled=!0,o.textContent=h.member?"⏳ Updating…":"⏳ Registering…";try{h.member?(await g.members.update(h.member,n),f("Member updated successfully!","success"),O()):(await g.members.add(n),f("Member registered successfully!","success"),e.reset()),await C()}catch(l){f(l.message||"Failed to save member.","error")}finally{E(e,!1),o.disabled=!1,o.textContent=h.member?"💾 Update Member":"➕ Add to Registry"}}),a==null||a.addEventListener("click",O))}function O(){var a;h.member=null;const e=document.getElementById("add-member-form");e.reset(),e.querySelector("h2 .d-card__title").textContent="Register New Member",e.querySelector("[type=submit]").textContent="➕ Add to Registry",(a=document.getElementById("member-cancel"))==null||a.classList.add("is-hidden")}function ke(){const e=document.getElementById("create-cat-form");e&&e.addEventListener("submit",async a=>{a.preventDefault();const t=document.getElementById("cat-input"),n=t.value.trim();if(!n){f("Please enter a chapter name.","error");return}try{await g.categories.add(n),f(`Chapter "${n}" created successfully!`,"success"),t.value="",await B()}catch(s){f(s.message||"Failed to create chapter.","error")}})}function Me(){document.addEventListener("keydown",e=>{var a,t;(e.ctrlKey||e.metaKey)&&e.key==="k"&&(e.preventDefault(),(a=document.getElementById("members-search"))==null||a.focus()),(e.ctrlKey||e.metaKey)&&e.key==="n"&&(e.preventDefault(),(t=document.querySelector('[data-tab="news"]'))==null||t.click(),setTimeout(()=>{var n;return(n=document.getElementById("news-title"))==null?void 0:n.focus()},100))})}async function A(){const e=document.getElementById("news-tbody");if(e){e.innerHTML='<tr><td colspan="5" class="d-table__empty"><span class="d-spinner"></span> Loading…</td></tr>';try{const a=await g.posts.list();if(!a.length){e.innerHTML='<tr><td colspan="5" class="d-table__empty">No posts yet. Create your first story above.</td></tr>';return}e.innerHTML=a.map(t=>`
      <tr style="animation:revealUp 0.4s ease forwards;opacity:0">
        <td style="display:flex;align-items:center;gap:0.75rem;min-width:180px">
          ${t.image?`<img src="${t.image}" style="width:42px;height:42px;border-radius:0.5rem;object-fit:cover;flex-shrink:0">`:'<div style="width:42px;height:42px;border-radius:0.5rem;background:#f1f5f9;display:flex;align-items:center;justify-content:center;font-size:1.25rem;flex-shrink:0">📰</div>'}
          <div>
            <div style="font-weight:600;font-size:0.875rem;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden">${m(t.title)}</div>
            <div style="font-size:0.75rem;color:#94a3b8">${m(t.author)}</div>
          </div>
        </td>
        <td><span class="d-badge">${m(t.category||"—")}</span></td>
        <td style="color:#64748b;font-size:0.8125rem;white-space:nowrap">${t.date}</td>
        <td>
          <button class="d-btn d-btn--outline d-btn--sm" data-edit-post='${j(t)}'>✏️ Edit</button>
        </td>
        <td>
          <button class="d-btn d-btn--danger d-btn--sm" data-delete-post="${t.id}">🗑️</button>
        </td>
      </tr>
    `).join(""),e.querySelectorAll("tr").forEach((t,n)=>{setTimeout(()=>{t.style.animationDelay="0s"},n*40)}),e.querySelectorAll("[data-edit-post]").forEach(t=>{t.addEventListener("click",()=>{const n=JSON.parse(t.dataset.editPost);Te(n)})}),e.querySelectorAll("[data-delete-post]").forEach(t=>{t.addEventListener("click",async()=>{if(await q("This action cannot be undone. The post will be permanently deleted.",{title:"Delete Post",confirmText:"Delete"})){t.disabled=!0;try{await g.posts.remove(t.dataset.deletePost),f("Post deleted successfully.","success"),await A()}catch(s){f(s.message||"Failed to delete post.","error"),t.disabled=!1}}})})}catch(a){e.innerHTML=`<tr><td colspan="5" class="d-table__empty" style="color:#ef4444">⚠ ${m(a.message)}</td></tr>`}}}function Te(e){var i,d,l,u;h.news=e.id;const a=document.getElementById("news-title"),t=document.getElementById("news-author"),n=document.getElementById("news-content"),s=document.getElementById("news-category");a&&(a.value=e.title||""),t&&(t.value=e.author||""),n&&(n.value=e.content||""),s&&Array.from(s.options).forEach(b=>{b.selected=b.value===e.category});const r=document.getElementById("news-form-heading");r&&(r.textContent="✏️ Edit Story");const o=document.getElementById("news-file-label");o&&(o.textContent=e.image?"🖼 Image already set":"Attach Image");const c=(i=document.getElementById("news-form"))==null?void 0:i.querySelector("[type=submit]");c&&(c.textContent="💾 Update Story"),(d=document.getElementById("news-cancel"))==null||d.classList.remove("is-hidden"),(u=(l=document.getElementById("news-form"))==null?void 0:l.closest(".d-card"))==null||u.scrollIntoView({behavior:"smooth",block:"start"})}async function C(){const e=document.getElementById("members-tbody");if(e){e.innerHTML='<tr><td colspan="5" class="d-table__empty"><span class="d-spinner"></span> Loading…</td></tr>';try{const a=await g.members.list();if(!a.length){e.innerHTML='<tr><td colspan="5" class="d-table__empty">No members registered yet.</td></tr>';return}e.innerHTML=a.map(t=>`
      <tr style="animation:revealUp 0.4s ease forwards;opacity:0">
        <td style="display:flex;align-items:center;gap:0.75rem;min-width:180px">
          ${t.image?`<img src="${t.image}" style="width:38px;height:38px;border-radius:50%;object-fit:cover;flex-shrink:0">`:`<div style="width:38px;height:38px;border-radius:50%;background:#e2e8f0;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.875rem;flex-shrink:0;color:#64748b">${(t.name||"?")[0].toUpperCase()}</div>`}
          <div>
            <div style="font-weight:600;font-size:0.875rem">${m(t.name)}</div>
            <div style="font-size:0.75rem;color:#94a3b8">${m(t.email)}</div>
          </div>
        </td>
        <td><span class="d-badge">${m(t.category||"—")}</span></td>
        <td style="color:#64748b;font-size:0.8125rem">${m(t.grade||"—")}</td>
        <td>
          <button class="d-btn d-btn--outline d-btn--sm" data-edit-member='${j(t)}'>✏️ Edit</button>
        </td>
        <td>
          <button class="d-btn d-btn--danger d-btn--sm" data-delete-member="${t.id}">🗑️</button>
        </td>
      </tr>
    `).join(""),e.querySelectorAll("[data-edit-member]").forEach(t=>{t.addEventListener("click",()=>{const n=JSON.parse(t.dataset.editMember);Ae(n)})}),e.querySelectorAll("[data-delete-member]").forEach(t=>{t.addEventListener("click",async()=>{if(await q("This member will be permanently removed from the registry.",{title:"Remove Member",confirmText:"Remove"})){t.disabled=!0;try{await g.members.remove(t.dataset.deleteMember),f("Member removed successfully.","success"),await C()}catch(s){f(s.message||"Failed to remove member.","error"),t.disabled=!1}}})})}catch(a){e.innerHTML=`<tr><td colspan="5" class="d-table__empty" style="color:#ef4444">⚠ ${m(a.message)}</td></tr>`}}}function Ae(e){var i,d,l,u;h.member=e.id;const a=document.getElementById("add-m-name"),t=document.getElementById("add-m-email"),n=document.getElementById("add-m-phone"),s=document.getElementById("add-m-grade"),r=document.getElementById("add-m-category");a&&(a.value=e.name||""),t&&(t.value=e.email||""),n&&(n.value=e.phone||""),s&&Array.from(s.options).forEach(b=>{b.selected=b.value===e.grade}),r&&Array.from(r.options).forEach(b=>{b.selected=b.value===e.category});const o=document.querySelector("#members-panel .d-card:first-child .d-card__title");o&&(o.textContent="✏️ Edit Member");const c=(i=document.getElementById("add-member-form"))==null?void 0:i.querySelector("[type=submit]");c&&(c.textContent="💾 Update Member"),(d=document.getElementById("member-cancel"))==null||d.classList.remove("is-hidden"),(u=(l=document.getElementById("add-member-form"))==null?void 0:l.closest(".d-card"))==null||u.scrollIntoView({behavior:"smooth",block:"start"})}async function B(){const e=document.getElementById("cat-list"),a=document.getElementById("news-category"),t=document.getElementById("add-m-category");try{const n=await g.categories.list();e&&(e.innerHTML=n.length?n.map((s,r)=>`
            <div class="cat-item" style="animation:revealUp 0.4s ease ${r*.04}s forwards;opacity:0">
              <span style="font-weight:600;font-size:0.9rem">${m(s)}</span>
              <button class="d-btn d-btn--danger d-btn--sm" data-delete-cat="${m(s)}">✕ Remove</button>
            </div>
          `).join(""):'<p style="color:#94a3b8;text-align:center;padding:1rem">No chapters yet. Create one above.</p>',e.querySelectorAll("[data-delete-cat]").forEach(s=>{s.addEventListener("click",async()=>{if(await q(`All content tagged with "${s.dataset.deleteCat}" will lose this association.`,{title:"Delete Chapter",confirmText:"Delete"})){s.disabled=!0;try{await g.categories.remove(s.dataset.deleteCat),f("Chapter deleted successfully.","success"),await B()}catch(o){f(o.message||"Failed to delete chapter.","error"),s.disabled=!1}}})})),[a,t].forEach(s=>{if(!s)return;const r=s===t?'<option value="">Select chapter…</option>':"";s.innerHTML=r+n.map(o=>`<option value="${m(o)}">${m(o)}</option>`).join("")})}catch(n){console.error("Categories load failed:",n)}}function m(e){const a=document.createElement("div");return a.textContent=String(e??""),a.innerHTML}function j(e){return JSON.stringify(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function Ce(e,a){let t;return function(...n){clearTimeout(t),t=setTimeout(()=>e.apply(this,n),a)}}function E(e,a){e.querySelectorAll("input, textarea, select, button").forEach(n=>n.disabled=a),e.style.opacity=a?"0.6":"1",e.style.pointerEvents=a?"none":"auto"}function Be(e,a){const t=[];return Object.entries(a).forEach(([n,s])=>{const r=e.get(n);s.required&&!(r!=null&&r.trim())&&t.push(`${n} is required`),s.email&&r&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r)&&t.push(`${n} must be a valid email`),s.minLength&&r&&r.length<s.minLength&&t.push(`${n} must be at least ${s.minLength} characters`),s.maxLength&&r&&r.length>s.maxLength&&t.push(`${n} must not exceed ${s.maxLength} characters`)}),t}function q(e,a={}){return new Promise(t=>{const n=document.createElement("div");n.className="confirm-dialog",n.innerHTML=`
      <div class="confirm-dialog__backdrop"></div>
      <div class="confirm-dialog__box">
        <h3 class="confirm-dialog__title">${a.title||"Confirm Action"}</h3>
        <p class="confirm-dialog__message">${m(e)}</p>
        <div class="confirm-dialog__actions">
          <button class="d-btn d-btn--outline confirm-cancel">Cancel</button>
          <button class="d-btn d-btn--danger confirm-ok">${a.confirmText||"Confirm"}</button>
        </div>
      </div>
    `,document.body.appendChild(n),setTimeout(()=>n.classList.add("is-open"),10);const s=r=>{n.classList.remove("is-open"),setTimeout(()=>n.remove(),300),t(r)};n.querySelector(".confirm-cancel").addEventListener("click",()=>s(!1)),n.querySelector(".confirm-ok").addEventListener("click",()=>s(!0)),n.querySelector(".confirm-dialog__backdrop").addEventListener("click",()=>s(!1))})}function R(e){return`
    <article class="news-card" data-post-id="${e.id}" tabindex="0" role="button" aria-label="Read: ${m(e.title)}">
      <div class="news-card__image-wrap">
        <img class="news-card__image" src="${e.image||"/logo.jpg"}" alt="" loading="lazy">
        <div class="news-card__image-overlay"></div>
        <span class="news-card__cat-badge">${m(e.category||"General")}</span>
      </div>
      <div class="news-card__body">
        <div class="news-card__meta">
          <span class="news-card__date">📅 ${e.date}</span>
          <span class="news-card__author">✍ ${m(e.author)}</span>
        </div>
        <h3 class="news-card__title">${m(e.title)}</h3>
        <p class="news-card__excerpt">${m(e.content)}</p>
        <div class="news-card__read-more">Read Full Story →</div>
      </div>
    </article>
  `}function qe(e){const a=(e.name||"?").split(" ").slice(0,2).map(t=>t[0]).join("").toUpperCase();return`
    <div class="member-card" data-member-id="${e.id}" tabindex="0" role="button" aria-label="Contact ${m(e.name)}">
      <div class="member-card__avatar-wrap">
        ${e.image?`<img class="member-card__avatar" src="${e.image}" alt="${m(e.name)}" loading="lazy">`:`<div class="member-card__avatar member-card__avatar--initials">${a}</div>`}
      </div>
      <div class="member-card__name">${m(e.name)}</div>
      <div class="member-card__chapter">${m(e.category||"Member")}</div>
      <div class="member-card__grade">${m(e.grade||"")}</div>
      <div class="member-card__hint">Tap to contact →</div>
    </div>
  `}function z(e,a){e.querySelectorAll("[data-post-id]").forEach(t=>{const n=a.find(s=>String(s.id)===t.dataset.postId);n&&(t.addEventListener("click",()=>ge(n)),t.addEventListener("keydown",s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),t.click())})),t.style.cursor="pointer"})}function Fe(e,a=60){e.querySelectorAll(".news-card, .member-card, .shimmer-card").forEach((t,n)=>{t.style.opacity="0",setTimeout(()=>{t.style.animation="revealUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards"},n*a)})}function F(e,a="news"){return Array.from({length:e},(t,n)=>`
    <div class="shimmer-card" style="animation-delay:${n*.07}s">
      ${a==="news"?'<div class="shimmer-card__image shimmer-anim"></div>':'<div class="shimmer-card__avatar shimmer-anim" style="margin:1.5rem auto 1rem"></div>'}
      <div class="shimmer-card__body">
        <div class="shimmer-line shimmer-anim" style="width:35%"></div>
        <div class="shimmer-line shimmer-anim" style="width:88%;height:1.1rem"></div>
        <div class="shimmer-line shimmer-anim" style="width:70%"></div>
        <div class="shimmer-line shimmer-anim" style="width:55%"></div>
      </div>
    </div>
  `).join("")}function U(e){return`<div class="state-msg" style="grid-column:1/-1">🕊️ ${m(e)}</div>`}function P(e){return`<div class="state-msg state-msg--error" style="grid-column:1/-1">⚠ ${m(e)}</div>`}function f(e,a="info",t=4500){const n=document.getElementById("toast-container");if(!n)return;const s={success:"#10b981",error:"#ef4444",info:"var(--accent)",warning:"#f59e0b"},r={success:"✅",error:"⚠️",info:"ℹ️",warning:"⚡"},o=document.createElement("div");o.className="toast",o.style.borderLeft=`4px solid ${s[a]||s.info}`,o.innerHTML=`
    <span>${r[a]||r.info} ${m(e)}</span>
    <button class="toast__close" aria-label="Dismiss">✕</button>
  `;const c=o.querySelector(".toast__close"),i=()=>{o.style.transition="all 0.35s ease",o.style.opacity="0",o.style.transform="translateY(4px)",setTimeout(()=>o.remove(),360)};c.addEventListener("click",i),n.appendChild(o);let d=setTimeout(i,t);o.addEventListener("mouseenter",()=>clearTimeout(d)),o.addEventListener("mouseleave",()=>{d=setTimeout(i,1e3)})}
