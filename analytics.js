/*==================================================
            Medicare+
     Analytics & Insights Console
               JS
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==============================
        MONTHLY VS WEEKLY DATA
    ==============================*/
    const chartData = {
        monthly: [
            { label: "Jan", val: 260, height: "65%" },
            { label: "Feb", val: 288, height: "72%" },
            { label: "Mar", val: 320, height: "80%" },
            { label: "Apr", val: 280, height: "70%" },
            { label: "May", val: 352, height: "88%" },
            { label: "Jun", val: 380, height: "95%" },
            { label: "Jul", val: 410, height: "100%", isPeak: true }
        ],
        weekly: [
            { label: "W1", val: 85, height: "55%" },
            { label: "W2", val: 98, height: "70%" },
            { label: "W3", val: 112, height: "85%" },
            { label: "W4", val: 128, height: "100%", isPeak: true },
            { label: "W5", val: 104, height: "78%" },
            { label: "W6", val: 92, height: "62%" },
            { label: "W7", val: 115, height: "88%" }
        ]
    };

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
        SEARCH ANALYTICS
    ==============================*/
    const searchInput = document.getElementById("analyticsSearchHeader");
    if (searchInput) {
        searchInput.addEventListener("keyup", function () {
            const value = this.value.toLowerCase();
            const deptItems = document.querySelectorAll(".dept-item");

            deptItems.forEach(item => {
                const text = item.innerText.toLowerCase();
                item.style.display = text.includes(value) ? "" : "none";
            });
        });
    }

    /*==============================
        CHART FILTER TOGGLE
    ==============================*/
    const btnMonthly = document.getElementById("filterMonthly");
    const btnWeekly = document.getElementById("filterWeekly");
    const chartBarsGroup = document.querySelector(".chart-bars-group");

    function renderChart(type) {
        if (!chartBarsGroup) return;

        const data = chartData[type];
        chartBarsGroup.innerHTML = "";

        data.forEach(item => {
            const barCol = document.createElement("div");
            barCol.className = `chart-bar-col ${item.isPeak ? "active-month" : ""}`;

            const highlightClass = item.isPeak ? "highlight" : "";
            const peakText = item.isPeak ? " (Peak)" : "";

            barCol.innerHTML = `
                <div class="bar-fill ${highlightClass}" style="height: ${item.height};" data-val="${item.val}">
                    <span class="bar-tooltip">${item.val} Patients${peakText}</span>
                </div>
                <small>${item.label}</small>
            `;

            chartBarsGroup.appendChild(barCol);
        });
    }

    if (btnMonthly && btnWeekly) {
        btnMonthly.addEventListener("click", () => {
            btnMonthly.classList.add("active-filter-btn");
            btnWeekly.classList.remove("active-filter-btn");
            renderChart("monthly");
        });

        btnWeekly.addEventListener("click", () => {
            btnWeekly.classList.add("active-filter-btn");
            btnMonthly.classList.remove("active-filter-btn");
            renderChart("weekly");
        });
    }

    /*==============================
        EXPORT PDF ACTION
    ==============================*/
    const exportBtn = document.getElementById("exportAnalyticsBtn");
    if (exportBtn) {
        exportBtn.addEventListener("click", () => {
            showToast("<i class=\"fa-solid fa-file-arrow-down\"></i> Preparing Analytics Summary Report (PDF)...", "#059669");
            setTimeout(() => {
                showToast("<i class=\"fa-solid fa-circle-check\"></i> Report downloaded successfully!", "#22c55e");
            }, 2000);
        });
    }

    /*==============================
        DEPARTMENT QUARTER FILTER
    ==============================*/
    const deptTimeSelect = document.getElementById("deptTimeSelect");
    if (deptTimeSelect) {
        deptTimeSelect.addEventListener("change", function () {
            showToast(`<i class="fa-solid fa-filter"></i> Department breakdown updated for ${this.options[this.selectedIndex].text}`, "#06b6d4");
        });
    }

    /*==============================
        TOAST NOTIFICATION
    ==============================*/
    function showToast(message, bgColor = "#059669") {
        const toast = document.createElement("div");
        toast.innerHTML = message;
        toast.style.position = "fixed";
        toast.style.top = "20px";
        toast.style.right = "20px";
        toast.style.padding = "15px 25px";
        toast.style.background = bgColor;
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
        }, 3000);
    }

    console.log("Medicare+ Analytics Module Loaded Successfully");
});