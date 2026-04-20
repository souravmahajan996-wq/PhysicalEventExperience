/* ===== PeE.js — MeetScape ===== */

/* ─── DATA ─── */
const DESTINATIONS = [
    { id: 1, name: "Valley of Flowers", location: "Uttarakhand, India", emoji: "🌸", category: "mountains", tags: ["Romantic", "Trek", "Scenic"], rating: "4.9", price: "From ₹8,500", desc: "A UNESCO site blanketed with alpine wildflowers — nature's own bouquet for two." },
    { id: 2, name: "Radhanagar Beach", location: "Andaman Islands", emoji: "🏖️", category: "beach", tags: ["Serene", "Sunset", "Luxury"], rating: "4.8", price: "From ₹12,000", desc: "Asia's finest beach — pristine turquoise waters and golden sands at twilight." },
    { id: 3, name: "Coorg Coffee Estates", location: "Karnataka, India", emoji: "☕", category: "forest", tags: ["Cozy", "Nature", "Cultural"], rating: "4.7", price: "From ₹6,500", desc: "Misty mountains, aromatic coffee trails, and firefly evenings in the hill station." },
    { id: 4, name: "Dal Lake Shikara", location: "Kashmir, India", emoji: "🛶", category: "lake", tags: ["Romantic", "Iconic", "Serene"], rating: "4.9", price: "From ₹9,000", desc: "Drift through lotus gardens on a decorated shikara as the Himalayas frame your meet." },
    { id: 5, name: "Udaipur City Palace", location: "Rajasthan, India", emoji: "🏰", category: "city", tags: ["Royal", "Cultural", "Romantic"], rating: "4.8", price: "From ₹7,800", desc: "The City of Lakes — palace ghats, candlelit dinners, and Rajput grandeur for two." },
    { id: 6, name: "Spiti Valley", location: "Himachal Pradesh, India", emoji: "🏔️", category: "mountains", tags: ["Adventure", "Dramatic", "Rare"], rating: "4.9", price: "From ₹11,000", desc: "Ancient monasteries perched on cliffs above a stark, starlit Himalayan desert." },
    { id: 7, name: "Kudle Beach Gokarna", location: "Karnataka, India", emoji: "🌊", category: "beach", tags: ["Bohemian", "Sunset", "Peaceful"], rating: "4.7", price: "From ₹4,500", desc: "Hidden crescent bay with bonfires, hammocks, and jaw-dropping sunset silhouettes." },
    { id: 8, name: "Majuli Island", location: "Assam, India", emoji: "🌿", category: "lake", tags: ["Unique", "Cultural", "Offbeat"], rating: "4.6", price: "From ₹5,000", desc: "World's largest river island — bamboo huts, masked dances, and river mist mornings." },
    { id: 9, name: "Pondicherry Promenade", location: "Tamil Nadu, India", emoji: "🏛️", category: "city", tags: ["French Quarter", "Café", "Romantic"], rating: "4.8", price: "From ₹5,500", desc: "Cobbled streets, bougainvillea walls, and seaside café-hopping in mini-France." }
];

const TESTIMONIALS = [
    { quote: "We'd only spoken online for three months. MeetScape planned our day at Dal Lake — the shikara, the flowers, the sunset dinner. I proposed that evening.", name: "Arjun & Priya", dest: "Dal Lake, Kashmir", emoji: "💍" },
    { quote: "I was so nervous about our first meeting. But the Valley of Flowers trek broke the ice instantly — by lunch we were laughing like old friends.", name: "Meera & Karthik", dest: "Uttarakhand", emoji: "🌸" },
    { quote: "The Coorg package was perfect — private coffee trail, a treehouse stay, and a chef's table dinner under the stars. It felt like a dream.", name: "Rohan & Ananya", dest: "Coorg, Karnataka", emoji: "☕" },
    { quote: "I'm shy by nature but MeetScape's itinerary had so many shared activities that conversation just flowed. Best day of my life so far!", name: "Samir & Tanya", dest: "Pondicherry", emoji: "🌊" },
    { quote: "The Udaipur surprise was impeccable — palace boats at dusk, a heritage dinner and a live sitar performance. Absolutely magical.", name: "Dev & Riya", dest: "Udaipur, Rajasthan", emoji: "🏰" },
    { quote: "We were strangers at 9 AM and best friends by sunset. The Radhanagar beach walk and the bonfire sealed it for us.", name: "Vikram & Naina", dest: "Andaman Islands", emoji: "🔥" }
];

