/*==========================================
        MEDICARE+ APPOINTMENTS
===========================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeClock();
    initializeSearch();
    initializeBooking();
    initializeDoctorButtons();
    initializeAppointmentButtons();
    initializeCalendar();
    initializeCounters();

});

/*==========================================
        LIVE DATE & TIME
===========================================*/

function initializeClock(){

    const title=document.querySelector(".page-title p");

    function updateClock(){

        const now=new Date();

        const options={
            weekday:"long",
            day:"numeric",
            month:"long",
            year:"numeric"
        };

        title.innerHTML=
        "Today : "+
        now.toLocaleDateString("en-IN",options);

    }

    updateClock();

}

/*==========================================
        SEARCH DOCTOR
===========================================*/

function initializeSearch(){

const input=document.querySelector(".search-box input");

const doctors=document.querySelectorAll(".doctor");

if(!input) return;

input.addEventListener("keyup",()=>{

const value=input.value.toLowerCase();

doctors.forEach(card=>{

const text=card.innerText.toLowerCase();

if(text.includes(value))
card.style.display="block";
else
card.style.display="none";

});

});

}

/*==========================================
        BOOK APPOINTMENT
===========================================*/

function initializeBooking(){

const form=document.querySelector(".appointment-form");

if(!form) return;

form.addEventListener("submit",(e)=>{

e.preventDefault();

const patient=form.querySelector("input").value;

showToast(
"Appointment booked successfully for "+patient
);

form.reset();

});

}

/*==========================================
        DOCTOR BUTTONS
===========================================*/

function initializeDoctorButtons(){

document.querySelectorAll(".doctor-footer button")

.forEach(btn=>{

btn.addEventListener("click",()=>{

const doctor=
btn.closest(".doctor")
.querySelector("h3").innerText;

showToast(
"You selected "+doctor
);

});

});

}

/*==========================================
        APPOINTMENT BUTTONS
===========================================*/

function initializeAppointmentButtons(){

document.querySelectorAll(".join-btn")

.forEach(btn=>{

btn.onclick=()=>{

showToast(
"Joining video consultation..."
);

};

});

document.querySelectorAll(".cancel-btn")

.forEach(btn=>{

btn.onclick=()=>{

btn.closest("tr").remove();

showToast(
"Appointment Cancelled"
);

};

});

document.querySelectorAll(".reschedule-btn")

.forEach(btn=>{

btn.onclick=()=>{

showToast(
"Reschedule page coming soon."
);

};

});

}

/*==========================================
        CALENDAR
===========================================*/

function initializeCalendar(){

document.querySelectorAll(".calendar span")

.forEach(day=>{

day.addEventListener("click",()=>{

document
.querySelectorAll(".calendar span")
.forEach(d=>d.classList.remove("active-day"));

day.classList.add("active-day");

showToast(
"Selected Date : "+day.innerText
);

});

});

}

/*==========================================
        COUNTER ANIMATION
===========================================*/

function initializeCounters(){

const cards=document.querySelectorAll(".stat-card h2");

cards.forEach(card=>{

let target=parseInt(card.innerText);

if(isNaN(target)) return;

let count=0;

let speed=Math.ceil(target/50);

let interval=setInterval(()=>{

count+=speed;

if(count>=target){

count=target;

clearInterval(interval);

}

card.innerText=count;

},20);

});

}

/*==========================================
        TOAST
===========================================*/

function showToast(message){

const toast=document.createElement("div");

toast.className="toast";

toast.innerHTML=message;

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