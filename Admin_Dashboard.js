/*==================================================
            Medicare+
        Admin Dashboard
            JS PART 1
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==============================
            ADMIN NAME
    ==============================*/

    const adminName = localStorage.getItem("adminName") || "Administrator";

    const adminElement = document.getElementById("adminName");

    if(adminElement){

        adminElement.textContent = adminName;

    }



    /*==============================
            DARK MODE
    ==============================*/

    const themeToggle = document.getElementById("themeToggle");

    if(localStorage.getItem("adminTheme") === "dark"){

        document.body.classList.add("dark");

        if(themeToggle){

            themeToggle.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

        }

    }

    if(themeToggle){

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark");

            if(document.body.classList.contains("dark")){

                localStorage.setItem("adminTheme","dark");

                themeToggle.innerHTML =
                '<i class="fa-solid fa-sun"></i>';

            }

            else{

                localStorage.setItem("adminTheme","light");

                themeToggle.innerHTML =
                '<i class="fa-solid fa-moon"></i>';

            }

        });

    }



    /*==============================
        ACTIVE SIDEBAR MENU
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

    if(logoutBtn){

        logoutBtn.addEventListener("click", () => {

            if(confirm("Do you want to logout?")){

                window.location.href = "admin-login.html";

            }

        });

    }



    /*==============================
        SEARCH BAR
    ==============================*/

    const searchInput = document.querySelector(".search-box input");

    if(searchInput){

        searchInput.addEventListener("keyup", (e) => {

            console.log("Searching:", e.target.value);

        });

    }



    /*==============================
        ICON BUTTONS
    ==============================*/

    const iconButtons = document.querySelectorAll(".icon-btn");

    iconButtons.forEach(button => {

        button.addEventListener("click", () => {

            if(button.id !== "themeToggle"){

                showToast("Feature Coming Soon!");

            }

        });

    });



    /*==============================
            TOAST
    ==============================*/

    function showToast(message){

        const toast = document.createElement("div");

        toast.innerText = message;

        toast.style.position = "fixed";

        toast.style.top = "20px";

        toast.style.right = "20px";

        toast.style.background = "#2563eb";

        toast.style.color = "#fff";

        toast.style.padding = "15px 25px";

        toast.style.borderRadius = "12px";

        toast.style.boxShadow = "0 10px 20px rgba(0,0,0,.2)";

        toast.style.zIndex = "9999";

        toast.style.opacity = "0";

        toast.style.transition = ".4s";

        document.body.appendChild(toast);

        setTimeout(()=>{

            toast.style.opacity="1";

        },100);

        setTimeout(()=>{

            toast.style.opacity="0";

            setTimeout(()=>{

                toast.remove();

            },400);

        },2500);

    }



    /*==============================
        CARD ANIMATION
    ==============================*/

    const cards = document.querySelectorAll(".card");

    cards.forEach((card,index)=>{

        card.style.opacity="0";

        card.style.transform="translateY(30px)";

        setTimeout(()=>{

            card.style.transition=".5s";

            card.style.opacity="1";

            card.style.transform="translateY(0)";

        },index*120);

    });



    console.log("Admin Dashboard Loaded");

});
/*==================================================
            Medicare+
        Admin Dashboard
            JS PART 2
==================================================*/


/*==============================
    HOSPITAL ANALYTICS CHART
==============================*/

const adminChart = document.getElementById("adminChart");

if(adminChart){

    new Chart(adminChart,{

        type:"bar",

        data:{

            labels:[
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun"
            ],

            datasets:[{

                label:"Patients",

                data:[
                    45,
                    52,
                    61,
                    58,
                    73,
                    67,
                    80
                ],

                backgroundColor:"#2563eb",

                borderRadius:8

            }]

        },

        options:{

    responsive:true,

    maintainAspectRatio:true,

    aspectRatio:2.8,

    plugins:{

        legend:{

            display:false

        }

    }

}

    });

}



/*==============================
        REVENUE CHART
==============================*/

const revenueChart=document.getElementById("revenueChart");

if(revenueChart){

    new Chart(revenueChart,{

        type:"line",

        data:{

            labels:[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul"
            ],

            datasets:[{

                label:"Revenue",

                data:[
                    8,
                    10,
                    12,
                    15,
                    18,
                    22,
                    25
                ],

                borderColor:"#22c55e",

                backgroundColor:"rgba(34,197,94,.15)",

                fill:true,

                tension:.4

            }]

        },

       options:{

    responsive:true,

    maintainAspectRatio:true,

    aspectRatio:2.5

}

    });

}



