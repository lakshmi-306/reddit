// ===== CONFIG — replace with your email =====
const YOUR_EMAIL = 'vithikamarketing@gmail.com';
// Get your free key at web3forms.com — replace below
const W3F_KEY = 'e42baeec-f0dd-4f59-8fcc-3f6fbec10975';

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function applyTheme(theme) {
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
  } else {
    root.removeAttribute('data-theme');
  }
  localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  applyTheme(current === 'light' ? 'dark' : 'light');
});

// ===== NAV SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== MOBILE MENU =====
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  burger.setAttribute('aria-expanded', isOpen);
  const spans = burger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
  });
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
  '.service-card, .case-card, .booking-card, .about__card, .about__content, .philosophy-box'
).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});


// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const name    = this.name.value.trim();
  const email   = this.email.value.trim();
  const subject = this.subject.value.trim();
  const message = this.message.value.trim();
  const msgEl   = document.getElementById('contactMsg2');
  const btn     = this.querySelector('button[type="submit"]');

  if (!name || !email || !subject || !message) return;

  btn.textContent = 'Sending...';
  btn.disabled = true;
  msgEl.textContent = '';
  msgEl.className = 'form-msg';

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: W3F_KEY,
        subject: `[Contact] ${subject}`,
        from_name: name,
        replyto: email,
        'Name': name,
        'Email': email,
        'Subject': subject,
        'Message': message,
      }),
    });
    const data = await res.json();
    if (data.success) {
      msgEl.textContent = '✅ Message sent! I\'ll get back to you soon.';
      msgEl.className = 'form-msg success';
      this.reset();
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    msgEl.textContent = '❌ Something went wrong. Please try again.';
    msgEl.className = 'form-msg error';
  } finally {
    btn.textContent = 'Send Message';
    btn.disabled = false;
  }
});

