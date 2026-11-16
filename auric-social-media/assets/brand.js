// AURIC social — reusable components, injected into placeholders so every post shares one source.
//   <span data-logo></span>                       logo lockup (mark + wordmark)
//   <div data-sun data-lit="7"></div>             sun mark; data-lit lights N rays in gold, the rest charcoal
//   <span data-pill="timeline|calendar|code|done" data-h="110" data-w="250"></span>
// Export: post.html?s=3 shows slide 3 alone at 0,0 (used by tools/render.mjs). Without ?s, all slides preview.

(function () {
  const NS = 'http://www.w3.org/2000/svg';

  // Geometry from src/components/Logo.tsx: 12 rays 30° apart, alternating long/short, solid core.
  function sunSVG(lit, core, dimColor) {
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 64 64');
    svg.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 12; i++) {
      const short = i % 2 === 1;
      const w = short ? 4.5 : 5.8, h = short ? 9 : 14, y = short ? 5.1 : 1.3;
      const r = document.createElementNS(NS, 'rect');
      r.setAttribute('x', 32 - w / 2); r.setAttribute('y', y);
      r.setAttribute('width', w); r.setAttribute('height', h); r.setAttribute('rx', 1.2);
      r.setAttribute('transform', `rotate(${i * 30} 32 32)`);
      r.setAttribute('fill', lit == null || i < lit ? 'currentColor' : dimColor);
      svg.appendChild(r);
    }
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('cx', 32); c.setAttribute('cy', 32); c.setAttribute('r', 10.2);
    c.setAttribute('fill', core === 'off' ? dimColor : 'currentColor');
    svg.appendChild(c);
    return svg;
  }

  document.querySelectorAll('[data-sun]').forEach((el) => {
    const lit = el.dataset.lit != null ? Number(el.dataset.lit) : null;
    const svg = sunSVG(lit, el.dataset.core, el.dataset.dim || '#3a3a3f');
    svg.style.width = '100%'; svg.style.height = '100%'; svg.style.display = 'block';
    el.classList.add('sun');
    el.appendChild(svg);
  });

  document.querySelectorAll('[data-logo]').forEach((el) => {
    el.classList.add('logo');
    const mark = document.createElement('span');
    mark.appendChild(sunSVG(null, 'on', '#3a3a3f'));
    mark.className = 'sun';
    mark.firstChild.style.cssText = 'width:100%;height:100%;display:block';
    const word = document.createElement('span');
    word.innerHTML = 'A<b>U</b>RIC';
    el.append(mark, word);
  });

  // Pills (src/components/home/HeroPills.tsx), sized by data-h / data-w.
  const CAL_A = ['g', 's', 'k', 's', 'g', 's', 'k'], CAL_B = ['s', 'k', 's', 'g', 's', 'g', 's'];
  const cal = (c) => (c === 'g' ? 'bg-gold' : c === 'k' ? 'bg-k' : 'bg-sand');
  document.querySelectorAll('[data-pill]').forEach((el) => {
    const h = Number(el.dataset.h || 110), w = Number(el.dataset.w || h * 2.35), kind = el.dataset.pill;
    el.classList.add('pill', kind);
    el.style.height = h + 'px'; el.style.width = w + 'px';
    if (kind === 'timeline') {
      el.innerHTML = '<span class="bg-cream" style="flex:1.2"></span><span class="bg-gold" style="flex:.8"></span><span class="bg-charcoal" style="flex:1"></span><span class="bg-cream" style="flex:.6"></span><i class="head" style="left:' + (el.dataset.at || 22) + '%"></i>';
    } else if (kind === 'calendar') {
      el.innerHTML = [CAL_A, CAL_B].map((r) => '<span class="r">' + r.map((c) => `<span class="${cal(c)}"></span>`).join('') + '</span>').join('');
    } else if (kind === 'code') {
      el.innerHTML = `<span class="c" style="font-size:${Math.round(h * 0.4)}px">&lt;/&gt;</span><span class="cur" style="width:${Math.round(h * 0.12)}px"></span>`;
    } else if (kind === 'done') {
      const d = Math.round(h * 0.56);
      el.innerHTML = `<span class="ok" style="width:${d}px;height:${d}px"><svg viewBox="0 0 24 24" width="${Math.round(d * 0.55)}" height="${Math.round(d * 0.55)}" fill="none" stroke="#dca733" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span><span class="bar"></span>`;
    }
  });

  const s = new URLSearchParams(location.search).get('s');
  const slides = document.querySelectorAll('.slide');
  if (s) {
    document.body.classList.add('single');
    const el = slides[Number(s) - 1];
    if (el) el.classList.add('on');
  } else {
    document.body.classList.add('preview');
  }
})();
