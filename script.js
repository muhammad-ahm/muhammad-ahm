// ── CURSOR ──
const cur = document.getElementById('cur');
const ring = document.getElementById('cur-ring');

document.addEventListener('mousemove', e => {
  cur.style.left  = e.clientX + 'px';
  cur.style.top   = e.clientY + 'px';
  ring.style.left = e.clientX + 'px';
  ring.style.top  = e.clientY + 'px';
});

document.querySelectorAll('a,button,.proj-card,.sk-card,.tl-content').forEach(el => {
  el.addEventListener('mouseenter', () => cur.classList.add('big'));
  el.addEventListener('mouseleave', () => cur.classList.remove('big'));
});

// ── NAV STICK ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('stuck', window.scrollY > 60);
});

// ── REVEAL ON SCROLL ──
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); });
}, { threshold: 0.1 });
revealEls.forEach(el => io.observe(el));

// ── TIMELINE ITEMS ──
const tlItems = document.querySelectorAll('.tl-item');
const tlio = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('on'), 0);
    }
  });
}, { threshold: 0.15 });
tlItems.forEach(el => tlio.observe(el));

// ── SKILL BARS ──
const sbars = document.querySelectorAll('.sbar-item');
const sbio = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); });
}, { threshold: 0.3 });
sbars.forEach(el => sbio.observe(el));
