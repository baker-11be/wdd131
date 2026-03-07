// getdates.js - Dynamic footer content

// Get current year and update copyright
const currentYearSpan = document.getElementById('currentyear');
if (currentYearSpan) {
    const today = new Date();
    currentYearSpan.textContent = today.getFullYear();
}

// Get last modified date and update footer
const lastModifiedPara = document.getElementById('lastModified');
if (lastModifiedPara) {
    lastModifiedPara.innerHTML = 'Last modified: ' + document.lastModified;
}