// ===== CASE STUDY MODAL =====
const caseData = [
  {
    sub: 'Popcorn Style',
    type: 'SaaS / Product',
    title: '230K+ Views, Organic Product Validation on Reddit',
    stats: [
      { num: '230K+', label: 'Views' },
      { num: '275+', label: 'Upvotes' },
      { num: '₹0', label: 'Ad Spend' },
    ],
    challenge: 'Popcorn Style needed to validate their product problem and build credibility in engineering and manager communities , without sounding like a brand pushing a product. Cold outreach and paid ads felt misaligned with the audience.',
    strategy: 'Used a storytelling-first approach to enter relevant subreddits organically. Posts led with the problem, not the product. Focused on sparking genuine discussion threads that allowed the community to validate the pain point themselves.',
    result: '230K+ views across Reddit posts, 275+ upvotes, and high-quality discussion threads. Built credibility in engineering and manager communities, validated the product problem organically, and laid the foundation for organic product adoption.',
    tags: ['Product Validation', 'Community Storytelling', 'Engineering Communities', 'Organic Growth'],
  },
  {
    sub: 'Dresma',
    type: 'B2B SaaS',
    title: '16+ Contributions in 2 Weeks Across 6 Subreddits',
    stats: [
      { num: '16+', label: 'Contributions' },
      { num: '6+', label: 'Subreddits' },
      { num: '2wk', label: 'Timeline' },
    ],
    challenge: 'Dresma wanted brand recognition in niche communities without coming across as promotional. Previous attempts at self-promotion had been poorly received and the team had no clear Reddit strategy.',
    strategy: 'Mapped 6+ niche subreddits where Dresma\'s target users were already active. Deployed a contribution-first strategy , adding genuine value in discussions before any brand mention. Built trust through consistent, helpful presence.',
    result: '16+ contributions in 2 weeks across 6+ niche subreddits. Users began organically mentioning Dresma in discussions. Built trust-first brand recognition without ads and generated inbound leads directly from community interactions.',
    tags: ['Trust-First Branding', 'Niche Subreddits', 'Organic Mentions', 'Inbound Leads'],
  },
  {
    sub: 'Schmooze',
    type: 'Startup',
    title: '45-Min Consulting → Clear Reddit Growth Roadmap',
    stats: [
      { num: '45min', label: 'Session' },
      { num: '1', label: 'Clear Roadmap' },
      { num: '0', label: 'Guesswork' },
    ],
    challenge: 'The Schmooze team was unsure how to position their brand on Reddit without triggering negative community reactions. They lacked clarity on content fit, entry strategy, and how to avoid being perceived as spam.',
    strategy: 'Conducted a focused 45-minute consulting session covering subreddit selection, content positioning, and a comment-first entry strategy. Defined a problem-led approach that prioritised community value over brand visibility.',
    result: 'Team immediately understood content fit and positioning. Reduced risk of negative perception on Reddit. Defined a comment-first, problem-led entry strategy that enabled confident, structured execution of organic growth.',
    tags: ['Reddit Consulting', 'Entry Strategy', 'Comment-First', 'Brand Positioning'],
  },
  {
    sub: 'SiftHub',
    type: 'B2B SaaS',
    title: 'Fixed Brand Positioning & Eliminated Promotional Tone',
    stats: [
      { num: '✓', label: 'Tone Fixed' },
      { num: '✓', label: 'Positioning Set' },
      { num: '0', label: 'Ad Spend' },
    ],
    challenge: 'SiftHub\'s Reddit presence had an over-polished, promotional tone that was creating friction with communities. The brand was struggling to engage authentically and risked being ignored or flagged by moderators.',
    strategy: 'Audited existing content and identified specific tone and framing issues. Rebuilt the brand\'s Reddit voice to feel like a community member, not a marketer. Identified the right subreddits and engagement patterns for authentic participation.',
    result: 'Eliminated guesswork around brand positioning on Reddit. Identified and fixed promotional tone issues. Improved authentic community engagement, built credibility in relevant subreddits, and laid the groundwork for organic brand mentions.',
    tags: ['Brand Audit', 'Tone Rebuild', 'Community Engagement', 'Authentic Positioning'],
  },
  {
    sub: 'u/Captain_donutt',
    type: 'Personal Brand',
    title: '4,200+ Karma & Ebook Sold Organically on Reddit',
    stats: [
      { num: '4,200+', label: 'Karma' },
      { num: '970+', label: 'Contributions' },
      { num: '40+', label: 'Communities' },
    ],
    challenge: 'Building a personal brand on Reddit from scratch in the mental health and spirituality space , a niche where audiences are highly sensitive to inauthenticity and self-promotion.',
    strategy: 'Focused on genuine, high-value contributions across 40+ communities over time. Built a recognisable voice through consistent, empathetic engagement. Introduced an ebook only after establishing deep trust with the audience.',
    result: '970+ contributions across 40+ communities, 4,200+ karma accumulated. Developed a loyal, highly engaged audience with 20+ regular followers. Successfully sold an ebook organically in relevant subreddits , zero paid promotion.',
    tags: ['Personal Branding', 'Mental Health Niche', 'Organic Ebook Sales', 'Community Trust'],
  },
];

const modal = document.getElementById('caseModal');
const modalClose = document.getElementById('modalClose');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalCta = document.getElementById('modalCta');

function openModal(index) {
  const d = caseData[index];

  document.getElementById('modalSub').textContent = d.sub;
  document.getElementById('modalType').textContent = d.type;
  document.getElementById('modalTitle').textContent = d.title;
  document.getElementById('modalChallenge').textContent = d.challenge;
  document.getElementById('modalStrategy').textContent = d.strategy;
  document.getElementById('modalResult').textContent = d.result;

  document.getElementById('modalStats').innerHTML = d.stats
    .map(s => `<div class="modal__stat"><span class="modal__stat-num">${s.num}</span><span class="modal__stat-label">${s.label}</span></div>`)
    .join('');

  document.getElementById('modalTags').innerHTML = d.tags
    .map(t => `<span class="modal__tag">${t}</span>`)
    .join('');

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

// Open on card click / keyboard
document.querySelectorAll('.case-card[data-case]').forEach(card => {
  card.addEventListener('click', () => openModal(+card.dataset.case));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(+card.dataset.case); }
  });
});

// Close handlers
modalClose.addEventListener('click', closeModal);
modalCloseBtn.addEventListener('click', closeModal);
modalCta.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ===== BOOKING FLOW =====
const booking = {
  session: null,
  date: null,
  time: null,
  name: '', email: '', reddit: '', goal: '', budget: '', context: '',
};

