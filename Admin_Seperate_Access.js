/*===========================================
  MEDICARE+ ADMIN DASHBOARD
  PART 1
===========================================*/

// -----------------------------
// SIDEBAR NAVIGATION
// -----------------------------

const menuItems = document.querySelectorAll(".sidebar ul li[data-page]");
const pages = document.querySelectorAll(".page");

menuItems.forEach(item=>{

    item.addEventListener("click",()=>{

        menuItems.forEach(i=>i.classList.remove("active"));
        item.classList.add("active");

        const page = item.dataset.page;

switch(page){

    case "reports":
        window.location.href = "Admin_Reports.html";
        return;

    case "settings":
        window.location.href = "Admin_Settings.html";
        return;

    default:

        pages.forEach(p=>{
            p.classList.remove("active-page");
        });

        document.getElementById(page).classList.add("active-page");

}
    });

});

// -----------------------------
// MOCK DATABASE
// -----------------------------

const doctors=[

{
id:"DOC001",
name:"Dr. Raj Sharma",
department:"Cardiology",
status:"Active",
patients:28
},

{
id:"DOC002",
name:"Dr. Neha Patel",
department:"Neurology",
status:"Active",
patients:19
},

{
id:"DOC003",
name:"Dr. Aman Singh",
department:"Orthopedics",
status:"Leave",
patients:0
},

{
id:"DOC004",
name:"Dr. Riya Mehta",
department:"Dermatology",
status:"Active",
patients:17
}

];

const patients=[

{
id:"PAT001",
name:"Rahul Joshi",
doctor:"Dr. Raj Sharma",
disease:"Heart Disease",
status:"Admitted"
},

{
id:"PAT002",
name:"Priya Sharma",
doctor:"Dr. Neha Patel",
disease:"Migraine",
status:"Discharged"
},

{
id:"PAT003",
name:"Aman Verma",
doctor:"Dr. Aman Singh",
disease:"Fracture",
status:"Critical"
},

{
id:"PAT004",
name:"Sneha Kulkarni",
doctor:"Dr. Riya Mehta",
disease:"Skin Allergy",
status:"Admitted"
}

];

const receptionists=[

{
id:"REC001",
name:"Pooja Sharma",
shift:"Morning",
contact:"+91 9876543210",
status:"Present"
},

{
id:"REC002",
name:"Karan Patel",
shift:"Evening",
contact:"+91 9988776655",
status:"Present"
},

{
id:"REC003",
name:"Anita Joshi",
shift:"Night",
contact:"+91 9876501234",
status:"Leave"
}

];

// -----------------------------
// LOAD DASHBOARD COUNTS
// -----------------------------

document.getElementById("doctorCount").innerText=doctors.length;

document.getElementById("patientCount").innerText=patients.length;

document.getElementById("receptionCount").innerText=receptionists.length;


// -----------------------------
// STATUS BADGE
// -----------------------------

function createStatus(text){

const cls=text.toLowerCase();

return `<span class="status ${cls}">${text}</span>`;

}

// -----------------------------
// ACTION BUTTONS
// -----------------------------

function actionButtons(){

return `

<div class="action-buttons">

<button class="view">

<i class="fa-solid fa-eye"></i>

</button>

<button class="edit">

<i class="fa-solid fa-pen"></i>

</button>

<button class="delete">

<i class="fa-solid fa-trash"></i>

</button>

</div>

`;

}
/*===========================================
  MEDICARE+ ADMIN DASHBOARD
  PART 2
===========================================*/

// ==========================================
// LOAD DOCTOR TABLE
// ==========================================

function loadDoctors() {

    const table = document.getElementById("doctorTable");

    table.innerHTML = "";

    doctors.forEach((doctor) => {

        table.innerHTML += `

        <tr>

            <td>${doctor.id}</td>

            <td>${doctor.name}</td>

            <td>${doctor.department}</td>

            <td>${createStatus(doctor.status)}</td>

            <td>${doctor.patients}</td>

            <td>${actionButtons()}</td>

        </tr>

        `;

    });

}

// ==========================================
// LOAD PATIENT TABLE
// ==========================================

