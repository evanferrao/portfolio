window.initThemeToggle = function() {
    const toggleSwitch = document.querySelector('#checkbox');
    
    if (!toggleSwitch) {
        console.error("Toggle switch not found");
        return;
    }
    
    function setThemeBasedOnTime() {
        const currentHour = new Date().getHours();
        
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
    
    let userOverride = false;

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
    
    toggleSwitch.addEventListener('change', switchTheme);
    
    console.log("Theme toggle initialized successfully with time-based auto toggle");
};

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        if (document.querySelector('#checkbox') && typeof window.initThemeToggle === 'function') {
            window.initThemeToggle();
        }
    }, 500); 
});