// Available time slots — 11 AM to 2 PM and 8 PM to 11 PM (1-hour intervals)
const timeSlots = {
  coffee:   ['11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'],
  strategy: ['11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'],
};

// Simulate some booked slots (date string → array of times)
const bookedSlots = {};

let calYear, calMonth;

function initCalendar() {
  const now = new Date();
  calYear = now.getFullYear();
  calMonth = now.getMonth();
  renderCalendar();
}

function renderCalendar() {
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  document.getElementById('calMonthLabel').textContent = `${monthNames[calMonth]} ${calYear}`;

  const grid = document.getElementById('calGrid');
  grid.innerHTML = '';

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const now = new Date();
  // 48-hour buffer: earliest bookable date is 2 days from now
  const earliest = new Date(now.getTime() + 48 * 60 * 60 * 1000);
  earliest.setHours(0, 0, 0, 0);

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement('div');
    empty.className = 'cal-day empty';
    grid.appendChild(empty);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(calYear, calMonth, d);
    const dayOfWeek = date.getDay();
    const isPast = date < earliest;
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const dateStr = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;

    const el = document.createElement('div');
    el.textContent = d;
    el.className = 'cal-day';

    if (isPast || isWeekend) {
      el.classList.add('disabled');
    } else {
      el.classList.add('available');
      if (date.toDateString() === earliest.toDateString()) el.classList.add('today');
      if (booking.date === dateStr) el.classList.add('selected');
      el.addEventListener('click', () => selectDate(dateStr, d));
    }
    grid.appendChild(el);
  }
}

function selectDate(dateStr, day) {
  booking.date = dateStr;
  booking.time = null;
  renderCalendar();

  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  document.getElementById('selectedDateLabel').textContent =
    `— ${monthNames[calMonth]} ${day}, ${calYear}`;

  renderTimeSlots(dateStr);
  document.getElementById('bNext2').disabled = true;
}

function renderTimeSlots(dateStr) {
  const container = document.getElementById('timeSlots');
  const slots = timeSlots[booking.session] || timeSlots.coffee;
  const booked = bookedSlots[dateStr] || [];

  container.innerHTML = '';
  slots.forEach(time => {
    const el = document.createElement('div');
    el.className = 'time-slot' + (booked.includes(time) ? ' booked' : '');
    el.textContent = time;
    if (!booked.includes(time)) {
      el.addEventListener('click', () => {
        document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
        el.classList.add('selected');
        booking.time = time;
        document.getElementById('bNext2').disabled = false;
      });
    }
    container.appendChild(el);
  });
}

