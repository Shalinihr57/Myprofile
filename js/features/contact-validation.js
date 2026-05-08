async function initContactValidation() {
  const contactForm = document.getElementById("contact-form");
  const contactName = document.getElementById("contact-name");
  const contactEmail = document.getElementById("contact-email");
  const formMessage = document.getElementById("form-message");

  if (!contactForm || !contactName || !contactEmail || !formMessage) {
    console.log("Contact form elements not found");
    return;
  }

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = contactName.value.trim();
    const email = contactEmail.value.trim();

    formMessage.textContent = "";
    formMessage.style.color = "red";

    // Validation
    if (!name) {
      formMessage.textContent = "Name is required.";
      contactName.focus();
      return;
    }

    if (name.length < 5) {
      formMessage.textContent = "Name must be at least 5 characters.";
      contactName.focus();
      return;
    }

    if (!email) {
      formMessage.textContent = "Email is required.";
      contactEmail.focus();
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formMessage.textContent = "Enter a valid email.";
      contactEmail.focus();
      return;
    }

    // Send to Formspree
    try {
      const response = await fetch("https://formspree.io/f/xlgzwzqo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name,
          email
        })
      });

      if (response.ok) {
        formMessage.textContent = "Message sent successfully ✓";
        formMessage.style.color = "#22c55e";

        contactForm.reset();

        setTimeout(() => {
          formMessage.textContent = "";
        }, 3000);
      } else {
        formMessage.textContent = "Failed to send message.";
      }

    } catch (error) {
      formMessage.textContent = "Something went wrong.";
    }
  });

  [contactName, contactEmail].forEach(el =>
    el.addEventListener("input", () => {
      formMessage.textContent = "";
    })
  );
}

// Initialize
initContactValidation();