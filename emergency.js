/*==================================================
            Medicare+
     Emergency & Triage Console
               JS
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==============================
        MOCK EMERGENCY DATA
    ==============================*/
    const erPatientData = {
        "ER-101": {
            name: "Vikram Rathore",
            meta: "54 Yrs, Male | Bed ER-01 | Arrival: 14:10 PM",
            priorityBadge: "P1 - Resuscitation",
            badgeClass: "priority-red",
            hr: "128",
            hrStatus: "Tachycardia",
            hrClass: "danger",
            bp: "85/55",
            bpStatus: "Hypotension",
            bpClass: "warning",
            spo2: "91%",
            spo2Status: "O2 Mask 4L",
            spo2Class: "warning",
            rr: "26",
            rrStatus: "Elevated",
            rrClass: "normal",
            notes: "Acute Anterior Wall STEMI. Cath Lab notified for primary PCI protocol. Dual antiplatelet therapy administered at 14:15 PM."
        },
        "ER-102": {
            name: "Suresh Patel",
            meta: "62 Yrs, Male | Bed ER-04 | Arrival: 13:45 PM",
            priorityBadge: "P2 - Emergent",
            badgeClass: "priority-orange",
            hr: "104",
            hrStatus: "Mild Tachycardia",
            hrClass: "warning",
            bp: "135/88",
            bpStatus: "Normal Range",
            bpClass: "normal",
            spo2: "88%",
            spo2Status: "Hypoxia / Nebulizing",
            spo2Class: "danger",
            rr: "28",
            rrStatus: "Tachypnea",
            rrClass: "warning",
            notes: "Exacerbation of chronic obstructive pulmonary disease (COPD). High-flow nebulization & IV steroids initiated."
        },
        "ER-103": {
            name: "Priya Nair",
            meta: "27 Yrs, Female | Bed ER-07 | Arrival: 13:20 PM",
            priorityBadge: "P2 - Emergent",
            badgeClass: "priority-orange",
            hr: "92",
            hrStatus: "Stable Normal",
            hrClass: "normal",
            bp: "110/72",
            bpStatus: "Normotensive",
            bpClass: "normal",
            spo2: "98%",
            spo2Status: "Room Air",
            spo2Class: "normal",
            rr: "18",
            rrStatus: "Normal",
            rrClass: "normal",
            notes: "Blunt abdominal trauma following MVA. Abdominal FAST ultrasound completed — no free fluid detected. Serial hemoglobin monitoring active."
        },
        "ER-104": {
            name: "Karan Singh",
            meta: "19 Yrs, Male | Bed ER-12 | Arrival: 12:50 PM",
            priorityBadge: "P3 - Urgent",
            badgeClass: "priority-green",
            hr: "78",
            hrStatus: "Normal Baseline",
            hrClass: "normal",
            bp: "120/80",
            bpStatus: "Optimal",
            bpClass: "normal",
            spo2: "99%",
            spo2Status: "Room Air",
            spo2Class: "normal",
            rr: "16",
            rrStatus: "Normal",
            rrClass: "normal",
            notes: "Right forearm closed radius fracture with superficial laceration. Analgesia given, x-rays completed, awaiting orthopedic splinting."
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
        SEARCH ER CASES
    ==============================*/
    const searchInput = document.getElementById("erSearchHeader");
    if (searchInput) {
        searchInput.addEventListener("keyup", function () {
            const value = this.value.toLowerCase();
            const rows = document.querySelectorAll("#erTable tbody tr");

            rows.forEach(row => {
                const text = row.innerText.toLowerCase();
                row.style.display = text.includes(value) ? "" : "none";
            });
        });
    }

    /*==============================
        FILTER TRIAGE PRIORITY
    ==============================*/
    const triageFilter = document.getElementById("triagePriorityFilter");

    if (triageFilter) {
        triageFilter.addEventListener("change", function () {
            const selectedVal = this.value.toLowerCase();
            const rows = document.querySelectorAll("#erTable tbody tr");

            rows.forEach(row => {
                const badgeText = row.querySelector("td:nth-child(4)")?.innerText.toLowerCase() || "";

                if (selectedVal === "all") {
                    row.style.display = "";
                } else if (selectedVal === "priority-1" && badgeText.includes("p1")) {
                    row.style.display = "";
                } else if (selectedVal === "priority-2" && badgeText.includes("p2")) {
                    row.style.display = "";
                } else if (selectedVal === "priority-3" && badgeText.includes("p3")) {
                    row.style.display = "";
                } else if (selectedVal === "priority-4" && badgeText.includes("p4")) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            });
        });
    }

    /*==============================
      SELECT & DISPLAY BAY VITAL MONITOR
    ==============================*/
    const erRows = document.querySelectorAll(".er-row");

    erRows.forEach(row => {
        row.addEventListener("click", function () {
            erRows.forEach(r => r.classList.remove("active-row"));
            this.classList.add("active-row");

            const erKey = this.getAttribute("data-er");
            const data = erPatientData[erKey];

            if (data) {
                document.getElementById("erPatientName").innerText = data.name;
                document.getElementById("erPatientMeta").innerText = data.meta;

                const badgeEl = document.getElementById("erPriorityBadge");
                badgeEl.innerText = data.priorityBadge;
                badgeEl.className = `blood-badge ${data.badgeClass}`;

                // Vitals update
                const hrTile = document.getElementById("erHeartRate").parentElement;
                document.getElementById("erHeartRate").innerText = data.hr;
                hrTile.className = `vital-tile ${data.hrClass}`;
                hrTile.querySelector("span").innerHTML = `<i class="fa-solid fa-heart"></i> ${data.hrStatus}`;

                const bpTile = document.getElementById("erBloodPressure").parentElement;
                document.getElementById("erBloodPressure").innerText = data.bp;
                bpTile.className = `vital-tile ${data.bpClass}`;
                bpTile.querySelector("span").innerHTML = `<i class="fa-solid fa-gauge"></i> ${data.bpStatus}`;

                const spo2Tile = document.getElementById("erSpO2").parentElement;
                document.getElementById("erSpO2").innerText = data.spo2;
                spo2Tile.className = `vital-tile ${data.spo2Class}`;
                spo2Tile.querySelector("span").innerHTML = `<i class="fa-solid fa-mask-ventilator"></i> ${data.spo2Status}`;

                const rrTile = document.getElementById("erRespRate").parentElement;
                document.getElementById("erRespRate").innerText = data.rr;
                rrTile.className = `vital-tile ${data.rrClass}`;
                rrTile.querySelector("span").innerHTML = `<i class="fa-solid fa-lungs"></i> ${data.rrStatus}`;

                document.getElementById("erNotes").innerText = data.notes;
            }
        });
    });

    /*==============================
        CODE RED & STAT BUTTONS
    ==============================*/
    const codeRedBtn = document.getElementById("triggerCodeRedBtn");
    if (codeRedBtn) {
        codeRedBtn.addEventListener("click", () => {
            if (confirm("CONFIRM EMERGENCY ALERT: Broadcast Code Blue / Red across Emergency Bay?")) {
                showToast("<i class=\"fa-solid fa-triangle-exclamation\"></i> CODE BLUE BROADCASTED! Resuscitation team dispatched.", "#ef4444");
            }
        });
    }

    const cathLabBtn = document.getElementById("cathLabTransferBtn");
    if (cathLabBtn) {
        cathLabBtn.addEventListener("click", () => {
            showToast("<i class=\"fa-solid fa-truck-medical\"></i> Cath Lab Stat Alert dispatched. Prep room 02.", "#059669");
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

    console.log("Medicare+ Emergency & Triage Module Loaded Successfully");
});