// Step navigation
function goToStep(step) {
  document.querySelectorAll('.booking-panel').forEach((p, i) => {
    p.classList.toggle('active', i + 1 === step);
  });
  document.querySelectorAll('.booking-step').forEach((s, i) => {
    s.classList.remove('active', 'done');
    if (i + 1 === step) s.classList.add('active');
    if (i + 1 < step) s.classList.add('done');
  });
  // Scroll to booking section
  document.getElementById('book').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Step 1 — session selection
// Step 1 — session selection (single card, button-driven)
document.getElementById('bSelectCoffee').addEventListener('click', () => {
  const card = document.querySelector('.booking-card[data-session="coffee"]');
  card.classList.add('selected');
  booking.session = 'coffee';
  booking.date = null;
  booking.time = null;
  document.getElementById('payStep').classList.add('booking-step--hidden');
  document.getElementById('payStepLine').classList.add('booking-step-line--hidden');
  initCalendar();
  goToStep(2);
});

document.getElementById('calPrev').addEventListener('click', () => {
  calMonth--;
  if (calMonth < 0) { calMonth = 11; calYear--; }
  renderCalendar();
});
document.getElementById('calNext').addEventListener('click', () => {
  calMonth++;
  if (calMonth > 11) { calMonth = 0; calYear++; }
  renderCalendar();
});
document.getElementById('bBack2').addEventListener('click', () => goToStep(1));
document.getElementById('bNext2').addEventListener('click', () => {
  if (booking.date && booking.time) goToStep(3);
});

// Step 3 nav
document.getElementById('bBack3').addEventListener('click', () => goToStep(2));
document.getElementById('bNext3').addEventListener('click', () => {
  const form = document.getElementById('bookingForm');
  if (!form.checkValidity()) { form.reportValidity(); return; }
  booking.name    = document.getElementById('bName').value.trim();
  booking.email   = document.getElementById('bEmail').value.trim();
  booking.reddit  = document.getElementById('bReddit').value.trim();
  booking.goal    = document.getElementById('bGoal').value;
  booking.budget  = document.getElementById('bBudget').value;
  booking.context = document.getElementById('bContext').value.trim();
  renderConfirm();
  goToStep(4);
});

function renderConfirm() {
  const sessionLabel = booking.session === 'coffee' ? '🎯 Reddit Strategy Consultation (Free)' : '🚀 Deep Dive Strategy Session (Paid)';
  const goalMap = { leads:'Generate inbound leads', brand:'Build personal brand', traffic:'Drive website traffic', community:'Grow a community', other:'Other' };
  const budgetMap = { 'under-5k':'Under ₹5,000', '5k-20k':'₹5,000 – ₹20,000', '20k-50k':'₹20,000 – ₹50,000', '50k-1l':'₹50,000 – ₹1,00,000', 'above-1l':'Above ₹1,00,000' };
  const [y, m, d] = booking.date.split('-');
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const dateLabel = `${monthNames[+m-1]} ${+d}, ${y}`;

  const rows = [
    ['Session', sessionLabel],
    ['Date', dateLabel],
    ['Time', booking.time],
    ['Name', booking.name],
    ['Email', booking.email],
    booking.reddit ? ['Reddit', booking.reddit] : null,
    ['Goal', goalMap[booking.goal] || booking.goal],
    ['Budget', budgetMap[booking.budget] || booking.budget],
    booking.context ? ['Notes', booking.context] : null,
  ].filter(Boolean);

  document.getElementById('confirmSummary').innerHTML = rows.map(([label, val]) =>
    `<div class="confirm-row">
      <span class="confirm-row__label">${label}</span>
      <span class="confirm-row__val">${val}</span>
    </div>`
  ).join('');
}

// Step 4 — submit
document.getElementById('bBack4').addEventListener('click', () => goToStep(3));
document.getElementById('bSubmit').addEventListener('click', async () => {
  const btn = document.getElementById('bSubmit');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  const [y, m, d] = booking.date.split('-');
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dateLabel = `${monthNames[+m-1]} ${+d}, ${y}`;

  // Pre-build success summary
  const sessionLabel2 = booking.session === 'coffee' ? '🎯 Reddit Strategy Consultation' : '🚀 Deep Dive Strategy Session';
  document.getElementById('successSummary').innerHTML = `
    <div class="confirm-row"><span class="confirm-row__label">Session</span><span class="confirm-row__val">${sessionLabel2}</span></div>
    <div class="confirm-row"><span class="confirm-row__label">Date</span><span class="confirm-row__val">${dateLabel}</span></div>
    <div class="confirm-row"><span class="confirm-row__label">Time</span><span class="confirm-row__val">${booking.time}</span></div>
    <div class="confirm-row"><span class="confirm-row__label">Email</span><span class="confirm-row__val">${booking.email}</span></div>
  `;

  if (booking.session === 'strategy') {
    btn.textContent = 'Confirm Booking ✓';
    btn.disabled = false;
    goToStep(5); // go to payment step
  } else {
    await sendBookingEmail();
    btn.textContent = 'Confirm Booking ✓';
    btn.disabled = false;
    goToStep(6); // free — skip payment
  }
});

// Send booking confirmation via mailto
async function sendBookingEmail() {
  const sessionLabel = booking.session === 'coffee' ? 'Reddit Strategy Consultation (Free)' : 'Deep Dive Strategy Session (Paid)';
  const [y, m, d] = booking.date.split('-');
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dateLabel = `${monthNames[+m-1]} ${+d}, ${y}`;

  const payload = {
    access_key: W3F_KEY,
    subject: `[Booking] ${sessionLabel} — ${booking.name}`,
    from_name: 'Reddit Strategist Site',
    replyto: booking.email,
    // All booking details as individual fields for a clean email
    'Session':  sessionLabel,
    'Date':     dateLabel,
    'Time':     booking.time,
    'Name':     booking.name,
    'Email':    booking.email,
    'Reddit':   booking.reddit || 'Not provided',
    'Goal':     booking.goal,
    'Budget':   booking.budget || 'Not specified',
    'Payment':  booking.paymentId || 'N/A',
    'Notes':    booking.context || 'None',
  };

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!data.success) console.error('Web3Forms error:', data);
  } catch (err) {
    console.error('Booking email failed:', err);
  }
}

