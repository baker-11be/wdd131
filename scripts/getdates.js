// getdates.js - Dynamic footer content
// Using consistent coding style

// Get current year and update copyright
const currentYearSpan = document.getElementById('currentyear');
if (currentYearSpan) {
    const today = new Date();
    currentYearSpan.textContent = today.getFullYear();
}

// Get last modified date and update footer
const lastModifiedPara = document.getElementById('lastModified');
if (lastModifiedPara) {
    // Use consistent formatting
    const lastMod = new Date(document.lastModified);
    const formattedDate = lastMod.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    lastModifiedPara.innerHTML = 'Last modified: ' + formattedDate;
}