// ===== CONFIG — replace with your email =====
const YOUR_EMAIL = 'vithikamarketing@gmail.com';

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

// ===== MAILTO HELPER =====
function sendViaMail(subject, body, msgEl, formEl) {
  const mailto = `mailto:${YOUR_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
  msgEl.textContent = '✅ Your email client should open now. Hit send to complete your submission!';
  msgEl.className = 'form-msg success';
  formEl.reset();
}

// ===== AUDIT FORM =====
document.getElementById('auditForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name     = this.name.value.trim();
  const email    = this.email.value.trim();
  const username = this.username.value.trim();
  const goal     = this.goal.value;

  if (!name || !email || !username) return;

  const subject = `[Reddit Audit Request] ${name}`;
  const body =
`Reddit Profile Audit Request
-----------------------------
Name:            ${name}
Email:           ${email}
Reddit Username: ${username}
Goal:            ${goal || 'Not specified'}
`;

  sendViaMail(subject, body, document.getElementById('auditMsg'), this);
});

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name    = this.name.value.trim();
  const email   = this.email.value.trim();
  const subject = this.subject.value.trim();
  const message = this.message.value.trim();

  if (!name || !email || !subject || !message) return;

  const mailSubject = `[Contact] ${subject}`;
  const body =
`New Contact Form Message
------------------------
Name:    ${name}
Email:   ${email}
Subject: ${subject}

Message:
${message}
`;

  sendViaMail(mailSubject, body, document.getElementById('contactMsg2'), this);
});

// ===== CASE STUDY MODAL =====
const caseData = [
  {
    sub: 'r/Entrepreneur',
    type: 'SaaS Founder',
    title: 'Grew SaaS Founder to Top of r/Entrepreneur',
    stats: [
      { num: '2.4K', label: 'Upvotes' },
      { num: '14', label: 'Inbound Leads' },
      { num: '72h', label: 'Turnaround' },
    ],
    challenge: 'A B2B SaaS founder was posting product updates that read like press releases. Every post got buried or removed. The community saw right through the pitch — engagement was near zero and the account had zero credibility.',
    strategy: 'Repositioned the narrative from "product pitch" to "founder journey." Rewrote the hook to lead with a personal struggle, not a feature. Identified the exact posting window when r/Entrepreneur\'s most engaged users were active. Used a story arc: problem → failed attempts → breakthrough → lesson.',
    result: 'The reframed post hit the front page of r/Entrepreneur within 6 hours. 2.4K upvotes, 300+ comments, and 14 inbound demo requests in 72 hours — all organic, zero ad spend.',
    tags: ['Narrative Reframing', 'Hook Writing', 'Subreddit Timing', 'Story Arc'],
  },
  {
    sub: 'r/startups + r/SaaS',
    type: 'Solo Founder',
    title: 'Increased Inbound Leads via Niche Subreddits',
    stats: [
      { num: '340%', label: 'Traffic Lift' },
      { num: '6', label: 'New Subreddits' },
      { num: '$0', label: 'Ad Spend' },
    ],
    challenge: 'A solo founder had a dev tool with real value but was only posting in the two obvious subreddits. Reach was limited, posts felt repetitive, and the audience was already saturated with similar tools.',
    strategy: 'Ran a full subreddit mapping exercise — identified 6 underserved communities where the tool\'s core problem was actively discussed but no solution was being promoted. Built a 30-day content calendar with unique angles for each subreddit, tailored to each community\'s tone and rules.',
    result: 'Organic traffic up 340% in 30 days. The founder started getting DMs from users who found them through subreddits they\'d never even heard of. Three of the six subreddits became consistent lead sources.',
    tags: ['Subreddit Research', 'Content Calendar', 'Community Mapping', 'Organic Growth'],
  },
  {
    sub: 'r/personalfinance',
    type: 'Fintech Brand',
    title: 'Turned Community Audit into Brand Credibility',
    stats: [
      { num: '1.1K', label: 'Upvotes' },
      { num: '5/5', label: 'Posts Approved' },
      { num: '0', label: 'Removals After' },
    ],
    challenge: 'A fintech brand had 3 posts removed in a single week. The account was at risk of a shadowban. Moderators were flagging content as promotional even though the team thought they were being helpful.',
    strategy: 'Conducted a full community audit — reviewed every removed post, cross-referenced subreddit rules, and identified the exact phrases and structures triggering mod filters. Rebuilt their entire voice guide: less brand, more community member. Shifted from "we offer" to "here\'s what I learned."',
    result: 'The next 5 posts were all approved without issue. One hit 1.1K upvotes and was featured in the subreddit\'s weekly digest. Zero removals in the 60 days following the audit.',
    tags: ['Community Audit', 'Voice Rebuild', 'Mod Compliance', 'Shadowban Recovery'],
  },
  {
    sub: 'r/marketing + r/agency',
    type: 'Agency Owner',
    title: 'Built Thought Leadership for Agency Owner',
    stats: [
      { num: '12K', label: 'Karma Gained' },
      { num: '3', label: 'Retainer Clients' },
      { num: '90', label: 'Day Sprint' },
    ],
    challenge: 'An agency owner had zero Reddit presence and was skeptical the platform could generate real business. They\'d tried posting twice, got no traction, and gave up. Starting from scratch with a brand-new account.',
    strategy: 'Built a 90-day comment-first strategy — no posts for the first 30 days, only high-value comments in threads where potential clients were asking questions. Established credibility before ever publishing original content. Then introduced a weekly "lessons from client work" post series that never mentioned the agency directly.',
    result: '12K karma in 90 days. Three agency retainer clients reached out via Reddit DM — all said they\'d been following the account for weeks before reaching out. The comment strategy alone drove more qualified leads than their LinkedIn presence.',
    tags: ['Comment Strategy', 'Thought Leadership', '90-Day Sprint', 'DM Funnel'],
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
  name: '', email: '', reddit: '', goal: '', context: '',
};

// Available time slots per session type
const timeSlots = {
  coffee:   ['9:00 AM', '9:30 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'],
  strategy: ['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'],
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
  const today = new Date();
  today.setHours(0,0,0,0);

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement('div');
    empty.className = 'cal-day empty';
    grid.appendChild(empty);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(calYear, calMonth, d);
    const dayOfWeek = date.getDay();
    const isPast = date < today;
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const dateStr = `${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;

    const el = document.createElement('div');
    el.textContent = d;
    el.className = 'cal-day';

    if (isPast || isWeekend) {
      el.classList.add('disabled');
    } else {
      el.classList.add('available');
      if (date.toDateString() === today.toDateString()) el.classList.add('today');
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
document.querySelectorAll('.booking-card[data-session]').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.booking-card[data-session]').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    booking.session = card.dataset.session;
    booking.date = null;
    booking.time = null;

    // Show/hide payment step indicator
    const payStep = document.getElementById('payStep');
    const payStepLine = document.getElementById('payStepLine');
    if (booking.session === 'strategy') {
      payStep.classList.remove('booking-step--hidden');
      payStepLine.classList.remove('booking-step-line--hidden');
    } else {
      payStep.classList.add('booking-step--hidden');
      payStepLine.classList.add('booking-step-line--hidden');
    }

    setTimeout(() => goToStep(2), 200);
    initCalendar();
  });
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
  });
});

