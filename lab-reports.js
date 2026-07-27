/*==================================================
            Medicare+
        Lab Reports Module
               JS
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==============================
        MOCK LAB REPORT DATA
    ==============================*/
    const labReportData = {
        "LAB-401": {
            name: "Rahul Sharma",
            meta: "PT-101 | Male, 35 Yrs | Blood: O+",
            id: "#LAB-401",
            testTitle: "Cardiac Troponin I & CK-MB",
            pathologist: "Dr. A. Verma (MD Path)",
            date: "July 21, 2026",
            statusText: "Normal",
            statusColor: "#15803D",
            parameters: [
                { title: "Troponin I", ref: "Reference: 0.00 - 0.04 ng/mL", val: "0.01 ng/mL", type: "normal" },
                { title: "CK-MB", ref: "Reference: 0 - 25 U/L", val: "14 U/L", type: "normal" }
            ],
            notes: "Cardiac biomarker levels are well within normal baseline range. No acute myocardial injury indicated."
        },
        "LAB-402": {
            name: "Anjali Mehta",
            meta: "PT-102 | Female, 29 Yrs | Blood: A+",
            id: "#LAB-402",
            testTitle: "Complete Lipid Profile",
            pathologist: "Dr. A. Verma (MD Path)",
            date: "July 20, 2026",
            statusText: "Abnormal",
            statusColor: "#B45309",
            parameters: [
                { title: "Total Cholesterol", ref: "Reference: < 200 mg/dL", val: "248 mg/dL", type: "abnormal" },
                { title: "Triglycerides", ref: "Reference: < 150 mg/dL", val: "195 mg/dL", type: "abnormal" },
                { title: "HDL (Good Cholesterol)", ref: "Reference: > 50 mg/dL", val: "54 mg/dL", type: "normal" },
                { title: "LDL (Bad Cholesterol)", ref: "Reference: < 100 mg/dL", val: "155 mg/dL", type: "abnormal" }
            ],
            notes: "Mildly elevated total cholesterol and LDL levels. Dietary adjustments and exercise protocol recommended."
        },
        "LAB-403": {
            name: "Rohan Gupta",
            meta: "PT-103 | Male, 41 Yrs | Blood: B+",
            id: "#LAB-403",
            testTitle: "Serum Potassium & Electrolytes",
            pathologist: "Dr. S. Kulkarni (Pathology)",
            date: "July 22, 2026",
            statusText: "Critical Alert",
            statusColor: "#DC2626",
            parameters: [
                { title: "Serum Potassium (K+)", ref: "Reference: 3.5 - 5.1 mEq/L", val: "6.2 mEq/L", type: "critical" },
                { title: "Serum Sodium (Na+)", ref: "Reference: 135 - 145 mEq/L", val: "138 mEq/L", type: "normal" },
                { title: "Serum Chloride (Cl-)", ref: "Reference: 96 - 106 mEq/L", val: "101 mEq/L", type: "normal" }
            ],
            notes: "CRITICAL ALERT: Hyperkalemia detected (6.2 mEq/L). Requires urgent clinical review and repeat serum electrolyte confirmation."
        },
        "LAB-404": {
            name: "Neha Verma",
            meta: "PT-104 | Female, 52 Yrs | Blood: AB+",
            id: "#LAB-404",
            testTitle: "Renal Function Panel (KFT)",
            pathologist: "Dr. S. Kulkarni (Pathology)",
            date: "July 22, 2026",
            statusText: "In Progress",
            statusColor: "#1D4ED8",
            parameters: [
                { title: "Blood Urea Nitrogen (BUN)", ref: "Reference: 7 - 20 mg/dL", val: "Processing...", type: "abnormal" },
                { title: "Serum Creatinine", ref: "Reference: 0.6 - 1.1 mg/dL", val: "Processing...", type: "abnormal" }
            ],
            notes: "Sample received in central lab. Secondary centrifugation and automated assay currently running."
        }
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
        SEARCH LAB REPORTS
    ==============================*/
    const searchInput = document.getElementById("labSearchHeader");
    if (searchInput) {
        searchInput.addEventListener("keyup", function () {
            const value = this.value.toLowerCase();
            const rows = document.querySelectorAll("#labTable tbody tr");

            rows.forEach(row => {
                const text = row.innerText.toLowerCase();
                row.style.display = text.includes(value) ? "" : "none";
            });
        });
    }

    /*==============================
        FILTER LAB REPORTS TABLE
    ==============================*/
    const statusFilter = document.getElementById("labStatusFilter");

    if (statusFilter) {
        statusFilter.addEventListener("change", function () {
            const selectedStatus = this.value.toLowerCase();
            const rows = document.querySelectorAll("#labTable tbody tr");

            rows.forEach(row => {
                const statusBadgeText = row.querySelector("td:nth-child(5)")?.innerText.toLowerCase() || "";

                if (selectedStatus === "all") {
                    row.style.display = "";
                } else if (statusBadgeText.includes(selectedStatus)) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            });
        });
    }

    /*==============================
      SELECT & DISPLAY LAB REPORT
    ==============================*/
    const labRows = document.querySelectorAll(".lab-row");

    labRows.forEach(row => {
        row.addEventListener("click", function () {
            labRows.forEach(r => r.classList.remove("active-row"));
            this.classList.add("active-row");

            const labKey = this.getAttribute("data-lab");
            const data = labReportData[labKey];

            if (data) {
                document.getElementById("labPatientName").innerText = data.name;
                document.getElementById("labPatientMeta").innerText = data.meta;
                document.getElementById("labIdBadge").innerText = data.id;
                document.getElementById("labTestTitle").innerText = data.testTitle;
                document.getElementById("labPathologist").innerText = data.pathologist;
                document.getElementById("labDate").innerText = data.date;

                const statusTextEl = document.getElementById("labStatusText");
                statusTextEl.innerText = data.statusText;
                statusTextEl.style.color = data.statusColor;

                document.getElementById("labNotes").innerText = data.notes;

                const paramListContainer = document.getElementById("labParameterList");
                paramListContainer.innerHTML = "";

                data.parameters.forEach(param => {
                    const paramItem = document.createElement("div");
                    paramItem.className = "parameter-item";
                    paramItem.innerHTML = `
                        <div>
                            <h4>${param.title}</h4>
                            <small>${param.ref}</small>
                        </div>
                        <div class="param-val-group">
                            <span class="param-val ${param.type}">${param.val}</span>
                        </div>
                    `;
                    paramListContainer.appendChild(paramItem);
                });
            }
        });
    });

    /*==============================
         ORDER TEST & PRINT
    ==============================*/
    const orderBtn = document.getElementById("orderLabBtn");
    if (orderBtn) {
        orderBtn.addEventListener("click", () => {
            showToast("Opening lab order requisition form...");
        });
    }

    const printBtn = document.getElementById("printLabBtn");
    if (printBtn) {
        printBtn.addEventListener("click", () => {
            window.print();
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

    console.log("Medicare+ Lab Reports Module Loaded Successfully");
});