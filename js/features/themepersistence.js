const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// apply saved theme on load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    body.classList.add('dark');
  }
});

// toggle theme on click
toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark');

  const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';

  localStorage.setItem('theme', currentTheme);
});
