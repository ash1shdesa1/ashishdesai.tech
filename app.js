// ── Nav scroll ──────────────────────────
const nav = document.querySelector('.nav');
if (nav) {
    window.addEventListener('scroll', () =>
        nav.classList.toggle('scrolled', scrollY > 40), { passive: true });
}

// ── Active nav link ──────────────────────
const path = location.pathname;
document.querySelectorAll('.nav-link').forEach(a => {
    const href = a.getAttribute('href');
    if (href === '/' && (path === '/' || path.endsWith('index.html'))) {
        a.classList.add('active');
    } else if (href !== '/' && path.includes(href.replace('.html', ''))) {
        a.classList.add('active');
    }
});

// ── Hamburger ────────────────────────────
const ham = document.getElementById('ham');
const mob = document.getElementById('mob');
if (ham && mob) {
    ham.addEventListener('click', () => {
        const open = ham.classList.toggle('open');
        mob.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
    });
    mob.querySelectorAll('a').forEach(a =>
        a.addEventListener('click', () => {
            ham.classList.remove('open');
            mob.classList.remove('open');
            document.body.style.overflow = '';
        }));
}

// ── Scroll reveal ─────────────────────────
const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

// ── Counter ───────────────────────────────
const co = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target, target = +el.dataset.to, dur = 1400;
        const t0 = performance.now();
        const ease = t => 1 - Math.pow(1 - t, 3);
        const tick = now => {
            el.textContent = Math.round(ease(Math.min((now - t0) / dur, 1)) * target);
            if (now - t0 < dur) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        co.unobserve(el);
    });
}, { threshold: 0.5 });
document.querySelectorAll('[data-to]').forEach(el => co.observe(el));

// ── Toast ─────────────────────────────────
window.toast = (msg) => {
    const t = document.getElementById('toast');
    if (!t) return;
    document.getElementById('toast-msg').textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3200);
};

// ── Copy email ────────────────────────────
document.querySelectorAll('[data-copy]').forEach(el =>
    el.addEventListener('click', () => {
        navigator.clipboard.writeText(el.dataset.copy)
            .then(() => window.toast?.('Email copied!'));
    }));
