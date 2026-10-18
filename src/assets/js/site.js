// ---------- Hero: forced Duffing oscillator phase portrait ----------
// x'' + d x' - x + x^3 = g cos(w t), integrated with RK4, drawn once on load.
(function () {
  const canvas = document.getElementById("phase");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const d = 0.25, g = 0.36, w = 1.0, dt = 0.02;

  function simulate() {
    const f = (t, x, v) => [v, -d * v + x - x * x * x + g * Math.cos(w * t)];
    let t = 0, x = 0.1, v = 0;
    const pts = [];
    for (let i = 0; i < 16000; i++) {
      const [k1x, k1v] = f(t, x, v);
      const [k2x, k2v] = f(t + dt / 2, x + dt / 2 * k1x, v + dt / 2 * k1v);
      const [k3x, k3v] = f(t + dt / 2, x + dt / 2 * k2x, v + dt / 2 * k2v);
      const [k4x, k4v] = f(t + dt, x + dt * k3x, v + dt * k3v);
      x += dt / 6 * (k1x + 2 * k2x + 2 * k3x + k4x);
      v += dt / 6 * (k1v + 2 * k2v + 2 * k3v + k4v);
      t += dt;
      if (i > 600) pts.push([x, v]);
    }
    return pts;
  }
  const pts = simulate();
  let xmax = 0, vmax = 0;
  for (const [x, v] of pts) { xmax = Math.max(xmax, Math.abs(x)); vmax = Math.max(vmax, Math.abs(v)); }
  xmax *= 1.12; vmax *= 1.12;

  const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  let raf = null;

  function setup() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = canvas.getBoundingClientRect().width || 560;
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    return { W: canvas.width, H: canvas.height, dpr };
  }

  function draw(animate) {
    cancelAnimationFrame(raf);
    const { W, H, dpr } = setup();
    const pad = 8 * dpr;
    const X = (x) => pad + (x / xmax + 1) / 2 * (W - 2 * pad);
    const Y = (v) => pad + (1 - (v / vmax + 1) / 2) * (H - 2 * pad);
    const rule = css("--rule"), steel = css("--steel"), orange = css("--orange");

    ctx.clearRect(0, 0, W, H);
    // graph-paper grid
    ctx.lineWidth = 1;
    ctx.strokeStyle = rule;
    const step = 0.25;
    for (let gx = -Math.floor(xmax / step) * step; gx <= xmax; gx += step) {
      ctx.beginPath(); ctx.moveTo(Math.round(X(gx)) + 0.5, pad); ctx.lineTo(Math.round(X(gx)) + 0.5, H - pad); ctx.stroke();
    }
    for (let gv = -Math.floor(vmax / step) * step; gv <= vmax; gv += step) {
      ctx.beginPath(); ctx.moveTo(pad, Math.round(Y(gv)) + 0.5); ctx.lineTo(W - pad, Math.round(Y(gv)) + 0.5); ctx.stroke();
    }
    ctx.strokeStyle = steel;
    ctx.lineWidth = 1.25 * dpr;
    ctx.beginPath(); ctx.moveTo(X(0), pad); ctx.lineTo(X(0), H - pad); ctx.moveTo(pad, Y(0)); ctx.lineTo(W - pad, Y(0)); ctx.stroke();
    ctx.fillStyle = steel;
    ctx.font = `${12 * dpr}px Archivo, sans-serif`;
    ctx.fillText("x", W - pad - 12 * dpr, Y(0) - 8 * dpr);
    ctx.fillText("dx/dt", X(0) + 8 * dpr, pad + 14 * dpr);

    ctx.strokeStyle = orange;
    ctx.lineWidth = 1.1 * dpr;
    ctx.globalAlpha = 0.6;
    ctx.lineJoin = "round";

    const segment = (a, b) => {
      ctx.beginPath();
      ctx.moveTo(X(pts[a][0]), Y(pts[a][1]));
      for (let i = a + 1; i <= b; i++) ctx.lineTo(X(pts[i][0]), Y(pts[i][1]));
      ctx.stroke();
    };

    if (!animate) { segment(0, pts.length - 1); ctx.globalAlpha = 1; return; }
    const duration = 3200, t0 = performance.now();
    let drawn = 0;
    const frame = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 2);
      const target = Math.floor(eased * (pts.length - 1));
      if (target > drawn) { segment(drawn, target); drawn = target; }
      if (p < 1) raf = requestAnimationFrame(frame); else ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(frame);
  }

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const start = () => draw(!reduce);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(start); else start();
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => draw(false));
  let resizeTimer;
  window.addEventListener("resize", () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => draw(false), 150); });
})();

// ---------- Lightbox for images in project pages ----------
(function () {
  const dialog = document.querySelector(".lightbox");
  if (!dialog || !dialog.showModal) return;
  const img = dialog.querySelector("img");
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a.zoom");
    if (!link) return;
    e.preventDefault();
    const src = link.querySelector("img");
    img.src = link.href;
    img.alt = src ? src.alt : "";
    dialog.showModal();
  });
  dialog.addEventListener("click", (e) => { if (e.target === dialog || e.target.closest(".lightbox__close")) dialog.close(); });
})();
