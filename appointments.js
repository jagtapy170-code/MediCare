/*==================================================
            Medicare+
       Appointments Module
               JS
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==============================
        DARK MODE TOGGLE
    ==============================*/
    const themeToggle = document.getElementById("themeToggle");

    if (localStorage.getItem("doctorTheme") === "dark") {
        document.body.classList.add("dark");
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark");
            if (document.body.classList.contains("dark")) {
                localStorage.setItem("doctorTheme", "dark");
                themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
            } else {
                localStorage.setItem("doctorTheme", "light");
                themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
            }
        });
    }

    /*==============================
        SIDEBAR NAVIGATION
    ==============================*/
    const menuItems = document.querySelectorAll(".menu li");
    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            menuItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
        });
    });

    /*==============================
            LOGOUT
    ==============================*/
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            if (confirm("Do you want to logout?")) {
                window.location.href = "doctor-login.html";
            }
        });
    }

    /*==============================
        SEARCH APPOINTMENTS
    ==============================*/
    const searchInput = document.getElementById("appointmentSearch");
    if (searchInput) {
        searchInput.addEventListener("keyup", function () {
            const value = this.value.toLowerCase();
            const rows = document.querySelectorAll("#appointmentsTable tbody tr");

            rows.forEach(row => {
                const text = row.innerText.toLowerCase();
                row.style.display = text.includes(value) ? "" : "none";
            });
        });
    }

    /*==============================
        FILTER BY STATUS & TYPE
    ==============================*/
    const statusFilter = document.getElementById("statusFilter");
    const typeFilter = document.getElementById("typeFilter");

    function filterAppointments() {
        const selectedStatus = statusFilter ? statusFilter.value.toLowerCase() : "all";
        const selectedType = typeFilter ? typeFilter.value.toLowerCase() : "all";
        const rows = document.querySelectorAll("#appointmentsTable tbody tr");

        rows.forEach(row => {
            const statusText = row.querySelector("td:nth-child(6)")?.innerText.toLowerCase() || "";
            const typeText = row.querySelector("td:nth-child(4)")?.innerText.toLowerCase() || "";

            const matchesStatus = (selectedStatus === "all") || statusText.includes(selectedStatus);
            const matchesType = (selectedType === "all") || typeText.includes(selectedType);

            if (matchesStatus && matchesType) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    }

    if (statusFilter) statusFilter.addEventListener("change", filterAppointments);
    if (typeFilter) typeFilter.addEventListener("change", filterAppointments);

    /*==============================
        TABLE ACTION BUTTONS
    ==============================*/
    const tableBody = document.querySelector("#appointmentsTable tbody");

    if (tableBody) {
        tableBody.addEventListener("click", (e) => {
            const btn = e.target.closest(".action-icon-btn");
            if (!btn) return;

            const row = btn.closest("tr");
            const patientName = row.querySelector(".patient-cell strong")?.innerText || "Patient";
            const apptId = row.querySelector("td:first-child strong")?.innerText || "";

            if (btn.classList.contains("view")) {
                showToast(`Viewing details for ${patientName} (${apptId})`);
            } else if (btn.classList.contains("edit")) {
                showToast(`Rescheduling appointment for ${patientName}`);
            } else if (btn.classList.contains("complete")) {
                const statusTd = row.querySelector("td:nth-child(6)");
                if (statusTd) {
                    statusTd.innerHTML = '<span class="completed-status">Completed</span>';
                    showToast(`Appointment ${apptId} marked as Completed`);
                }
            } else if (btn.classList.contains("cancel")) {
                if (confirm(`Are you sure you want to cancel appointment ${apptId}?`)) {
                    const statusTd = row.querySelector("td:nth-child(6)");
                    if (statusTd) {
                        statusTd.innerHTML = '<span class="cancelled-status">Cancelled</span>';
                        showToast(`Appointment ${apptId} Cancelled`);
                    }
                }
            }
        });
    }

    /*==============================
        NEW APPOINTMENT BUTTON
    ==============================*/
    const newApptBtn = document.getElementById("newAppointmentBtn");
    if (newApptBtn) {
        newApptBtn.addEventListener("click", () => {
            showToast("Opening New Appointment Form");
        });
    }

    /*==============================
        MONTHLY CALENDAR NAVIGATION
    ==============================*/
    const calendarDays = document.querySelectorAll(".calendar-day:not(.disabled)");
    calendarDays.forEach(day => {
        day.addEventListener("click", () => {
            calendarDays.forEach(d => d.classList.remove("active-day"));
            day.classList.add("active-day");
            const dateNum = day.innerText.trim().split("\n")[0];
            showToast(`Loaded appointments for Date: ${dateNum}`);
        });
    });

    /*==============================
        TOAST NOTIFICATION
    ==============================*/
    function showToast(message) {
        const toast = document.createElement("div");
        toast.innerHTML = message;
        toast.style.position = "fixed";
        toast.style.top = "20px";
        toast.style.right = "20px";
        toast.style.padding = "15px 25px";
        toast.style.background = "#059669";
        toast.style.color = "#fff";
        toast.style.borderRadius = "12px";
        toast.style.boxShadow = "0 15px 30px rgba(0,0,0,.2)";
        toast.style.zIndex = "9999";
        toast.style.opacity = "0";
        toast.style.transition = ".4s";

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "1";
        }, 100);

        setTimeout(() => {
            toast.style.opacity = "0";
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, 2500);
    }

    console.log("Medicare+ Appointments Module Loaded Successfully");
});
