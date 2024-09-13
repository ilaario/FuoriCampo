/**
 * Generates the HTML string for the navigation bar.
 *
 * The navigation bar includes links to Home, Partite, Squadre, Competizioni, and Chat pages.
 * It also includes buttons for user actions such as Accedi (Login), Registrati (Register), and Esci (Logout).
 *
 * @returns {string} The HTML string for the navigation bar.
 */
function generateNavbar() {
    return `
        <div class="navName">
            <i class="uil uil-bars navOpenBtn"></i>
            <div class="container-name" onclick="location.href='index.html'">
                <a href="index.html" class="name"><span class="green">FUORI</span>Campo</a>
            </div>
            <ul class="nav-links">
                <i class="uil uil-times navCloseBtn"></i>
                <li><a href="index.html">Home</a></li>
                <li><a href="games.html">Games</a></li>
                <li><a href="teams.html">Teams</a></li>
                <li><a href="players.html">Players</a></li>
                <li><a href="chat.html">Chat</a></li>
            </ul>
        </div>
        
        <div class="button-container">
            <button class="top-right-button" id="RightAccedi">LogIn / SignUp</button>
            <button class="top-right-button" id="RightEsci" style="display: none;">Exit</button>
        </div>
    `;
}

/**
 * Generates the HTML string for the footer.
 *
 * The footer includes the company logo, name, social media links, useful links, address, and copyright information.
 *
 * @returns {string} The HTML string for the footer.
 */
function generateFooter() {
    return `
        <div class="footerElements">
    <div class="footerLeftElement">
        <div class="footerTitle">
            <h2><span>FUORI</span>Campo</h2>
        </div>
        <div class="footerLeftText">
            <p><b>Your football universe at your fingertips!</b><br>
                Follow us on social media to stay updated with the latest news, real-time results, and exclusive insights.</p>
        </div>
        <div class="footerSocial">
            <a href="#"><i class="uil uil-facebook-f"></i></a>
            <a href="#"><i class="uil uil-twitter-alt"></i></a>
            <a href="#"><i class="uil uil-instagram"></i></a>
            <a href="#"><i class="uil uil-linkedin"></i></a>
        </div>
    </div>
    <div class="footerMiddleLeftElement">
        <div class="footerTitle">
            <h2>USEFUL LINKS</h2>
        </div>
        <div class="footerMiddleLeftText">
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="games.html">All matches</a></li>
                <li><a href="teams.html">All teams</a></li>
                <li><a href="players.html">All players</a></li>
                <li><a href="chat.html">Chat</a></li>
            </ul>
        </div>
    </div>
</div>
<div class="copyright"><p>© 2024 FUORICampo. All rights reserved. | Privacy Policy | Terms of Service</p></div>
    `;
}

/**
 * Loads the navigation bar into the 'navbar-container' element.
 *
 * This function generates the navigation bar using the `generateNavbar` function and inserts it into the 'navbar-container' element.
 * It also sets up event listeners for the navigation open and close buttons, and the 'Accedi', 'Registrati', and 'Esci' buttons.
 * If a token exists in the sessionStorage, it hides the 'Accedi' and 'Registrati' buttons and shows the 'Esci' button.
 * If a token does not exist, it shows the 'Accedi' and 'Registrati' buttons and hides the 'Esci' button.
 * Finally, it calls the `setActiveLink` function to set the active link in the navigation bar.
 */
function loadNav(){
    document.getElementById('navbar-container').innerHTML = generateNavbar();
    const nav = document.querySelector(".nav"),
        navOpenBtn = document.querySelector(".navOpenBtn"),
        navCloseBtn = document.querySelector(".navCloseBtn");
    navOpenBtn.addEventListener("click", () => {
        nav.classList.add("openNav");
    });
    navCloseBtn.addEventListener("click", () => {
        nav.classList.remove("openNav");
    });

    document.getElementById('RightAccedi').onclick = loadAccedi;
    document.getElementById('RightEsci').onclick = function () {
        sessionStorage.removeItem('token');
        window.location.href = 'index.html';
    }

    // Check if a token exists in the sessionStorage
    if (sessionStorage.getItem('token') !== null) {
        // If a token exists, hide the "Login" and "Register" buttons and show the "Logout" button
        document.getElementById('RightAccedi').style.display = 'none';
        document.getElementById('RightEsci').style.display = '';
    } else {
        // If a token does not exist, show the "Login" and "Register" buttons and hide the "Logout" button
        document.getElementById('RightAccedi').style.display = '';
        document.getElementById('RightEsci').style.display = 'none';
    }

    setActiveLink();
}

/**
 * Loads the footer into the 'footer-container' element.
 *
 * This function generates the footer using the `generateFooter` function and inserts it into the 'footer-container' element.
 */
function loadFooter(){
    document.getElementById('footer-container').innerHTML = generateFooter();
}

/**
 * Handles the 'Accedi' button click event.
 *
 * This function redirects the user to the 'login_signUp.html' page with 'Accedi' as a parameter in the URL.
 * If a token exists in the sessionStorage, it hides the 'Accedi' button.
 */
function loadAccedi(){
    var LogIn = 'Accedi';
    window.location.href = 'login_signUp.html?parametro=' + LogIn;
    if(sessionStorage.getItem('token') !== null){
        document.getElementById('RightAccedi').style.display = 'none';
    }
}

/**
 * Handles the 'Registrati' button click event.
 *
 * This function redirects the user to the 'login_signUp.html' page with 'Registrati' as a parameter in the URL.
 * If a token exists in the sessionStorage, it hides the 'Registrati' button.
 */
function loadRegistrati(){
    var LogIn = 'Registrati';
    window.location.href = 'login_signUp.html?parametro=' + LogIn;
    if (sessionStorage.getItem('token') !== null) {
        document.getElementById('RightRegistrati').style.display = 'none';
    }
}

/**
 * Sets the 'active' class for the link in the navigation bar that corresponds to the current page.
 *
 * This function selects all the anchor elements within '.nav-links', and checks each one to see if its 'href' attribute matches the current page's URL.
 * If it does, the 'active' class is added to that link.
 * If it does not, the 'active' class is removed from that link.
 */
function setActiveLink() {
    const links = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname.split('/').pop(); // Only takes the final part of the URL

    links.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