// ===== RAZORPAY PAYMENT (Step 5) =====
// Replace 'YOUR_RAZORPAY_KEY_ID' with your actual key from razorpay.com/dashboard
const RAZORPAY_KEY = 'YOUR_RAZORPAY_KEY_ID';
const SESSION_PRICE_PAISE = 299900; // ₹2,999 in paise

document.getElementById('bBack5').addEventListener('click', () => goToStep(4));

document.getElementById('bPayNow').addEventListener('click', () => {
  const payMsg = document.getElementById('paymentMsg');
  payMsg.textContent = '';
  payMsg.className = 'form-msg';

  if (RAZORPAY_KEY === 'YOUR_RAZORPAY_KEY_ID') {
    payMsg.textContent = '⚠️ Add your Razorpay Key ID in script.js to enable live payments.';
    payMsg.className = 'form-msg error';
    return;
  }

  const options = {
    key: RAZORPAY_KEY,
    amount: SESSION_PRICE_PAISE,
    currency: 'INR',
    name: 'Reddit Strategist',
    description: 'Deep Dive Strategy Session',
    prefill: { name: booking.name, email: booking.email },
    theme: { color: '#FF4500' },
    handler: function (response) {
      booking.paymentId = response.razorpay_payment_id;
      sendBookingEmail();
      goToStep(6);
    },
    modal: {
      ondismiss: function () {
        payMsg.textContent = 'Payment cancelled. Try again when ready.';
        payMsg.className = 'form-msg error';
      }
    }
  };

  const rzp = new Razorpay(options);
  rzp.on('payment.failed', function (response) {
    payMsg.textContent = `Payment failed: ${response.error.description}`;
    payMsg.className = 'form-msg error';
  });
  rzp.open();
});

function resetBooking() {
  booking.session = null; booking.date = null; booking.time = null;
  booking.name = ''; booking.email = ''; booking.reddit = ''; booking.goal = ''; booking.budget = ''; booking.context = '';
  booking.paymentId = null;
  document.querySelector('.booking-card[data-session]')?.classList.remove('selected');
  document.getElementById('bookingForm').reset();
  document.getElementById('payStep').classList.add('booking-step--hidden');
  document.getElementById('payStepLine').classList.add('booking-step-line--hidden');
  goToStep(1);
}

// ===== SLIDER FACTORY =====
function makeSlider(trackId, prevId, nextId, dotsId, perViewFn) {
  const track   = document.getElementById(trackId);
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);
  const dotsEl  = document.getElementById(dotsId);
  if (!track) return;

  const gap = 24;
  let current = 0;

  function cards() { return Array.from(track.children); }

  function perView() { return perViewFn(); }

  function applyWidths() {
    const w   = track.parentElement.clientWidth;
    const pv  = perView();
    const cw  = Math.floor((w - gap * (pv - 1)) / pv);
    cards().forEach(c => {
      c.style.flex     = `0 0 ${cw}px`;
      c.style.maxWidth = `${cw}px`;
    });
    return cw;
  }

  function totalSlides() {
    return Math.max(1, cards().length - perView() + 1);
  }

  function buildDots() {
    dotsEl.innerHTML = '';
    for (let i = 0; i < totalSlides(); i++) {
      const dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === current ? ' active' : '');
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(dot);
    }
  }

  function goTo(index) {
    const total = totalSlides();
    current = Math.max(0, Math.min(index, total - 1));
    const cw     = applyWidths();
    const offset = current * (cw + gap);
    track.style.transform = `translateX(-${offset}px)`;
    dotsEl.querySelectorAll('.slider-dot').forEach((d, i) =>
      d.classList.toggle('active', i === current)
    );
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current >= total - 1;
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  // Swipe support
  let tx = 0;
  track.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const diff = tx - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });

  // Rebuild on resize
  let timer;
  window.addEventListener('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(() => { buildDots(); goTo(Math.min(current, totalSlides() - 1)); }, 150);
  });

  // Init after layout is painted
  requestAnimationFrame(() => { buildDots(); goTo(0); });
}

