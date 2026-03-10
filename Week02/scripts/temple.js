// temples.js - Main JavaScript for Temple Album

// ==================== FOOTER DYNAMIC CONTENT ====================
// Set current year in footer
const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

// Set last modified date
const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = `Last Modified: ${lastModified}`;

// ==================== HAMBURGER MENU FUNCTIONALITY ====================
// Get elements
const hamburgerBtn = document.getElementById('hamburger-btn');
const mainNav = document.getElementById('main-nav');

// Toggle menu function
function toggleMenu() {
    // Toggle the 'show' class on the navigation
    mainNav.classList.toggle('show');
    
    // Toggle the hamburger button icon between ☰ and ✕
    if (mainNav.classList.contains('show')) {
        hamburgerBtn.innerHTML = '✕'; // Close icon
        hamburgerBtn.setAttribute('aria-label', 'Close menu');
    } else {
        hamburgerBtn.innerHTML = '☰'; // Hamburger icon
        hamburgerBtn.setAttribute('aria-label', 'Open menu');
    }
}

// Add click event listener to hamburger button
hamburgerBtn.addEventListener('click', toggleMenu);

// ==================== CLOSE MENU ON RESIZE ====================
// Check window width and reset menu if needed
function handleResize() {
    if (window.innerWidth >= 768) {
        // On larger screens, ensure menu is visible and hamburger is hidden
        mainNav.classList.remove('show');
        hamburgerBtn.innerHTML = '☰';
        hamburgerBtn.setAttribute('aria-label', 'Open menu');
    }
}

// Add resize event listener
window.addEventListener('resize', handleResize);

// ==================== CLOSE MENU WHEN LINK CLICKED ====================
// Get all navigation links
const navLinks = document.querySelectorAll('.nav-menu a');

// Add click event to each link to close menu on mobile
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            mainNav.classList.remove('show');
            hamburgerBtn.innerHTML = '☰';
            hamburgerBtn.setAttribute('aria-label', 'Open menu');
        }
    });
});

// ==================== ACTIVE LINK HIGHLIGHTING ====================
// Add active class to current page link
function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Call function to set active link
setActiveLink();

// ==================== CONSOLE LOG FOR DEBUGGING ====================
console.log('Temple Album JavaScript loaded successfully!');
console.log(`Current Year: ${currentYear}`);
console.log(`Last Modified: ${lastModified}`);