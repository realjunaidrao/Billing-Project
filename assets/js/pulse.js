/* Zaxis Health v5 — agentic tech-stack interactions (pulse.js) */
(function(){
  "use strict";

  /* floating glow particles in the tech-stack section */
  var fx = document.getElementById("agFx");
  if (fx) {
    var colors = ["#7DD3FC", "#3CC489", "#A78BFA", "#2FB6D6"];
    for (var i = 0; i < 22; i++) {
      var d = document.createElement("div");
      d.className = "ag-p";
      d.style.left = (Math.random() * 100) + "%";
      d.style.top = (30 + Math.random() * 65) + "%";
      d.style.animationDelay = (-Math.random() * 6) + "s";
      d.style.animationDuration = (4.5 + Math.random() * 3) + "s";
      var c = colors[i % colors.length];
      d.style.background = c;
      d.style.boxShadow = "0 0 10px " + c;
      fx.appendChild(d);
    }
  }

  /* flowing pulses along the connector line — data rising layer 1 -> layer 6 */
  var stack = document.getElementById("agStack");
  if (stack) {
    for (var k = 0; k < 4; k++) {
      var p = document.createElement("div");
      p.className = "ag-pulse";
      p.setAttribute("aria-hidden", "true");
      p.style.animationDelay = (-k * 1.3) + "s";
      stack.appendChild(p);
    }
  }

  /* ticking CLAIMS SCORED counter — clearly a simulated demo number */
  var n = 12480, el = document.getElementById("agClaims");
  if (el) {
    setInterval(function(){
      n += Math.floor(Math.random() * 7) + 1;
      el.textContent = n.toLocaleString("en-US");
    }, 240);
  }
})();
