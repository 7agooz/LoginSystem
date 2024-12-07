var userNameInput = document.getElementById('userName');
var userEmailInput = document.getElementById('userEmail');
var userPassInput = document.getElementById('userPass');

var userData = JSON.parse(localStorage.getItem("allUsers")) || [];

function signUp() {
    var user = {
        name: userNameInput.value.trim(),
        email: userEmailInput.value.trim(),
        pass: userPassInput.value,
    };
    if (!validateInputs(user)) {
        return;
    }
    var emailExists = userData.some(u => u.email === user.email);
    if (emailExists) {
        Swal.fire({
            title: "Error!",
            text: "This email is already registered. Please use a different email.",
            icon: "error"
        });
        return;
    }
    userData.push(user);
    clearData();
    localStorage.setItem('allUsers', JSON.stringify(userData));

    Swal.fire({
        title: "Successfully Registered!",
        text: "Your account has been created successfully.",
        icon: "success",
        footer:"Now u Can Login"
    });
    
}

function validateInputs(user) {
    if (!user.name || !user.email || !user.pass) {
        
        Swal.fire({
            title: "Error!",
            text: "Please fill in all fields!",
            icon: "error"
        });
        return false;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
        Swal.fire({
            title: "Error!",
            text: "Please enter a valid email address!",
            icon: "error"
        });
        return false;
    }

    if (user.pass.length <= 8 || !/[A-Z]/.test(user.pass) || !/[0-9]/.test(user.pass)) {
        Swal.fire({
            title: "Error!",
            text: "Password must be at least 8 characters long, include one uppercase letter, and one number!",
            icon: "error"
        });
        return false;
    }

    return true;
}

function clearData() {
    userNameInput.value = "";
    userEmailInput.value = "";
    userPassInput.value = "";
}

///////////////////login//////////////////

var emailInput = document.getElementById('email');
var passwordInput = document.getElementById('password');
var userData = JSON.parse(localStorage.getItem("allUsers")) || [];

function login() {
    var email = emailInput.value.trim();
    var password = passwordInput.value;

    if (!email || !password) {
        Swal.fire({
            title: "Error",
            text: "Please fill in both email and password!",
            icon: "error"
        });
        return;
    }

    
    var user = userData.find(u => u.email === email && u.pass === password);

    if (user) {
        localStorage.setItem("loggedInUser", user.name);
        window.location.href = "welcome.html";
    } 
    else {
        Swal.fire({
            title: "Error",
            text: "Invalid email or password!",
            icon: "error"
        });
    }
}


/////////////welcome/////////

var userName = localStorage.getItem("loggedInUser");
if (userName) {
    document.getElementById("welcomeMessage").innerHTML = `Welcome, ${userName}!`;
}