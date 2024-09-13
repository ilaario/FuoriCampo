/**
 * Initializes the login and registration UI based on the URL parameter.
 * Sets up event listeners for switching between login and registration forms,
 * and handles form submissions with validation.
 */
function init(){
    var urlParams = new URLSearchParams(window.location.search);
    var parametro = urlParams.get('parametro');

    const LogInContainer = document.getElementById('LogInContainer');
    const SignUpContainer = document.getElementById('SignUpContainer');
    console.log(parametro);

    // Show the appropriate form based on the URL parameter
    if (parametro === 'Accedi') {
        LogInContainer.style.display = 'block';
        SignUpContainer.style.display = 'none';
    } else {
        LogInContainer.style.display = 'none';
        SignUpContainer.style.display = 'block';
    }

    // Event listener for switching to the login form
    const SignInButton = document.getElementById('SignInButton');
    SignInButton.addEventListener('click', function() {
        LogInContainer.style.display = 'block';
        SignUpContainer.style.display = 'none';
    });

    // Event listener for switching to the registration form
    const SignUpButton = document.getElementById('SignUpButton');
    SignUpButton.addEventListener('click', function() {
        LogInContainer.style.display = 'none';
        SignUpContainer.style.display = 'block';
    });

    const SignUpResponsive = document.getElementById('SignUpResponsive');
    SignUpResponsive.addEventListener('click', function() {
        LogInContainer.style.display = 'none';
        SignUpContainer.style.display = 'block';
    });

    const SignInResponsive = document.getElementById('SignInResponsive');
    SignInResponsive.addEventListener('click', function() {
        LogInContainer.style.display = 'block';
        SignUpContainer.style.display = 'none';
    });

    // Funzione per gestire l'evento focus
    function handleFocus(event) {
        event.target.style.backgroundColor = "#dcfcff"; // Cambia lo sfondo a un azzurro chiaro
        event.target.style.transition = "all 0.3s ease"; // Aggiunge una transizione per un cambiamento più fluido
    }

// Funzione per gestire l'evento blur
    function handleBlur(event) {
        event.target.style.backgroundColor = ""; // Resetta lo sfondo
    }

// Aggiungi gli event listener agli input email e password
    ['loginEmail', 'signupEmail', 'loginPassword', 'signupPassword', 'signupName'].forEach(id => {
        const element = document.getElementById(id);
        element.addEventListener('focus', handleFocus);
        element.addEventListener('blur', handleBlur);
    });

    /**
     * Handles the input event for email fields.
     *
     * @param {Event} event - The input event.
     * @param {string} errorId - The id of the error message element.
     */
    function handleEmailInput(event, errorId) {
        const emailInput = event.target;
        const emailError = document.getElementById(errorId);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value === "") {
            emailInput.classList.remove('input-error');
            emailError.style.display = 'none';
            emailInput.style.borderColor = "";
            emailInput.style.border = "1px solid #ccc";
        } else if (!emailPattern.test(emailInput.value)) {
            emailInput.classList.add('input-error');
            emailError.style.display = 'block';
            emailInput.style.border = "2px solid red";
        } else {
            emailInput.classList.remove('input-error');
            emailError.style.display = 'none';
            emailInput.style.border = "2px solid green";
        }
    }

    /**
     * Handles the input event for password fields.
     *
     * @param {Event} event - The input event.
     * @param {string} errorId - The id of the error message element.
     */
    function handlePasswordInput(event, errorId) {
        const passwordInput = event.target;
        const passwordError = document.getElementById(errorId);
        if (passwordInput.value === "") {
            passwordInput.classList.remove('input-error');
            passwordError.style.display = 'none';
            passwordInput.style.borderColor = "";
            passwordInput.style.border = "1px solid #ccc";
        } else if (passwordInput.value.length < 4) {
            passwordInput.classList.add('input-error');
            passwordError.style.display = 'block';
            passwordInput.style.border = "2px solid red";
        } else {
            passwordInput.classList.remove('input-error');
            passwordError.style.display = 'none';
            passwordInput.style.border = "2px solid green";
        }
    }

    /**
     * Attaches the handleEmailInput function to the input event of the loginEmail element.
     */
    document.getElementById('loginEmail').addEventListener('input', function(event) {
        handleEmailInput(event, 'LoginEmailError');
    });

    /**
     * Attaches the handleEmailInput function to the input event of the signupEmail element.
     */
    document.getElementById('signupEmail').addEventListener('input', function(event) {
        handleEmailInput(event, 'signupEmailError');
    });

    /**
     * Attaches the handlePasswordInput function to the input event of the loginPassword element.
     */
    document.getElementById('loginPassword').addEventListener('input', function(event) {
        handlePasswordInput(event, 'LoginPasswordError');
    });

    /**
     * Attaches the handlePasswordInput function to the input event of the signupPassword element.
     */
    document.getElementById('signupPassword').addEventListener('input', function(event) {
        handlePasswordInput(event, 'signupPasswordError');
    });

    
        
    /**
     * Validates the format of an email address.
     * Uses a regular expression to check if the email format is valid.
     *
     * @param {string} email - The email address to validate.
     * @returns {boolean} True if the email is valid, otherwise false.
     */
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    /**
     * Handles the click event for the login button.
     * Validates the email and password fields before sending a login request to the server.
     * Saves the token in sessionStorage and redirects to the homepage on successful login.
     *
     * @param {Event} event - The click event.
     */
    document.getElementById('clickAccedi').addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default button behavior
        const email = document.querySelector('#LogInContainer input[placeholder="Email"]').value;
        const password = document.querySelector('#LogInContainer input[placeholder="Password"]').value;

        // Check if fields are empty
        if (!email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        // Validate the email format
        if (!isValidEmail(email)) {
            alert('Please enter a valid email.');
            return;
        }

        if(password.length < 4){
            alert('Password must be at least 4 characters long.');
            return;
        }

        // Send login request to the server with query parameters
        axios.post('http://localhost:3000/login', null, {
            params: { email, password }
        })
            .then(response => {
                const data = response.data;
                console.log(data); // Add this for debugging purposes
                alert('Login successful');
                // Save the token in sessionStorage
                sessionStorage.setItem('token', data.token);
                window.location.href = 'index.html';
            })
            .catch(error => {
                console.error(error);
                alert('Login failed: email or password incorrect');
            });
    });

    /**
     * Handles the click event for the registration button.
     * Validates the username, email, and password fields before sending a registration request to the server.
     * Saves the token in sessionStorage and redirects to the homepage on successful registration.
     *
     * @param {Event} event - The click event.
     */
    document.getElementById('clickRegistrati').addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the default button behavior
        const inputs = document.querySelectorAll('#SignUpContainer input');
        let username = '';
        let email = '';
        let password = '';

        // Assign values from input fields to variables based on placeholder text
        inputs.forEach(input => {
            if (input.placeholder === "Name") {
                username = input.value;
            } else if (input.placeholder === "Email") {
                email = input.value;
            } else if (input.placeholder === "Password") {
                password = input.value;
            }
        });

        // Check if fields are empty
        if (!username || !email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        // Validate the email format
        if (!isValidEmail(email)) {
            alert('Please enter a valid email.');
            return;
        }

        if(password.length < 4){
            alert('Password must be at least 4 characters long.');
            return;
        }

        // Send registration request to the server with query parameters
        axios.post('http://localhost:3000/signup', null, {
            params: { username, email, password }
        })
            .then(response => {
                const data = response.data;
                console.log(data); // Add this for debugging purposes
                alert('Registration successful');
                // Save the token in sessionStorage
                sessionStorage.setItem('token', data.token);
                window.location.href = 'index.html';
            })
            .catch(error => {
                console.error(error);
                alert('Registration failed');
            });
    });
}
