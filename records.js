/*==================================================
            Medicare+
     Medical Records Module
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
        SEARCH MEDICAL RECORDS
    ==============================*/
    const searchInput = document.getElementById("recordSearchHeader");
    if (searchInput) {
        searchInput.addEventListener("keyup", function () {
            const value = this.value.toLowerCase();
            const rows = document.querySelectorAll("#recordsTable tbody tr");

            rows.forEach(row => {
                const text = row.innerText.toLowerCase();
                row.style.display = text.includes(value) ? "" : "none";
            });
        });
    }

    /*==============================
        FILTER RECORDS TABLE
    ==============================*/
    const categoryFilter = document.getElementById("recordCategoryFilter");
    const statusFilter = document.getElementById("recordStatusFilter");

    function filterRecordsTable() {
        const selectedCat = categoryFilter ? categoryFilter.value.toLowerCase() : "all";
        const selectedStatus = statusFilter ? statusFilter.value.toLowerCase() : "all";
        const rows = document.querySelectorAll("#recordsTable tbody tr");

        rows.forEach(row => {
            const docType = row.querySelector("td:nth-child(3)")?.innerText.toLowerCase() || "";
            const statusText = row.querySelector("td:nth-child(6)")?.innerText.toLowerCase() || "";

            let matchesCat = true;
            if (selectedCat !== "all") {
                if (selectedCat === "cardiology") matchesCat = docType.includes("ecg") || docType.includes("echo");
                else if (selectedCat === "radiology") matchesCat = docType.includes("x-ray") || docType.includes("mri") || docType.includes("ct");
                else if (selectedCat === "lab") matchesCat = docType.includes("panel") || docType.includes("blood") || docType.includes("lab");
                else if (selectedCat === "discharge") matchesCat = docType.includes("discharge");
            }

            let matchesStatus = true;
            if (selectedStatus !== "all") {
                if (selectedStatus === "verified") matchesStatus = statusText.includes("verified");
                else if (selectedStatus === "pending") matchesStatus = statusText.includes("pending");
            }

            if (matchesCat && matchesStatus) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    }

    if (categoryFilter) categoryFilter.addEventListener("change", filterRecordsTable);
    if (statusFilter) statusFilter.addEventListener("change", filterRecordsTable);

    /*==============================
        RECORD ACTION BUTTONS
    ==============================*/
    const actionButtons = document.querySelectorAll(".action-icon-btn");

    actionButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const tr = e.target.closest("tr");
            const recordId = tr ? tr.querySelector("td:first-child")?.innerText : "Record";

            if (btn.classList.contains("view")) {
                showToast(`Viewing document for ${recordId}`);
            } else if (btn.classList.contains("edit")) {
                showToast(`Downloading PDF for ${recordId}...`);
            } else if (btn.classList.contains("complete")) {
                showToast(`Opening share options for ${recordId}`);
            }
        });
    });

    /*==============================
        UPLOAD RECORD BUTTON
    ==============================*/
    const uploadBtn = document.getElementById("uploadRecordBtn");
    if (uploadBtn) {
        uploadBtn.addEventListener("click", () => {
            showToast("Opening EHR file uploader...");
        });
    }

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

    console.log("Medicare+ Medical Records Module Loaded Successfully");
});