const ITINERARY_TEMPLATES = {
    romantic: [
        { time: "Morning", activities: "Scenic arrival & welcome breakfast with panoramic views at a handpicked café." },
        { time: "Late Morning", activities: "Guided heritage/nature walk — discover hidden spots and create your first shared memories." },
        { time: "Afternoon", activities: "Curated activity (boat ride / art workshop / vineyard tour) based on your interests." },
        { time: "Sunset", activities: "Private sunset viewpoint experience with sparkling wine and light bites." },
        { time: "Evening", activities: "Candlelit dinner at a secluded local restaurant with personalised menu." }
    ],
    adventure: [
        { time: "Early Morning", activities: "Sunrise trek or kayak session — adrenaline and awe as your first shared adventure." },
        { time: "Morning", activities: "Breakfast at a scenic mountain/waterside rest stop." },
        { time: "Afternoon", activities: "Paragliding, rock climbing, or white-water rafting experience for two." },
        { time: "Late Afternoon", activities: "Recovery picnic and photography session at a scenic overlook." },
        { time: "Evening", activities: "Bonfire, barbecue, and stargazing with a guided constellation tour." }
    ],
    serene: [
        { time: "Morning", activities: "Dawn meditation and yoga session facing nature's canvas — lake, mountain, or sea." },
        { time: "Late Morning", activities: "Nature trail walk through forests, gardens, or waterfalls at a gentle pace." },
        { time: "Afternoon", activities: "Spa and wellness session (couples available) at a boutique retreat." },
        { time: "Sunset", activities: "Lakeside or hilltop tea ceremony with local herbal blends and silence." },
        { time: "Evening", activities: "Wholesome farm-to-table dinner at a sustainably run local guesthouse." }
    ],
    cultural: [
        { time: "Morning", activities: "Heritage walk with a storytelling local guide — myths, architecture, and art." },
        { time: "Late Morning", activities: "Hands-on workshop: pottery, block printing, cooking class, or rangoli art." },
        { time: "Afternoon", activities: "Local market exploration and street food trail — taste 5+ iconic local dishes." },
        { time: "Late Afternoon", activities: "Live classical music or folk dance performance at a community venue." },
        { time: "Evening", activities: "Rooftop dinner with skyline views and a curated regional tasting menu." }
    ]
};

/* ─── UTILITIES ─── */
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);
const formatINR = n => '₹' + Number(n).toLocaleString('en-IN');

function showToast(msg, duration = 3000) {
    const t = $('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), duration);
}

/* ─── NAVBAR ─── */
function initNavbar() {
    const nav = $('navbar');
    const links = $$('.nav-link');
    const ham = $('hamburger-btn');
    const navLinks = $('nav-links');

    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
        // active link
        const sections = ['home', 'how-it-works', 'destinations', 'experiences', 'planner'];
        let current = '';
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el && window.scrollY >= el.offsetTop - 120) current = id;
        });
        links.forEach(l => {
            const href = l.getAttribute('href').replace('#', '');
            l.classList.toggle('active', href === current);
        });
    });

    ham.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        ham.classList.toggle('open');
    });

    // smooth scroll for nav links
    $$('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
            navLinks.classList.remove('open');
        });
    });
}

