/**
 * place.js - Dynamic functionality for Kampala country page
 * WDD 131 - Week 03 Assignment
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // --- FOOTER: Current year and last modified date ---
    const yearSpan = document.getElementById('currentyear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    const modSpan = document.getElementById('lastModified');
    if (modSpan) {
        modSpan.textContent = document.lastModified;
    }
    
    // --- WIND CHILL CALCULATION ---
    // Static values matching the displayed content
    const temperature = 25.3;  // °C
    const windSpeed = 5.8;      // km/h
    
    /**
     * Calculate wind chill factor using metric formula
     * @param {number} tempC - Temperature in Celsius
     * @param {number} windKmph - Wind speed in km/h
     * @returns {string} Wind chill value with unit or "N/A"
     */
    function calculateWindChill(tempC, windKmph) {
        // Wind chill formula for metric (Celsius, km/h):
        // 13.12 + 0.6215*T - 11.37*(v^0.16) + 0.3965*T*(v^0.16)
        
        // Conditions must be met before calculation
        if (tempC > 10 || windKmph <= 4.8) {
            return "N/A";
        }
        
        // Calculate wind chill
        const v = Math.pow(windKmph, 0.16);
        const wc = 13.12 + 0.6215 * tempC - 11.37 * v + 0.3965 * tempC * v;
        
        return wc.toFixed(1) + " °C";
    }
    
    // Display wind chill based on conditions
    const windchillSpan = document.getElementById('windchillDisplay');
    if (windchillSpan) {
        // Check if conditions are met for wind chill calculation
        // Metric: temperature <= 10°C AND wind speed > 4.8 km/h
        if (temperature <= 10 && windSpeed > 4.8) {
            const chill = calculateWindChill(temperature, windSpeed);
            windchillSpan.textContent = chill;
        } else {
            windchillSpan.textContent = "N/A";
        }
    }
    
    // Optional: Log for debugging
    console.log('Country page loaded successfully');
    console.log(`Temperature: ${temperature}°C, Wind Speed: ${windSpeed} km/h`);
});