// Case studies — 2 per view desktop, 1 mobile
makeSlider(
  'sliderTrack', 'sliderPrev', 'sliderNext', 'sliderDots',
  () => window.innerWidth <= 768 ? 1 : 2
);

// Testimonials — 3 desktop, 2 tablet, 1 mobile
makeSlider(
  'testiTrack', 'testiPrev', 'testiNext', 'testiDots',
  () => window.innerWidth <= 640 ? 1 : window.innerWidth <= 1024 ? 2 : 3
);

// ===== TESTIMONIAL LIGHTBOX =====
const testiLightbox = document.getElementById('testiLightbox');
const testiLbClose  = document.getElementById('testiLbClose');
const testiLbPrev   = document.getElementById('testiLbPrev');
const testiLbNext   = document.getElementById('testiLbNext');
let lbIndex = 0;

function openLightbox(index) {
  lbIndex = index;
  showLbCard(lbIndex);
  testiLightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function showLbCard(index) {
  const allCards = Array.from(document.querySelectorAll('.testi-card'));
  lbIndex = Math.max(0, Math.min(index, allCards.length - 1));

  const container = document.getElementById('testiLbContent');
  container.innerHTML = '';

  const clone = allCards[lbIndex].cloneNode(true);
  clone.style.cursor = 'default';
  clone.style.transform = 'none';
  container.appendChild(clone);

  testiLbPrev.style.display = lbIndex === 0 ? 'none' : 'flex';
  testiLbNext.style.display = lbIndex === allCards.length - 1 ? 'none' : 'flex';
}

function closeLightbox() {
  testiLightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.testi-card').forEach((card, i) => {
  card.addEventListener('click', () => openLightbox(i));
});

testiLbClose.addEventListener('click', closeLightbox);
testiLbPrev.addEventListener('click',  () => showLbCard(lbIndex - 1));
testiLbNext.addEventListener('click',  () => showLbCard(lbIndex + 1));
testiLightbox.addEventListener('click', e => { if (e.target === testiLightbox) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (!testiLightbox.classList.contains('open')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')   showLbCard(lbIndex - 1);
  if (e.key === 'ArrowRight')  showLbCard(lbIndex + 1);
});


// ===== PLANS TOGGLE =====
document.querySelectorAll('.plans-toggle__btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.plans-toggle__btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.plans-edition').forEach(e => e.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(`edition-${btn.dataset.edition}`).classList.add('active');
  });
});

// ===== NEWSLETTER FORM =====
document.getElementById('newsletterForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const name  = this.querySelector('#nlName').value.trim();
  const email = this.querySelector('#nlEmail').value.trim();
  const msgEl = document.getElementById('nlMsg');
  const btn   = this.querySelector('button[type="submit"]');

  if (!name || !email) return;

  btn.textContent = 'Subscribing...';
  btn.disabled = true;
  msgEl.textContent = '';
  msgEl.className = 'form-msg';

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: W3F_KEY,
        subject: `[Newsletter] New Subscriber — ${name}`,
        from_name: name,
        replyto: email,
        'Name': name,
        'Email': email,
        'Type': 'Newsletter Subscription',
      }),
    });
    const data = await res.json();
    if (data.success) {
      msgEl.textContent = '✅ You\'re subscribed! First issue coming soon.';
      msgEl.className = 'form-msg success';
      this.reset();
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    msgEl.textContent = '❌ Something went wrong. Please try again.';
    msgEl.className = 'form-msg error';
  } finally {
    btn.textContent = 'Subscribe — It\'s Free';
    btn.disabled = false;
  }
});
