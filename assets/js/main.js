/* Zaxis Health — Apex theme interactions (v4) */
(function(){
  "use strict";

  /* ---------- SVG icon sprite (uniform 24px stroke set) ---------- */
  var ICONS = {
    "i-check":'<path d="M4.5 12.5l5 5L19.5 7"/>',
    "i-shield":'<path d="M12 2.8l7.2 2.9v5.6c0 4.6-3 8.7-7.2 10.2-4.2-1.5-7.2-5.6-7.2-10.2V5.7z"/>',
    "i-shield-check":'<path d="M12 2.8l7.2 2.9v5.6c0 4.6-3 8.7-7.2 10.2-4.2-1.5-7.2-5.6-7.2-10.2V5.7z"/><path d="M9 11.6l2.1 2.1 4-4.2"/>',
    "i-lock":'<rect x="5" y="10.5" width="14" height="9.5" rx="2.5"/><path d="M8 10.5V8a4 4 0 018 0v2.5"/><circle cx="12" cy="15.2" r="1.2"/>',
    "i-search":'<circle cx="11" cy="11" r="7"/><path d="M16.2 16.2L20.5 20.5"/>',
    "i-rocket":'<path d="M12 2.8c3.4 2.4 4.9 6.3 4.9 10.2l-2.4 1.5L12 16l-2.5-1.5L7 13c0-3.9 1.5-7.8 5-10.2z"/><circle cx="12" cy="9.5" r="1.7"/><path d="M7 13c-1.5 1-2.3 2.6-2.5 5 2.4-.2 4-1 5-2.5M17 13c1.5 1 2.3 2.6 2.5 5-2.4-.2-4-1-5-2.5"/><path d="M10.5 17.3L12 21l1.5-3.7"/>',
    "i-chart":'<path d="M3.5 3.5v17h17"/><path d="M8.5 15.5v-4M13 15.5V8M17.5 15.5v-2.5"/>',
    "i-droplet":'<path d="M12 3s6.2 6.6 6.2 11a6.2 6.2 0 01-12.4 0C5.8 9.6 12 3 12 3z"/><path d="M9.5 14a2.5 2.5 0 002.5 2.5"/>',
    "i-refresh":'<path d="M20.5 12a8.5 8.5 0 11-2.5-6"/><path d="M20.5 3.5V8H16"/>',
    "i-user":'<circle cx="12" cy="8" r="3.8"/><path d="M4.5 20.5c.8-3.8 3.9-5.8 7.5-5.8s6.7 2 7.5 5.8"/>',
    "i-users":'<circle cx="9" cy="8.5" r="3.3"/><path d="M2.8 19.5c.7-3.3 3.2-5 6.2-5s5.5 1.7 6.2 5"/><path d="M15.5 5.6a3.3 3.3 0 010 5.9M17.8 14.9c2 .8 3.2 2.4 3.6 4.6"/>',
    "i-dollar":'<circle cx="12" cy="12" r="8.8"/><path d="M12 6.8v10.4M14.8 9.2c-.5-.9-1.4-1.4-2.8-1.4-1.6 0-2.8.9-2.8 2.3 0 3.2 5.6 1.6 5.6 4.9 0 1.4-1.2 2.3-2.8 2.3-1.4 0-2.3-.5-2.8-1.4"/>',
    "i-banknote":'<rect x="2.8" y="6.5" width="18.4" height="11" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 9.8v.01M18 14.2v.01"/>',
    "i-scan":'<path d="M3.5 8V6a2 2 0 012-2h2M16.5 4h2a2 2 0 012 2v2M20.5 16v2a2 2 0 01-2 2h-2M7.5 20h-2a2 2 0 01-2-2v-2"/><path d="M4 12h16"/>',
    "i-monitor":'<rect x="3" y="4" width="18" height="12.5" rx="2"/><path d="M9.5 20.5h5M12 16.5v4"/>',
    "i-phone":'<path d="M5.5 3.5h3.6l1.7 4.8-2.3 1.7a12.5 12.5 0 005.5 5.5l1.7-2.3 4.8 1.7v3.6a2 2 0 01-2.1 2A16.5 16.5 0 013.5 5.6a2 2 0 012-2.1z"/>',
    "i-file-text":'<path d="M13.5 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8.5z"/><path d="M13.5 3v5.5H19"/><path d="M9 13.5h6M9 17h6"/>',
    "i-file":'<path d="M13.5 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8.5z"/><path d="M13.5 3v5.5H19"/>',
    "i-clipboard":'<rect x="5.5" y="5" width="13" height="16" rx="2"/><rect x="9" y="2.8" width="6" height="4" rx="1.2"/><path d="M9 11h6M9 14.5h6M9 18h4"/>',
    "i-trend-up":'<path d="M3.5 17.5l5.5-5.5 3.5 3.5 7.5-7.5"/><path d="M15 8h5v5"/>',
    "i-trend-down":'<path d="M3.5 6.5l5.5 5.5 3.5-3.5 7.5 7.5"/><path d="M15 16h5v-5"/>',
    "i-heart":'<path d="M12 20.5S4 15.6 3 10.9A4.9 4.9 0 0112 6.4a4.9 4.9 0 019 4.5c-1 4.7-9 9.6-9 9.6z"/>',
    "i-flask":'<path d="M9.5 3h5"/><path d="M10 3v5.2L4.8 17a2.4 2.4 0 002.1 3.5h10.2a2.4 2.4 0 002.1-3.5L14 8.2V3"/><path d="M7.2 14.5h9.6"/>',
    "i-alert":'<path d="M12 3.5L22 20H2z"/><path d="M12 10v4.2M12 17.4v.1"/>',
    "i-scale":'<path d="M12 4v16M5 7h14"/><path d="M7 7l-2.5 6a2.9 2.9 0 005 0L7 7zM17 7l-2.5 6a2.9 2.9 0 005 0L17 7z"/><path d="M8.5 21h7"/>',
    "i-link":'<path d="M10 13.5a4.2 4.2 0 006 0l2.8-2.8a4.24 4.24 0 00-6-6L11.3 6.2"/><path d="M14 10.5a4.2 4.2 0 00-6 0l-2.8 2.8a4.24 4.24 0 006 6l1.5-1.5"/>',
    "i-package":'<path d="M12 3l8.5 4.7v8.6L12 21l-8.5-4.7V7.7z"/><path d="M12 12l8.5-4.7M12 12L3.5 7.3M12 12v9"/>',
    "i-pen":'<path d="M4 20l1-4.5L16.7 3.8a2 2 0 012.8 2.8L7.8 18.5z"/><path d="M14.8 5.7l2.8 2.8"/>',
    "i-award":'<circle cx="12" cy="9" r="5.2"/><path d="M12 6.6l.9 1.9 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3z"/><path d="M9.2 13.4L7 21l5-2.6L17 21l-2.2-7.6"/>',
    "i-compass":'<circle cx="12" cy="12" r="8.8"/><path d="M15.5 8.5l-2.2 4.8-4.8 2.2 2.2-4.8z"/>',
    "i-ban":'<circle cx="12" cy="12" r="8.8"/><path d="M6 6l12 12"/>',
    "i-footprints":'<ellipse cx="9" cy="7.5" rx="2.6" ry="3.6"/><ellipse cx="15.5" cy="16.5" rx="2.6" ry="3.6"/>',
    "i-dna":'<path d="M7.5 3.5c0 5 9 5 9 8.5s-9 3.5-9 8.5M16.5 3.5c0 5-9 5-9 8.5s9 3.5 9 8.5"/><path d="M8.6 6.5h6.8M8.6 17.5h6.8"/>',
    "i-cross":'<circle cx="12" cy="12" r="8.8"/><path d="M12 8.5v7M8.5 12h7"/>',
    "i-headset":'<path d="M4.5 14v-2.5a7.5 7.5 0 0115 0V14"/><rect x="3.5" y="13" width="4" height="6.5" rx="1.6"/><rect x="16.5" y="13" width="4" height="6.5" rx="1.6"/><path d="M19.5 19.5c0 1.5-1.5 2.5-4 2.5h-2"/>',
    "i-map-pin":'<path d="M12 21.5s-6.8-5.9-6.8-10.8a6.8 6.8 0 0113.6 0c0 4.9-6.8 10.8-6.8 10.8z"/><circle cx="12" cy="10.5" r="2.4"/>',
    "i-mail":'<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3.5 7.5L12 13l8.5-5.5"/>',
    "i-arrow-right":'<path d="M4 12h15.5M13.5 6l6 6-6 6"/>',
    "i-sparkles":'<path d="M12 4l1.6 4.1 4.1 1.6-4.1 1.6L12 15.4l-1.6-4.1-4.1-1.6 4.1-1.6z"/><path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/>',
    "i-menu":'<path d="M4 7h16M4 12h16M4 17h16"/>',
    "i-x":'<path d="M6 6l12 12M18 6L6 18"/>',
    "i-chev-down":'<path d="M6.5 9.5l5.5 5.5 5.5-5.5"/>',
    "i-clock":'<circle cx="12" cy="12" r="8.8"/><path d="M12 7.5V12l3 2"/>',
    "i-globe":'<circle cx="12" cy="12" r="8.8"/><path d="M3.2 12h17.6M12 3.2c2.8 3.4 2.8 13.8 0 17.6M12 3.2c-2.8 3.4-2.8 13.8 0 17.6"/>',
    "i-zap":'<path d="M13 2.5L4.5 13.5H11l-1 8 8.5-11H12z"/>'
  };
  var syms = Object.keys(ICONS).map(function(id){
    return '<symbol id="'+id+'" viewBox="0 0 24 24">'+ICONS[id]+'</symbol>';
  }).join("");
  var spr = document.createElement("div");
  spr.setAttribute("aria-hidden","true");
  spr.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
  spr.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">'+syms+'</svg>';
  document.body.insertBefore(spr, document.body.firstChild);

  /* ---------- header scroll state ---------- */
  var header = document.querySelector("header.site");
  function onScroll(){ if (header) header.classList.toggle("scrolled", window.scrollY > 24); }
  window.addEventListener("scroll", onScroll, {passive:true}); onScroll();

  /* ---------- mobile menu ---------- */
  var toggle = document.querySelector(".nav-toggle"),
      panel = document.querySelector(".mobile-panel"),
      overlay = document.querySelector(".mp-overlay");
  function setMenu(open){
    if (!panel) return;
    panel.classList.toggle("open", open);
    if (overlay) overlay.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (toggle){ toggle.addEventListener("click", function(){ setMenu(!panel.classList.contains("open")); }); }
  if (overlay){ overlay.addEventListener("click", function(){ setMenu(false); }); }
  var mpClose = document.querySelector(".mp-close");
  if (mpClose){ mpClose.addEventListener("click", function(){ setMenu(false); }); }

  /* ---------- reveal on scroll (stagger via --d) ---------- */
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if (e.isIntersecting){ e.target.classList.add("visible"); io.unobserve(e.target); }
    });
  }, {threshold:.12, rootMargin:"0px 0px -6% 0px"});
  document.querySelectorAll(".reveal,.reveal-l,.reveal-r,.reveal-s").forEach(function(el){ io.observe(el); });
  /* auto-stagger grids */
  document.querySelectorAll(".grid-3,.grid-4,.diff-grid,.steps,.strip").forEach(function(grid){
    var kids = grid.querySelectorAll(":scope > .reveal");
    kids.forEach(function(k, i){ if (!k.style.getPropertyValue("--d")) k.style.setProperty("--d", (i * 0.09) + "s"); });
  });

  /* ---------- animated counters [data-count] ---------- */
  var cio = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if (!e.isIntersecting) return;
      var el = e.target, target = parseFloat(el.dataset.count), t0 = null, dur = 1800;
      function tick(t){
        if (!t0) t0 = t;
        var p = Math.min((t - t0) / dur, 1),
            ease = 1 - Math.pow(1 - p, 4); /* expo-out */
        el.textContent = Math.round(target * ease).toLocaleString("en-US");
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      cio.unobserve(el);
    });
  }, {threshold:.4});
  document.querySelectorAll("[data-count]").forEach(function(el){ cio.observe(el); });

  /* ---------- animated bar fills (audit page) ---------- */
  var bio = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if (!e.isIntersecting) return;
      var el = e.target;
      el.style.width = el.dataset.w || "0%";
      bio.unobserve(el);
    });
  }, {threshold:.3});
  document.querySelectorAll(".bar-fill[data-w]").forEach(function(el){ bio.observe(el); });

  /* ---------- logo marquee ---------- */
  var track = document.getElementById("logoTrack");
  if (track){
    var logos = [
      ["eclinicalworks.jpg","eClinicalWorks"],["advancedmd.svg","AdvancedMD"],
      ["athenahealth.png","athenahealth"],["nextgen.webp","NextGen"],
      ["modmed.png","ModMed"],["officeally.png","Office Ally"],
      ["drchrono.png","DrChrono"],["curemd.png","CureMD"],
      ["tebra.png","Tebra"],["greenway.jpg","Greenway"],
      ["kareo.png","Kareo"],["epic.png","Epic"],["allscripts.jpg","Allscripts"]
    ];
    var html = logos.map(function(l){
      return '<span class="mq-chip"><img src="assets/logos/'+l[0]+'" alt="'+l[1]+' logo" loading="lazy"></span>';
    }).join("");
    track.innerHTML = html + html;
  }

  /* ---------- FAQ chevron icons ---------- */
  document.querySelectorAll(".faq summary").forEach(function(s){
    if (!s.querySelector(".fx")){
      var fx = document.createElement("span");
      fx.className = "fx";
      fx.innerHTML = '<svg class="i"><use href="#i-chev-down"/></svg>';
      s.appendChild(fx);
    }
  });

  /* ---------- "go" link arrows ---------- */
  document.querySelectorAll(".card .go").forEach(function(a){
    if (!a.querySelector("svg") && /→|&rarr;/.test(a.innerHTML)){
      a.innerHTML = a.innerHTML.replace(/→|&rarr;/g, "") + '<svg class="i"><use href="#i-arrow-right"/></svg>';
    }
  });

  /* ---------- active nav link ---------- */
  var path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function(a){
    var href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) a.classList.add("active");
    else a.classList.remove("active");
  });

  /* ---------- subtle hero parallax (desktop, fine pointer) ---------- */
  var hero = document.querySelector(".hero .hero-visual");
  if (hero && window.matchMedia("(pointer:fine)").matches){
    var hx = document.querySelector(".hero");
    hx.addEventListener("mousemove", function(ev){
      var r = hx.getBoundingClientRect(),
          x = (ev.clientX - r.left) / r.width - .5,
          y = (ev.clientY - r.top) / r.height - .5;
      hero.style.transform = "translate("+(x*14)+"px,"+(y*14)+"px)";
    });
    hx.addEventListener("mouseleave", function(){ hero.style.transform = ""; });
  }

  /* ---------- contact form -> mailto fallback ---------- */
  var form = document.getElementById("contactForm");
  if (form){
    form.addEventListener("submit", function(ev){
      ev.preventDefault();
      var d = new FormData(form),
          subject = encodeURIComponent("Website inquiry: " + (d.get("service") || "General")),
          body = encodeURIComponent(
            "Name: " + d.get("name") + "\nEmail: " + d.get("email") +
            "\nPhone: " + (d.get("phone") || "-") + "\nService: " + (d.get("service") || "-") +
            "\n\nMessage:\n" + d.get("message"));
      location.href = "mailto:info@zxishealth.com?subject=" + subject + "&body=" + body;
    });
  }

