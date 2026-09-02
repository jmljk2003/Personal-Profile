const button = document.querySelector('.menu-button');
const nav = document.querySelector('nav');

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
