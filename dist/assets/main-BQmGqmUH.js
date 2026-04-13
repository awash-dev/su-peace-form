(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();const Z="",T=new Map,ee=3e4;async function v(e,a={},t={}){const s=`${Z}${e}`,n=`${a.method??"GET"}:${s}`,r=t.cache!==!1&&(!a.method||a.method==="GET");if(r){const l=T.get(n);if(l&&Date.now()-l.ts<(t.cacheTTL??ee))return l.data}const c={...a.headers};!(a.body instanceof FormData)&&!c["Content-Type"]&&(c["Content-Type"]="application/json");const o=await fetch(s,{...a,headers:c});if(!o.ok){let l=`HTTP ${o.status}`;try{const m=await o.json();l=m.error||m.message||l}catch{}const f=new Error(l);throw f.status=o.status,f}const i=o.status===204?null:await o.json();return r&&T.set(n,{data:i,ts:Date.now()}),i}function x(e=""){for(const a of T.keys())a.includes(e)&&T.delete(a)}const te={list:()=>v("/api/categories",{},{cache:!0}),add:e=>(x("/api/categories"),v("/api/categories",{method:"POST",body:JSON.stringify({name:e})})),update:(e,a)=>(x("/api/categories"),v(`/api/categories/${encodeURIComponent(e)}`,{method:"PUT",body:JSON.stringify({newName:a})})),remove:e=>(x("/api/categories"),v(`/api/categories/${encodeURIComponent(e)}`,{method:"DELETE"}))},ae={list:()=>v("/api/members",{},{cache:!0}),add:e=>(x("/api/members"),v("/api/members",{method:"POST",body:e,headers:{}})),update:(e,a)=>(x("/api/members"),v(`/api/members/${e}`,{method:"PUT",body:a,headers:{}})),remove:e=>(x("/api/members"),v(`/api/members/${e}`,{method:"DELETE"}))},se={list:()=>v("/api/posts",{},{cache:!0}),add:e=>(x("/api/posts"),v("/api/posts",{method:"POST",body:e,headers:{}})),update:(e,a)=>(x("/api/posts"),v(`/api/posts/${e}`,{method:"PUT",body:a,headers:{}})),remove:e=>(x("/api/posts"),v(`/api/posts/${e}`,{method:"DELETE"}))},ne={send:e=>v("/api/contact",{method:"POST",body:JSON.stringify(e)})},re={check:()=>v("/api/health",{},{cacheTTL:5e3})},b={categories:te,members:ae,posts:se,contact:ne,health:re},p={spring:"cubic-bezier(0.34, 1.56, 0.64, 1)",smooth:"cubic-bezier(0.16, 1.00, 0.30, 1)",expo:"cubic-bezier(0.19, 1.00, 0.22, 1)",back:"cubic-bezier(0.34, 1.40, 0.64, 1)"},G=.78,oe=0,U={fadeUp:{frames:[{opacity:0,transform:"translateY(40px)"},{opacity:1,transform:"translateY(0px)"}],easing:p.smooth},fadeDown:{frames:[{opacity:0,transform:"translateY(-40px)"},{opacity:1,transform:"translateY(0px)"}],easing:p.smooth},fadeLeft:{frames:[{opacity:0,transform:"translateX(60px)"},{opacity:1,transform:"translateX(0px)"}],easing:p.expo},fadeRight:{frames:[{opacity:0,transform:"translateX(-60px)"},{opacity:1,transform:"translateX(0px)"}],easing:p.expo},scaleUp:{frames:[{opacity:0,transform:"scale(0.80) translateY(20px)"},{opacity:1,transform:"scale(1.00) translateY(0px)"}],easing:p.spring},scaleDown:{frames:[{opacity:0,transform:"scale(1.18)"},{opacity:1,transform:"scale(1.00)"}],easing:p.smooth},pop:{frames:[{opacity:0,transform:"scale(0.65)"},{opacity:1,transform:"scale(1.06)"},{opacity:1,transform:"scale(0.97)"},{opacity:1,transform:"scale(1.00)"}],easing:p.spring},blur:{frames:[{opacity:0,filter:"blur(14px)",transform:"translateY(24px)"},{opacity:1,filter:"blur(0px)",transform:"translateY(0px)"}],easing:p.smooth},blurLeft:{frames:[{opacity:0,filter:"blur(10px)",transform:"translateX(50px)"},{opacity:1,filter:"blur(0px)",transform:"translateX(0px)"}],easing:p.expo},blurRight:{frames:[{opacity:0,filter:"blur(10px)",transform:"translateX(-50px)"},{opacity:1,filter:"blur(0px)",transform:"translateX(0px)"}],easing:p.expo},slideLeft:{frames:[{opacity:0,transform:"translateX(80px) scaleX(0.95)"},{opacity:1,transform:"translateX(0px)  scaleX(1.00)"}],easing:p.expo},slideRight:{frames:[{opacity:0,transform:"translateX(-80px) scaleX(0.95)"},{opacity:1,transform:"translateX(0px)   scaleX(1.00)"}],easing:p.expo},slideUp:{frames:[{opacity:0,transform:"translateY(60px) scaleY(0.92)"},{opacity:1,transform:"translateY(0px)  scaleY(1.00)"}],easing:p.spring},slideDown:{frames:[{opacity:0,transform:"translateY(-60px) scaleY(0.92)"},{opacity:1,transform:"translateY(0px)   scaleY(1.00)"}],easing:p.spring},rotateIn:{frames:[{opacity:0,transform:"rotate(-8deg) translateY(32px) scale(0.9)"},{opacity:1,transform:"rotate( 1deg) translateY(-4px) scale(1.01)"},{opacity:1,transform:"rotate( 0deg) translateY(0px)  scale(1.00)"}],easing:p.spring},flipX:{frames:[{opacity:0,transform:"perspective(600px) rotateX(35deg) translateY(30px)"},{opacity:1,transform:"perspective(600px) rotateX(0deg)  translateY(0px)"}],easing:p.expo},flipY:{frames:[{opacity:0,transform:"perspective(600px) rotateY(45deg) translateX(30px)"},{opacity:1,transform:"perspective(600px) rotateY(0deg)  translateX(0px)"}],easing:p.expo},zoomRotate:{frames:[{opacity:0,transform:"scale(0.7) rotate(-12deg)"},{opacity:1,transform:"scale(1.0) rotate(0deg)"}],easing:p.back}};function ie(e){const a=U[e];if(!a)return{opacity:"0"};const t=a.frames[0],s={};return t.opacity!==void 0&&(s.opacity=String(t.opacity)),t.transform!==void 0&&(s.transform=t.transform),t.filter!==void 0&&(s.filter=t.filter),s}function S(e,a){const t=ie(a||"fadeUp");Object.assign(e.style,t)}function N(e,a,t,s){const n=U[a]||U.fadeUp;return e.animate(n.frames,{duration:s*1e3,delay:t*1e3,easing:n.easing,fill:"forwards",composite:"replace"})}function ce(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){document.querySelectorAll("[data-motion]").forEach(t=>{t.style.opacity="1",t.style.transform="none",t.style.filter="none"});return}const e=new Map;document.querySelectorAll("[data-motion]").forEach(t=>{const s=t.dataset.motion||"fadeUp",n=parseFloat(t.dataset.motionDelay||oe),r=parseFloat(t.dataset.motionDuration||G),c=t.dataset.motionOnce!=="true",o=parseFloat(t.dataset.motionStagger||"0"),i=parseFloat(t.dataset.motionThreshold||"0.10");e.set(t,{variant:s,delay:n,duration:r,once:c,stagger:o,threshold:i,isStaggerParent:o>0}),S(t,s),o>0&&Array.from(t.children).forEach(l=>{l.dataset.motion||S(l,s)})});const a=new Map;e.forEach((t,s)=>{const n=t.threshold;a.has(n)||a.set(n,[]),a.get(n).push(s)}),a.forEach((t,s)=>{const n=new IntersectionObserver(r=>{r.forEach(c=>{const o=c.target,i=e.get(o);i&&(c.isIntersecting?(N(o,i.variant,i.delay,i.duration),i.isStaggerParent&&Array.from(o.children).forEach((l,f)=>{l.dataset.motion||N(l,i.variant,i.delay+f*i.stagger,i.duration)}),i.once&&n.unobserve(o)):i.once||(S(o,i.variant),i.isStaggerParent&&Array.from(o.children).forEach(l=>{l.dataset.motion||S(l,i.variant)})))})},{threshold:s,rootMargin:"0px 0px -40px 0px"});t.forEach(r=>n.observe(r))})}function D(e,a="fadeUp",t=0,s=G){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){e.style.opacity="1",e.style.transform="none";return}S(e,a),requestAnimationFrame(()=>{requestAnimationFrame(()=>N(e,a,t,s))})}document.addEventListener("DOMContentLoaded",()=>{const e=document.body.dataset.page;if(e==="dashboard"){X(),Le();return}X(),me(),fe(),ue(),ce(),pe(),ge(),de(),he(),le(),e==="home"&&_e(),e==="news"&&we(),e==="unions"&&Ee(),e==="contact"&&xe()});function le(){document.querySelector("main")}function X(){const e=document.getElementById("preloader");e&&window.addEventListener("load",()=>{setTimeout(()=>{e.classList.add("preloader--hidden"),setTimeout(()=>e.remove(),600)},400)})}function de(){const e=document.getElementById("page-progress");if(!e)return;const a=()=>{const t=document.documentElement.scrollHeight-window.innerHeight;e.style.width=`${Math.min(window.scrollY/t*100,100)}%`};window.addEventListener("scroll",a,{passive:!0})}function me(){const e=document.getElementById("navbar");if(!e)return;const a=location.pathname,t=[{href:"/",label:"Home"},{href:"/news.html",label:"News"},{href:"/mission.html",label:"Mission"},{href:"/resources.html",label:"Resources"},{href:"/unions.html",label:"Members"},{href:"/contact.html",label:"Contact"}],s=m=>m==="/"?a==="/"||a.endsWith("index.html"):a.endsWith(m),n=localStorage.getItem("spf-theme")||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme",n),e.innerHTML=`
    <div class="container">
      <div class="navbar__inner">
        <a href="/" class="navbar__brand">
          <img src="/logo.jpg" alt="Logo" width="40" height="40" style="border-radius:var(--r-lg)">
          <span class="navbar__brand-text">Samara University Peace Forum Union</span>
        </a>
        <nav class="navbar__links" aria-label="Primary navigation">
          ${t.map(m=>`<a href="${m.href}" class="navbar__link${s(m.href)?" navbar__link--active":""}">${m.label}</a>`).join("")}
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
        ${t.map(m=>`<a href="${m.href}" class="mobile-menu__link">${m.label}</a>`).join("")}
        <div class="mobile-menu__divider"></div>
        <button class="theme-toggle theme-toggle--mobile" id="theme-toggle-mobile" style="margin-bottom:1rem">
          <span class="theme-label">Switch Theme</span>
        </button>
        <a href="https://t.me/SUPEACEFORUMUNION" target="_blank" rel="noopener noreferrer" class="mobile-menu__social-btn">🔵 Join Telegram</a>
      </div>
    </div>
  `;const r=document.getElementById("menu-btn"),c=document.getElementById("mobile-menu"),o=document.getElementById("theme-toggle"),i=document.getElementById("theme-toggle-mobile"),l=()=>{const y=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";document.documentElement.setAttribute("data-theme",y),localStorage.setItem("spf-theme",y)};o==null||o.addEventListener("click",l),i==null||i.addEventListener("click",l),r==null||r.addEventListener("click",()=>{const m=c.classList.toggle("is-open");e.classList.toggle("menu-is-open",m),r.textContent=m?"✕":"☰",r.setAttribute("aria-expanded",m),r.style.zIndex=m?"2200":"",document.body.style.overflow=m?"hidden":"",m?e.style.transform="none":e.style.transform="translateY(0)"}),c==null||c.addEventListener("click",m=>{m.target===c&&(c.classList.remove("is-open"),e.classList.remove("menu-is-open"),r.textContent="☰",r.setAttribute("aria-expanded",!1),r.style.zIndex="",e.style.transform="translateY(0)",document.body.style.overflow="")}),c==null||c.querySelectorAll("a").forEach(m=>m.addEventListener("click",()=>{c.classList.remove("is-open"),e.classList.remove("menu-is-open"),r.textContent="☰",r.style.zIndex="",e.style.transform="translateY(0)",document.body.style.overflow=""}));let f=0;window.addEventListener("scroll",()=>{if(e.classList.contains("menu-is-open"))return;const m=window.scrollY,y=m>30;e.classList.toggle("navbar--scrolled",y),e.style.transform=m>f&&m>200?"translateY(-100%)":"translateY(0)",f=m},{passive:!0})}function fe(){const e=document.getElementById("footer");e&&(e.innerHTML=`
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
  `)}function ue(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){document.querySelectorAll("[data-reveal],[data-stagger]").forEach(o=>{o.style.opacity="1"}),document.querySelectorAll("[data-stagger] > *").forEach(o=>{o.style.opacity="1"});return}const e="cubic-bezier(0.16,1,0.3,1)",a="0.85s",t={"":`revealUp ${a} ${e} forwards`,right:`revealRight ${a} ${e} forwards`,left:`revealLeft ${a} ${e} forwards`,scale:`revealScale ${a} ${e} forwards`,fade:`revealFade ${a} ${e} forwards`},s=new IntersectionObserver(o=>{o.forEach(i=>{if(!i.isIntersecting)return;const l=i.target,f=l.dataset.reveal??"";l.style.animation=t[f]||t[""],s.unobserve(l)})},{threshold:.06,rootMargin:"0px 0px -40px 0px"});document.querySelectorAll("[data-reveal]").forEach(o=>s.observe(o));const n=new IntersectionObserver(o=>{o.forEach(i=>{if(!i.isIntersecting)return;Array.from(i.target.children).forEach((f,m)=>{setTimeout(()=>{f.style.animation=`revealUp 0.7s ${e} forwards`},m*80)}),n.unobserve(i.target)})},{threshold:.04,rootMargin:"0px 0px -30px 0px"});document.querySelectorAll("[data-stagger]").forEach(o=>n.observe(o));const r=document.querySelectorAll(".section, .section--subtle"),c=new IntersectionObserver(o=>{o.forEach(i=>{i.target.style.transition="opacity 0.6s ease",i.target.style.opacity=i.isIntersecting?"1":"0.6"})},{threshold:.1});r.forEach(o=>c.observe(o))}function pe(){if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const e=document.querySelector(".hero__image img"),a=document.querySelectorAll(".page-hero__orb");if(!e&&!a.length)return;let t=!1;window.addEventListener("scroll",()=>{t||(requestAnimationFrame(()=>{const s=window.scrollY;e&&(e.style.transform=`translateY(${s*.08}px) scale(1.02)`),a.forEach((n,r)=>{n.style.transform=`translateY(${s*(r===0?.07:-.04)}px)`}),t=!1}),t=!0)},{passive:!0})}function ge(){const e=new IntersectionObserver(a=>{a.forEach(t=>{if(!t.isIntersecting)return;const s=t.target;ye(s,0,+s.dataset.count,2200,s.dataset.suffix||""),e.unobserve(s)})},{threshold:.5});document.querySelectorAll("[data-count]").forEach(a=>e.observe(a))}function ye(e,a,t,s,n){let r;const c=o=>{r||(r=o);const i=Math.min((o-r)/s,1),l=1-Math.pow(1-i,4);e.textContent=Math.floor(l*(t-a)+a).toLocaleString()+n,i<1&&requestAnimationFrame(c)};requestAnimationFrame(c)}let $,I;function he(){$=J("news-modal","spf-modal__box--article"),I=J("member-modal","spf-modal__box--member"),$.backdrop.addEventListener("click",C),$.close.addEventListener("click",C),I.backdrop.addEventListener("click",B),I.close.addEventListener("click",B),document.addEventListener("keydown",e=>{e.key==="Escape"&&(C(),B())})}function J(e,a){const t=document.createElement("div");t.className="spf-modal",t.id=e,t.setAttribute("role","dialog"),t.setAttribute("aria-modal","true");const s=document.createElement("div");s.className="spf-modal__backdrop";const n=document.createElement("div");n.className=`spf-modal__box ${a}`;const r=document.createElement("button");r.className="spf-modal__close",r.textContent="✕",r.setAttribute("aria-label","Close");const c=document.createElement("div");return c.className="spf-modal__body",n.append(r,c),t.append(s,n),document.body.appendChild(t),{wrap:t,backdrop:s,box:n,close:r,body:c}}function be(e){$.body.innerHTML=`
    ${e.image?`<div class="nmd-hero"><img src="${e.image}" alt="" class="nmd-hero__img" loading="lazy"><div class="nmd-hero__overlay"></div></div>`:""}
    <div class="nmd-content">
      <div class="nmd-meta">
        <span class="nmd-cat">${d(e.category||"General")}</span>
        <span class="nmd-date">📅 ${e.date}</span>
      </div>
      <h2 class="nmd-title">${d(e.title)}</h2>
      <div class="nmd-author">
        <div class="nmd-author__avatar">${(e.author||"A")[0].toUpperCase()}</div>
        <div>
          <div class="nmd-author__name">${d(e.author)}</div>
          <div class="nmd-author__role">Contributor</div>
        </div>
      </div>
      <div class="nmd-divider"></div>
      <div class="nmd-body">${d(e.content).replace(/\n/g,"<br>")}</div>
      <div class="nmd-actions">
        <a href="https://t.me/SUPEACEFORUMUNION" target="_blank" rel="noopener noreferrer" class="nmd-btn nmd-btn--tg">🔵 Share on Telegram</a>
      </div>
    </div>
  `,$.wrap.classList.add("is-open"),document.body.style.overflow="hidden",setTimeout(()=>$.close.focus(),50)}function C(){$.wrap.classList.remove("is-open"),document.body.style.overflow=""}function ve(e){const a=(e.name||"?").split(" ").slice(0,2).map(t=>t[0]).join("").toUpperCase();I.body.innerHTML=`
    <div class="mmd-profile">
      ${e.image?`<img src="${e.image}" alt="${d(e.name)}" class="mmd-avatar">`:`<div class="mmd-avatar mmd-avatar--initials">${a}</div>`}
      <div class="mmd-badge">${d(e.category||"Member")}</div>
      <h2 class="mmd-name">${d(e.name)}</h2>
      <div class="mmd-grade">📚 ${d(e.grade||"Student")}</div>
    </div>
    <div class="mmd-contacts">
      ${e.email?`<a href="mailto:${d(e.email)}" class="mmd-contact-btn"><span class="mmd-contact-btn__icon">📧</span><div><div class="mmd-contact-btn__label">Email</div><div class="mmd-contact-btn__value">${d(e.email)}</div></div></a>`:""}
      ${e.phone?`<a href="tel:${d(e.phone)}" class="mmd-contact-btn"><span class="mmd-contact-btn__icon">📞</span><div><div class="mmd-contact-btn__label">Call</div><div class="mmd-contact-btn__value">${d(e.phone)}</div></div></a>`:""}
      ${!e.email&&!e.phone?'<p style="color:#94a3b8;text-align:center;padding:1rem">No contact info provided.</p>':""}
    </div>
    <p style="text-align:center;padding-bottom:1.25rem;font-size:0.75rem;color:#94a3b8">Member since ${e.joinedDate||"N/A"}</p>
  `,I.wrap.classList.add("is-open"),document.body.style.overflow="hidden"}function B(){I.wrap.classList.remove("is-open"),document.body.style.overflow=""}async function _e(){const e=document.getElementById("latest-news-grid");if(e){e.innerHTML=Y(3);try{const a=await b.posts.list();if(!a.length){e.innerHTML=F("No stories published yet.");return}e.innerHTML=a.slice(0,3).map(t=>V(t)).join(""),W(e,a.slice(0,3)),Me(e),e.querySelectorAll(".news-card").forEach((t,s)=>{const n=["slideRight","slideUp","slideLeft"][s%3];D(t,n,s*.1,.75)})}catch{e.innerHTML=O("Could not load news.")}}}async function we(){const e=document.getElementById("news-grid"),a=document.getElementById("news-filter-bar");if(e){e.innerHTML=Y(6);try{let r=function(c){if(!c.length){e.innerHTML=F("No stories in this category.");return}e.innerHTML=c.map(o=>V(o)).join(""),W(e,c),e.querySelectorAll(".news-card").forEach((o,i)=>{const l=i%2===0?"blurRight":"blurLeft";D(o,l,i*.09,.75)})};var t=r;const s=await b.posts.list(),n=[...new Set(s.map(c=>c.category).filter(Boolean))];a&&(a.innerHTML='<button class="filter-btn is-active" data-filter="All">All</button>'+n.map(c=>`<button class="filter-btn" data-filter="${d(c)}">${d(c)}</button>`).join(""),a.addEventListener("click",c=>{const o=c.target.closest(".filter-btn");if(!o)return;a.querySelectorAll(".filter-btn").forEach(l=>l.classList.remove("is-active")),o.classList.add("is-active");const i=o.dataset.filter;r(i==="All"?s:s.filter(l=>l.category===i))})),r(s)}catch{e.innerHTML=O("Failed to load news.")}}}async function Ee(){const e=document.getElementById("members-grid"),a=document.getElementById("unions-filter-bar"),t=document.getElementById("members-search");if(e){e.innerHTML=Y(8,"member");try{let o=function(){const i=((t==null?void 0:t.value)||"").toLowerCase();let l=c==="All Divisions"?n:n.filter(f=>f.category===c);if(i&&(l=l.filter(f=>f.name.toLowerCase().includes(i)||(f.email||"").toLowerCase().includes(i)||(f.category||"").toLowerCase().includes(i))),!l.length){e.innerHTML=F("No members found.");return}e.innerHTML=l.map(f=>Se(f)).join(""),e.querySelectorAll("[data-member-id]").forEach((f,m)=>{const y=l.find(k=>String(k.id)===f.dataset.memberId);f.addEventListener("click",()=>{y&&ve(y)}),f.style.cursor="pointer";const M=["slideRight","slideUp","slideLeft","scaleUp"][m%4];D(f,M,m*.055,.72)})};var s=o;const n=await b.members.list(),r=[...new Set(n.map(i=>i.category).filter(Boolean))];let c="All Divisions";a&&(a.innerHTML='<button class="filter-btn is-active" data-filter="All Divisions">All Divisions</button>'+r.map(i=>`<button class="filter-btn" data-filter="${d(i)}">${d(i)}</button>`).join(""),a.addEventListener("click",i=>{const l=i.target.closest(".filter-btn");l&&(a.querySelectorAll(".filter-btn").forEach(f=>f.classList.remove("is-active")),l.classList.add("is-active"),c=l.dataset.filter,o())})),t==null||t.addEventListener("input",o),o()}catch{e.innerHTML=O("Failed to load members.")}}}function xe(){const e=document.getElementById("contact-form"),a=document.getElementById("contact-submit");e&&e.addEventListener("submit",async t=>{t.preventDefault();const s=Object.fromEntries(new FormData(e));if(!s.name||!s.email||!s.message){g("Fill in all required fields.","error");return}a.disabled=!0,a.textContent="⏳ Sending…";try{await b.contact.send(s),g("Message sent! We will reply within 48h. ✅","success"),e.reset()}catch(n){g(n.message||"Failed. Try again.","error")}finally{a.disabled=!1,a.textContent="📤 Send Message"}})}const w={news:null,member:null};async function Le(){var k;const e=document.querySelectorAll(".dash-nav__item"),a=document.querySelectorAll(".dash-panel"),t=document.getElementById("dash-page-title"),s=document.querySelector(".dash-header__sub"),n={news:{title:"📰 News Management",sub:"Manage posts published to the public site"},members:{title:"👥 Members Registry",sub:"Register and manage union members"},categories:{title:"🏷 Chapter Management",sub:"Create and organize forum chapters"}};e.forEach(_=>{_.addEventListener("click",()=>{var h;e.forEach(E=>{E.classList.remove("is-active"),E.setAttribute("aria-selected","false")}),a.forEach(E=>E.classList.remove("is-active")),_.classList.add("is-active"),_.setAttribute("aria-selected","true");const u=_.dataset.tab;(h=document.getElementById(`${u}-panel`))==null||h.classList.add("is-active"),n[u]&&t&&(t.textContent=n[u].title,s.textContent=n[u].sub),i()})});const r=document.getElementById("dash-menu-btn"),c=document.getElementById("dash-sidebar"),o=document.getElementById("dash-overlay");r==null||r.addEventListener("click",()=>{c.classList.toggle("is-open"),o.classList.toggle("is-visible")}),o==null||o.addEventListener("click",i);function i(){c==null||c.classList.remove("is-open"),o==null||o.classList.remove("is-visible")}["news-image:news-file-label","add-m-image:add-m-file-label","add-m-id:add-m-id-label"].forEach(_=>{const[u,h]=_.split(":");ke(u,h)});const l=document.getElementById("news-form"),f=document.getElementById("news-cancel");l==null||l.addEventListener("submit",async _=>{_.preventDefault();const u=l.querySelector("[type=submit]");u.disabled=!0,u.textContent=w.news?"⏳ Updating…":"⏳ Publishing…";try{const h=new FormData(l);w.news?(await b.posts.update(w.news,h),g("Post updated!","success"),m()):(await b.posts.add(h),g("Post published!","success"),l.reset(),document.getElementById("news-file-label").textContent="Attach Image"),q()}catch(h){g(h.message||"Failed.","error")}finally{u.disabled=!1,u.textContent=w.news?"💾 Update Story":"📤 Publish to Site"}}),f==null||f.addEventListener("click",m);function m(){w.news=null,l.reset(),document.getElementById("news-file-label").textContent="Attach Image",document.getElementById("news-form-heading").textContent="Publish New Story",l.querySelector("[type=submit]").textContent="📤 Publish to Site",f==null||f.classList.add("is-hidden")}const y=document.getElementById("add-member-form"),L=document.getElementById("member-cancel");y==null||y.addEventListener("submit",async _=>{var R,j,z;_.preventDefault();const u=new FormData;u.append("name",document.getElementById("add-m-name").value),u.append("email",document.getElementById("add-m-email").value),u.append("phone",((R=document.getElementById("add-m-phone"))==null?void 0:R.value)||""),u.append("category",document.getElementById("add-m-category").value),u.append("grade",document.getElementById("add-m-grade").value);const h=(j=document.getElementById("add-m-image"))==null?void 0:j.files[0],E=(z=document.getElementById("add-m-id"))==null?void 0:z.files[0];h&&u.append("image",h),E&&u.append("idImage",E);const A=y.querySelector("[type=submit]");A.disabled=!0,A.textContent=w.member?"⏳ Updating…":"⏳ Registering…";try{w.member?(await b.members.update(w.member,u),g("Member updated!","success"),M()):(await b.members.add(u),g("Member registered!","success"),y.reset()),P()}catch(Q){g(Q.message||"Failed.","error")}finally{A.disabled=!1,A.textContent=w.member?"💾 Update Member":"➕ Add to Registry"}}),L==null||L.addEventListener("click",M);function M(){w.member=null,y.reset(),y.querySelector("h2 .d-card__title").textContent="Register New Member",y.querySelector("[type=submit]").textContent="➕ Add to Registry",L==null||L.classList.add("is-hidden")}(k=document.getElementById("create-cat-form"))==null||k.addEventListener("submit",async _=>{_.preventDefault();const u=document.getElementById("cat-input"),h=u.value.trim();if(h)try{await b.categories.add(h),g(`Chapter "${h}" created!`,"success"),u.value="",H()}catch(E){g(E.message,"error")}}),await H(),q(),P()}async function q(){const e=document.getElementById("news-tbody");if(e){e.innerHTML='<tr><td colspan="5" class="d-table__empty"><span class="d-spinner"></span> Loading…</td></tr>';try{const a=await b.posts.list();if(!a.length){e.innerHTML='<tr><td colspan="5" class="d-table__empty">No posts yet.</td></tr>';return}e.innerHTML=a.map(t=>`
      <tr style="animation:revealUp 0.4s ease forwards;opacity:0">
        <td style="display:flex;align-items:center;gap:0.75rem;min-width:180px">
          ${t.image?`<img src="${t.image}" style="width:42px;height:42px;border-radius:0.5rem;object-fit:cover;flex-shrink:0">`:'<div style="width:42px;height:42px;border-radius:0.5rem;background:#f1f5f9;display:flex;align-items:center;justify-content:center;font-size:1.25rem;flex-shrink:0">📰</div>'}
          <div><div style="font-weight:600;font-size:0.875rem;display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden">${d(t.title)}</div><div style="font-size:0.75rem;color:#94a3b8">${d(t.author)}</div></div>
        </td>
        <td><span class="d-badge">${d(t.category||"—")}</span></td>
        <td style="color:#64748b;font-size:0.8125rem;white-space:nowrap">${t.date}</td>
        <td>
          <button class="d-btn d-btn--outline d-btn--sm" data-edit-post='${K(t)}'>✏️ Edit</button>
        </td>
        <td>
          <button class="d-btn d-btn--danger d-btn--sm" data-delete-post="${t.id}">🗑️</button>
        </td>
      </tr>
    `).join(""),e.querySelectorAll("tr").forEach((t,s)=>{setTimeout(()=>{t.style.animationDelay="0s"},s*40)}),e.querySelectorAll("[data-edit-post]").forEach(t=>{t.addEventListener("click",()=>{const s=JSON.parse(t.dataset.editPost);$e(s)})}),e.querySelectorAll("[data-delete-post]").forEach(t=>{t.addEventListener("click",async()=>{if(confirm("Delete this post?")){t.disabled=!0;try{await b.posts.remove(t.dataset.deletePost),g("Post deleted.","success"),q()}catch(s){g(s.message,"error"),t.disabled=!1}}})})}catch(a){e.innerHTML=`<tr><td colspan="5" class="d-table__empty" style="color:#ef4444">⚠ ${d(a.message)}</td></tr>`}}}function $e(e){var n,r,c,o;w.news=e.id,document.getElementById("news-title").value=e.title||"",document.getElementById("news-author").value=e.author||"",document.getElementById("news-content").value=e.content||"";const a=document.getElementById("news-category");a&&Array.from(a.options).forEach(i=>{i.selected=i.value===e.category});const t=document.getElementById("news-form-heading");t&&(t.textContent="✏️ Edit Story"),document.getElementById("news-file-label").textContent=e.image?"🖼 Image already set":"Attach Image";const s=(n=document.getElementById("news-form"))==null?void 0:n.querySelector("[type=submit]");s&&(s.textContent="💾 Update Story"),(r=document.getElementById("news-cancel"))==null||r.classList.remove("is-hidden"),(o=(c=document.getElementById("news-form"))==null?void 0:c.closest(".d-card"))==null||o.scrollIntoView({behavior:"smooth",block:"start"})}async function P(){const e=document.getElementById("members-tbody");if(e){e.innerHTML='<tr><td colspan="5" class="d-table__empty"><span class="d-spinner"></span> Loading…</td></tr>';try{const a=await b.members.list();if(!a.length){e.innerHTML='<tr><td colspan="5" class="d-table__empty">No members registered yet.</td></tr>';return}e.innerHTML=a.map(t=>`
      <tr style="animation:revealUp 0.4s ease forwards;opacity:0">
        <td style="display:flex;align-items:center;gap:0.75rem;min-width:180px">
          ${t.image?`<img src="${t.image}" style="width:38px;height:38px;border-radius:50%;object-fit:cover;flex-shrink:0">`:`<div style="width:38px;height:38px;border-radius:50%;background:#e2e8f0;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.875rem;flex-shrink:0;color:#64748b">${(t.name||"?")[0].toUpperCase()}</div>`}
          <div><div style="font-weight:600;font-size:0.875rem">${d(t.name)}</div><div style="font-size:0.75rem;color:#94a3b8">${d(t.email)}</div></div>
        </td>
        <td><span class="d-badge">${d(t.category||"—")}</span></td>
        <td style="color:#64748b;font-size:0.8125rem">${d(t.grade||"—")}</td>
        <td>
          <button class="d-btn d-btn--outline d-btn--sm" data-edit-member='${K(t)}'>✏️ Edit</button>
        </td>
        <td>
          <button class="d-btn d-btn--danger d-btn--sm" data-delete-member="${t.id}">🗑️</button>
        </td>
      </tr>
    `).join(""),e.querySelectorAll("[data-edit-member]").forEach(t=>{t.addEventListener("click",()=>{const s=JSON.parse(t.dataset.editMember);Ie(s)})}),e.querySelectorAll("[data-delete-member]").forEach(t=>{t.addEventListener("click",async()=>{if(confirm("Remove this member?")){t.disabled=!0;try{await b.members.remove(t.dataset.deleteMember),g("Member removed.","success"),P()}catch(s){g(s.message,"error"),t.disabled=!1}}})})}catch(a){e.innerHTML=`<tr><td colspan="5" class="d-table__empty" style="color:#ef4444">⚠ ${d(a.message)}</td></tr>`}}}function Ie(e){var r,c,o,i;w.member=e.id,document.getElementById("add-m-name").value=e.name||"",document.getElementById("add-m-email").value=e.email||"",document.getElementById("add-m-phone").value=e.phone||"";const a=document.getElementById("add-m-grade");a&&Array.from(a.options).forEach(l=>{l.selected=l.value===e.grade});const t=document.getElementById("add-m-category");t&&Array.from(t.options).forEach(l=>{l.selected=l.value===e.category});const s=document.querySelector("#members-panel .d-card:first-child .d-card__title");s&&(s.textContent="✏️ Edit Member");const n=(r=document.getElementById("add-member-form"))==null?void 0:r.querySelector("[type=submit]");n&&(n.textContent="💾 Update Member"),(c=document.getElementById("member-cancel"))==null||c.classList.remove("is-hidden"),(i=(o=document.getElementById("add-member-form"))==null?void 0:o.closest(".d-card"))==null||i.scrollIntoView({behavior:"smooth",block:"start"})}async function H(){const e=document.getElementById("cat-list"),a=document.getElementById("news-category"),t=document.getElementById("add-m-category");try{const s=await b.categories.list();e&&(e.innerHTML=s.length?s.map((n,r)=>`
        <div class="cat-item" style="animation:revealUp 0.4s ease ${r*.04}s forwards;opacity:0">
          <span style="font-weight:600;font-size:0.9rem">${d(n)}</span>
          <button class="d-btn d-btn--danger d-btn--sm" data-delete-cat="${d(n)}">✕ Remove</button>
        </div>
      `).join(""):'<p style="color:#94a3b8;text-align:center;padding:1rem">No chapters yet. Create one above.</p>',e.querySelectorAll("[data-delete-cat]").forEach(n=>{n.addEventListener("click",async()=>{if(confirm(`Delete chapter "${n.dataset.deleteCat}"?`)){n.disabled=!0;try{await b.categories.remove(n.dataset.deleteCat),g("Chapter deleted.","success"),H()}catch(r){g(r.message,"error"),n.disabled=!1}}})})),[a,t].forEach(n=>{if(!n)return;const r=n===t?'<option value="">Select chapter…</option>':"";n.innerHTML=r+s.map(c=>`<option value="${d(c)}">${d(c)}</option>`).join("")})}catch(s){console.error("Categories load failed:",s)}}function d(e){const a=document.createElement("div");return a.textContent=String(e??""),a.innerHTML}function K(e){return JSON.stringify(e).replace(/'/g,"&#39;").replace(/"/g,"&quot;")}function V(e){return`
    <article class="news-card" data-post-id="${e.id}" tabindex="0" role="button" aria-label="Read: ${d(e.title)}">
      <div class="news-card__image-wrap">
        <img class="news-card__image" src="${e.image||"/logo.jpg"}" alt="" loading="lazy">
        <div class="news-card__image-overlay"></div>
        <span class="news-card__cat-badge">${d(e.category||"General")}</span>
      </div>
      <div class="news-card__body">
        <div class="news-card__meta">
          <span class="news-card__date">📅 ${e.date}</span>
          <span class="news-card__author">✍ ${d(e.author)}</span>
        </div>
        <h3 class="news-card__title">${d(e.title)}</h3>
        <p class="news-card__excerpt">${d(e.content)}</p>
        <div class="news-card__read-more">Read Full Story →</div>
      </div>
    </article>
  `}function Se(e){const a=(e.name||"?").split(" ").slice(0,2).map(t=>t[0]).join("").toUpperCase();return`
    <div class="member-card" data-member-id="${e.id}" tabindex="0" role="button" aria-label="Contact ${d(e.name)}">
      <div class="member-card__avatar-wrap">
        ${e.image?`<img class="member-card__avatar" src="${e.image}" alt="${d(e.name)}" loading="lazy">`:`<div class="member-card__avatar member-card__avatar--initials">${a}</div>`}
      </div>
      <div class="member-card__name">${d(e.name)}</div>
      <div class="member-card__chapter">${d(e.category||"Member")}</div>
      <div class="member-card__grade">${d(e.grade||"")}</div>
      <div class="member-card__hint">Tap to contact →</div>
    </div>
  `}function W(e,a){e.querySelectorAll("[data-post-id]").forEach(t=>{const s=a.find(n=>String(n.id)===t.dataset.postId);s&&t.addEventListener("click",()=>be(s)),t.style.cursor="pointer",t.addEventListener("keydown",n=>{(n.key==="Enter"||n.key===" ")&&t.click()})})}function Me(e,a=60){e.querySelectorAll(".news-card, .member-card, .shimmer-card").forEach((t,s)=>{t.style.opacity="0",setTimeout(()=>{t.style.animation="revealUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards"},s*a)})}function Y(e,a="news"){return Array.from({length:e},(t,s)=>`
    <div class="shimmer-card" style="animation-delay:${s*.07}s">
      ${a==="news"?'<div class="shimmer-card__image shimmer-anim"></div>':'<div class="shimmer-card__avatar shimmer-anim" style="margin:1.5rem auto 1rem"></div>'}
      <div class="shimmer-card__body">
        <div class="shimmer-line shimmer-anim" style="width:35%"></div>
        <div class="shimmer-line shimmer-anim" style="width:88%;height:1.1rem"></div>
        <div class="shimmer-line shimmer-anim" style="width:70%"></div>
        <div class="shimmer-line shimmer-anim" style="width:55%"></div>
      </div>
    </div>
  `).join("")}function F(e){return`<div class="state-msg" style="grid-column:1/-1">🕊️ ${d(e)}</div>`}function O(e){return`<div class="state-msg state-msg--error" style="grid-column:1/-1">⚠ ${d(e)}</div>`}function g(e,a="info"){const t=document.getElementById("toast-container");if(!t)return;const s={success:"#10b981",error:"#ef4444",info:"var(--accent)"},n={success:"✅",error:"⚠️",info:"ℹ️"},r=document.createElement("div");r.className="toast",r.style.borderLeft=`4px solid ${s[a]||s.info}`,r.innerHTML=`${n[a]||n.info} ${d(e)}`,t.appendChild(r),setTimeout(()=>{r.style.transition="all 0.35s ease",r.style.opacity="0",r.style.transform="translateY(4px)",setTimeout(()=>r.remove(),360)},4500)}function ke(e,a){const t=document.getElementById(e),s=document.getElementById(a);!t||!s||t.addEventListener("change",()=>{var n;s.textContent=((n=t.files[0])==null?void 0:n.name)||s.dataset.default||"Select file"})}
