// Make initThemeToggle available globally
window.initThemeToggle = function() {
    // Try to find the toggle switch
    const toggleSwitch = document.querySelector('#checkbox');
    
    if (!toggleSwitch) {
        console.error("Toggle switch not found");
        return;
    }
    
    // Function to check time and set theme accordingly
    function setThemeBasedOnTime() {
        const currentHour = new Date().getHours();
        
        // If it's evening or night (between 6 PM and 6 AM)
        if (currentHour >= 18 || currentHour < 6) {
            // Set to dark theme
            document.documentElement.setAttribute('data-theme', 'dark');
            toggleSwitch.checked = true;
        } else {
            // Set to light theme
            document.documentElement.setAttribute('data-theme', 'light');
            toggleSwitch.checked = false;
        }
    }
    
    // Set theme based on time initially
    setThemeBasedOnTime();
    
    // Set up a flag for user override
    let userOverride = false;

    // Or with short-circuit:
    setInterval(() => userOverride || setThemeBasedOnTime(), 1000);

    // Function to switch themes manually
    function switchTheme(event) {
        userOverride = true;
        if (event.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }
    
    // Add event listener for toggle switch
    toggleSwitch.addEventListener('change', switchTheme);
    
    console.log("Theme toggle initialized successfully with time-based auto toggle");
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if not already done by navbar.js
    setTimeout(function() {
        if (document.querySelector('#checkbox') && typeof window.initThemeToggle === 'function') {
            window.initThemeToggle();
        }
    }, 500); // Give navbar.js time to insert the navbar
});
