// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Highlight active navbar link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});

// Intersection Observer for scroll animations
const animateElements = document.querySelectorAll('.animate-on-scroll');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.5 });

animateElements.forEach(element => {
  observer.observe(element);
});

// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function toggleDarkMode() {
  const isDarkMode = body.getAttribute('data-theme') === 'dark';
  body.setAttribute('data-theme', isDarkMode ? 'light' : 'dark');
  themeToggle.textContent = isDarkMode ? '🌙' : '☀️';
  localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
}

themeToggle.addEventListener('click', toggleDarkMode);

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.setAttribute('data-theme', 'dark');
  themeToggle.textContent = '☀️';
} else {
  body.setAttribute('data-theme', 'light');
  themeToggle.textContent = '🌙';
}
// FAQ toggle functionality
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('h3');
  const answer = item.querySelector('.faq-answer');

  question.addEventListener('click', () => {
    // Close all other FAQs
    faqItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-answer').style.maxHeight = '0';
      }
    });

    // Toggle the clicked FAQ
    item.classList.toggle('active');
    if (item.classList.contains('active')) {
      answer.style.maxHeight = answer.scrollHeight + 'px'; // Expand to full height
    } else {
      answer.style.maxHeight = '0'; // Collapse
    }
  });
});