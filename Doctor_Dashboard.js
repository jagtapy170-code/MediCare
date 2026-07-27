/*==================================================
            Medicare+
        Doctor Dashboard
              JS PART 1
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==============================
        DOCTOR NAME
    ==============================*/

    const doctorName =
        localStorage.getItem("doctorName") || "Dr. John Smith";

    const doctorElement =
        document.getElementById("doctorName");

    if (doctorElement) {

        doctorElement.textContent = doctorName;

    }


    /*==============================
        DARK MODE
    ==============================*/

    const themeToggle =
        document.getElementById("themeToggle");

    if (localStorage.getItem("doctorTheme") === "dark") {

        document.body.classList.add("dark");

        if (themeToggle) {

            themeToggle.innerHTML =
                '<i class="fa-solid fa-sun"></i>';

        }

    }

    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark");

            if (document.body.classList.contains("dark")) {

                localStorage.setItem(
                    "doctorTheme",
                    "dark"
                );

                themeToggle.innerHTML =
                    '<i class="fa-solid fa-sun"></i>';

            } else {

                localStorage.setItem(
                    "doctorTheme",
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

    menuItems.forEach(item => {

        item.addEventListener("click", () => {

            menuItems.forEach(i =>
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

    if (logoutBtn) {

        logoutBtn.addEventListener("click", () => {

            if (confirm("Do you want to logout?")) {

                window.location.href =
                    "doctor-login.html";

            }

        });

    }


    /*==============================
        SMART SEARCH
    ==============================*/

    const searchInput =
        document.querySelector(".search-box input");

    if (searchInput) {

        searchInput.addEventListener("keyup", function () {

            const value =
                this.value.toLowerCase();

            const rows =
                document.querySelectorAll(
                    ".management-table tbody tr"
                );

            rows.forEach(row => {

                if (row.innerText
                    .toLowerCase()
                    .includes(value)) {

                    row.style.display = "";

                } else {

                    row.style.display = "none";

                }

            });

        });

    }


    /*==============================
        QUICK ACTIONS
    ==============================*/

    const quickButtons =
        document.querySelectorAll(".quick-actions button");

    quickButtons.forEach(button => {

        button.addEventListener("click", () => {

            showToast(button.innerText);

        });

    });


    /*==============================
        TOAST MESSAGE
    ==============================*/

    function showToast(message) {

        const toast =
            document.createElement("div");

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


    /*==============================
        CARD ANIMATION
    ==============================*/

    const cards =
        document.querySelectorAll(".card");

    cards.forEach((card, index) => {

        card.style.opacity = "0";

        card.style.transform = "translateY(30px)";

        setTimeout(() => {

            card.style.transition = ".5s";

            card.style.opacity = "1";

            card.style.transform = "translateY(0)";

        }, index * 120);

    });

    console.log("Doctor Dashboard Loaded");

});
/*==================================================
            Medicare+
        Doctor Dashboard
              JS PART 2
==================================================*/


/*==============================
      WEEKLY ANALYTICS CHART
==============================*/

const doctorChart = document.getElementById("doctorChart");

if (doctorChart) {

    new Chart(doctorChart, {

        type: "line",

        data: {

            labels: [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun"
            ],

            datasets: [{

                label: "Patients Treated",

                data: [
                    18,
                    22,
                    28,
                    24,
                    35,
                    32,
                    27
                ],

                borderColor: "#059669",

                backgroundColor: "rgba(5,150,105,.15)",

                borderWidth: 3,

                tension: .4,

                fill: true,

                pointRadius: 5,

                pointBackgroundColor: "#059669"

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: true,

            aspectRatio: 2.3,

            plugins: {

                legend: {

                    display: false

                }

            },

            scales: {

                y: {

                    beginAtZero: true

                }

            }

        }

    });

}



/*==============================
        LIVE DATE & TIME
==============================*/

function updateClock() {

    const now = new Date();

    console.log(now.toLocaleDateString());

    console.log(now.toLocaleTimeString());

}

updateClock();

setInterval(updateClock, 1000);



/*==============================
      ANIMATED COUNTERS
==============================*/

const counters = document.querySelectorAll(".card-info h2");

counters.forEach(counter => {

    const text = counter.innerText;

    const number = parseFloat(text);

    if (!isNaN(number)) {

        let current = 0;

        const timer = setInterval(() => {

            current += Math.ceil(number / 40);

            if (current >= number) {

                current = number;

                clearInterval(timer);

            }

            if (text.includes(".")) {

                counter.innerText = current.toFixed(1);

            }

            else {

                counter.innerText = current;

            }

        }, 30);

    }

});



/*==============================
      TABLE ROW EFFECT
==============================*/

const rows = document.querySelectorAll(".management-table tbody tr");

rows.forEach(row => {

    row.style.cursor = "pointer";

    row.addEventListener("click", () => {

        row.style.background = "#d1fae5";

        setTimeout(() => {

            row.style.background = "";

        }, 700);

    });

});



/*==============================
      VITALS ANIMATION
==============================*/

const vitals = document.querySelectorAll(".vital-item");

vitals.forEach((item, index) => {

    item.style.opacity = "0";

    item.style.transform = "translateX(-30px)";

    setTimeout(() => {

        item.style.transition = ".5s";

        item.style.opacity = "1";

        item.style.transform = "translateX(0)";

    }, index * 150);

});



/*==============================
      SCHEDULE EFFECT
==============================*/

const scheduleItems =
    document.querySelectorAll(".schedule-item");

scheduleItems.forEach(item => {

    item.addEventListener("click", () => {

        item.style.background = "#d1fae5";

    });

});



/*==============================
      NOTIFICATION EFFECT
==============================*/

const notifications =
    document.querySelectorAll(".notification-item");

notifications.forEach(notification => {

    notification.addEventListener("click", () => {

        notification.style.borderLeft =
            "5px solid #059669";

    });

});



/*==============================
      AUTO REFRESH
==============================*/

setInterval(() => {

    console.log("Doctor Dashboard Updated");

}, 30000);



/*==============================
      PANEL ANIMATION
==============================*/

const panels =
    document.querySelectorAll(".panel");

panels.forEach((panel, index) => {

    panel.style.opacity = "0";

    panel.style.transform = "translateY(25px)";

    setTimeout(() => {

        panel.style.transition = ".6s";

        panel.style.opacity = "1";

        panel.style.transform = "translateY(0)";

    }, index * 180);

});
/*==================================================
            Medicare+
        Doctor Dashboard
              JS PART 3
==================================================*/


document.addEventListener("DOMContentLoaded",()=>{


/*=================================
    APPOINTMENT STATUS UPDATE
=================================*/


const appointmentButtons =
document.querySelectorAll(".appointment-status");


appointmentButtons.forEach(button=>{


button.addEventListener("click",()=>{


if(button.innerText==="Pending"){

button.innerText="Completed";

button.style.background="#059669";

showToast("Appointment Completed");


}

else{


button.innerText="Pending";

button.style.background="#f59e0b";


}


});


});





/*=================================
        PATIENT PROFILE POPUP
=================================*/



const patientRows =
document.querySelectorAll(".patient-row");



const modal =
document.getElementById("patientModal");



const closeModal =
document.querySelector(".close-modal");



patientRows.forEach(row=>{


row.addEventListener("click",()=>{


if(modal){

modal.style.display="flex";


const patientName =
row.querySelector(".patient-name");


if(patientName){

document.getElementById(
"modalPatientName"
).innerText =
patientName.innerText;


}



}



});


});



if(closeModal){


closeModal.onclick=()=>{


modal.style.display="none";


}


}







/*=================================
        PRESCRIPTION SYSTEM
=================================*/



const prescriptionBtn =
document.getElementById(
"prescriptionBtn"
);



const prescriptionBox =
document.getElementById(
"prescriptionBox"
);



if(prescriptionBtn){


prescriptionBtn.addEventListener(
"click",
()=>{


if(prescriptionBox){


prescriptionBox.classList.toggle(
"show"
);


}


});


}






/*=================================
        SAVE PATIENT NOTES
=================================*/



const saveNotes =
document.getElementById(
"saveNotes"
);



const patientNotes =
document.getElementById(
"patientNotes"
);



if(saveNotes){


saveNotes.addEventListener(
"click",
()=>{


localStorage.setItem(
"doctorNotes",
patientNotes.value
);



showToast(
"Patient notes saved successfully"
);



});


}



if(patientNotes){


patientNotes.value =
localStorage.getItem(
"doctorNotes"
) || "";



}





/*=================================
        NOTIFICATION COUNTER
=================================*/



const notificationIcon =
document.querySelector(
".notification-icon"
);



let notificationCount = 5;



if(notificationIcon){



notificationIcon.addEventListener(
"click",
()=>{


notificationCount=0;



const badge =
document.querySelector(
".notification-badge"
);



if(badge){

badge.innerText="0";

}



showToast(
"All notifications cleared"
);



});


}






/*=================================
        EMERGENCY ALERT
=================================*/



const emergencyBtn =
document.getElementById(
"emergencyBtn"
);



if(emergencyBtn){


emergencyBtn.addEventListener(
"click",
()=>{


const confirmAlert =
confirm(
"Send emergency alert to hospital?"
);



if(confirmAlert){


showToast(
"Emergency alert sent!"
);



}


});


}







/*=================================
        CALENDAR SELECT
=================================*/



const calendarDays =
document.querySelectorAll(
".calendar-day"
);



calendarDays.forEach(day=>{


day.addEventListener(
"click",
()=>{


calendarDays.forEach(d=>
d.classList.remove("selected")
);



day.classList.add(
"selected"
);



showToast(
"Schedule updated"
);



});


});







/*=================================
        DOWNLOAD REPORT
=================================*/



const downloadBtn =
document.getElementById(
"downloadReport"
);



if(downloadBtn){


downloadBtn.addEventListener(
"click",
()=>{


let report =
`
Medicare+ Doctor Report

Doctor:
${document.getElementById("doctorName")?.innerText}

Date:
${new Date().toDateString()}


Patients Treated:
125


Status:
Healthy

`;



const blob =
new Blob(
[report],
{
type:"text/plain"
}
);



const link =
document.createElement("a");



link.href =
URL.createObjectURL(blob);



link.download =
"Doctor_Report.txt";



link.click();



showToast(
"Report Downloaded"
);



});


}






/*=================================
        VOICE ASSISTANT
=================================*/



const voiceBtn =
document.getElementById(
"voiceAssistant"
);



if(voiceBtn){


voiceBtn.addEventListener(
"click",
()=>{


if(
"speechSynthesis" in window
){


let speech =
new SpeechSynthesisUtterance(
"Welcome Doctor. Your Medicare dashboard is ready."
);



speech.rate=.9;


speechSynthesis.speak(
speech
);



}



});


}







/*=================================
        SMOOTH SCROLL
=================================*/



document.querySelectorAll(
"a[href^='#']"
)
.forEach(link=>{


link.addEventListener(
"click",
(e)=>{


e.preventDefault();


document.querySelector(
link.getAttribute("href")
)
?.scrollIntoView(
{
behavior:"smooth"
}
);


});


});






/*=================================
        LIVE PATIENT UPDATE
=================================*/



function updatePatientCount(){


const patientCounter =
document.getElementById(
"patientCount"
);



if(patientCounter){


let current =
parseInt(
patientCounter.innerText
);



patientCounter.innerText =
current+1;


}



}



setInterval(
updatePatientCount,
60000
);






/*=================================
        GLOBAL TOAST
=================================*/



window.showToast=function(message){


const toast =
document.createElement("div");


toast.className="toast-message";


toast.innerHTML=message;



document.body.appendChild(
toast
);



setTimeout(()=>{

toast.classList.add(
"active"
);


},100);



setTimeout(()=>{


toast.remove();


},3000);



};




console.log(
"Doctor Dashboard Advanced Features Loaded"
);



});