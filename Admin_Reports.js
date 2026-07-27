/*==================================================
            MEDICARE+ ADMIN REPORTS
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*====================================
            DARK MODE
    ====================================*/

    const themeToggle = document.getElementById("themeToggle");

    if (localStorage.getItem("adminTheme") === "dark") {

        document.body.classList.add("dark");

        themeToggle.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    }

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            localStorage.setItem("adminTheme", "dark");

            themeToggle.innerHTML =
                '<i class="fa-solid fa-sun"></i>';

        }

        else {

            localStorage.setItem("adminTheme", "light");

            themeToggle.innerHTML =
                '<i class="fa-solid fa-moon"></i>';

        }

    });

    /*====================================
            LIVE SEARCH
    ====================================*/

    const searchInput = document.querySelector(".search-box input");

    const rows = document.querySelectorAll(".reports-table tbody tr");

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        rows.forEach(row => {

            row.style.display =
                row.innerText.toLowerCase().includes(value)
                ? ""
                : "none";

        });

    });

    /*====================================
            BUTTON ACTIONS
    ====================================*/

    document.querySelectorAll(".action-btn.view").forEach(btn => {

        btn.addEventListener("click", () => {

            showToast("Opening report...");

        });

    });

    document.querySelectorAll(".action-btn.download").forEach(btn => {

        btn.addEventListener("click", () => {

            showToast("Downloading report...");

        });

    });

    document.querySelectorAll(".action-btn.print").forEach(btn => {

        btn.addEventListener("click", () => {

            window.print();

        });

    });

    /*====================================
            EXPORT BUTTONS
    ====================================*/

    document.querySelectorAll(".download-btn").forEach(btn => {

        btn.addEventListener("click", () => {

            showToast(btn.innerText + " started");

        });

    });

    /*====================================
            QUICK ACTIONS
    ====================================*/

    document.querySelector(".primary-btn")?.addEventListener("click", () => {

        showToast("Generating Report...");

    });

    document.querySelectorAll(".primary-btn")[1]?.addEventListener("click", () => {

        showToast("Preparing Email...");

    });

    document.querySelectorAll(".primary-btn")[2]?.addEventListener("click", () => {

        showToast("Cloud Backup Started");

    });

    document.querySelector(".danger-btn")?.addEventListener("click", () => {

        if(confirm("Delete old reports?")){

            showToast("Reports Deleted");

        }

    });

    /*====================================
            TOAST
    ====================================*/

    function showToast(message){

        const toast=document.createElement("div");

        toast.className="toast";

        toast.innerHTML=`
        <i class="fa-solid fa-circle-check"></i>
        ${message}
        `;

        document.body.appendChild(toast);

        setTimeout(()=>{

            toast.classList.add("show");

        },100);

        setTimeout(()=>{

            toast.classList.remove("show");

            setTimeout(()=>{

                toast.remove();

            },300);

        },3000);

    }

});
/*==================================================
            CHART.JS
==================================================*/

// Revenue Chart

const revenueCtx = document.getElementById("revenueChart");

if(revenueCtx){

new Chart(revenueCtx,{

type:"line",

data:{

labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],

datasets:[{

label:"Revenue (₹)",

data:[8,10,12,11,14,15,18,20,19,22,24,27],

borderColor:"#2563eb",

backgroundColor:"rgba(37,99,235,.15)",

fill:true,

tension:.4,

borderWidth:3,

pointRadius:5

}]

},

options:{

responsive:true,

plugins:{

legend:{display:false}

}

}

});

}


// Patient Statistics

const patientCtx=document.getElementById("patientChart");

if(patientCtx){

new Chart(patientCtx,{

type:"bar",

data:{

labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],

datasets:[{

label:"Patients",

data:[85,102,98,120,135,118,96],

backgroundColor:"#0ea5e9",

borderRadius:10

}]

},

options:{

responsive:true,

plugins:{

legend:{display:false}

}

}

});

}


// Department Chart

const deptCtx=document.getElementById("departmentChart");

if(deptCtx){

new Chart(deptCtx,{

type:"doughnut",

data:{

labels:[

"Cardiology",

"Neurology",

"Orthopedic",

"Pediatrics",

"Dermatology"

],

datasets:[{

data:[30,22,18,15,15],

backgroundColor:[

"#2563eb",

"#10b981",

"#f59e0b",

"#ef4444",

"#8b5cf6"

]

}]

},

options:{

responsive:true

}

});

}


// Appointment Chart

const appointmentCtx=document.getElementById("appointmentChart");

if(appointmentCtx){

new Chart(appointmentCtx,{

type:"line",

data:{

labels:["Week1","Week2","Week3","Week4"],

datasets:[{

label:"Appointments",

data:[220,285,260,325],

borderColor:"#10b981",

backgroundColor:"rgba(16,185,129,.15)",

fill:true,

tension:.4,

borderWidth:3

}]

},

options:{

responsive:true,

plugins:{

legend:{display:false}

}

}

});

}
/*==================================================
        ANIMATED COUNTERS
==================================================*/

const counters=document.querySelectorAll(".stat-content h2");

counters.forEach(counter=>{

const target=counter.innerText.replace(/[^\d]/g,'');

if(!target)return;

let count=0;

const speed=target/80;

const update=()=>{

count+=speed;

if(count<target){

counter.innerText=Math.floor(count).toLocaleString();

requestAnimationFrame(update);

}

else{

counter.innerText=target.toLocaleString();

}

}

update();

});
/*==================================================
        AUTO REFRESH
==================================================*/

setInterval(()=>{

console.log("Dashboard Refreshed");

},60000);