function loadPatients() {

    const table = document.getElementById("patientTable");

    table.innerHTML = "";

    patients.forEach((patient) => {

        table.innerHTML += `

        <tr>

            <td>${patient.id}</td>

            <td>${patient.name}</td>

            <td>${patient.doctor}</td>

            <td>${patient.disease}</td>

            <td>${createStatus(patient.status)}</td>

            <td>${actionButtons()}</td>

        </tr>

        `;

    });

}

// ==========================================
// LOAD RECEPTIONIST TABLE
// ==========================================

function loadReceptionists() {

    const table = document.getElementById("receptionTable");

    table.innerHTML = "";

    receptionists.forEach((staff) => {

        table.innerHTML += `

        <tr>

            <td>${staff.id}</td>

            <td>${staff.name}</td>

            <td>${staff.shift}</td>

            <td>${staff.contact}</td>

            <td>${createStatus(staff.status)}</td>

            <td>${actionButtons()}</td>

        </tr>

        `;

    });

}

// ==========================================
// LOAD ALL TABLES
// ==========================================

loadDoctors();

loadPatients();

loadReceptionists();

// ==========================================
// SEARCH FUNCTION
// ==========================================

const searchInput = document.querySelector(".search-box input");

searchInput.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    document.querySelectorAll("tbody tr").forEach((row) => {

        row.style.display = row.innerText
            .toLowerCase()
            .includes(value)
            ? ""
            : "none";

    });

});

// ==========================================
// BUTTON EVENTS
// ==========================================

document.addEventListener("click", function (e) {

    // VIEW

    if (e.target.closest(".view")) {

        const row = e.target.closest("tr");

        alert("Viewing:\n\n" + row.innerText);

    }

    // EDIT

    if (e.target.closest(".edit")) {

        alert("Edit feature will be connected to backend later.");

    }

    // DELETE

    if (e.target.closest(".delete")) {

        const confirmDelete = confirm("Delete this record?");

        if (confirmDelete) {

            e.target.closest("tr").remove();

        }

    }

});

// ==========================================
// ADD BUTTON PLACEHOLDERS
// ==========================================

document.querySelectorAll(".primary-btn").forEach((button) => {

    button.addEventListener("click", () => {

        alert("This feature will connect to the backend later.");

    });

});

// ==========================================
// NOTICE BOARD
// ==========================================

const noticeButton = document.querySelector("#messages .primary-btn");

const noticeArea = document.querySelector("#messages textarea");

const noticeList = document.querySelector(".notice-list");

noticeButton.addEventListener("click", () => {

    const message = noticeArea.value.trim();

    if (message === "") {

        alert("Please write a notice.");

        return;

    }

    const notice = document.createElement("div");

    notice.className = "notice";

    notice.innerHTML = message;

    noticeList.prepend(notice);

    noticeArea.value = "";

});

// ==========================================
// NOTIFICATION BUTTON
// ==========================================

const bell = document.querySelector(".notification");

bell.addEventListener("click", () => {

    alert(

`Notifications

• 5 New Appointments
• 2 Emergency Cases
• 1 Doctor Leave Request
• 4 New Patient Registrations`

    );

});
/*===========================================
  MEDICARE+ ADMIN DASHBOARD
  PART 3
===========================================*/

/* ==========================================
   LIVE CLOCK
========================================== */

function updateClock(){

    const now = new Date();

    const options = {
        weekday:'long',
        year:'numeric',
        month:'long',
        day:'numeric'
    };

    const date = now.toLocaleDateString('en-IN',options);

    const time = now.toLocaleTimeString();

    let clock = document.getElementById("liveClock");

    if(!clock){

        clock = document.createElement("div");

        clock.id = "liveClock";

        clock.style.marginTop = "10px";
        clock.style.fontSize = "14px";
        clock.style.color = "#555";

        document.querySelector("header").appendChild(clock);

    }

    clock.innerHTML = `
        <strong>${date}</strong><br>${time}
    `;

}

setInterval(updateClock,1000);

updateClock();

/* ==========================================
   CARD COUNTER ANIMATION
========================================== */

