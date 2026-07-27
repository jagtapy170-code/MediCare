/*==================================================
            Medicare+
        My Patients Module
                JS
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==============================
        PATIENT DATA STORE
    ==============================*/
    const patientsData = {
        "PT-101": {
            name: "Rahul Sharma",
            meta: "PT-101 | Male, 35 Yrs | Blood Group: O+",
            contact: "+91 98765 43210 | rahul.sharma@example.com",
            avatar: "https://ui-avatars.com/api/?name=Rahul+Sharma&background=059669&color=ffffff",
            diagnosis: "Hypertension & Mild Arrhythmia",
            allergies: "Penicillin, Dust",
            lastVisit: "July 10, 2026",
            history: [
                { title: "Follow-up Cardiology Visit", desc: "Prescribed Antihypertensives & ECG suggested.", date: "Jul 10, 2026" },
                { title: "Complete Blood Count & Lipid Profile", desc: "Cholesterol levels slightly elevated.", date: "Jun 22, 2026" }
            ]
        },
        "PT-102": {
            name: "Anjali Mehta",
            meta: "PT-102 | Female, 29 Yrs | Blood Group: B+",
            contact: "+91 98123 45678 | anjali.mehta@example.com",
            avatar: "https://ui-avatars.com/api/?name=Anjali+Mehta&background=be185d&color=ffffff",
            diagnosis: "Mitral Valve Prolapse (Observation)",
            allergies: "Latex",
            lastVisit: "July 18, 2026",
            history: [
                { title: "Echocardiogram Assessment", desc: "Stable valve regurgitation, next echo in 6 months.", date: "Jul 18, 2026" },
                { title: "Initial Cardiology Consult", desc: "Reported mild palpitations upon exertional stress.", date: "May 05, 2026" }
            ]
        },
        "PT-103": {
            name: "Rohan Gupta",
            meta: "PT-103 | Male, 41 Yrs | Blood Group: A+",
            contact: "+91 97654 32109 | rohan.gupta@example.com",
            avatar: "https://ui-avatars.com/api/?name=Rohan+Gupta&background=047857&color=ffffff",
            diagnosis: "Post-Angioplasty Recovery",
            allergies: "Aspirin (Mild Gastro Intolerance)",
            lastVisit: "July 02, 2026",
            history: [
                { title: "Stent Follow-up & Stress Test", desc: "Treadmill test normal. Exercise protocol recommended.", date: "Jul 02, 2026" },
                { title: "Cardiac Rehab Phase II", desc: "Completed 6-week structured physical training.", date: "Jun 12, 2026" }
            ]
        },
        "PT-104": {
            name: "Neha Verma",
            meta: "PT-104 | Female, 52 Yrs | Blood Group: AB+",
            contact: "+91 96543 21098 | neha.verma@example.com",
            avatar: "https://ui-avatars.com/api/?name=Neha+Verma&background=b45309&color=ffffff",
            diagnosis: "Congestive Heart Failure (Stage B)",
            allergies: "Sulfa Drugs",
            lastVisit: "July 20, 2026",
            history: [
                { title: "Emergency BP Spike & Fluid Retention", desc: "Adjusted Diuretics dosage & salt restriction advice.", date: "Jul 20, 2026" },
                { title: "Bi-Monthly Renal & Electrolyte Panel", desc: "Serum Potassium normal, Creatinine stable.", date: "Jul 01, 2026" }
            ]
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
        SEARCH PATIENTS
    ==============================*/
    const searchInput = document.getElementById("patientSearchHeader");
    if (searchInput) {
        searchInput.addEventListener("keyup", function () {
            const value = this.value.toLowerCase();
            const rows = document.querySelectorAll("#patientsTable tbody tr");

            rows.forEach(row => {
                const text = row.innerText.toLowerCase();
                row.style.display = text.includes(value) ? "" : "none";
            });
        });
    }

    /*==============================
        FILTER BY GENDER & TYPE
    ==============================*/
    const genderFilter = document.getElementById("genderFilter");
    const typeFilter = document.getElementById("patientTypeFilter");

    function filterPatientsTable() {
        const selectedGender = genderFilter ? genderFilter.value.toLowerCase() : "all";
        const selectedType = typeFilter ? typeFilter.value.toLowerCase() : "all";
        const rows = document.querySelectorAll("#patientsTable tbody tr");

        rows.forEach(row => {
            const genderAgeText = row.querySelector("td:nth-child(3)")?.innerText.toLowerCase() || "";
            const categoryText = row.querySelector("td:nth-child(5)")?.innerText.toLowerCase() || "";

            const matchesGender = (selectedGender === "all") || genderAgeText.includes(selectedGender);
            const matchesType = (selectedType === "all") || categoryText.includes(selectedType);

            if (matchesGender && matchesType) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    }

    if (genderFilter) genderFilter.addEventListener("change", filterPatientsTable);
    if (typeFilter) typeFilter.addEventListener("change", filterPatientsTable);

    /*==============================
        PATIENT SELECTION & DETAILS
    ==============================*/
    const patientRows = document.querySelectorAll(".patient-row");

    patientRows.forEach(row => {
        row.addEventListener("click", () => {
            patientRows.forEach(r => r.classList.remove("active-row"));
            row.classList.add("active-row");

            const patientId = row.getAttribute("data-id");
            if (patientsData[patientId]) {
                updateDetailPanel(patientsData[patientId]);
            }
        });
    });

    function updateDetailPanel(data) {
        document.getElementById("detailAvatar").src = data.avatar;
        document.getElementById("detailName").innerText = data.name;
        document.getElementById("detailMeta").innerHTML = `<i class="fa-solid fa-hashtag"></i> ${data.meta}`;
        document.getElementById("detailContact").innerHTML = `<i class="fa-solid fa-phone"></i> ${data.contact}`;
        document.getElementById("detailDiagnosis").innerText = data.diagnosis;
        document.getElementById("detailAllergies").innerText = data.allergies;
        document.getElementById("detailLastVisit").innerText = data.lastVisit;

        const historyContainer = document.querySelector(".activity-list");
        if (historyContainer) {
            historyContainer.innerHTML = data.history.map(item => `
                <div class="activity-item">
                    <i class="fa-solid fa-stethoscope"></i>
                    <div>
                        <h4>${item.title}</h4>
                        <p>${item.desc}</p>
                    </div>
                    <span>${item.date}</span>
                </div>
            `).join("");
        }

        showToast(`Loaded details for ${data.name}`);
    }

    /*==============================
        EDIT PROFILE BUTTON
    ==============================*/
    const editBtn = document.getElementById("editPatientBtn");
    if (editBtn) {
        editBtn.addEventListener("click", () => {
            const currentName = document.getElementById("detailName").innerText;
            showToast(`Opening profile editor for ${currentName}`);
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

    console.log("Medicare+ My Patients Module Loaded Successfully");
});