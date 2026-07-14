/* ============================================
   NEVINE MAMDOUH — PORTFOLIO
   JavaScript — Interactions & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Navbar Scroll Effect ---
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  // --- Mobile Nav Toggle ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // --- Scroll Reveal ---
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');

        // Trigger skill bars when skills section is revealed
        if (entry.target.closest('.skills')) {
          animateSkillBars();
        }

        // Trigger stat counters when about section is revealed
        if (entry.target.closest('.about')) {
          animateCounters();
        }
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Skill Bar Animation ---
  let skillBarsAnimated = false;

  function animateSkillBars() {
    if (skillBarsAnimated) return;
    skillBarsAnimated = true;

    document.querySelectorAll('.skill-fill').forEach(bar => {
      const level = bar.getAttribute('data-level');
      setTimeout(() => {
        bar.style.width = level + '%';
      }, 200);
    });
  }

  // --- Counter Animation ---
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    document.querySelectorAll('.stat-number').forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1500;
      const increment = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
    });
  }

  // --- Active Nav Link Highlight ---
  const sections = document.querySelectorAll('section[id]');

  const navHighlightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.toggle('active-link', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -50% 0px'
  });

  sections.forEach(section => navHighlightObserver.observe(section));

  // --- Contact Form (basic handler) ---
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('.btn');
    const originalHTML = btn.innerHTML;

    btn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
      Message Sent!
    `;
    btn.style.pointerEvents = 'none';
    btn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.pointerEvents = '';
      btn.style.background = '';
      contactForm.reset();
    }, 2500);
  });

  // --- Smooth Parallax on Hero Shapes ---
  window.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    shapes.forEach((shape, i) => {
      const speed = (i + 1) * 12;
      shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  }, { passive: true });

});
