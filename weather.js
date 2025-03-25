document.addEventListener('DOMContentLoaded', function() {
    // Create the weather card HTML aligned with navbar
    const weatherCardHTML = `
    <div id="weatherCard" style="
        position: fixed;
        top: 20px;
        right: 20px;
        width: 180px;
        padding: 15px;
        border-radius: 10px;
        background-color: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: white;
        text-align: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 999;
        display: none;
        opacity: 0;
        transition: all 0.3s ease;">
        <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
            <div id="weatherIcon" style="font-size: 1.5rem;">🌤️</div>
            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 4px;">
                <span id="location" style="font-weight: bold; font-size: 0.9rem;">Loading</span>
                <span id="description" style="font-size: 0.8rem;"></span>
                <span id="temperature" style="font-size: 0.9rem;"></span>
            </div>
        </div>
    </div>
    `;
    
    // Append the weather card to the body
    document.body.insertAdjacentHTML('beforeend', weatherCardHTML);
    
    // Get user's weather
    getUserLocation();    
    
    // Position the weather card relative to the navbar
    // Position the weather card relative to the navbar
setTimeout(() => {
    const navbar = document.querySelector('nav');
    const weatherCard = document.getElementById('weatherCard');
    
    if (navbar && weatherCard) {
        // Get the navbar's bounding rectangle
        const navRect = navbar.getBoundingClientRect();
        
        // Calculate positions that avoid overlap
        const navRightEdge = navRect.right;
        const windowWidth = window.innerWidth;
        const weatherCardWidth = 180; // Match the width in the inline style
        
        // Position the weather card to the right of the navbar with some margin
        weatherCard.style.top = navRect.top + 'px';
        weatherCard.style.height = (navRect.height - 30) + 'px'; // Match navbar height
        
        // Move it 25px more to the left (from 40px to 15px gap)
        const rightPosition = Math.max(20, windowWidth - navRightEdge - weatherCardWidth - 15);
        weatherCard.style.right = rightPosition + 'px';
        
        // Adjust left position to match
        weatherCard.style.left = Math.max(navRightEdge + 15, windowWidth - weatherCardWidth - 20) + 'px';
    }
}, 200);
});

async function fetchWeather(location) {
    let url;
    let displayLocation;

    // Check if location contains coordinates
    if (typeof location === 'object' && location.lat && location.lon) {
        // Use coordinates for API but display city name
        url = `https://wttr.in/${location.lat},${location.lon}?format=%C+%t`;
        displayLocation = location.name || "Your Location";
    } else {
        // Use city name for both API and display
        url = `https://wttr.in/${location}?format=%C+%t`;
        displayLocation = location;
    }
    
    try {
        const response = await fetch(url);
        const data = await response.text();
        const [description, temperature] = data.split(" ");

        document.getElementById("location").innerText = `${displayLocation},`;
        document.getElementById("temperature").innerText = temperature;
        document.getElementById("description").innerText = description;
        
        // Set weather icon based on description
        const weatherIcon = getWeatherIcon(description.toLowerCase());
        document.getElementById("weatherIcon").innerText = weatherIcon;
        
        // Show the weather card with a fade-in effect
        const weatherCard = document.getElementById("weatherCard");
        weatherCard.style.display = "block";
        setTimeout(() => {
            weatherCard.style.opacity = "1";
        }, 100);
    } catch (error) {
        console.error("Error fetching weather:", error);
        
        // Show error message in weather card
        document.getElementById("location").innerText = "Weather Unavailable";
        document.getElementById("weatherIcon").innerText = "❓";
        document.getElementById("description").innerText = "";
        document.getElementById("temperature").innerText = "";
        
        const weatherCard = document.getElementById("weatherCard");
        weatherCard.style.display = "block";
        setTimeout(() => {
            weatherCard.style.opacity = "1";
        }, 100);
    }
}

function getWeatherIcon(description) {
    if (description.includes("sunny") || description.includes("clear")) {
        return "☀️";
    } else if (description.includes("cloud")) {
        return "☁️";
    } else if (description.includes("rain") || description.includes("drizzle")) {
        return "🌧️";
    } else if (description.includes("snow") || description.includes("flurries")) {
        return "❄️";
    } else if (description.includes("storm") || description.includes("thunder")) {
        return "⛈️";
    } else if (description.includes("fog") || description.includes("mist")) {
        return "🌫️";
    } else {
        return "🌤️"; // Default partly cloudy
    }
}

async function fetchLocationByIP() {
    try {
        const response = await fetch("http://ip-api.com/json/");
        const data = await response.json();
        if (data.status === "success") {
            fetchWeather(data.city);
        } else {
            fetchWeather("Mumbai"); // Default city
        }
    } catch (error) {
        fetchWeather("Mumbai"); // Default city
    }
}

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                // Get location name based on coordinates
                reverseGeocode(position.coords.latitude, position.coords.longitude);
            },
            error => {
                fetchLocationByIP();
            },
            { timeout: 5000 }
        );
    } else {
        fetchLocationByIP();
    }
}

async function reverseGeocode(lat, lon) {
    try {
        // Attempt to get location name from coordinates
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`);
        const data = await response.json();
        
        let locationName = "Your Location";
        
        // Extract city or town name from response
        if (data.address) {
                           data.address.county ||
                           "Your Location";
        }
        
        // Pass both coordinates and name
        fetchWeather({
            lat: lat,
            lon: lon,
            name: locationName
        });
    } catch (error) {
        // If reverse geocoding fails, just use coordinates
        fetchWeather({
            lat: lat,
            lon: lon,
            name: "Your Location"
        });
    }
}