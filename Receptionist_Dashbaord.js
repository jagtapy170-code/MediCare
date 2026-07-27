/*==================================================
            Medicare+
      Receptionist Dashboard
              JS PART 1
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==============================
        RECEPTIONIST NAME
    ==============================*/

    const receptionistName =
        localStorage.getItem("receptionistName") || "Receptionist";

    const nameElement =
        document.getElementById("receptionistName");

    if(nameElement){

        nameElement.textContent = receptionistName;

    }



    /*==============================
            DARK MODE
    ==============================*/

    const themeToggle =
        document.getElementById("themeToggle");

    if(localStorage.getItem("receptionTheme")==="dark"){

        document.body.classList.add("dark");

        if(themeToggle){

            themeToggle.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

        }

    }

    if(themeToggle){

        themeToggle.addEventListener("click",()=>{

            document.body.classList.toggle("dark");

            if(document.body.classList.contains("dark")){

                localStorage.setItem(
                    "receptionTheme",
                    "dark"
                );

                themeToggle.innerHTML =
                '<i class="fa-solid fa-sun"></i>';

            }

            else{

                localStorage.setItem(
                    "receptionTheme",
                    "light"
                );

                themeToggle.innerHTML =
                '<i class="fa-solid fa-moon"></i>';

            }

        });

    }



    /*==============================
        ACTIVE SIDEBAR MENU
    ==============================*/

    const menuItems =
        document.querySelectorAll(".menu li");

    menuItems.forEach(item=>{

        item.addEventListener("click",()=>{

            menuItems.forEach(i=>
                i.classList.remove("active")
            );

            item.classList.add("active");

        });

    });



    /*==============================
            LOGOUT
    ==============================*/

    const logoutBtn =
        document.getElementById("logoutBtn");

    if(logoutBtn){

        logoutBtn.addEventListener("click",()=>{

            if(confirm("Are you sure you want to logout?")){

                window.location.href =
                "receptionist-login.html";

            }

        });

    }



    /*==============================
        SEARCH FUNCTION
    ==============================*/

    const searchInput =
        document.querySelector(".search-box input");

    if(searchInput){

        searchInput.addEventListener("keyup",(e)=>{

            console.log("Searching : ",e.target.value);

        });

    }



    /*==============================
        QUICK ACTION BUTTONS
    ==============================*/

    const quickButtons =
        document.querySelectorAll(".quick-actions button");

    quickButtons.forEach(button=>{

        button.addEventListener("click",()=>{

            showToast(button.innerText);

        });

    });



    /*==============================
            TOAST
    ==============================*/

    function showToast(message){

        const toast =
            document.createElement("div");

        toast.innerHTML = message;

        toast.style.position="fixed";
        toast.style.top="20px";
        toast.style.right="20px";
        toast.style.padding="15px 22px";
        toast.style.background="#7c3aed";
        toast.style.color="#fff";
        toast.style.borderRadius="12px";
        toast.style.boxShadow="0 12px 25px rgba(0,0,0,.2)";
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

        },2500);

    }



    /*==============================
        CARD ANIMATION
    ==============================*/

    const cards =
        document.querySelectorAll(".card");

    cards.forEach((card,index)=>{

        card.style.opacity="0";
        card.style.transform="translateY(30px)";

        setTimeout(()=>{

            card.style.transition=".5s";

            card.style.opacity="1";

            card.style.transform="translateY(0)";

        },index*120);

    });



    console.log("Receptionist Dashboard Loaded");

});
/*==================================================
            Medicare+
      Receptionist Dashboard
              JS PART 2
==================================================*/


/*==============================
    RECEPTION STATISTICS CHART
==============================*/

const receptionChart = document.getElementById("receptionChart");

if(receptionChart){

    new Chart(receptionChart,{

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
                    35,
                    48,
                    42,
                    61,
                    58,
                    72,
                    64
                ],

                backgroundColor:[
                    "#7c3aed",
                    "#6366f1",
                    "#8b5cf6",
                    "#2563eb",
                    "#22c55e",
                    "#f59e0b",
                    "#ef4444"
                ],

                borderRadius:10

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:true,

            aspectRatio:2.5,

            plugins:{

                legend:{

                    display:false

                }

            }

        }

    });

}



/*==============================
        LIVE DATE & TIME
==============================*/

function updateClock(){

    const now=new Date();

    const options={

        weekday:"long",

        year:"numeric",

        month:"long",

        day:"numeric"

    };

    console.log(now.toLocaleDateString("en-IN",options));

    console.log(now.toLocaleTimeString());

}

updateClock();

setInterval(updateClock,1000);



/*==============================
        CARD COUNTERS
==============================*/

const cardNumbers=document.querySelectorAll(".card-info h2");

