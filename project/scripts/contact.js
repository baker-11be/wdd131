const storageKey = "tc_contact_messages";

function setupMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  if (!toggle || !nav) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", `${isOpen}`);
  });
}

function stampYear() {
  const yearNode = document.querySelector("#year");

  if (yearNode) {
    yearNode.textContent = `${new Date().getFullYear()}`;
  }
}

function getStoredSubmissions() {
  const raw = localStorage.getItem(storageKey);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    localStorage.removeItem(storageKey);
    return [];
  }
}

function saveSubmission(entry) {
  const allEntries = getStoredSubmissions();
  const updated = [entry, ...allEntries].slice(0, 5);
  localStorage.setItem(storageKey, JSON.stringify(updated));
}

function submissionsTemplate(entries) {
  if (!entries.length) {
    return "<p>No saved submissions yet.</p>";
  }

  return entries.map((entry) => `
    <article>
      <h3>${entry.name}</h3>
      <p><strong>Date:</strong> ${entry.hikeDate} | <strong>Trail:</strong> ${entry.trail}</p>
      <p><strong>Experience:</strong> ${entry.experience} | <strong>Season:</strong> ${entry.season}</p>
      <p>${entry.message}</p>
    </article>
  `).join("");
}

function renderSubmissions() {
  const container = document.querySelector("#saved-submissions");

  if (!container) {
    return;
  }

  const entries = getStoredSubmissions();
  container.innerHTML = `
    <h3>Recent Saved Requests</h3>
    ${submissionsTemplate(entries)}
  `;
}

function seasonalAdvice(entry) {
  if (entry.experience === "beginner" && entry.trail === "Mwamba Ridge Climb") {
    return "As a beginner selecting Mwamba Ridge Climb, consider hiking with an experienced partner.";
  }

  if (entry.season === "rainy") {
    return "Rainy season selected: include waterproof gear and extra traction for muddy sections.";
  }

  return "Your trail plan looks balanced for the selected season.";
}

function buildEntry(form) {
  const data = new FormData(form);

  return {
    name: `${data.get("full-name")}`.trim(),
    email: `${data.get("email")}`.trim(),
    hikeDate: `${data.get("hike-date")}`,
    experience: `${data.get("experience")}`,
    season: `${data.get("season")}`,
    trail: `${data.get("target-trail")}`,
    message: `${data.get("message")}`.trim()
  };
}

function validateDate(hikeDate) {
  const selected = new Date(`${hikeDate}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return selected >= today;
}

function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const feedback = document.querySelector("#form-feedback");

  if (!feedback) {
    return;
  }

  if (!form.checkValidity()) {
    feedback.textContent = "Please complete all required fields before submitting.";
    return;
  }

  const entry = buildEntry(form);

  if (!validateDate(entry.hikeDate)) {
    feedback.textContent = "Please choose today or a future date for your planned hike.";
    return;
  }

  saveSubmission(entry);
  renderSubmissions();

  feedback.textContent = `Thanks ${entry.name}. Request saved successfully. ${seasonalAdvice(entry)}`;
  form.reset();
}

function initForm() {
  const form = document.querySelector("#contact-form");

  if (!form) {
    return;
  }

  form.addEventListener("submit", handleFormSubmit);
}

function setMinHikeDate() {
  const hikeDate = document.querySelector("#hike-date");

  if (!hikeDate) {
    return;
  }

  const today = new Date();
  const year = today.getFullYear();
  const month = `${today.getMonth() + 1}`.padStart(2, "0");
  const day = `${today.getDate()}`.padStart(2, "0");
  hikeDate.min = `${year}-${month}-${day}`;
}

document.addEventListener("DOMContentLoaded", () => {
  setupMenu();
  stampYear();
  setMinHikeDate();
  initForm();
  renderSubmissions();
});
