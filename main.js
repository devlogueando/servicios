/* =============================================
   DEVLOGUEANDO - MAIN JS
   Global Interactions and Animations
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. MOBILE MENU TOGGLE ---
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('show');
      // Prevent scrolling when menu is open
      document.body.style.overflow = mobileMenu.classList.contains('show') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('show');
        document.body.style.overflow = '';
      });
    });
  }


  // --- 2. NAVBAR SCROLL EFFECT ---
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


  // --- 3. SCROLL REVEAL ANIMATIONS ---
  // Uses Intersection Observer to add 'visible' class when elements enter viewport
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop observing once it's visible
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });


  // --- 4. ANIMATED COUNTERS ---
  const counterElements = document.querySelectorAll('.stat-num');
  
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetValue = parseInt(target.getAttribute('data-target'), 10);
        const duration = 2000; // ms
        const increment = targetValue / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
          current += increment;
          if (current < targetValue) {
            target.innerText = Math.ceil(current) + '+';
            requestAnimationFrame(updateCounter);
          } else {
            target.innerText = targetValue + '+';
          }
        };
        updateCounter();
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(el => {
    if (el.getAttribute('data-target')) {
      counterObserver.observe(el);
    }
  });


  // --- 5. PORTFOLIO FILTER ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

});
