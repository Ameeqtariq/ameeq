// DOM Elements
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.getElementById('backToTop');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const navLinks = document.querySelectorAll('.nav-link');
//form hidden
document.addEventListener('DOMContentLoaded', () => {
  fetch('https://formspree.io/f/xblgjere', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ Visitor: 'New Visitor' }),
  });
});

// Toggle Mobile Navigation
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  
  // Animate hamburger to X
  const spans = navToggle.querySelectorAll('span');
  spans.forEach(span => {
    span.classList.toggle('active');
  });
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// Toggle Dark/Light Theme
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  
  // Save theme preference to localStorage
  if (document.body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-theme');
}

// Back to Top Button
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Project Filtering
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    
    // Add active class to clicked button
    btn.classList.add('active');
    
    // Get filter value
    const filter = btn.getAttribute('data-filter');
    
    // Filter projects
    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
        
        // Add animation
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 100);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Animate skill progress bars when they come into view
const animateProgressBars = () => {
  skillProgressBars.forEach(bar => {
    const position = bar.getBoundingClientRect().top;
    const screenPosition = window.innerHeight;
    
    if (position < screenPosition) {
      // Get width from the style attribute (e.g. "width: 90%")
      const width = bar.style.width;
      bar.style.width = '0';
      
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    }
  });
};

// Run once when the page loads
animateProgressBars();

// Then run on scroll
window.addEventListener('scroll', animateProgressBars);

// // Contact Form Submission
// contactForm.addEventListener('submit', (e) => {
//   e.preventDefault();
  
//   // Get form values
//   const name = document.getElementById('name').value;
//   const email = document.getElementById('email').value;
//   const subject = document.getElementById('subject').value;
//   const message = document.getElementById('message').value;
  
//   // In a real application, you would send this data to a server
//   // For now, just show a success message
//   formMessage.innerHTML = `Thank you, ${name}! Your message has been sent.`;
//   formMessage.classList.add('success');
  
//   // Reset form
//   contactForm.reset();
  
//   // Hide message after 5 seconds
//   setTimeout(() => {
//     formMessage.innerHTML = '';
//     formMessage.classList.remove('success');
//   }, 5000);
// });

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Show loading state
  formMessage.innerHTML = "Sending...";
  formMessage.classList.add('loading');

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    });
const name = document.getElementById('name').value;
    if (response.ok) {
      formMessage.innerHTML = `Thank you, ${name}! Message sent.`;
      formMessage.classList.replace('loading', 'success');
      contactForm.reset();
      setTimeout(() => {
        formMessage.innerHTML = '';
         formMessage.classList.remove('success');
         }, 6000);
    
    } else {
      throw new Error('Submission failed');
    }
  } catch (error) {
    formMessage.innerHTML = "Error sending message. Please try again.";
    formMessage.classList.replace('loading', 'error');
  }
});
// Active navigation link based on scroll position
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const scrollY = window.scrollY;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.add('active-nav-link');
    } else {
      document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.remove('active-nav-link');
    }
  });
});

// Add animations for page elements
const fadeInElements = () => {
  const fadeElems = document.querySelectorAll('.about-content, .project-card, .skills-content, .contact-content');
  
  fadeElems.forEach(elem => {
    const position = elem.getBoundingClientRect().top;
    const screenPosition = window.innerHeight;
    
    if (position < screenPosition) {
      elem.style.opacity = '1';
      elem.style.transform = 'translateY(0)';
    }
  });
};

// Add initial styles for animation
document.querySelectorAll('.about-content, .project-card, .skills-content, .contact-content').forEach(elem => {
  elem.style.opacity = '0';
  elem.style.transform = 'translateY(30px)';
  elem.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Run animations on load and scroll
window.addEventListener('load', fadeInElements);
window.addEventListener('scroll', fadeInElements);

function toggleImages() {
  const current = document.querySelector('.active-image');
  const next = document.querySelector('.next-image');
  
  current.classList.remove('active-image');
  next.classList.add('active-image');
  
  // Swap classes for next transition
  current.classList.add('next-image');
  next.classList.remove('next-image');
}

// Start the interval
setInterval(toggleImages, 10000); // 8000ms = 8 seconds
