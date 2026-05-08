function initTyping() {
  const roles = ["Full-stack Developer", "Problem Solver"];
  const el = document.getElementById("typing-text");
  if (!el) return;

  let roleIndex = 0, charIndex = 0, isDeleting = false;

  function tick() {
    const current = roles[roleIndex];
    el.textContent = current.slice(0, isDeleting ? --charIndex : ++charIndex);

    let speed = isDeleting ? 50 : 100;
    if (!isDeleting && charIndex === current.length) { isDeleting = true; speed = 1200; }
    else if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; speed = 400; }

    setTimeout(tick, speed);
  }
  tick();
}

function initGreeting() {
  const el = document.getElementById("greeting");
  if (!el) return;
  const hour = new Date().getHours();
  el.textContent = hour < 12 ? "Good morning 👋" : hour < 17 ? "Good afternoon 👋" : "Good evening 👋";
}