/* ---------- v5.0 live claim stream + dashboard tickers ---------- */
(function(){
  var stream = document.getElementById("claimStream");
  if(!stream) return;
  var payers = ["BCBS","Aetna","Cigna","UHC","Medicare","Humana","Anthem","Centene"];
  var cpts = ["99213","99214","90837","97110","17000","93000","G0444","99203"];
  var seq = 48290, paused = false;
  function rnd(a){ return a[Math.floor(Math.random()*a.length)]; }
  function money(){ return "$" + (120 + Math.floor(Math.random()*2400)).toLocaleString("en-US"); }
  function ago(){ var s = 2 + Math.floor(Math.random()*50); return s < 60 ? s + "s" : Math.floor(s/60) + "m"; }
  function addRow(){
    seq++;
    var r = Math.random();
    var st = r < .72 ? ["paid","Paid"] : (r < .9 ? ["pend","In review"] : ["denied","Denied"]);
    var row = document.createElement("div");
    row.className = "claim-row";
    row.innerHTML = '<span class="cid">#' + seq + '</span><span class="cp">' + rnd(payers) + " \u00B7 " + rnd(cpts) + '</span><span class="ca">' + money() + '</span><span class="cs ' + st[0] + '">' + st[1] + '</span><span class="ct">' + ago() + " ago</span>";
    stream.insertBefore(row, stream.firstChild);
    while(stream.children.length > 4) stream.removeChild(stream.lastChild);
  }
  function tickKpis(){
    var ncr = document.getElementById("kpiNcr"), ar = document.getElementById("kpiAr"), ccr = document.getElementById("kpiCcr");
    if(ncr) ncr.textContent = (93.6 + Math.random()*1.2).toFixed(1);
    if(ar) ar.textContent = String(Math.floor(29 + Math.random()*7));
    if(ccr) ccr.textContent = (97.6 + Math.random()*0.9).toFixed(1);
  }
  for(var i = 0; i < 4; i++) addRow();
  setInterval(function(){ if(!paused){ addRow(); tickKpis(); } }, 2600);
  var btn = document.getElementById("streamPause");
  if(btn) btn.addEventListener("click", function(){
    paused = !paused;
    btn.innerHTML = paused
      ? '<svg class="i"><use href="#i-zap"/></svg><span>Resume</span>'
      : '<svg class="i"><use href="#i-ban"/></svg><span>Pause</span>';
    btn.setAttribute("aria-pressed", String(paused));
  });
})();
})();
