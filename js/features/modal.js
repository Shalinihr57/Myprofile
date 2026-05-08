function initModal() {
  const modal = document.getElementById("contact-modal");
  const modalContent = document.getElementById("modal-content");
  const modalTrigger = document.getElementById("modal-trigger");
  const modalClose = document.getElementById("modal-close");
  const formCancel = document.getElementById("form-cancel");

  if (!modal || !modalContent || !modalTrigger) { console.log("Modal elements not found"); return; }

  function openModal() {
    modal.classList.remove("hidden");
    setTimeout(() => { modalContent.classList.remove("scale-out"); }, 10);
  }
  function closeModal() {
    modalContent.classList.add("scale-out");
    setTimeout(() => { modal.classList.add("hidden"); }, 250);
  }

  modalTrigger.addEventListener("click", openModal);
  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (formCancel) formCancel.addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
}
