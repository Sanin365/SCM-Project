// === DOM Ready ===
document.addEventListener('DOMContentLoaded', () => {
  // === Navigation Toggle ===
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('open'); // For animating icon if needed
    });
  }

  // === Modal Pop-Up with Animation ===
  const modal = document.getElementById('modal');
  const openModalBtn = document.getElementById('openModal');
  const closeModalBtn = document.getElementById('closeModal');

  if (modal && openModalBtn && closeModalBtn) {
    openModalBtn.addEventListener('click', () => {
      modal.classList.add('show');
    });

    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('show');
    });

    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
      }
    });
  }

  // === Scroll Reveal Animation with Debounce ===
  const scrollElements = document.querySelectorAll('.scroll-reveal');

  const elementInView = (el, offset = 100) =>
    el.getBoundingClientRect().top <= window.innerHeight - offset;

  const toggleScrollClass = () => {
    scrollElements.forEach(el =>
      el.classList.toggle('scrolled', elementInView(el))
    );
  };

  const debounce = (func, wait = 15) => {
    let timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(func, wait);
    };
  };

  window.addEventListener('scroll', debounce(toggleScrollClass));
  toggleScrollClass();

  // === Theme Switcher with Icon ===
  const themeBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const body = document.body;

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const dark = body.classList.toggle('dark-mode');
      localStorage.setItem('theme', dark ? 'dark' : 'light');
      if (themeIcon) {
        themeIcon.textContent = dark ? '🌙' : '☀️';
      }
    });

    if (localStorage.getItem('theme') === 'dark') {
      body.classList.add('dark-mode');
      if (themeIcon) themeIcon.textContent = '🌙';
    }
  }

  // === Form Validation with Feedback ===
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = contactForm.querySelector('#name');
      const email = contactForm.querySelector('#email');
      const message = contactForm.querySelector('#message');
      const errorBox = document.getElementById('form-error');

      [name, email, message].forEach(field => {
        field.style.borderColor = '#ccc';
      });

      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        errorBox.textContent = 'All fields are required.';
        errorBox.style.display = 'block';
        [name, email, message].forEach(field => {
          if (!field.value.trim()) field.style.borderColor = 'red';
        });
        return;
      }

      if (!validateEmail(email.value.trim())) {
        errorBox.textContent = 'Please enter a valid email.';
        errorBox.style.display = 'block';
        email.style.borderColor = 'red';
        return;
      }

      errorBox.style.display = 'none';
      alert('Message sent successfully!');
      contactForm.reset();
    });
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // === Back to Top Button with Fade ===
  const backToTop = document.getElementById('back-to-top');

  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.style.opacity = window.scrollY > 300 ? '1' : '0';
      backToTop.style.pointerEvents = window.scrollY > 300 ? 'auto' : 'none';
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // === Countdown Timer with Style Update ===
  const countdown = document.getElementById('countdown');

  if (countdown) {
    const targetDate = new Date('2025-12-31T23:59:59').getTime();

    setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        countdown.innerHTML = '🎉 Happy New Year!';
        countdown.classList.add('celebration');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      countdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
  }
});