/* ─── PARTICLES ─── */
function initParticles() {
    const container = $('hero-particles');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;animation-delay:${Math.random() * 6}s;animation-duration:${4 + Math.random() * 4}s;`;
        container.appendChild(p);
    }
}

/* ─── COUNTER ANIMATION ─── */
function animateCounters() {
    const counters = $$('.stat-number');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = +el.dataset.target;
            let current = 0;
            const step = target / 60;
            const timer = setInterval(() => {
                current = Math.min(current + step, target);
                el.textContent = Math.floor(current).toLocaleString('en-IN');
                if (current >= target) clearInterval(timer);
            }, 25);
            observer.unobserve(el);
        });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
}

/* ─── DESTINATIONS ─── */
function renderDestinations(filter = 'all') {
    const grid = $('destinations-grid');
    grid.innerHTML = '';
    const filtered = filter === 'all' ? DESTINATIONS : DESTINATIONS.filter(d => d.category === filter);
    filtered.forEach((d, i) => {
        const card = document.createElement('div');
        card.className = 'dest-card';
        card.id = `dest-card-${d.id}`;
        card.style.animationDelay = `${i * 0.07}s`;
        card.innerHTML = `
      <div class="dest-img" aria-label="${d.name}">${d.emoji}</div>
      <div class="dest-body">
        <div class="dest-tags">${d.tags.map(t => `<span class="dest-tag">${t}</span>`).join('')}</div>
        <h3 class="dest-name">${d.name}</h3>
        <p class="dest-location">📍 ${d.location}</p>
        <p class="dest-desc" style="font-size:0.85rem;color:var(--text-muted);margin-bottom:1rem;line-height:1.6">${d.desc}</p>
        <div class="dest-meta">
          <span class="dest-rating">★ ${d.rating}</span>
          <span class="dest-price">${d.price}</span>
        </div>
      </div>
    `;
        card.addEventListener('click', () => {
            $('planner').scrollIntoView({ behavior: 'smooth' });
            showToast(`✨ ${d.name} pre-selected! Fill in your details below.`);
        });
        grid.appendChild(card);
    });
}

function initFilters() {
    $$('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            $$('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderDestinations(btn.dataset.filter);
        });
    });
}

/* ─── TESTIMONIALS ─── */
function renderTestimonials() {
    const grid = $('testimonials-grid');
    TESTIMONIALS.forEach((t, i) => {
        const card = document.createElement('div');
        card.className = 'testi-card';
        card.id = `testi-card-${i}`;
        card.innerHTML = `
      <p class="testi-quote">"${t.quote}"</p>
      <div class="testi-stars">★★★★★</div>
      <div class="testi-author">
        <div class="testi-avatar">${t.emoji}</div>
        <div>
          <div class="testi-name">${t.name}</div>
          <div class="testi-dest">📍 ${t.dest}</div>
        </div>
      </div>
    `;
        grid.appendChild(card);
    });
}

/* ─── SCROLL REVEAL ─── */
function initScrollReveal() {
    const elements = $$('.step-card, .dest-card, .testi-card, .exp-card');
    const styles = `
    .reveal-hidden { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .reveal-visible { opacity: 1; transform: translateY(0); }
  `;
    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);

    elements.forEach(el => el.classList.add('reveal-hidden'));

    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('reveal-visible');
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

/* ─── BUDGET SLIDER ─── */
function initBudgetSlider() {
    const slider = $('budget-range');
    const display = $('budget-value');
    if (!slider) return;
    slider.addEventListener('input', () => {
        display.textContent = formatINR(slider.value);
        const pct = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
        slider.style.background = `linear-gradient(to right, var(--gold) ${pct}%, var(--dark-2) ${pct}%)`;
    });
    // set initial gradient
    slider.dispatchEvent(new Event('input'));
}

/* ─── VIBE SELECTOR ─── */
function initVibeSelector() {
    $$('.vibe-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            $$('.vibe-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            $('meet-vibe').value = btn.dataset.vibe;
        });
    });
}

/* ─── PLANNER FORM ─── */
function initPlannerForm() {
    const form = $('planner-form');
    const loader = $('btn-loader');
    const btnText = form.querySelector('.btn-text');

    // set min date to today
    const dateInput = $('meet-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        dateInput.value = today;
    }

    form.addEventListener('submit', e => {
        e.preventDefault();
        const p1 = $('person1-name').value.trim();
        const p2 = $('person2-name').value.trim();
        if (!p1 || !p2) { showToast('❤️ Please enter both names!'); return; }

        // Loading state
        loader.classList.add('visible');
        btnText.textContent = 'Crafting your experience...';
        $('plan-submit-btn').disabled = true;

        setTimeout(() => {
            loader.classList.remove('visible');
            btnText.textContent = '✨ Create My Experience';
            $('plan-submit-btn').disabled = false;
            showItinerary(p1, p2);
        }, 2200);
    });
}

/* ─── ITINERARY MODAL ─── */
function showItinerary(p1, p2) {
    const vibe = $('meet-vibe').value || 'romantic';
    const duration = $('meet-duration').value;
    const budget = $('budget-range').value;
    const interests = $('interests').value.trim();
    const template = ITINERARY_TEMPLATES[vibe] || ITINERARY_TEMPLATES.romantic;

    // Pick a matching destination suggestion
    const vibeToCategory = { romantic: 'lake', adventure: 'mountains', serene: 'forest', cultural: 'city' };
    const suggested = DESTINATIONS.find(d => d.category === vibeToCategory[vibe]) || DESTINATIONS[0];

    const $modal = $('result-modal');
    $('modal-subtitle').textContent = `✦ ${p1} & ${p2} — A ${vibe} experience awaits`;

    const durationLabel = { halfday: 'Half-Day', fullday: 'Full-Day', weekend: 'Weekend', extended: '3-Day' }[duration] || 'Full-Day';

    let html = `
    <div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:0.8rem;padding:1.2rem;margin-bottom:1.2rem">
      <p style="font-size:0.82rem;color:var(--text-muted);margin-bottom:0.4rem">🗺️ Suggested Destination</p>
      <p style="font-family:var(--font-serif);font-size:1.3rem;color:var(--gold)">${suggested.emoji} ${suggested.name}</p>
      <p style="font-size:0.82rem;color:var(--text-muted)">${suggested.location} · ${suggested.price}</p>
    </div>
    <div style="background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:0.8rem;padding:1.2rem;margin-bottom:1.2rem;display:flex;gap:1.5rem;flex-wrap:wrap">
      <span style="font-size:0.82rem;color:var(--text-muted)">⏱️ ${durationLabel}</span>
      <span style="font-size:0.82rem;color:var(--text-muted)">💰 Budget: ${formatINR(budget)}</span>
      ${interests ? `<span style="font-size:0.82rem;color:var(--text-muted)">✨ ${interests}</span>` : ''}
    </div>
    <p style="font-size:0.82rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-muted);margin-bottom:0.8rem">Your Itinerary</p>
  `;

    template.forEach(item => {
        html += `
      <div class="itinerary-day">
        <h4>${item.time}</h4>
        <p>${item.activities}</p>
      </div>
    `;
    });

    html += `
    <div style="background:var(--dark-2);border-radius:0.8rem;padding:1.2rem;margin-top:0.8rem;text-align:center">
      <p style="font-size:0.85rem;color:var(--text-muted)">🎉 Our concierge team will reach out within <strong style="color:var(--gold)">24 hours</strong> to confirm & customise every detail for <strong style="color:var(--text)">${p1} & ${p2}</strong>.</p>
    </div>
  `;

    $('modal-body').innerHTML = html;
    $modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function initModal() {
    const closeBtn = $('modal-close-btn');
    const overlay = $('result-modal');
    const saveBtn = $('modal-save-btn');
    const shareBtn = $('modal-share-btn');

    const closeModal = () => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

    saveBtn.addEventListener('click', () => showToast('💾 Itinerary saved! Check your email shortly.'));
    shareBtn.addEventListener('click', () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href).then(() => showToast('🔗 Link copied to clipboard!'));
        } else {
            showToast('🔗 Share link ready!');
        }
    });
}

/* ─── CTA BUTTONS ─── */
function initCTAButtons() {
    const planBtn = $('hero-plan-btn');
    const exploreBtn = $('hero-explore-btn');
    const navCta = $('nav-cta-btn');
    if (planBtn) planBtn.addEventListener('click', () => $('planner').scrollIntoView({ behavior: 'smooth' }));
    if (exploreBtn) exploreBtn.addEventListener('click', () => $('destinations').scrollIntoView({ behavior: 'smooth' }));
    if (navCta) navCta.addEventListener('click', () => $('planner').scrollIntoView({ behavior: 'smooth' }));
}

/* ─── NEWSLETTER ─── */
function initNewsletter() {
    const btn = $('newsletter-btn');
    const input = $('newsletter-email');
    if (!btn) return;
    btn.addEventListener('click', () => {
        if (!input.value || !input.value.includes('@')) { showToast('📧 Enter a valid email!'); return; }
        showToast('🎉 Subscribed! Beautiful destinations coming your way.');
        input.value = '';
    });
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initParticles();
    animateCounters();
    renderDestinations();
    initFilters();
    renderTestimonials();
    initScrollReveal();
    initBudgetSlider();
    initVibeSelector();
    initPlannerForm();
    initModal();
    initCTAButtons();
    initNewsletter();
});
