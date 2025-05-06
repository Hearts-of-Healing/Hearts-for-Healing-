// ===== GLOBAL FUNCTIONS =====

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initNavbar();
  initAnimations();
  initForms();
  initDarkMode();
  initScrollToTop();
});

// ===== NAVIGATION =====
function initNavbar() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      document.querySelector('.nav-menu').classList.toggle('active');
      document.body.style.overflow = this.classList.contains('active') ? 'hidden' : '';
    });
  }

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 992) {
        document.querySelector('.menu-toggle').classList.remove('active');
        document.querySelector('.nav-menu').classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
}

// ===== ANIMATIONS =====
function initAnimations() {
  // Intersection Observer for scroll animations
  const animateElements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { 
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animateElements.forEach(el => observer.observe(el));

  // Add hover effects to all buttons
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px)';
      this.style.boxShadow = 'var(--shadow-md)';
    });

    button.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });
}

// ===== FORM HANDLING =====
function initForms() {
  // Handle all form submissions
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      handleFormSubmit(this);
    });
  });

  // Add focus effects to form inputs
  document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('focus', function() {
      this.parentNode.querySelector('.form-label').style.color = 'var(--primary)';
    });

    input.addEventListener('blur', function() {
      this.parentNode.querySelector('.form-label').style.color = 'var(--dark)';
    });
  });
}

function handleFormSubmit(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;

  // Show loading state
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
  submitBtn.disabled = true;

  // Simulate form submission
  setTimeout(() => {
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'form-success mt-3';
    successMsg.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <span>Thank you! Your submission has been received.</span>
    `;
    form.appendChild(successMsg);

    // Reset form
    form.reset();
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;

    // Remove success message after 5 seconds
    setTimeout(() => {
      successMsg.remove();
    }, 5000);
  }, 1500);
}

// ===== DARK MODE =====
function initDarkMode() {
  const darkModeToggle = document.querySelector('.dark-mode-toggle');
  if (!darkModeToggle) return;

  // Check for saved preference or system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedDarkMode = localStorage.getItem('darkMode');
  
  if (savedDarkMode === 'true' || (savedDarkMode === null && prefersDark)) {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  // Toggle dark mode
  darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('darkMode', isDark);
  });

  // Initialize the correct icon
  const isDark = document.body.classList.contains('dark-mode');
  darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// ===== SCROLL TO TOP =====
function initScrollToTop() {
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.id = 'scrollToTop';
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(scrollToTopBtn);

  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });

  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===== TABBED INTERFACES =====
function openTab(evt, tabName) {
  // Hide all tab content
  const tabContents = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].style.display = "none";
  }

  // Remove active class from all buttons
  const tabButtons = document.getElementsByClassName("tab-btn");
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove("active");
  }

  // Show current tab and mark button as active
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("active");
}