/*==============================
    QUICK ACTION BUTTONS
==============================*/

const actionButtons=document.querySelectorAll(".quick-actions button");

actionButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        alert(button.innerText + " feature will be connected to backend.");

    });

});



/*==============================
        CALENDAR
==============================*/

const calendarDates=document.querySelectorAll(".calendar-grid span");

calendarDates.forEach(day=>{

    day.addEventListener("click",()=>{

        if(day.innerText!==""){

            alert("Selected Date : " + day.innerText);

        }

    });

});



/*==============================
    NOTIFICATIONS
==============================*/

const notifications=document.querySelectorAll(".notification-item");

notifications.forEach(item=>{

    item.addEventListener("click",()=>{

        item.style.background="#dbeafe";

    });

});



/*==============================
    LIVE CARD COUNTERS
==============================*/

const cardValues=document.querySelectorAll(".card-info h2");

cardValues.forEach(card=>{

    const text=card.innerText;

    const number=parseInt(text.replace(/\D/g,""));

    if(!isNaN(number)){

        let count=0;

        const timer=setInterval(()=>{

            count+=Math.ceil(number/50);

            if(count>=number){

                count=number;

                clearInterval(timer);

            }

            if(text.includes("₹")){

                card.innerText="₹"+count+"L";

            }

            else{

                card.innerText=count;

            }

        },25);

    }

});



/*==============================
        REFRESH
==============================*/

setInterval(()=>{

    console.log("Dashboard Synced");

},30000);
/*==================================================
            Medicare+
        Admin Dashboard
            JS PART 3
==================================================*/


/*==============================
        TOAST NOTIFICATION
==============================*/

function showToast(message, color="#2563eb"){

    const toast=document.createElement("div");

    toast.innerHTML=message;

    toast.style.position="fixed";
    toast.style.top="25px";
    toast.style.right="25px";
    toast.style.padding="15px 25px";
    toast.style.background=color;
    toast.style.color="#fff";
    toast.style.borderRadius="12px";
    toast.style.boxShadow="0 10px 25px rgba(0,0,0,.25)";
    toast.style.zIndex="9999";
    toast.style.opacity="0";
    toast.style.transition=".4s";

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.style.opacity="1";

    },100);

    setTimeout(()=>{

        toast.style.opacity="0";

        setTimeout(()=>{

            toast.remove();

        },400);

    },3000);

}



/*==============================
        SMART SEARCH
==============================*/

const searchBox=document.querySelector(".search-box input");

if(searchBox){

    searchBox.addEventListener("keyup",()=>{

        const value=searchBox.value.toLowerCase();

        const rows=document.querySelectorAll(".management-table tbody tr");

        rows.forEach(row=>{

            row.style.display=row.innerText.toLowerCase().includes(value)
            ? ""
            : "none";

        });

    });

}



/*==============================
        TABLE ROW ACTION
==============================*/

const tableRows=document.querySelectorAll(".management-table tbody tr");

tableRows.forEach(row=>{

    row.style.cursor="pointer";

    row.addEventListener("click",()=>{

        showToast("Opening details...");

    });

});



/*==============================
        CALENDAR
==============================*/

const days=document.querySelectorAll(".calendar-grid span");

days.forEach(day=>{

    day.addEventListener("click",()=>{

        if(day.innerText==="") return;

        days.forEach(d=>d.classList.remove("today"));

        day.classList.add("today");

        showToast("Selected Date : "+day.innerText);

    });

});



/*==============================
    EMERGENCY NOTIFICATION
==============================*/

setTimeout(()=>{

    showToast(

        "🚑 Emergency patient admitted in ICU",

        "#ef4444"

    );

},8000);



/*==============================
        LIVE CLOCK
==============================*/

function updateClock(){

    const now=new Date();

    console.log(now.toLocaleString());

}

updateClock();

setInterval(updateClock,1000);



/*==============================
    BACKEND READY API
==============================*/

async function loadDashboard(){

    /*
    const response=await fetch(
      "http://localhost:5000/api/admin/dashboard"
    );

    const data=await response.json();

    console.log(data);
    */

}



/*==============================
    DASHBOARD LOADED
==============================*/

window.addEventListener("load",()=>{

    showToast(

        "Welcome Admin 👋",

        "#2563eb"

    );

    loadDashboard();

});



/*==============================
        CONSOLE
==============================*/

console.log("Medicare+ Admin Dashboard Ready");