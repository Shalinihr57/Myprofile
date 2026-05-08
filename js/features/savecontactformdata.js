function initSaveContact() {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const clearBtn = document.getElementById("sendBtn");
  const status = document.getElementById("status");

  if (!nameInput || !emailInput || !messageInput) return;

  // Load saved data
  const saved = localStorage.getItem("contactFormData");
  if (saved) {
    try {
      const data = JSON.parse(saved);
      nameInput.value = data.name || "";
      emailInput.value = data.email || "";
      messageInput.value = data.message || "";
    } catch (e) { console.error("Load error", e); }
  }

  // Save on input
  [nameInput, emailInput, messageInput].forEach(el => {
    el.addEventListener("input", () => {
      localStorage.setItem("contactFormData", JSON.stringify({
        name: nameInput.value,
        email: emailInput.value,
        message: messageInput.value
      }));
      if (status) { status.textContent = "Saved ✓"; setTimeout(() => { status.textContent = ""; }, 2000); }
    });
  });

  // Clear
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      localStorage.removeItem("contactFormData");
      nameInput.value = ""; emailInput.value = ""; messageInput.value = "";
      if (status) { status.textContent = "Cleared ✓"; setTimeout(() => { status.textContent = ""; }, 2000); }
    });
  }
}
