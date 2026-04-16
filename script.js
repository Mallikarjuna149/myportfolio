/* ============================
   MALLIKARJUNA REDDY PORTFOLIO
   script.js
   ============================ */

'use strict';

// ── Wait for DOM ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // ── Loader ──────────────────────────────────────────
  const loader = document.getElementById('loader');
  setTimeout(() => {
    if (loader) loader.classList.add('hidden');
  }, 2000);

  // ── Custom Cursor ────────────────────────────────────
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');
  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (cursor) {
      cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
    }
  });

  // Smooth follower
  function animFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    if (follower) {
      follower.style.transform = `translate(${fx - 18}px, ${fy - 18}px)`;
    }
    requestAnimationFrame(animFollower);
  }
  animFollower();

  // Scale cursor on interactive elements
  document.querySelectorAll('a, button, .project-card, .cert-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cursor) cursor.style.transform += ' scale(2.5)';
      if (follower) follower.style.transform += ' scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {});
  });

  // ── Theme Toggle ─────────────────────────────────────
  const themeBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  let isDark = true;

  themeBtn && themeBtn.addEventListener('click', () => {
    isDark = !isDark;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    if (themeIcon) themeIcon.textContent = isDark ? '☀️' : '🌙';
  });

  // ── Navbar ───────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);

    // Active nav link
    document.querySelectorAll('section[id]').forEach(section => {
      const top = section.offsetTop - 120;
      const bottom = top + section.offsetHeight;
      const scrollY = window.scrollY;
      const id = section.getAttribute('id');
      document.querySelectorAll(`.nav-links a[href="#${id}"], .mobile-nav a[href="#${id}"]`).forEach(link => {
        link.classList.toggle('active', scrollY >= top && scrollY < bottom);
      });
    });

    // Back to top
    const backBtn = document.getElementById('back-to-top');
    if (backBtn) backBtn.classList.toggle('visible', window.scrollY > 400);
  });

  hamburger && hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav && mobileNav.classList.toggle('open');
  });

  // Close mobile nav on link click
  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger && hamburger.classList.remove('open');
      mobileNav && mobileNav.classList.remove('open');
    });
  });

  // ── Back to Top ──────────────────────────────────────
  const backBtn = document.getElementById('back-to-top');
  backBtn && backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── Typed Text ───────────────────────────────────────
  const typedEl = document.getElementById('typed-text');
  const roles = [
    'Full Stack Developer',
    'AWS Cloud Enthusiast',
    'Problem Solver',
    'Software Engineer',
    'Blockchain Developer'
  ];
  let roleIndex = 0, charIndex = 0, deleting = false;

  function typeLoop() {
    if (!typedEl) return;
    const current = roles[roleIndex];
    if (!deleting) {
      typedEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
    } else {
      typedEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 60 : 90);
  }
  typeLoop();

  // ── Particle Canvas ──────────────────────────────────
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let W, H;

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.r = Math.random() * 1.5 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.alpha = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.5 ? '56,189,248' : '129,140,248';
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
        ctx.fill();
      }
    }

    // Create particles
    for (let i = 0; i < 80; i++) particles.push(new Particle());

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56,189,248,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animParticles() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });
      connectParticles();
      requestAnimationFrame(animParticles);
    }
    animParticles();
  }

  // ── Scroll Reveal ────────────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .timeline-item').forEach(el => {
    revealObserver.observe(el);
  });

  // ── Skill Bars ───────────────────────────────────────
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(fill => {
          fill.style.width = fill.dataset.width;
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const skillsSection = document.querySelector('.skills-grid');
  if (skillsSection) skillObserver.observe(skillsSection);

  // ── Project Modal ────────────────────────────────────
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');
  const modalContent = document.getElementById('modal-content');

  const projectData = {
    blockchain: {
      icon: '🔗',
      title: 'Blockchain-Based Secure Voting System',
      desc: 'A secure, transparent digital voting system built on blockchain principles. Uses cryptographic hashing (SHA-256) for vote validation, ensuring data integrity and tamper-proof records. Designed to eliminate duplicate voting through a robust verification layer.',
      tech: ['Python', 'Blockchain', 'Cryptography', 'SHA-256', 'Data Structures'],
      highlights: [
        'Implemented cryptographic hashing for immutable vote records',
        'Built duplicate-vote prevention through unique voter ID verification',
        'Transparent audit trail with full vote traceability',
        'Secure authentication layer for voter identity'
      ]
    },
    aws: {
      icon: '☁️',
      title: 'AWS Secure S3 Access via VPC Endpoints',
      desc: 'A cloud security architecture project that enables private, secure access to Amazon S3 buckets using VPC Endpoints — completely eliminating exposure to the public internet. Includes full IAM policy configuration for least-privilege access.',
      tech: ['AWS EC2', 'AWS S3', 'VPC', 'IAM', 'Route Tables', 'Load Balancer'],
      highlights: [
        'Designed private S3 access bypassing the public internet entirely',
        'Configured VPC, subnets, and routing tables from scratch',
        'Applied IAM policies enforcing strict least-privilege access',
        'Eliminated public IP exposure improving security posture significantly'
      ]
    }
  };

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.dataset.project;
      const data = projectData[key];
      if (!data || !modalContent) return;

      modalContent.innerHTML = `
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:24px">
          <div style="width:56px;height:56px;border-radius:14px;background:rgba(56,189,248,0.12);border:1px solid rgba(56,189,248,0.25);display:flex;align-items:center;justify-content:center;font-size:1.8rem">${data.icon}</div>
          <h3 style="font-family:'Syne',sans-serif;font-size:1.3rem;font-weight:800;color:var(--text)">${data.title}</h3>
        </div>
        <p style="color:var(--muted);line-height:1.7;margin-bottom:24px;font-size:0.92rem">${data.desc}</p>
        <h4 style="font-family:'Syne',sans-serif;font-size:0.85rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--accent);margin-bottom:14px">Key Highlights</h4>
        <ul style="list-style:none;display:flex;flex-direction:column;gap:10px;margin-bottom:24px">
          ${data.highlights.map(h => `<li style="display:flex;gap:10px;font-size:0.88rem;color:var(--muted);line-height:1.6"><span style="color:var(--accent3);flex-shrink:0">▸</span>${h}</li>`).join('')}
        </ul>
        <h4 style="font-family:'Syne',sans-serif;font-size:0.85rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--accent);margin-bottom:12px">Tech Stack</h4>
        <div style="display:flex;flex-wrap:wrap;gap:8px">
          ${data.tech.map(t => `<span style="padding:6px 14px;border-radius:50px;background:rgba(56,189,248,0.08);border:1px solid rgba(56,189,248,0.18);font-size:0.78rem;font-weight:700;color:var(--accent)">${t}</span>`).join('')}
        </div>
      `;
      if (modalOverlay) modalOverlay.classList.add('open');
    });
  });

  modalClose && modalClose.addEventListener('click', () => {
    modalOverlay && modalOverlay.classList.remove('open');
  });
  modalOverlay && modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) modalOverlay.classList.remove('open');
  });

  // ── Contact Form ─────────────────────────────────────
  const form = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  form && form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.textContent = 'Sending...';
      btn.disabled = true;
    }
    setTimeout(() => {
      form.reset();
      if (btn) { btn.textContent = 'Send Message'; btn.disabled = false; }
      if (formSuccess) formSuccess.classList.add('show');
      setTimeout(() => formSuccess && formSuccess.classList.remove('show'), 4000);
    }, 1200);
  });

  // ── Smooth parallax on hero ───────────────────────────
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('#hero .hero-inner');
    if (hero && window.scrollY < window.innerHeight) {
      hero.style.transform = `translateY(${window.scrollY * 0.08}px)`;
    }
  });

  // ── Ripple on buttons ────────────────────────────────
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute;
        border-radius:50%;
        background:rgba(255,255,255,0.25);
        width:10px;height:10px;
        left:${e.clientX - rect.left - 5}px;
        top:${e.clientY - rect.top - 5}px;
        animation:rippleAnim 0.5s linear forwards;
        pointer-events:none;
      `;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple keyframe
  const style = document.createElement('style');
  style.textContent = `@keyframes rippleAnim{to{transform:scale(25);opacity:0}}`;
  document.head.appendChild(style);

});
