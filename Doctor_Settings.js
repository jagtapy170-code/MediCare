/*==================================================
        MEDICARE+ DOCTOR SETTINGS
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==============================
            SAVE SETTINGS
    ==============================*/

    const saveBtn = document.querySelector(".save-btn");

    if (saveBtn) {

        saveBtn.addEventListener("click", function () {

            saveBtn.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';

            saveBtn.disabled = true;

            setTimeout(() => {

                saveBtn.innerHTML =
                    '<i class="fa-solid fa-check"></i> Settings Saved';

                saveBtn.style.background = "#10b981";

                showToast("Settings saved successfully!");

                setTimeout(() => {

                    saveBtn.innerHTML =
                        '<i class="fa-solid fa-floppy-disk"></i> Save Settings';

                    saveBtn.style.background =
                        "linear-gradient(90deg,#2563eb,#0ea5e9)";

                    saveBtn.disabled = false;

                }, 2500);

            }, 1500);

        });

    }

    /*==============================
            DARK MODE
    ==============================*/

    const darkToggle = document.getElementById("darkMode");

    if (localStorage.getItem("doctorDarkMode") === "true") {

        document.body.classList.add("dark");

        if (darkToggle) darkToggle.checked = true;

    }

    if (darkToggle) {

        darkToggle.addEventListener("change", () => {

            document.body.classList.toggle("dark");

            localStorage.setItem(
                "doctorDarkMode",
                document.body.classList.contains("dark")
            );

        });

    }

    /*==============================
        ENABLE/DISABLE FORM
    ==============================*/

    const editBtn = document.querySelector(".edit-btn");

    const formFields = document.querySelectorAll(
        ".settings-form input, .settings-form textarea, .settings-form select"
    );

    formFields.forEach(field => field.disabled = true);

    if (editBtn) {

        editBtn.addEventListener("click", () => {

            const disabled = formFields[0].disabled;

            formFields.forEach(field => {

                field.disabled = !disabled;

            });

            if (disabled) {

                editBtn.innerHTML =
                    '<i class="fa-solid fa-lock-open"></i> Editing';

                editBtn.style.background = "#10b981";

                showToast("Edit Mode Enabled");

            } else {

                editBtn.innerHTML =
                    '<i class="fa-solid fa-pen"></i> Edit Profile';

                editBtn.style.background = "#2563eb";

                showToast("Edit Mode Disabled");

            }

        });

    }

    /*==============================
            PROFILE PHOTO
    ==============================*/

    const uploadBtn = document.querySelector(".upload-btn");

    const profileImage = document.querySelector(".profile-picture img");

    if (uploadBtn) {

        const fileInput = document.createElement("input");

        fileInput.type = "file";

        fileInput.accept = "image/*";

        uploadBtn.addEventListener("click", () => {

            fileInput.click();

        });

        fileInput.addEventListener("change", e => {

            const file = e.target.files[0];

            if (!file) return;

            const reader = new FileReader();

            reader.onload = function (event) {

                profileImage.src = event.target.result;

                showToast("Profile picture updated");

            };

            reader.readAsDataURL(file);

        });

    }

    /*==============================
            TOAST MESSAGE
    ==============================*/

    function showToast(message) {

        const toast = document.createElement("div");

        toast.className = "toast";

        toast.innerHTML =
            `<i class="fa-solid fa-circle-check"></i> ${message}`;

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