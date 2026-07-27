/*==================================================
            Medicare+
       Prescriptions Module
               JS
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==============================
        MOCK PRESCRIPTION DATA
    ==============================*/
    const prescriptionData = {
        "RX-9901": {
            name: "Rahul Sharma",
            meta: "PT-101 | Male, 35 Yrs | Blood: O+",
            id: "#RX-9901",
            date: "July 10, 2026",
            doctor: "Dr. Smith (Cardiology)",
            medications: [
                { title: "Amlodipine 5mg", dosage: "1 tablet daily (Morning) • After Food", duration: "30 Days" },
                { title: "Telmisartan 40mg", dosage: "1 tablet daily (Night) • After Food", duration: "30 Days" }
            ],
            instructions: "Low salt diet, maintain daily blood pressure log, recheck BP after 2 weeks."
        },
        "RX-9902": {
            name: "Anjali Mehta",
            meta: "PT-102 | Female, 29 Yrs | Blood: A+",
            id: "#RX-9902",
            date: "July 18, 2026",
            doctor: "Dr. Smith (Cardiology)",
            medications: [
                { title: "Metoprolol Succinate 25mg", dosage: "1 tablet daily (Morning) • Before Food", duration: "15 Days" }
            ],
            instructions: "Avoid strenuous cardio exercise until follow-up ECG."
        },
        "RX-9903": {
            name: "Rohan Gupta",
            meta: "PT-103 | Male, 41 Yrs | Blood: B+",
            id: "#RX-9903",
            date: "July 02, 2026",
            doctor: "Dr. Smith (Cardiology)",
            medications: [
                { title: "Atorvastatin 20mg", dosage: "1 tablet daily (Night) • After Food", duration: "60 Days" },
                { title: "Ticagrelor 90mg", dosage: "1 tablet twice daily • After Food", duration: "60 Days" }
            ],
            instructions: "Refill requested by patient. Monitor lipid profile levels next month."
        },
        "RX-9904": {
            name: "Neha Verma",
            meta: "PT-104 | Female, 52 Yrs | Blood: AB+",
            id: "#RX-9904",
            date: "July 20, 2026",
            doctor: "Dr. Smith (Cardiology)",
            medications: [
                { title: "Furosemide 40mg", dosage: "1 tablet morning • After Food", duration: "14 Days" },
                { title: "Spironolactone 25mg", dosage: "1 tablet afternoon • After Food", duration: "14 Days" }
            ],
            instructions: "Monitor serum potassium levels weekly during fluid management."
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
        SEARCH PRESCRIPTIONS
    ==============================*/
    const searchInput = document.getElementById("rxSearchHeader");
    if (searchInput) {
        searchInput.addEventListener("keyup", function () {
            const value = this.value.toLowerCase();
            const rows = document.querySelectorAll("#rxTable tbody tr");

            rows.forEach(row => {
                const text = row.innerText.toLowerCase();
                row.style.display = text.includes(value) ? "" : "none";
            });
        });
    }

    /*==============================
        FILTER PRESCRIPTIONS TABLE
    ==============================*/
    const statusFilter = document.getElementById("rxStatusFilter");

    if (statusFilter) {
        statusFilter.addEventListener("change", function () {
            const selectedStatus = this.value.toLowerCase();
            const rows = document.querySelectorAll("#rxTable tbody tr");

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
      SELECT & DISPLAY PRESCRIPTION
    ==============================*/
    const rxRows = document.querySelectorAll(".rx-row");

    rxRows.forEach(row => {
        row.addEventListener("click", function () {
            rxRows.forEach(r => r.classList.remove("active-row"));
            this.classList.add("active-row");

            const rxKey = this.getAttribute("data-rx");
            const data = prescriptionData[rxKey];

            if (data) {
                document.getElementById("rxPatientName").innerText = data.name;
                document.getElementById("rxPatientMeta").innerText = data.meta;
                document.getElementById("rxIdBadge").innerText = data.id;
                document.getElementById("rxDate").innerText = data.date;
                document.getElementById("rxInstructions").innerText = data.instructions;

                const medListContainer = document.getElementById("rxMedList");
                medListContainer.innerHTML = "";

                data.medications.forEach(med => {
                    const medItem = document.createElement("div");
                    medItem.className = "medication-item";
                    medItem.innerHTML = `
                        <div class="med-info">
                            <h4>${med.title}</h4>
                            <p>${med.dosage}</p>
                        </div>
                        <span class="med-duration">${med.duration}</span>
                    `;
                    medListContainer.appendChild(medItem);
                });
            }
        });
    });

    /*==============================
          NEW RX & PRINT BUTTONS
    ==============================*/
    const newRxBtn = document.getElementById("newPrescriptionBtn");
    if (newRxBtn) {
        newRxBtn.addEventListener("click", () => {
            showToast("Opening digital e-prescription builder...");
        });
    }

    const printRxBtn = document.getElementById("printRxBtn");
    if (printRxBtn) {
        printRxBtn.addEventListener("click", () => {
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

    console.log("Medicare+ Prescriptions Module Loaded Successfully");
});