// Temple Data Array - 7 original + 4 additional = 11 temples total
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // Additional temples added by student (4 new temples)
    {
        templeName: "Salt Lake Temple",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 253015,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-37762.jpg"
    },
    {
        templeName: "Rome Italy Temple",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 40000,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/400x250/rome-italy-temple-exterior-2466498-wallpaper.jpg"
    },
    {
        templeName: "Buenos Aires Argentina",
        location: "Buenos Aires, Argentina",
        dedicated: "1986, January, 17",
        area: 30000,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/buenos-aires-argentina/400x250/buenos-aires-argentina-temple-1009725-wallpaper.jpg"
    },
    {
        templeName: "Paris France Temple",
        location: "Le Chesnay, France",
        dedicated: "2017, May, 21",
        area: 44175,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/paris-france/400x250/paris-france-temple-exterior-2017-04-10.jpg"
    }
];

// Helper function to extract year from dedicated date
function getDedicatedYear(dedicatedStr) {
    return parseInt(dedicatedStr.split(',')[0]);
}

// Function to create temple cards dynamically
function displayTemples(templesArray) {
    const templeGrid = document.getElementById('temple-grid');
    
    if (!templeGrid) return;
    
    // Clear existing content
    templeGrid.innerHTML = '';
    
    // Check if no temples match the filter
    if (templesArray.length === 0) {
        templeGrid.innerHTML = '<p class="no-results">No temples match this filter criteria.</p>';
        return;
    }
    
    // Loop through array and create temple cards
    templesArray.forEach(temple => {
        const figure = document.createElement('figure');
        figure.classList.add('temple-card');
        
        const img = document.createElement('img');
        img.src = temple.imageUrl;
        img.alt = `${temple.templeName} temple`;
        img.loading = 'lazy';
        img.width = 400;
        img.height = 250;
        
        // Add error handling for images
        img.onerror = function() {
            this.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'250\' viewBox=\'0 0 400 250\'%3E%3Crect width=\'400\' height=\'250\' fill=\'%23cccccc\'/%3E%3Ctext x=\'200\' y=\'125\' text-anchor=\'middle\' dy=\'.3em\' fill=\'%23333333\' font-family=\'Arial\' font-size=\'14\'%3ETemple Image%3C/text%3E%3C/svg%3E';
        };
        
        const figcaption = document.createElement('figcaption');
        
        const h3 = document.createElement('h3');
        h3.textContent = temple.templeName;
        
        const locationP = document.createElement('p');
        locationP.innerHTML = `<strong>📍 Location:</strong> ${temple.location}`;
        
        const dedicatedP = document.createElement('p');
        dedicatedP.innerHTML = `<strong>📅 Dedicated:</strong> ${temple.dedicated}`;
        
        const areaP = document.createElement('p');
        areaP.innerHTML = `<strong>📐 Area:</strong> ${temple.area.toLocaleString()} sq ft`;
        
        figcaption.appendChild(h3);
        figcaption.appendChild(locationP);
        figcaption.appendChild(dedicatedP);
        figcaption.appendChild(areaP);
        
        figure.appendChild(img);
        figure.appendChild(figcaption);
        templeGrid.appendChild(figure);
    });
}

// Filter functions
function filterTemples(filterType) {
    let filteredTemples = [];
    
    switch(filterType) {
        case 'old':
            // Temples built before 1900
            filteredTemples = temples.filter(temple => getDedicatedYear(temple.dedicated) < 1900);
            break;
        case 'new':
            // Temples built after 2000
            filteredTemples = temples.filter(temple => getDedicatedYear(temple.dedicated) > 2000);
            break;
        case 'large':
            // Temples larger than 90,000 square feet
            filteredTemples = temples.filter(temple => temple.area > 90000);
            break;
        case 'small':
            // Temples smaller than 10,000 square feet
            filteredTemples = temples.filter(temple => temple.area < 10000);
            break;
        default:
            // Home - all temples
            filteredTemples = temples;
    }
    
    return filteredTemples;
}

// Update page title based on filter
function updatePageTitle(filterType) {
    const titleElement = document.getElementById('page-title');
    if (!titleElement) return;
    
    switch(filterType) {
        case 'old':
            titleElement.textContent = '🏛️ Old Temples (Before 1900)';
            break;
        case 'new':
            titleElement.textContent = '✨ New Temples (After 2000)';
            break;
        case 'large':
            titleElement.textContent = '🏗️ Large Temples (> 90,000 sq ft)';
            break;
        case 'small':
            titleElement.textContent = '🏠 Small Temples (< 10,000 sq ft)';
            break;
        default:
            titleElement.textContent = '🏰 All Temples';
    }
}

// Setup navigation filtering
function setupNavigation() {
    const navLinks = document.querySelectorAll('.navigation a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get filter type from data-filter attribute
            const filterType = link.getAttribute('data-filter');
            
            // Update active class and ARIA attributes
            navLinks.forEach(l => {
                l.classList.remove('active');
                l.removeAttribute('aria-current');
            });
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
            
            // Filter and display temples
            const filteredTemples = filterTemples(filterType);
            displayTemples(filteredTemples);
            
            // Update page title
            updatePageTitle(filterType);
            
            // Scroll to top of main content for better UX
            document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Footer dynamic content
function updateFooter() {
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
}

// Hamburger menu functionality
function setupHamburgerMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav = document.getElementById('main-nav');
    
    if (hamburgerBtn && mainNav) {
        hamburgerBtn.addEventListener('click', function() {
            const expanded = mainNav.classList.toggle('show');
            hamburgerBtn.setAttribute('aria-expanded', expanded);
            
            if (expanded) {
                hamburgerBtn.innerHTML = '✕';
                hamburgerBtn.setAttribute('aria-label', 'Close navigation menu');
            } else {
                hamburgerBtn.innerHTML = '☰';
                hamburgerBtn.setAttribute('aria-label', 'Open navigation menu');
            }
        });

        // Close menu when window resizes above mobile breakpoint
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768) {
                mainNav.classList.remove('show');
                hamburgerBtn.innerHTML = '☰';
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                hamburgerBtn.setAttribute('aria-label', 'Open navigation menu');
            }
        });
        
        // Close menu when clicking outside (optional enhancement)
        document.addEventListener('click', function(event) {
            if (window.innerWidth < 768 && 
                mainNav.classList.contains('show') && 
                !mainNav.contains(event.target) && 
                !hamburgerBtn.contains(event.target)) {
                mainNav.classList.remove('show');
                hamburgerBtn.innerHTML = '☰';
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Display all temples initially
    displayTemples(temples);
    
    // Setup navigation filters
    setupNavigation();
    
    // Setup hamburger menu
    setupHamburgerMenu();
    
    // Update footer with current year and last modified
    updateFooter();
    
    // Set initial ARIA attributes
    const hamburgerBtn = document.getElementById('hamburger-btn');
    if (hamburgerBtn) {
        hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
});