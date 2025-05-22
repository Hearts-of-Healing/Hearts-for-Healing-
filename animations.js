<!-- Supercharged animations.js -->
<script>
document.addEventListener('DOMContentLoaded', function() {
  // Enhanced hero animations
  const hero = document.querySelector('.hero');
  if (hero) {
    // Create healing orbs
    for (let i = 0; i < 3; i++) {
      const orb = document.createElement('div');
      orb.classList.add('healing-orb');
      orb.style.width = `${200 + (i * 100)}px`;
      orb.style.height = `${200 + (i * 100)}px`;
      orb.style.left = `${Math.random() * 70}%`;
      orb.style.top = `${Math.random() * 70}%`;
      orb.style.animationDelay = `${i * 5}s`;
      orb.style.opacity = 0.3 + (i * 0.2);
      hero.appendChild(orb);
    }
    
    // Create magic dust
    const dust = document.createElement('div');
    dust.classList.add('magic-dust');
    hero.appendChild(dust);
    
    // Create floating hearts
    const floatingHearts = document.createElement('div');
    floatingHearts.classList.add('floating-hearts');
    hero.appendChild(floatingHearts);
    
    for (let i = 0; i < 15; i++) {
      const heart = document.createElement('div');
      heart.innerHTML = '<i class="fas fa-heart"></i>';
      heart.style.position = 'absolute';
      heart.style.fontSize = `${1 + Math.random() * 2}rem`;
      heart.style.color = `rgba(255,255,255,${0.2 + Math.random() * 0.3})`;
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.top = `${Math.random() * 100}%`;
      heart.style.animation = `floatHeart ${15 + Math.random() * 15}s linear infinite ${Math.random() * 5}s`;
      floatingHearts.appendChild(heart);
    }
  }

  // Magnetic button effect
  const buttons = document.querySelectorAll('.btn, .diamond-item');
  buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const angleX = (y - centerY) / 10;
      const angleY = (centerX - x) / 10;
      
      button.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
    });
  });

  // Scroll animations with intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        
        // Add ripple effect to cards when they appear
        if (entry.target.classList.contains('mission-card') || 
            entry.target.classList.contains('team-card')) {
          const ripple = document.createElement('div');
          ripple.classList.add('card-ripple');
          entry.target.appendChild(ripple);
          
          setTimeout(() => {
            ripple.style.transform = 'scale(2)';
            ripple.style.opacity = '0';
          }, 50);
          
          setTimeout(() => {
            ripple.remove();
          }, 1000);
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Tab functionality for about page
  function openTab(evt, tabName) {
    // Add transition effects
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
      tabContents[i].style.opacity = '0';
      tabContents[i].style.transform = 'translateY(20px)';
      setTimeout(() => {
        tabContents[i].style.display = "none";
      }, 300);
    }
    
    const tabButtons = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabButtons.length; i++) {
      tabButtons[i].classList.remove("active");
    }
    
    setTimeout(() => {
      const activeTab = document.getElementById(tabName);
      activeTab.style.display = "block";
      setTimeout(() => {
        activeTab.style.opacity = '1';
        activeTab.style.transform = 'translateY(0)';
      }, 50);
    }, 300);
    
    evt.currentTarget.classList.add("active");
  }

  // Add floating heart animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatHeart {
      0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
      10% { opacity: 0.6; }
      50% { transform: translate(${Math.random() > 0.5 ? '-' : ''}50px, -50px) rotate(180deg); }
      90% { opacity: 0.4; }
      100% { transform: translate(${Math.random() > 0.5 ? '-' : ''}100px, -100px) rotate(360deg); opacity: 0; }
    }
    .card-ripple {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle, rgba(255,107,107,0.2) 0%, rgba(255,107,107,0) 70%);
      transform: translate(-50%, -50%) scale(0);
      opacity: 1;
      transition: all 0.8s ease;
      border-radius: 50%;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);
});

