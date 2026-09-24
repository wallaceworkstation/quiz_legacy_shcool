// Fundo animado com tema imunológico: células (cor do colégio), vírus (vermelho) e anticorpos (verde)
// + confete na tela de resultado. Respeita "reduzir movimento" do sistema e pode ser desligado no menu Personalizar.
(function () {
  const cv = document.getElementById("bg"), cx = cv.getContext("2d");
  const cf = document.getElementById("conf"), cc = cf.getContext("2d");
  const reduzido = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const guardar = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  let ligado = guardar.get("quiz_anim") !== "0" && !reduzido;
  let W = 0, H = 0, parts = [], raf = null, tick = 0;
  const cor = { ac: "#1e4fd8", no: "#d64545", ok: "#1f9d55" };
  const TIPOS = { celula: "ac", virus: "no", anticorpo: "ok" };
  const rnd = (a, b) => a + Math.random() * (b - a);

  function lerCores() {
    const s = getComputedStyle(document.documentElement);
    for (const k of Object.keys(cor)) cor[k] = s.getPropertyValue("--" + k).trim() || cor[k];
  }
  function criar() {
    const nomes = Object.keys(TIPOS), tipo = nomes[Math.floor(Math.random() * nomes.length)];
    return { tipo, c: TIPOS[tipo], x: rnd(0, W), y: rnd(0, H), r: rnd(14, 46),
             vx: rnd(-.25, .25), vy: rnd(-.35, -.08), rot: rnd(0, 6.28), vr: rnd(-.004, .004), fase: rnd(0, 6.28) };
  }
  function tamanho() {
    const d = Math.min(window.devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    for (const c of [cv, cf]) {
      c.width = W * d; c.height = H * d; c.style.width = W + "px"; c.style.height = H + "px";
      c.getContext("2d").setTransform(d, 0, 0, d, 0, 0);
    }
    const n = Math.round(Math.min(34, Math.max(12, W * H / 40000)));
    while (parts.length < n) parts.push(criar());
    parts.length = n;
    if (!ligado && reduzido) estatico();
  }

  function desenhar(p) {
    cx.save(); cx.translate(p.x, p.y); cx.rotate(p.rot);
    cx.strokeStyle = cx.fillStyle = cor[p.c]; cx.lineWidth = Math.max(1.5, p.r * .08); cx.lineCap = "round";
    if (p.tipo === "celula") {
      cx.globalAlpha = .10; cx.beginPath(); cx.arc(0, 0, p.r, 0, 6.283); cx.fill();
      cx.globalAlpha = .28; cx.stroke();
      cx.globalAlpha = .18; cx.beginPath(); cx.arc(p.r * .15, -p.r * .1, p.r * .4, 0, 6.283); cx.fill();
    } else if (p.tipo === "virus") {
      const r0 = p.r * .6;
      cx.globalAlpha = .12; cx.beginPath(); cx.arc(0, 0, r0, 0, 6.283); cx.fill();
      cx.globalAlpha = .3; cx.stroke();
      for (let i = 0; i < 10; i++) {
        const a = i / 10 * 6.283, x = Math.cos(a), y = Math.sin(a);
        cx.beginPath(); cx.moveTo(x * r0, y * r0); cx.lineTo(x * p.r * .9, y * p.r * .9); cx.stroke();
        cx.beginPath(); cx.arc(x * p.r, y * p.r, p.r * .07, 0, 6.283); cx.fill();
      }
    } else {
      cx.globalAlpha = .3; cx.lineWidth = Math.max(2, p.r * .16);
      cx.beginPath(); cx.moveTo(0, p.r * .8); cx.lineTo(0, 0);
      cx.lineTo(-p.r * .6, -p.r * .7); cx.moveTo(0, 0); cx.lineTo(p.r * .6, -p.r * .7); cx.stroke();
    }
    cx.restore();
  }
  function estatico() { cx.clearRect(0, 0, W, H); parts.forEach(desenhar); }

  function quadro() {
    if (++tick % 40 === 1) lerCores();
    cx.clearRect(0, 0, W, H);
    for (const p of parts) {
      p.fase += .01; p.x += p.vx + Math.sin(p.fase) * .25; p.y += p.vy; p.rot += p.vr;
      const m = p.r * 1.5;
      if (p.y < -m) { p.y = H + m; p.x = rnd(0, W); }
      if (p.x < -m) p.x = W + m; else if (p.x > W + m) p.x = -m;
      desenhar(p);
    }
    raf = requestAnimationFrame(quadro);
  }
  function parar() { cancelAnimationFrame(raf); raf = null; }
  function ligar(on) {
    ligado = on && !reduzido; guardar.set("quiz_anim", on ? "1" : "0");
    parar(); cx.clearRect(0, 0, W, H);
    if (ligado) { lerCores(); raf = requestAnimationFrame(quadro); }
  }

  // Confete na tela de resultado (chamado pelo script.js quando a nota é boa)
  window.confete = function () {
    if (reduzido || !ligado) return;
    const paleta = [cor.ac, cor.ok, "#f5b301", "#e8558a", "#38b6ff"];
    const ps = Array.from({ length: 100 }, () => ({
      x: rnd(W * .2, W * .8), y: rnd(-20, H * .25), vx: rnd(-3, 3), vy: rnd(1, 5), g: rnd(.05, .12),
      w: rnd(6, 11), h: rnd(3, 6), rot: rnd(0, 6.28), vr: rnd(-.2, .2), c: paleta[Math.floor(Math.random() * paleta.length)]
    }));
    let t = 0;
    (function passo() {
      cc.clearRect(0, 0, W, H); t++;
      for (const p of ps) {
        p.vy += p.g; p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        cc.save(); cc.translate(p.x, p.y); cc.rotate(p.rot); cc.fillStyle = p.c;
        cc.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); cc.restore();
      }
      if (t < 220) requestAnimationFrame(passo); else cc.clearRect(0, 0, W, H);
    })();
  };

  const chk = document.getElementById("animIn");
  chk.checked = ligado; chk.disabled = reduzido;
  chk.onchange = () => ligar(chk.checked);
  addEventListener("resize", tamanho);
  document.addEventListener("input", () => setTimeout(() => { lerCores(); if (!ligado && reduzido) estatico(); }, 0));
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) parar(); else if (ligado && !raf) raf = requestAnimationFrame(quadro);
  });
  tamanho(); lerCores();
  if (ligado) raf = requestAnimationFrame(quadro); else if (reduzido) estatico();
})();
