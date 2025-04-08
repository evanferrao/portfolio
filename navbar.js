document.addEventListener('DOMContentLoaded', function() {
    const navbarHTML = `
    <nav style="
        position: fixed; 
        top: 20px; 
        left: 0; 
        right: 0; 
        width: 90%; 
        max-width: 1200px; 
        margin: 20px auto;
        z-index: 1000;
        background-color: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        padding: 15px 25px;
        display: flex;
        justify-content: space-between;
        align-items: center;">
        <ul class="menu">
            <li><a href="index.html">Home</a></li>
            <li><a href="hobbies.html">Hobbies</a></li>
            <li><a href="resume.html">Resume</a></li>
            <li><a href="projects.html">Projects</a></li>
            <li><a href="ContactMe.html">Contact Me</a></li>
            <li><a href="cats.html">Surprise Me!!</a></li>
        </ul>
        
        <!-- Day/Night Toggle Button -->
        <div class="theme-switch-wrapper">
            <label class="theme-switch" for="checkbox">
                <input type="checkbox" id="checkbox" />
                <div class="slider round">
                    <div class="moon">🌙</div>
                    <div class="sun">☀️</div>
                </div>
            </label>
        </div>
        
        <div class="social-icons">
            <a href="https://github.com/evanferrao" target="_blank"><img src="https://img.icons8.com/ios/50/000000/github.png" alt="GitHub"></a>
            <a href="https://www.linkedin.com/evanferrao" target="_blank"><img src="https://img.icons8.com/ios/50/000000/linkedin.png" alt="LinkedIn"></a>
            <a href="https://twitter.com/evanferrao" target="_blank"><img src="https://img.icons8.com/ios/50/000000/twitter.png" alt="Twitter"></a>
            <a href="https://www.facebook.com//u/evanferrao" target="_blank"><img src="https://img.icons8.com/ios/50/000000/facebook.png" alt="Facebook"></a>
        </div>
    </nav>
    `;
    
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    
    if (navbarPlaceholder) {
        navbarPlaceholder.innerHTML = navbarHTML;
        
        navbarPlaceholder.style.marginBottom = "120px";
        
        document.body.style.paddingTop = "20px";
        
        const toggleScript = document.createElement('script');
        toggleScript.src = 'toggle.js';
        
        toggleScript.onload = function() {
            if (window.initThemeToggle) {
                window.initThemeToggle();
            }
        };
        
        document.body.appendChild(toggleScript);
    }
});