/* Zaxis Health — AI chat agent (v3.8)
   Answers from the site's knowledge base and hands off to WhatsApp
   (number never displayed) when a human touch is needed. */
(function(){
"use strict";

var WA_NUMBER = "923126060139"; // used only inside wa.me links — never shown as text

var INTENTS = [
 {k:["price","pricing","cost","fee","charge","how much","rate"],
  r:"Here is our pricing:<br>• <b>Complete RCM:</b> 5% of net collections<br>• <b>Dedicated billing specialist:</b> $1,500/month flat<br>• <b>Old AR recovery:</b> 15% contingency (no recovery, no fee)<br>• <b>RCM audit:</b> from $1,500<br>• <b>Consulting:</b> $150/hour<br>No setup fees. <a href='pricing.html'>See full pricing →</a>"},
 {k:["500","offer","deal","promotion","discount","launch"],
  r:"Yes! Our limited-time launch offer: a <b>FREE analysis</b> of your practice, and full takeover for just <b>$500</b>. <a href='pricing.html'>Claim it on the pricing page →</a>"},
 {k:["denial","denied","denials","rejection","c0","co-","carc"],
  r:"We recover denied and underpaid claims at <b>15% contingency</b> — no recovery, no fee. Try our free <a href='denial-lookup.html'>Denial Code Lookup tool →</a> (26 CARC codes explained with fixes). Want a free 48-hour revenue-leak review of your denials?"},
 {k:["ar ","a/r","aging","old claim","backlog","receivable","days in ar"],
  r:"We clean up aged A/R at <b>15% of what we collect</b> — no recovery, no fee. Most groups we audit find 8–12% of net revenue stuck in aging buckets. <a href='services.html'>How our AR cleanup works →</a>"},
 {k:["audit"],
  r:"Our RCM audits start at <b>$1,500 flat</b> — one billing export becomes a complete revenue diagnosis (KPIs, AR aging, payer matrix, denial analysis, MGMA benchmarks). <a href='sample-audit.html'>See a real sample audit →</a>"},
 {k:["free review","free analysis","revenue leak","leak"],
  r:"Our <b>free revenue-leak review</b> takes 48 hours: send a billing export, we show exactly where denials and underpayments are costing you, benchmarked against MGMA data. <a href='contact.html'>Start yours →</a>"},
 {k:["specialist","fte","dedicated","hire","staff"],
  r:"A <b>dedicated billing specialist</b> is a flat <b>$1,500/month</b> — no hiring, training, or turnover gaps. <a href='pricing.html'>Details →</a>"},
 {k:["consult"],
  r:"RCM consulting is <b>$150/hour</b> — denial strategy, payer contract reviews, workflow fixes. <a href='contact.html'>Book time →</a>"},
 {k:["service","what do you do","offerings"],
  r:"We do end-to-end medical billing: <b>Complete RCM (5%)</b>, denial recovery, AR cleanup, coding & compliance audits, credentialing support, and AI revenue-leak analysis. <a href='services.html'>All services →</a>"},
 {k:["specialt"],
  r:"We bill across <b>125+ specialties</b> — therapy, family medicine, pain management, physical therapy, primary care, labs, urgent care and more. <a href='specialties.html'>See specialties →</a>"},
 {k:["state","location","area","serve"],
  r:"We serve practices in <b>all 50 US states</b> — 45 states covered across 264+ audits so far. <a href='service-areas.html'>Find your state →</a>"},
 {k:["hipaa","baa","secure","security","compliant","privacy"],
  r:"Yes — we are <b>HIPAA-compliant</b> and sign a <b>BAA with every client</b>. Your patient data is handled under strict security controls."},
 {k:["founder","paul","wilson","who are you","about","company","team"],
  r:"Zaxis Health was founded by <b>Paul Wilson</b>, a US revenue-cycle veteran with ~10 years in RCM and <b>264+ audits</b> across 45 states and 89 billing systems. <a href='about.html'>Our story →</a>"},
 {k:["tool","calculator","lookup","cpt","wound","lab"],
  r:"Free tools built for billers: <a href='calculator.html'>Revenue Leak Calculator</a> · <a href='denial-lookup.html'>Denial Code Lookup</a> · <a href='wound-care-billing.html'>Wound Care Billing Guide</a> · <a href='lab-cpt-lookup.html'>Lab CPT Lookup</a>."},
 {k:["start","begin","sign up","get started","new practice","startup"],
  r:"Getting started is simple: <b>1)</b> free 48-hour revenue-leak review, <b>2)</b> 90-day ramp, <b>3)</b> month-to-month after that — no long-term lock-in. <a href='contact.html'>Start here →</a>"},
 {k:["how long","timeline","fast","when"],
  r:"The free revenue-leak review takes <b>48 hours</b>. Full onboarding runs on a <b>90-day ramp</b>, then month-to-month."},
 {k:["email","mail"],
  r:"You can reach us anytime at <a href='mailto:info@zxishealth.com'>info@zxishealth.com</a> — or tap below and I'll connect you on WhatsApp right now."},
 {k:["human","person","agent","real","talk","call","phone","number","whatsapp","contact"],
  r:"Of course — let me connect you with our team on <b>WhatsApp</b> right now. Tap below and your message opens instantly (I can include your question so you don't have to retype it).",
  wa:true},
 {k:["hi","hello","hey","salam","aoa","assalam","good morning","good evening"],
  r:"Hi! I'm the <b>Zaxis Health assistant</b>. Ask me about our pricing, services, the free revenue-leak review — or tap below to chat with our team on WhatsApp."},
 {k:["thank","thanks","shukriya","great"],
  r:"You're welcome! Anything else I can help with — pricing, denials, AR cleanup?"},
 {k:["bye","allah hafiz","goodbye"],
  r:"Goodbye! Remember, the <b>free revenue-leak review</b> is always available at <a href='contact.html'>zxishealth.com/contact.html</a>. Wishing your practice healthy collections!"}
];

var FALLBACK = "I want to make sure you get the right answer on that. Want me to connect you with our billing team on <b>WhatsApp</b>? They reply fast — tap below and I'll include your question so you don't retype it.";

function el(tag, cls, html){
  var d = document.createElement(tag);
  if(cls) d.className = cls;
  if(html != null) d.innerHTML = html;
  return d;
}

function findIntent(text){
  var t = " " + text.toLowerCase() + " ";
  var best = null, bestScore = 0;
  for(var i=0;i<INTENTS.length;i++){
    var s = 0, it = INTENTS[i];
    for(var j=0;j<it.k.length;j++){
      if(t.indexOf(it.k[j].toLowerCase()) !== -1) s += it.k[j].length;
    }
    if(s > bestScore){ bestScore = s; best = it; }
  }
  return bestScore > 0 ? best : null;
}

function waLink(msg){
  return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg || "Hi Zaxis Health! I have a question about your billing services.");
}

/* ---------- build the widget DOM ---------- */
var launch = el("button","zx-ai-launch",
  '<svg viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 2.4 1.2 4.5 3 5.7V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.3c1.8-1.2 3-3.3 3-5.7a7 7 0 0 0-7-7zm-2 15v-1h4v1h-4zm1-13h2v4h-2V4zm-3.3 2.7l1.4 1.4 1.4-1.4-1.4-1.4-1.4 1.4zM6 11H2v2h4v-2zm12 0h-4v2h4v-2z"/></svg><span class="zx-dot"></span>');
launch.setAttribute("aria-label","Chat with Zaxis AI assistant");
document.body.appendChild(launch);

var nudge = el("div","zx-ai-nudge",
  'Questions about medical billing or pricing? <b>Ask me!</b><button id="zxNudgeX">✕</button>');
document.body.appendChild(nudge);

var panel = el("div","zx-ai-panel");
panel.innerHTML =
  '<div class="zx-ai-head"><div class="zx-ai-avatar">Z</div>' +
  '<div><h4>Zaxis AI Assistant</h4><p>Online — replies instantly</p></div>' +
  '<button class="zx-ai-close" aria-label="Close chat">✕</button></div>' +
  '<div class="zx-ai-body"></div>' +
  '<div class="zx-ai-input"><input type="text" placeholder="Type your question…" aria-label="Type your question">' +
  '<button>Send</button></div>';
document.body.appendChild(panel);

var body = panel.querySelector(".zx-ai-body");
var input = panel.querySelector("input");
var sendBtn = panel.querySelector(".zx-ai-input button");
var userName = "";
var lastQuestion = "";
var exchanges = 0;

function scrollDown(){ body.scrollTop = body.scrollHeight; }

function addMsg(text, who){
  body.appendChild(el("div","zx-msg "+who, text));
  scrollDown();
}

function addChips(){
  var wrap = el("div","zx-chips");
  ["Pricing","Free revenue review","Talk to a human"].forEach(function(c){
    var b = el("button","zx-chip", c);
    b.onclick = function(){ handleUser(c); wrap.remove(); };
    wrap.appendChild(b);
  });
  body.appendChild(wrap);
  scrollDown();
}

function addWaButton(contextMsg){
  var a = el("a","zx-wa-btn","💬 Continue on WhatsApp");
  a.href = waLink(contextMsg);
  a.target = "_blank"; a.rel = "noopener";
  var wrap = el("div","zx-msg bot");
  wrap.appendChild(document.createTextNode("Tap to open WhatsApp with our team:"));
  wrap.appendChild(document.createElement("br"));
  wrap.appendChild(a);
  body.appendChild(wrap);
  scrollDown();
}

function botReply(userText){
  lastQuestion = userText;
  var typing = el("div","zx-typing","<span></span><span></span><span></span>");
  body.appendChild(typing); scrollDown();
  setTimeout(function(){
    typing.remove();
    var intent = findIntent(userText);
    if(intent){
      addMsg(intent.r, "bot");
      if(intent.wa) addWaButton("Hi Zaxis Health! " + (userName ? "I'm "+userName+". " : "") + userText);
    } else {
      addMsg(FALLBACK, "bot");
      addWaButton("Hi Zaxis Health! " + (userName ? "I'm "+userName+". " : "") + "My question: " + userText);
    }
    exchanges++;
    if(exchanges === 2 && !userName){
      setTimeout(function(){ addMsg("By the way, what's your name? I'll include it when I connect you with our team.", "bot"); }, 600);
    }
  }, 700 + Math.random()*500);
}

function handleUser(text){
  text = (text||"").trim();
  if(!text) return;
  addMsg(text.replace(/</g,"&lt;"), "user");
  input.value = "";
  if(exchanges === 2 && !userName && text.length < 30 && !findIntent(text)){
    userName = text.replace(/</g,"&lt;");
    setTimeout(function(){ addMsg("Nice to meet you, <b>"+userName+"</b>! How can I help — pricing, denials, AR cleanup, or the free review?", "bot"); addChips(); }, 600);
    exchanges++;
    return;
  }
  botReply(text);
}

sendBtn.onclick = function(){ handleUser(input.value); };
input.addEventListener("keydown", function(e){ if(e.key === "Enter") handleUser(input.value); });

launch.onclick = function(){
  panel.classList.toggle("open");
  nudge.classList.remove("show");
  if(panel.classList.contains("open") && !body.children.length){
    setTimeout(function(){
      addMsg("Hi! I'm the <b>Zaxis Health assistant</b> — I can answer questions about our billing services, pricing, the free revenue-leak review, and more.", "bot");
      addChips();
    }, 300);
  }
};
panel.querySelector(".zx-ai-close").onclick = function(){ panel.classList.remove("open"); };
document.getElementById("zxNudgeX").onclick = function(e){ e.stopPropagation(); nudge.classList.remove("show"); };
nudge.onclick = function(){ launch.click(); };

/* proactive nudge once per session */
if(!sessionStorage.getItem("zxNudged")){
  setTimeout(function(){
    if(!panel.classList.contains("open")){ nudge.classList.add("show"); sessionStorage.setItem("zxNudged","1"); }
  }, 12000);
}
})();
