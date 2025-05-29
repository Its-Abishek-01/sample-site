// Responsive navbar toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Smooth scroll for nav links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      navLinks.classList.remove('open');
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
      this.classList.add('active');
    }
  });
});

// 3D Tilt effect for Hero
const hero3d = document.getElementById('hero3d');
if (hero3d) {
  hero3d.addEventListener('mousemove', e => {
    const rect = hero3d.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;
    hero3d.style.transform = `rotateY(${x/24}deg) rotateX(${-y/24}deg) scale(1.04)`;
  });
  hero3d.addEventListener('mouseleave', () => {
    hero3d.style.transform = '';
  });
}

// 3D Tilt for Service Cards
document.querySelectorAll('.service-card-3d').forEach(card => {
  card.addEventListener('mousemove', e => {
    const inner = card.querySelector('.service-card-inner');
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width/2;
    const y = e.clientY - rect.top - rect.height/2;
    inner.style.transform = `rotateY(${x/16}deg) rotateX(${-y/16}deg) scale(1.07)`;
  });
  card.addEventListener('mouseleave', () => {
    const inner = card.querySelector('.service-card-inner');
    inner.style.transform = '';
  });
});

// Animated stats
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;
  const statsSection = document.querySelector('.stats');
  const rect = statsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom >= 0) {
    statNumbers.forEach(num => {
      const target = +num.getAttribute('data-target');
      let count = 0;
      const increment = Math.ceil(target / 60);
      const update = () => {
        count += increment;
        if (count > target) count = target;
        num.textContent = count;
        if (count < target) requestAnimationFrame(update);
      };
      update();
    });
    statsAnimated = true;
  }
}
window.addEventListener('scroll', animateStats);
window.addEventListener('load', animateStats);

// Testimonials slider 3D flip
const testimonials = document.querySelectorAll('.testimonial-3d');
let currentTestimonial = 0;

function showTestimonial(idx) {
  testimonials.forEach((t, i) => {
    t.classList.toggle('active', i === idx);
  });
}
document.getElementById('prevTestimonial').addEventListener('click', () => {
  currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentTestimonial);
});
document.getElementById('nextTestimonial').addEventListener('click', () => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
});
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}, 8000);

// Contact form validation and message
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();
  if (!name || !email || !message) {
    formMessage.textContent = "Please fill in all required fields.";
    formMessage.style.color = "#e53935";
    return;
  }
  // Simple email validation
  const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!emailPattern.test(email)) {
    formMessage.textContent = "Please enter a valid email address.";
    formMessage.style.color = "#e53935";
    return;
  }
  formMessage.textContent = "Thank you for contacting us! We'll get back to you soon.";
  formMessage.style.color = "#43e97b";
  contactForm.reset();
  setTimeout(() => { formMessage.textContent = ""; }, 6000);
});