function animateCounter(id,target){

    const element=document.getElementById(id);

    if(!element) return;

    let count=0;

    const speed=Math.ceil(target/60);

    const timer=setInterval(()=>{

        count+=speed;

        if(count>=target){

            count=target;

            clearInterval(timer);

        }

        element.innerText=count;

    },20);

}

animateCounter("doctorCount",doctors.length);
animateCounter("patientCount",patients.length);
animateCounter("receptionCount",receptionists.length);

/* ==========================================
   DASHBOARD CARD CLICK
========================================== */

document.querySelectorAll(".card").forEach(card=>{

    card.addEventListener("click",()=>{

        card.style.transform="scale(0.96)";

        setTimeout(()=>{

            card.style.transform="";

        },150);

    });

});

/* ==========================================
   LOCAL STORAGE FOR NOTICES
========================================== */

function saveNotices(){

    const notices=[];

    document.querySelectorAll(".notice").forEach(n=>{

        notices.push(n.innerHTML);

    });

    localStorage.setItem(
        "hospital_notices",
        JSON.stringify(notices)
    );

}

function loadSavedNotices(){

    const data=JSON.parse(

        localStorage.getItem("hospital_notices")

    );

    if(!data) return;

    noticeList.innerHTML="";

    data.forEach(text=>{

        const div=document.createElement("div");

        div.className="notice";

        div.innerHTML=text;

        noticeList.appendChild(div);

    });

}

loadSavedNotices();

noticeButton.addEventListener("click",saveNotices);

/* ==========================================
   FUTURE API SERVICE
========================================== */

const API={

    async getDoctors(){

        // Later replace

        // return fetch('/api/doctors');

        return doctors;

    },

    async getPatients(){

        return patients;

    },

    async getReceptionists(){

        return receptionists;

    },

    async getDashboard(){

        return{

            doctors:doctors.length,

            patients:patients.length,

            receptionists:receptionists.length

        };

    }

};

/* ==========================================
   LOADING SCREEN
========================================== */

window.addEventListener("load",()=>{

    document.body.style.opacity="0";

    setTimeout(()=>{

        document.body.style.transition="opacity .6s";

        document.body.style.opacity="1";

    },100);

});

/* ==========================================
   MOBILE SIDEBAR
========================================== */

const sidebar=document.querySelector(".sidebar");

const menu=document.createElement("button");

menu.innerHTML='<i class="fa-solid fa-bars"></i>';

menu.style.position="fixed";
menu.style.top="20px";
menu.style.left="20px";
menu.style.zIndex="9999";
menu.style.width="50px";
menu.style.height="50px";
menu.style.borderRadius="50%";
menu.style.border="none";
menu.style.background="#2563eb";
menu.style.color="white";
menu.style.cursor="pointer";
menu.style.display="none";

document.body.appendChild(menu);

function checkScreen(){

    if(window.innerWidth<992){

        menu.style.display="block";

    }

    else{

        menu.style.display="none";

        sidebar.classList.remove("active");

    }

}

window.addEventListener("resize",checkScreen);

checkScreen();

menu.addEventListener("click",()=>{

    sidebar.classList.toggle("active");

});

/* ==========================================
   SAMPLE ANALYTICS
========================================== */

console.table({

    Doctors:doctors.length,

    Patients:patients.length,

    Receptionists:receptionists.length

});

/* ==========================================
   STARTUP MESSAGE
========================================== */

console.log("================================");

console.log(" Medicare+ Admin Dashboard ");

console.log(" Frontend Loaded Successfully ");

console.log(" Backend Ready ");

console.log("================================");
function openDoctorDashboard(){

    window.location.href="Doctor_Dashboard.html";

}

function openPatientDashboard(){

    window.location.href="Patient_Dashboard.html";

}

function openReceptionistDashboard(){

    window.location.href="Receptionist_Dashboard.html";

}
/*=========================================
        REPORTS PAGE
=========================================*/

function openReportsPage(){

    window.location.href = "Admin_Reports.html";

}

/*=========================================
        SETTINGS PAGE
=========================================*/

function openSettingsPage(){

    window.location.href = "Admin_Settings.html";

}