// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Hamburger Menu Functionality
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav = document.getElementById('main-nav');
    
    if (hamburgerBtn && mainNav) {
        hamburgerBtn.addEventListener('click', function() {
            mainNav.classList.toggle('show');
            
            // Change button symbol based on menu state
            if (mainNav.classList.contains('show')) {
                hamburgerBtn.innerHTML = '✕';
                hamburgerBtn.setAttribute('aria-label', 'Close navigation menu');
            } else {
                hamburgerBtn.innerHTML = '☰';
                hamburgerBtn.setAttribute('aria-label', 'Open navigation menu');
            }
        });

        // Close menu when link clicked
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Remove active class from all and add to clicked
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Close menu on mobile (below 768px)
                if (window.innerWidth < 768) {
                    mainNav.classList.remove('show');
                    hamburgerBtn.innerHTML = '☰';
                    hamburgerBtn.setAttribute('aria-label', 'Open navigation menu');
                }
            });
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768) {
                mainNav.classList.remove('show');
                hamburgerBtn.innerHTML = '☰';
                hamburgerBtn.setAttribute('aria-label', 'Open navigation menu');
            }
        });
    }

    // Footer Dynamic Content
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const lastModifiedSpan = document.getElementById('last-modified');
    if (lastModifiedSpan) {
        const lastModified = new Date(document.lastModified);
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit', 
            minute: '2-digit'
        };
        lastModifiedSpan.textContent = lastModified.toLocaleDateString('en-US', options);
    }

    // Image error handling (optional but good practice)
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log('Image failed to load, using placeholder');
            this.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'200\' viewBox=\'0 0 300 200\'%3E%3Crect width=\'300\' height=\'200\' fill=\'%23cccccc\'/%3E%3Ctext x=\'150\' y=\'100\' text-anchor=\'middle\' dy=\'.3em\' fill=\'%23333333\' font-family=\'Arial\' font-size=\'14\'%3ETemple Image%3C/text%3E%3C/svg%3E';
        });
    });
});