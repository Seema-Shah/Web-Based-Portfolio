/**
 * ==========================================================================
 * ANIRUDDH PRATAP SINGH - QUANTUM PLASMA & INTERACTIVE ENGINE
 * High-Performance Generative Canvas Physics & Navigation Mechanics
 * Pure Vanilla JavaScript (ES6+) - 60FPS Fluid Dynamics
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // ----------------------------------------------------
  // 1. Reading & Scroll Progress Indicator
  // ----------------------------------------------------
  const progressBar = document.getElementById('scroll-progress');
  const updateProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  };
  window.addEventListener('scroll', updateProgress, { passive: true });

  // ----------------------------------------------------
  // 2. Navigation Header & Active Section Spy
  // ----------------------------------------------------
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  const onScroll = () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    let currentSectionId = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    // Update active on desktop links
    desktopNavLinks.forEach((link) => {
      link.classList.remove('active');
      if (currentSectionId && link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });

    // Update active on drawer links
    drawerLinks.forEach((link) => {
      link.classList.remove('active');
      if (currentSectionId && link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ----------------------------------------------------
  // 3. Off-Canvas Mobile Drawer Controller
  // ----------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const backdrop = document.getElementById('mobile-nav-backdrop');
  const allDrawerClickables = document.querySelectorAll('.drawer-link, .drawer-cta-btn');

  const openDrawer = () => {
    mobileDrawer?.classList.add('open');
    backdrop?.classList.add('active');
    mobileToggle?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer?.classList.remove('open');
    backdrop?.classList.remove('active');
    mobileToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      openDrawer();
    });

    drawerCloseBtn?.addEventListener('click', closeDrawer);
    backdrop?.addEventListener('click', closeDrawer);

    allDrawerClickables.forEach((link) => {
      link.addEventListener('click', closeDrawer);
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        closeDrawer();
      }
    });
  }

  // ----------------------------------------------------
  // 4. Hypnotic Quantum Plasma & Cosmic Field Engine
  // ----------------------------------------------------
  const canvas = document.getElementById('plasma-canvas');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particleCount = Math.min(Math.floor((width * height) / 16000), 55);
    const particles = [];
    const mouse = { x: null, y: null, radius: 160 };
    const ripples = [];

    const createRipple = (x, y) => {
      ripples.push({
        x,
        y,
        radius: 5,
        maxRadius: Math.min(width, height) * 0.28,
        alpha: 0.8,
        speed: 3.5,
        color: Math.random() > 0.5 ? '0, 245, 160' : '0, 210, 255'
      });
    };

    class QuantumParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.65;
        this.vy = (Math.random() - 0.5) * 0.65;
        this.baseRadius = Math.random() * 2.2 + 0.8;
        this.pulseAngle = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.02 + Math.random() * 0.025;

        const palettes = [
          { r: 0, g: 245, b: 160 },   // Neon Emerald
          { r: 0, g: 210, b: 255 },   // Electric Cyan
          { r: 168, g: 85, b: 247 },  // Ultraviolet
          { r: 52, g: 211, b: 153 }   // Mint Glow
        ];
        this.color = palettes[Math.floor(Math.random() * palettes.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulseAngle += this.pulseSpeed;

        if (this.x < -20) this.x = width + 20;
        if (this.x > width + 20) this.x = -20;
        if (this.y < -20) this.y = height + 20;
        if (this.y > height + 20) this.y = -20;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * force * 2.8 - Math.sin(angle) * force * 1.2;
            this.y -= Math.sin(angle) * force * 2.8 + Math.cos(angle) * force * 1.2;
          }
        }
      }

      draw() {
        const pulse = Math.sin(this.pulseAngle) * 0.8;
        const currentRadius = Math.max(this.baseRadius + pulse, 0.4);
        const alpha = 0.55 + Math.sin(this.pulseAngle) * 0.35;

        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new QuantumParticle());
    }

    const connectParticles = () => {
      const maxDistance = 145;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);

            const gradient = ctx.createLinearGradient(particles[a].x, particles[a].y, particles[b].x, particles[b].y);
            gradient.addColorStop(0, `rgba(${particles[a].color.r}, ${particles[a].color.g}, ${particles[a].color.b}, ${alpha})`);
            gradient.addColorStop(1, `rgba(${particles[b].color.r}, ${particles[b].color.g}, ${particles[b].color.b}, ${alpha * 0.6})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }
    };

    const renderRipples = () => {
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.alpha -= 0.015;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${r.color}, ${r.alpha * 0.35})`;
        ctx.lineWidth = 1.8;
        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgba(${r.color}, ${r.alpha})`;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    };

    let animationFrameId;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      connectParticles();
      renderRipples();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener('click', (e) => {
      createRipple(e.clientX, e.clientY);
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        createRipple(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      mouse.x = null;
      mouse.y = null;
    });
  }

  // ----------------------------------------------------
  // 5. Smooth Floating Back to Top Trigger
  // ----------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
