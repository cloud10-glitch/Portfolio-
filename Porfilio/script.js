/* =========================================================
   SCRIPT.JS
   This file controls what the website DOES
   (interactions, animations, and dynamically-built content)
   ========================================================= */

/* ---------------------------------------------------------
   1. NAVBAR SHADOW ON SCROLL
   When the user scrolls down more than 40px, add a class
   called "scrolled" to the navbar (this class is styled in
   style.css to show a shadow).
--------------------------------------------------------- */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const hasScrolledDown = window.scrollY > 40;
  navbar.classList.toggle('scrolled', hasScrolledDown);
});


/* ---------------------------------------------------------
   2. GLOWING ORB FOLLOWS THE MOUSE
   As the mouse moves, the big blurry circle in the
   background shifts slightly to "follow" the cursor.
--------------------------------------------------------- */
const orb1 = document.getElementById('orb1');

document.addEventListener('mousemove', (e) => {
  // Work out how far the mouse is from the center of the screen
  const moveX = (e.clientX / window.innerWidth - 0.5) * 40;
  const moveY = (e.clientY / window.innerHeight - 0.5) * 40;
  orb1.style.transform = `translate(${moveX}px, ${moveY}px)`;
});


/* ---------------------------------------------------------
   3. FADE-UP ANIMATION WHEN SCROLLING INTO VIEW
   Any element with the class "fade-up" starts invisible.
   When it scrolls into the visible part of the screen,
   we add the "visible" class, which style.css animates.
--------------------------------------------------------- */
const fadeElements = document.querySelectorAll('.fade-up');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 }); // trigger when 15% of the element is visible

fadeElements.forEach((el) => fadeObserver.observe(el));


/* ---------------------------------------------------------
   4. SKILLS DATA
   Instead of writing repetitive HTML for every skill card,
   we store the data in a simple list, then use JavaScript
   to build the cards automatically.
--------------------------------------------------------- */
const skills = [
  { icon: '🌐', name: 'Network Protocols (TCP/IP, VLAN)', pct: 88 },
  { icon: '🧰', name: 'Wireshark / Nmap', pct: 86 },
  { icon: '🛡️', name: 'Firewall & ACLs (pfSense, Cisco)', pct: 82 },
  { icon: '👁️‍🗨️', name: 'IDS/IPS (Snort/Suricata)', pct: 78 },
  { icon: '🐍', name: 'Scripting: Python / Scapy', pct: 80 },
  { icon: '🔧', name: 'Git & DevOps', pct: 88 },
  { icon: '🎨', name: 'HTML & CSS / Tailwind', pct: 95 },
  { icon: '☁️', name: 'AWS / Cloud Deployment', pct: 74 },
];

const skillsGrid = document.getElementById('skills-grid');

skills.forEach((skill) => {
  // Create one card <div> per skill
  const card = document.createElement('div');
  card.className = 'skill-card fade-up';
  card.innerHTML = `
    <div class="skill-icon">${skill.icon}</div>
    <div class="skill-name">${skill.name}</div>
    <div class="skill-bar">
      <div class="skill-fill" data-pct="${skill.pct}"></div>
    </div>
    <div class="skill-pct">${skill.pct}% Proficiency</div>
  `;
  skillsGrid.appendChild(card);
  fadeObserver.observe(card); // make this new card fade in too
});

/* Animate each skill's progress bar filling up once it's visible */
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const fillBar = entry.target.querySelector('.skill-fill');
      if (fillBar) {
        fillBar.style.width = fillBar.dataset.pct + '%';
      }
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach((card) => barObserver.observe(card));


/* ---------------------------------------------------------
   5. PROJECTS DATA
   Same idea as skills above: store project info in a list,
   then generate the project cards with JavaScript.
--------------------------------------------------------- */
const projects = [
  {
    icon: '🛒', color: '#DBEEFF',
    tag: 'E-Commerce', title: 'Watch Me ',
    desc: 'A full-featured e-commerce watch retailor website  , with payment gateway integration and inventory management.',
    links: [
      { text: 'Watch Repo', url: 'https://github.com/cloud10-glitch/Web-Project.git', external: true },
      { text: 'GitHub', url: 'https://github.com/cloud10-glitch/Web-Project.git', external: true }
    ]
  },
 {
    icon: '🧴', color: '#FDE8FF',
    tag: 'Billing System', title: 'Cosmetic Billing',
    desc: 'Billing system for cosmetic products with company name, invoice date, and prices shown in Rs for clear customer invoices.',
    
    links: [
      { text: 'Invoice Demo', url: '#', external: false },
      { text: 'GitHub', url: 'https://github.com/cloud10-glitch/Cosmetic-invatory.git', external: true }
    ]
  }, 
  
  {
    icon: '🤖', color: '#D6F0FF',
    tag: 'IoT', title: 'Smart Helmet',
    desc: 'Smart helmet  accident detector with  sensor data, SMS alerts, and cloud .',
    links: [
      { text: 'Case Study', url: '#', external: false },
      { text: 'GitHub', url: 'https://github.com/cloud10-glitch', external: true }
    ]
  },
  
];

const projectsGrid = document.getElementById('projects-grid');

projects.forEach((project) => {
  const card = document.createElement('div');
  card.className = 'project-card fade-up';

  const detailsHtml = project.details
    ? `<div class="project-details">${project.details.map((item) => `<div>${item}</div>`).join('')}</div>`
    : '';

  // Build the little "Live Demo / GitHub" links for this project
  const linksHtml = project.links
    .map((link) => {
      if (typeof link === 'string') {
        return `<a href="#" class="project-link">${link}</a>`;
      }
      if (typeof link === 'object' && link.url) {
        const target = link.external ? ' target="_blank" rel="noopener noreferrer"' : '';
        const text = link.text || link.url;
        return `<a href="${link.url}" class="project-link"${target}>${text}</a>`;
      }
      return '';
    })
    .join('');

  card.innerHTML = `
    <div class="project-thumb" style="background:${project.color}">${project.icon}</div>
    <div class="project-body">
      <span class="project-tag">${project.tag}</span>
      <div class="project-title">${project.title}</div>
      <div class="project-desc">${project.desc}</div>
      ${detailsHtml}
      <div class="project-links">${linksHtml}</div>
    </div>
  `;
  projectsGrid.appendChild(card);
  fadeObserver.observe(card);
});


/* ---------------------------------------------------------
   6. CONTACT FORM SUBMISSION
   Since this is a static site (no real server), we fake
   sending the message: show "Sending…", wait 1.4 seconds,
   then show a success message and clear the form.
--------------------------------------------------------- */
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault(); // stop the page from reloading

  const submitButton = this.querySelector('button[type=submit]');
  submitButton.textContent = 'Sending…';
  submitButton.disabled = true;

  setTimeout(() => {
    document.getElementById('msg-sent').style.display = 'block';
    this.reset(); // clear the form fields
    submitButton.textContent = 'Send Message ✈';
    submitButton.disabled = false;
  }, 1400);
});


/* ---------------------------------------------------------
   7. HERO NAME ENTRANCE ANIMATION
   When the page first loads, the big name fades in and
   slides up gently instead of just appearing instantly.
--------------------------------------------------------- */
document.querySelectorAll('.hero-name').forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .8s ease .2s, transform .8s ease .2s';

  // requestAnimationFrame waits for the next paint frame,
  // so the browser registers the "before" state first
  requestAnimationFrame(() => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
});
