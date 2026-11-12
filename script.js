const loaderScreen = document.getElementById('loaderScreen');
const pageShell = document.getElementById('pageShell');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.getElementById('siteHeader');
const topButton = document.getElementById('topButton');
const projectToggles = document.querySelectorAll('.project-toggle');
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
const typingText = document.getElementById('typingText');

const typingItems = [
  'Frontend Developer',
  'Java Developer',
  'Problem Solver',
  'Continuous Learner'
];
let typingIndex = 0;
let typingCharIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentText = typingItems[typingIndex];
  if (!isDeleting) {
    typingText.textContent = currentText.slice(0, typingCharIndex + 1);
    typingCharIndex += 1;
    if (typingCharIndex === currentText.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    typingText.textContent = currentText.slice(0, typingCharIndex - 1);
    typingCharIndex -= 1;
    if (typingCharIndex === 0) {
      isDeleting = false;
      typingIndex = (typingIndex + 1) % typingItems.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? 80 : 120);
}

function closeLoader() {
  if (loaderScreen) {
    loaderScreen.classList.add('hidden');
  }
  if (pageShell) {
    pageShell.classList.remove('hidden');
    pageShell.classList.add('visible');
  }
}

window.addEventListener('load', () => {
  if (pageShell) {
    setTimeout(closeLoader, 2300);
  }
  typeEffect();
});

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(item => item.classList.remove('active'));
    link.classList.add('active');
    navMenu.classList.remove('open');
  });
});

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
  topButton.style.display = window.scrollY > 520 ? 'inline-flex' : 'none';

  document.querySelectorAll('section[id]').forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
      });
    }
  });
});

topButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

projectToggles.forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.dataset.target;
    const details = document.getElementById(targetId);
    const isOpen = details.classList.toggle('open');
    button.textContent = isOpen ? 'Hide what I learned' : 'What I Learned';
  });
});

contactForm.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const message = document.getElementById('contactMessage').value.trim();

  if (!name || !email || !message) {
    formNote.textContent = 'Please complete all fields before sending.';
    return;
  }

  if (!email.includes('@') || !email.includes('.')) {
    formNote.textContent = 'Please enter a valid email address.';
    return;
  }

  formNote.textContent = 'Message is ready to send. (No backend attached.)';
  contactForm.reset();
});

function createMouseGlow(event) {
  const glow = document.createElement('div');
  glow.className = 'mouse-glow';
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
  document.body.appendChild(glow);
  setTimeout(() => glow.remove(), 1200);
}

document.addEventListener('mousemove', event => {
  if (window.innerWidth > 900) {
    createMouseGlow(event);
  }
});