document.addEventListener('DOMContentLoaded', function() {
  // Enhanced button effects for ALL buttons
  const buttons = document.querySelectorAll(`
    .btn, 
    a[href].btn, 
    button, 
    input[type="submit"], 
    input[type="button"], 
    .btn-primary, 
    .btn-outline, 
    .btn-small, 
    .cta-buttons a, 
    .hero-actions a, 
    .team-card a, 
    .faq-help a,
    .tab-btn
  `);
  
  // Add magnetic effect to all buttons
  buttons.forEach(button => {
    // Ensure each button has the base class
    if (!button.classList.contains('btn')) {
      button.classList.add('btn');
    }
    
    // Magnetic effect
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const angleX = (y - centerY) / 15;
      const angleY = (centerX - x) / 15;
      
      button.style.transform = `translateY(-3px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
    });
    
    // Click ripple effect
    button.addEventListener('click', function(e) {
      // Remove any existing ripples
      const existingRipples = this.querySelectorAll('.btn-ripple');
      existingRipples.forEach(ripple => ripple.remove());
      
      // Create new ripple
      const ripple = document.createElement('span');
      ripple.classList.add('btn-ripple');
      
      // Position ripple
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size/2}px`;
      ripple.style.top = `${e.clientY - rect.top - size/2}px`;
      
      this.appendChild(ripple);
      
      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // Add dynamic styles for ripple effect
  const style = document.createElement('style');
  style.textContent = `
    .btn-ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.7);
      transform: scale(0);
      animation: btnRipple 600ms linear;
      pointer-events: none;
    }
    
    @keyframes btnRipple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
});

document.addEventListener('DOMContentLoaded', function() {
  // Enhanced hero particles
  const hero = document.querySelector('.hero');
  if (hero) {
    // Create floating hearts
    for (let i = 0; i < 15; i++) {
      const heart = document.createElement('div');
      heart.innerHTML = '<i class="fas fa-heart"></i>';
      heart.style.position = 'absolute';
      heart.style.fontSize = `${1 + Math.random() * 2}rem`;
      heart.style.color = `rgba(255,255,255,${0.2 + Math.random() * 0.3})`;
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.top = `${Math.random() * 100}%`;
      heart.style.animation = `floatHeart ${15 + Math.random() * 15}s linear infinite ${Math.random() * 5}s`;
      hero.appendChild(heart);
    }
  }

  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatHeart {
      0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
      10% { opacity: 0.6; }
      50% { transform: translate(${Math.random() > 0.5 ? '-' : ''}50px, -50px) rotate(180deg); }
      90% { opacity: 0.4; }
      100% { transform: translate(${Math.random() > 0.5 ? '-' : ''}100px, -100px) rotate(360deg); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // Animate social cards in sequence
  const socialCards = document.querySelectorAll('.social-card');
  socialCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
  });
});
document.addEventListener('DOMContentLoaded', function() {
  // Stagger animations for team cards
  const teamCards = document.querySelectorAll('.team-card');
  teamCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });

  // Add hover effect to team tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-3px)';
      button.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    });
    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
      button.style.boxShadow = '';
    });
  });
});
document.addEventListener('DOMContentLoaded', function() {
  // 3D tilt effect for cards
  const teamCards = document.querySelectorAll('.team-card');
  
  teamCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const angleX = (y - centerY) / 20;
      const angleY = (centerX - x) / 20;
      
      card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
      card.querySelector('.card-content').style.transform = `translateY(-10px) rotateX(${angleX * 0.5}deg) rotateY(${angleY * 0.5}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.querySelector('.card-content').style.transform = '';
    });
  });

  // Staggered animations
  const cards = document.querySelectorAll('.team-card');
  cards.forEach((card, index) => {
    card.style.setProperty('--delay', `${index * 0.1}s`);
  });

  // Tab switching with animation
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      
      // Hide all tab contents
      tabContents.forEach(content => {
        content.classList.remove('active');
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';
      });
      
      // Show selected tab content
      const tabId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
      const activeTab = document.getElementById(tabId);
      
      setTimeout(() => {
        activeTab.classList.add('active');
        activeTab.style.opacity = '1';
        activeTab.style.transform = 'translateY(0)';
      }, 50);
    });
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const hero = document.querySelector('.hero');
  
  if (hero) {
    // Create particles
    const particles = hero.querySelector('.hero-particles');
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.classList.add('hero-particle');
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100 + 100}%`;
      particle.style.width = `${2 + Math.random() * 4}px`;
      particle.style.height = particle.style.width;
      particle.style.animationDuration = `${10 + Math.random() * 20}s`;
      particle.style.animationDelay = `${Math.random() * 10}s`;
      particles.appendChild(particle);
    }
    
    // Create floating hearts
    const hearts = hero.querySelector('.hero-hearts');
    for (let i = 0; i < 12; i++) {
      const heart = document.createElement('div');
      heart.classList.add('hero-heart');
      heart.innerHTML = '<i class="fas fa-heart"></i>';
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.top = `${Math.random() * 100}%`;
      heart.style.fontSize = `${1 + Math.random() * 2}rem`;
      heart.style.animationDuration = `${15 + Math.random() * 15}s`;
      heart.style.animationDelay = `${Math.random() * 5}s`;
      hearts.appendChild(heart);
    }
    
    // Create pulsing circles
    const circles = hero.querySelector('.hero-circles');
    for (let i = 0; i < 5; i++) {
      const circle = document.createElement('div');
      circle.classList.add('hero-circle');
      circle.style.width = `${200 + (i * 150)}px`;
      circle.style.height = `${200 + (i * 150)}px`;
      circle.style.left = `${30 + (i * 5)}%`;
      circle.style.top = `${40 + (i * 5)}%`;
      circle.style.animationDelay = `${i * 1.5}s`;
      circles.appendChild(circle);
    }
  }
});

</script>