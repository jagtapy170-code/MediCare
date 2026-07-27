/*==================================================
        MEDICARE+ ADMIN SETTINGS
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*====================================
            DARK MODE
    ====================================*/

    const themeToggle = document.getElementById("themeToggle");
    const darkSwitch = document.getElementById("darkModeSwitch");

    if (localStorage.getItem("adminTheme") === "dark") {

        document.body.classList.add("dark");

        if (darkSwitch) darkSwitch.checked = true;

        if (themeToggle) {
            themeToggle.innerHTML =
                '<i class="fa-solid fa-sun"></i>';
        }

    }

    function toggleTheme() {

        document.body.classList.toggle("dark");

        const isDark = document.body.classList.contains("dark");

        localStorage.setItem(
            "adminTheme",
            isDark ? "dark" : "light"
        );

        if (darkSwitch) darkSwitch.checked = isDark;

        if (themeToggle) {

            themeToggle.innerHTML = isDark
                ? '<i class="fa-solid fa-sun"></i>'
                : '<i class="fa-solid fa-moon"></i>';

        }

    }

    if (themeToggle) {

        themeToggle.addEventListener("click", toggleTheme);

    }

    if (darkSwitch) {

        darkSwitch.addEventListener("change", () => {

            document.body.classList.toggle("dark");

            const isDark = document.body.classList.contains("dark");

            localStorage.setItem(
                "adminTheme",
                isDark ? "dark" : "light"
            );

            if (themeToggle) {

                themeToggle.innerHTML = isDark
                    ? '<i class="fa-solid fa-sun"></i>'
                    : '<i class="fa-solid fa-moon"></i>';

            }

        });

    }

    /*====================================
            SETTINGS SEARCH
    ====================================*/

    const searchInput = document.querySelector(".search-box input");

    if (searchInput) {

        searchInput.addEventListener("keyup", function () {

            const value = this.value.toLowerCase();

            document.querySelectorAll(".settings-card").forEach(card => {

                card.style.display =
                    card.innerText.toLowerCase().includes(value)
                        ? "block"
                        : "none";

            });

        });

    }

    /*====================================
            SAVE SETTINGS
    ====================================*/

    const saveBtn = document.querySelector(".save-btn");

    if (saveBtn) {

        saveBtn.addEventListener("click", () => {

            showToast("Settings saved successfully.");

        });

    }

    /*====================================
            RESET SETTINGS
    ====================================*/

    const resetBtn = document.querySelector(".reset-btn");

    if (resetBtn) {

        resetBtn.addEventListener("click", () => {

            if (confirm("Reset all settings?")) {

                document
                    .querySelectorAll("input,textarea")
                    .forEach(input => {

                        if (
                            input.type !== "checkbox" &&
                            input.type !== "button"
                        ) {

                            input.value = "";

                        }

                    });

                showToast("Settings reset.");

            }

        });

    }

    /*====================================
            BACKUP DATABASE
    ====================================*/

    const backupBtn = document.querySelector(".backup-btn");

    if (backupBtn) {

        backupBtn.addEventListener("click", () => {

            showToast("Database backup started...");

        });

    }

    /*====================================
            RESTORE DATABASE
    ====================================*/

    const restoreBtn = document.querySelector(".restore-btn");

    if (restoreBtn) {

        restoreBtn.addEventListener("click", () => {

            if (confirm("Restore latest backup?")) {

                showToast("Database restored successfully.");

            }

        });

    }

    /*====================================
            LOGOUT
    ====================================*/

    document.querySelectorAll(".logout-btn,.logout-btn2")
        .forEach(btn => {

            btn.addEventListener("click", () => {

                if (confirm("Are you sure you want to logout?")) {

                    window.location.href = "login.html";

                }

            });

        });

    /*====================================
            PROFILE IMAGE
    ====================================*/

    const uploadBtn = document.querySelector(".upload-btn");

    if (uploadBtn) {

        uploadBtn.addEventListener("click", () => {

            const fileInput =
                document.createElement("input");

            fileInput.type = "file";

            fileInput.accept = "image/*";

            fileInput.click();

            fileInput.onchange = function () {

                const file = this.files[0];

                if (!file) return;

                const reader = new FileReader();

                reader.onload = function (e) {

                    document.getElementById("profileImage")
                        .src = e.target.result;

                    showToast("Profile photo updated.");

                };

                reader.readAsDataURL(file);

            };

        });

    }

    /*====================================
            ANIMATED COUNTERS
    ====================================*/

    document.querySelectorAll(".stat-card h2")
        .forEach(counter => {

            const target = parseInt(
                counter.innerText.replace(/[^\d]/g, "")
            );

            if (!target) return;

            let current = 0;

            const increment = target / 80;

            function updateCounter() {

                current += increment;

                if (current < target) {

                    counter.innerText =
                        Math.floor(current).toLocaleString();

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.innerText =
                        target.toLocaleString();

                }

            }

            updateCounter();

        });

    /*====================================
            TOAST
    ====================================*/

    function showToast(message) {

        const toast = document.createElement("div");

        toast.className = "toast";

        toast.innerHTML = `
            <i class="fa-solid fa-circle-check"></i>
            ${message}
        `;

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

});