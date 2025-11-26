const API = "http://localhost:5000";

// Show forms
function showSignup() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";
}
function showLogin() {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("signup-form").style.display = "none";
}

// Signup
async function signup() {
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    const role = document.getElementById("signup-role").value;

    const res = await fetch(`${API}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role })
    });
    const data = await res.json();
    if (res.ok) {
        document.getElementById("signup-msg").style.color = "green";
        document.getElementById("signup-msg").innerText = "Account created! Login now.";
        showLogin();
    } else {
        document.getElementById("signup-msg").innerText = data.error;
    }
}

// Login
async function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (res.ok) {
        document.getElementById("login-msg").style.color = "green";
        document.getElementById("login-msg").innerText = "Login successful! Redirecting...";
        // Redirect based on role
        setTimeout(() => {
            if (data.user.role === "admin") window.location.href = "admin.html";
            else if (data.user.role === "student") window.location.href = "student.html";
            else if (data.user.role === "counselor") window.location.href = "counselor.html";
        }, 1000);
    } else {
        document.getElementById("login-msg").innerText = data.error;
    }
}
