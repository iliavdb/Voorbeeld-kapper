const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Menu openen" : "Menu sluiten");
  siteNav.classList.toggle("is-open", !isExpanded);
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Menu openen");
    siteNav.classList.remove("is-open");
  });
});

const dateInput = document.querySelector("#date");
const localToday = new Date();
const localDate = new Date(localToday.getTime() - localToday.getTimezoneOffset() * 60_000)
  .toISOString()
  .slice(0, 10);
dateInput.min = localDate;

document.querySelector("#current-year").textContent = String(new Date().getFullYear());

const bookingForm = document.querySelector("#booking-form");
const formMessage = document.querySelector("#form-message");

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!bookingForm.reportValidity()) return;

  const formData = new FormData(bookingForm);
  const firstName = String(formData.get("name")).trim().split(/\s+/)[0];
  formMessage.textContent = `Bedankt ${firstName}! Je demo-aanvraag voor ${formData.get("service")} op ${formData.get("date")} is ingevuld. In een echte website wordt deze naar de salon verstuurd.`;
  formMessage.classList.add("success");
  bookingForm.querySelector('button[type="submit"]').textContent = "Aanvraag ingevuld ✓";
});
