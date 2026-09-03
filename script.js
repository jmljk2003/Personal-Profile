const button = document.querySelector('.menu-button');
const nav = document.querySelector('nav');
const header = document.querySelector('#site-header');

button.addEventListener('click', () => {
  const open = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', String(!open));
  button.textContent = open ? 'Menu' : 'Close';
  nav.classList.toggle('open', !open);
});

document.querySelectorAll('nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  button.setAttribute('aria-expanded', 'false');
  button.textContent = 'Menu';
}));

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal, .portrait-reveal');
const timeline = document.querySelector('[data-timeline]');
const roles = document.querySelectorAll('.role');
const canAnimate = !reducedMotion && 'IntersectionObserver' in window;

if (!canAnimate) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
  timeline.classList.add('is-active');
  roles.forEach((role) => role.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .14 });

  revealItems.forEach((item) => revealObserver.observe(item));
  roles.forEach((role) => revealObserver.observe(role));

  const timelineObserver = new IntersectionObserver((entries, observer) => {
    if (!entries[0].isIntersecting) return;
    timeline.classList.add('is-active');
    observer.disconnect();
  }, { threshold: .1 });

  timelineObserver.observe(timeline);
}

document.querySelector('#contact-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const button = form.querySelector('button[type="submit"]');
  const status = document.querySelector('#form-status');

  button.disabled = true;
  status.textContent = 'Sending message...';

  try {
    await emailjs.sendForm('service_q2pwbae', 'template_634tsao', form, {
      publicKey: 'X_HS_wKQfh-nmdY1c',
    });
    form.reset();
    status.textContent = 'Thanks — your message has been sent.';
  } catch {
    status.textContent = 'Message could not be sent. Please try again later.';
  } finally {
    button.disabled = false;
  }
});
