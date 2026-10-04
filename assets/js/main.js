/* Zaxis Health — interactions (v3) */
(function(){
  "use strict";

  /* reveal on scroll */
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if (e.isIntersecting){ e.target.classList.add("visible"); io.unobserve(e.target); }
    });
  }, {threshold:.1});
  document.querySelectorAll(".reveal").forEach(function(el){ io.observe(el); });

  /* animated counters [data-count] */
  var cio = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if (!e.isIntersecting) return;
      var el = e.target, target = parseFloat(el.dataset.count), t0 = null, dur = 1600;
      function tick(t){
        if (!t0) t0 = t;
        var p = Math.min((t - t0) / dur, 1),
            ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * ease).toLocaleString("en-US");
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      cio.unobserve(el);
    });
  }, {threshold:.4});
  document.querySelectorAll("[data-count]").forEach(function(el){ cio.observe(el); });

  /* logo marquee — EHR / billing systems fluency */
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
      return '<img src="assets/logos/'+l[0]+'" alt="'+l[1]+' logo" loading="lazy">';
    }).join("");
    track.innerHTML = html + html; /* loop */
  }

  /* active nav link */
  var path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function(a){
    var href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) a.classList.add("active");
    else a.classList.remove("active");
  });

  /* contact form -> mailto fallback */
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
})();
