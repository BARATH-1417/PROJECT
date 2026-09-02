/* ==========================================================================
   Barath P — Portfolio
   Small, dependency-free JS: mobile nav toggle, active-tab scroll spy,
   reveal-on-scroll, and a typing effect in the hero "code window".
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Footer year ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Mobile nav toggle ---- */
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Scroll-spy: highlight the active "tab" in the nav ---- */
  const sections = document.querySelectorAll('main section[id]');
  const tabs = document.querySelectorAll('[data-tab]');

  const setActiveTab = (id) => {
    tabs.forEach((tab) => {
      const match = tab.getAttribute('href') === `#${id}`;
      tab.classList.toggle('is-active', match);
    });
  };

  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveTab(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((section) => spy.observe(section));
  }

  /* ---- Reveal-on-scroll ---- */
  const revealEls = document.querySelectorAll('.reveal');

  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---- Hero "typed status" effect ---- */
  const typedStatus = document.getElementById('typedStatus');
  const statusMessages = ['"open_to_internships"', '"learning_every_day"', '"building_in_public"'];

  if (typedStatus && !prefersReducedMotion) {
    let msgIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
      const current = statusMessages[msgIndex];

      if (!deleting) {
        charIndex++;
        typedStatus.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1600);
          return;
        }
      } else {
        charIndex--;
        typedStatus.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          msgIndex = (msgIndex + 1) % statusMessages.length;
        }
      }
      setTimeout(tick, deleting ? 35 : 65);
    };

    tick();
  } else if (typedStatus) {
    typedStatus.textContent = '"open_to_internships"';
  }
});
