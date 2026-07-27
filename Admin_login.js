/*==================================================
        Medicare+
        Admin Login
        JavaScript
==================================================*/


// ==========================================
// SHOW / HIDE PASSWORD
// ==========================================

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("adminPassword");

if (togglePassword && passwordInput) {

    togglePassword.addEventListener("click", () => {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            togglePassword.classList.remove("fa-eye");
            togglePassword.classList.add("fa-eye-slash");

        } else {

            passwordInput.type = "password";

            togglePassword.classList.remove("fa-eye-slash");
            togglePassword.classList.add("fa-eye");

        }

    });

}



// ==========================================
// LOGIN FORM
// ==========================================

const loginForm = document.getElementById("adminLoginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("adminEmail").value.trim();
        const password = document.getElementById("adminPassword").value.trim();

        if (email === "") {

            showToast("Please enter Admin Email", "error");
            return;

        }

        if (password === "") {

            showToast("Please enter Password", "error");
            return;

        }

        const loginBtn = document.querySelector(".login-btn");

        loginBtn.disabled = true;

        loginBtn.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Logging In...
        `;

        const result = await adminLoginAPI({

            email,
            password

        });

        if (result.success) {

            localStorage.setItem("adminLoggedIn", "true");
            localStorage.setItem("adminEmail", email);

            showToast("Login Successful", "success");

            setTimeout(() => {

                window.location.href = "admin-dashboard.html";

            }, 1500);

        } else {

            showToast("Invalid Email or Password", "error");

            loginBtn.disabled = false;

            loginBtn.innerHTML = `
                Login to Dashboard
                <i class="fa-solid fa-arrow-right"></i>
            `;

        }

    });

}



// ==========================================
// BACKEND READY LOGIN API
// ==========================================

async function adminLoginAPI(data) {

    /*
    Replace this later with:

    const response = await fetch(
        "http://localhost:5000/api/admin/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    return await response.json();
    */

    console.log("Admin Login:", data);

    // Demo Credentials
    if (
        data.email === "admin@medicare.com" &&
        data.password === "admin123"
    ) {

        return { success: true };

    }

    return { success: false };

}



// ==========================================
// REMEMBER ME
// ==========================================

const rememberCheckbox = document.querySelector(".options input");

if (rememberCheckbox) {

    rememberCheckbox.addEventListener("change", () => {

        if (rememberCheckbox.checked) {

            localStorage.setItem("rememberAdmin", "true");

        } else {

            localStorage.removeItem("rememberAdmin");

        }

    });

}


// Restore email if remembered

if (localStorage.getItem("rememberAdmin")) {

    const savedEmail = localStorage.getItem("adminEmail");

    if (savedEmail) {

        document.getElementById("adminEmail").value = savedEmail;

    }

}



// ==========================================
// TOAST MESSAGE
// ==========================================

function showToast(message, type) {

    const oldToast = document.querySelector(".toast");

    if (oldToast) {

        oldToast.remove();

    }

    const toast = document.createElement("div");

    toast.className = `toast ${type}`;

    toast.innerHTML = message;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("show");

    }, 100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 3000);

}



// ==========================================
// SESSION CHECK
// ==========================================

window.addEventListener("DOMContentLoaded", () => {

    if (localStorage.getItem("adminLoggedIn") === "true") {

        console.log("Admin Session Active");

    }

});



// ==========================================
// LOG
// ==========================================

console.log("Medicare+ Admin Login Ready");