// Step 2 nav
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
  booking.context = document.getElementById('bContext').value.trim();
  renderConfirm();
  goToStep(4);
});

function renderConfirm() {
  const sessionLabel = booking.session === 'coffee' ? '☕ 20-Min Coffee Chat (Free)' : '🚀 Deep Dive Strategy Session (Paid)';
  const goalMap = { leads:'Generate inbound leads', brand:'Build personal brand', traffic:'Drive website traffic', community:'Grow a community', other:'Other' };
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
document.getElementById('bSubmit').addEventListener('click', () => {
  const btn = document.getElementById('bSubmit');
  btn.textContent = 'Processing...';
  btn.disabled = true;

  const [y, m, d] = booking.date.split('-');
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dateLabel = `${monthNames[+m-1]} ${+d}, ${y}`;

  // Pre-build success summary
  const sessionLabel2 = booking.session === 'coffee' ? '☕ 20-Min Coffee Chat' : '🚀 Deep Dive Strategy Session';
  document.getElementById('successSummary').innerHTML = `
    <div class="confirm-row"><span class="confirm-row__label">Session</span><span class="confirm-row__val">${sessionLabel2}</span></div>
    <div class="confirm-row"><span class="confirm-row__label">Date</span><span class="confirm-row__val">${dateLabel}</span></div>
    <div class="confirm-row"><span class="confirm-row__label">Time</span><span class="confirm-row__val">${booking.time}</span></div>
    <div class="confirm-row"><span class="confirm-row__label">Email</span><span class="confirm-row__val">${booking.email}</span></div>
  `;

  setTimeout(() => {
    btn.textContent = 'Confirm Booking ✓';
    btn.disabled = false;
    if (booking.session === 'strategy') {
      goToStep(5); // go to payment step
    } else {
      sendBookingEmail();
      goToStep(6); // free — skip payment
    }
  }, 400);
});

// Send booking confirmation via mailto
function sendBookingEmail() {
  const sessionLabel = booking.session === 'coffee' ? '20-Min Coffee Chat (Free)' : 'Deep Dive Strategy Session (Paid)';
  const [y, m, d] = booking.date.split('-');
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dateLabel = `${monthNames[+m-1]} ${+d}, ${y}`;
  const subject = `[Booking] ${sessionLabel} — ${booking.name}`;
  const body =
`New Session Booking
-------------------
Session:  ${sessionLabel}
Date:     ${dateLabel}
Time:     ${booking.time}

Name:     ${booking.name}
Email:    ${booking.email}
Reddit:   ${booking.reddit || 'Not provided'}
Goal:     ${booking.goal}
Payment:  ${booking.paymentId || 'N/A'}

Notes:
${booking.context || 'None'}
`;
  window.location.href = `mailto:${YOUR_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
  booking.name = ''; booking.email = ''; booking.reddit = ''; booking.goal = ''; booking.context = '';
  booking.paymentId = null;
  document.querySelectorAll('.booking-card[data-session]').forEach(c => c.classList.remove('selected'));
  document.getElementById('bookingForm').reset();
  // Hide payment step indicator on reset
  document.getElementById('payStep').classList.add('booking-step--hidden');
  document.getElementById('payStepLine').classList.add('booking-step-line--hidden');
  goToStep(1);
}