cardNumbers.forEach(card=>{

    const text=card.innerText;

    const value=parseInt(text.replace(/\D/g,""));

    if(!isNaN(value)){

        let count=0;

        const timer=setInterval(()=>{

            count+=Math.ceil(value/40);

            if(count>=value){

                count=value;

                clearInterval(timer);

            }

            if(text.includes("₹")){

                card.innerText="₹"+count+"K";

            }

            else{

                card.innerText=count;

            }

        },25);

    }

});



/*==============================
        TABLE ROW ACTION
==============================*/

const rows=document.querySelectorAll(".management-table tbody tr");

rows.forEach(row=>{

    row.style.cursor="pointer";

    row.addEventListener("click",()=>{

        row.style.background="#ede9fe";

        setTimeout(()=>{

            row.style.background="";

        },600);

    });

});



/*==============================
        NOTIFICATIONS
==============================*/

const notifications=document.querySelectorAll(".notification-item");

notifications.forEach(notification=>{

    notification.addEventListener("click",()=>{

        notification.style.borderLeft="5px solid #7c3aed";

    });

});



/*==============================
        SCHEDULE
==============================*/

const schedules=document.querySelectorAll(".schedule-item");

schedules.forEach(item=>{

    item.addEventListener("click",()=>{

        item.style.background="#ede9fe";

    });

});



/*==============================
        AUTO REFRESH
==============================*/

setInterval(()=>{

    console.log("Reception Dashboard Updated");

},30000);



/*==============================
        PANEL ANIMATION
==============================*/

const panels=document.querySelectorAll(".panel");

panels.forEach((panel,index)=>{

    panel.style.opacity="0";

    panel.style.transform="translateY(30px)";

    setTimeout(()=>{

        panel.style.transition=".5s";

        panel.style.opacity="1";

        panel.style.transform="translateY(0)";

    },index*150);

});
/*==================================================
            Medicare+
      Receptionist Dashboard
              JS PART 3
==================================================*/


/*==============================
        SMART SEARCH
==============================*/

const searchBox = document.querySelector(".search-box input");

if(searchBox){

    searchBox.addEventListener("keyup",function(){

        const value = this.value.toLowerCase();

        const rows = document.querySelectorAll(".management-table tbody tr");

        rows.forEach(row=>{

            if(row.innerText.toLowerCase().includes(value)){

                row.style.display="";

            }

            else{

                row.style.display="none";

            }

        });

    });

}



/*==============================
        VIEW BUTTONS
==============================*/

const viewButtons=document.querySelectorAll(".view-btn");

viewButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        showNotification("Opening module...");

    });

});



/*==============================
        TOAST NOTIFICATION
==============================*/

function showNotification(message){

    const toast=document.createElement("div");

    toast.innerHTML=message;

    toast.style.position="fixed";
    toast.style.top="20px";
    toast.style.right="20px";
    toast.style.background="#7c3aed";
    toast.style.color="#fff";
    toast.style.padding="15px 25px";
    toast.style.borderRadius="12px";
    toast.style.fontWeight="600";
    toast.style.boxShadow="0 10px 25px rgba(0,0,0,.2)";
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
        EMERGENCY ALERT
==============================*/

setTimeout(()=>{

    showNotification("🚑 Emergency patient arrived at Reception");

},7000);



/*==============================
        LIVE STATUS UPDATE
==============================*/

function updateStatus(){

    const statuses=document.querySelectorAll(".waiting-status");

    statuses.forEach(status=>{

        if(Math.random()>0.7){

            status.innerHTML="Consulting";

            status.classList.remove("waiting-status");

            status.classList.add("consulting-status");

        }

    });

}

setInterval(updateStatus,10000);



/*==============================
        QUICK BUTTON EFFECT
==============================*/

const quickBtns=document.querySelectorAll(".quick-actions button");

quickBtns.forEach(btn=>{

    btn.addEventListener("click",()=>{

        btn.style.transform="scale(.95)";

        setTimeout(()=>{

            btn.style.transform="scale(1)";

        },150);

    });

});



/*==============================
        BACKEND READY
==============================*/

async function loadReceptionDashboard(){

    /*
    Example API

    const response = await fetch(
        "http://localhost:5000/api/reception/dashboard"
    );

    const data = await response.json();

    console.log(data);
    */

}

loadReceptionDashboard();



/*==============================
        DASHBOARD LOADED
==============================*/

window.addEventListener("load",()=>{

    showNotification("👋 Welcome to Reception Dashboard");

});



/*==============================
        CONSOLE
==============================*/

console.log("Reception Dashboard Ready");
/*==============================
    DASHBOARD NAVIGATION
==============================*/

function openDoctorDashboard() {
    window.location.href = "Doctor_Dashboard.html";
}

function openPatientDashboard() {
    window.location.href = "Patient_Dashboard.html";
}

function openReceptionistDashboard() {
    window.location.href = "Receptionist_Dashboard.html";
}
