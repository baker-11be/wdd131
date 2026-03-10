// Get references to the HTML elements
const radiusOutput = document.getElementById('radius');
const areaOutput = document.getElementById('area'); // Fixed: was querySelector('area')

// Initialize variables
let area = 0;
const PI = 3.14159; // Fixed: was using == instead of =

let radius = 10; // Fixed: changed from const to let to allow reassignment

// Calculate and display for radius = 10
area = PI * radius * radius;
radiusOutput.textContent = radius; // Fixed: was trying to assign to element directly
areaOutput.textContent = area; // Fixed: was trying to assign to element directly

// Calculate and display for radius = 20
radius = 20;
area = PI * radius * radius;
radiusOutput.textContent = radius;
areaOutput.textContent = area;