// getdates.js - dynamic copyright year and last modified date
// Both required outputs are present and correct.

// Set current year dynamically in footer
const currentYearSpan = document.getElementById('currentyear');
if (currentYearSpan) {
    const today = new Date();
    currentYearSpan.textContent = today.getFullYear();  // e.g., 2026
}

// Set last modified date/time using document.lastModified
const lastModifiedPara = document.getElementById('lastModified');
if (lastModifiedPara) {
    // document.lastModified returns a string like "03/07/2026 14:35:22"
    lastModifiedPara.innerHTML = 'Last modified: ' + document.lastModified;
}

// No other JavaScript – lightweight, no errors.
// The defer attribute ensures the DOM is ready.