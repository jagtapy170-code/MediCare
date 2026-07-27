/*=========================================
        MEDICARE+ PRESCRIPTIONS JS
==========================================*/

document.addEventListener("DOMContentLoaded", () => )

/*=========================================
        MODAL
==========================================*/

const modal = document.getElementById("prescriptionModal");

const viewButtons = document.querySelectorAll(".view-btn");

const closeModal = document.querySelector(".close-modal");

viewButtons.forEach(button=>{

button.addEventListener("click",()=>{

modal.style.display="flex";

document.body.style.overflow="hidden";

});

});

if(closeModal){

closeModal.addEventListener("click",()=>{

modal.style.display="none";

document.body.style.overflow="auto";

});

}

window.addEventListener("click",(e)=>{

if(e.target===modal){

modal.style.display="none";

document.body.style.overflow="auto";

}

});

/*=========================================
        SEARCH
==========================================*/

const search=document.querySelector(".search-box input");

if(search){

search.addEventListener("keyup",()=>{

const value=search.value.toLowerCase();

document.querySelectorAll(".prescriptions-table tbody tr").forEach(row=>{

row.style.display=row.innerText.toLowerCase().includes(value)
? ""
: "none";

});

});

}

/*=========================================
        FILTERS
==========================================*/

document.querySelectorAll(".filter-row select").forEach(select=>{

select.addEventListener("change",()=>{

console.log(select.value);

});

});

/*=========================================
        DOWNLOAD
==========================================*/

document.querySelectorAll(".download-btn").forEach(button=>{

button.onclick=()=>{

showToast("Prescription Download Started");

};

});

/*=========================================
        PRINT
==========================================*/

document.querySelectorAll(".print-btn").forEach(button=>{

button.onclick=()=>{

window.print();

};

});

/*=========================================
        SHARE
==========================================*/

document.querySelectorAll(".share-btn").forEach(button=>{

button.onclick=()=>{

if(navigator.share){

navigator.share({

title:"Prescription",

text:"Prescription Details",

url:window.location.href

});

}

else{

showToast("Sharing Not Supported");

}

};

});

/*=========================================
        REFILL
==========================================*/

document.querySelectorAll(".refill-btn").forEach(button=>{

button.onclick=()=>{

button.innerHTML="✓ Request Sent";

button.style.background="#10b981";

showToast("Medicine Refill Requested");

};

});

/*=========================================
        MARK AS TAKEN
==========================================*/

document.querySelectorAll(".schedule-card button").forEach(button=>{

button.onclick=()=>{

button.innerHTML="✓ Completed";

button.style.background="#10b981";

showToast("Medicine Marked as Taken");

};

});

/*=========================================
        HERO BUTTONS
==========================================*/

document.querySelector(".primary-btn").onclick=()=>{

showToast("Upload Prescription");

};

document.querySelector(".secondary-btn").onclick=()=>{

showToast("Preparing Download");

};
/*=========================================
        PREMIUM FEATURES
==========================================*/

/*============ Animated Counters ============*/

function animateCounter(element, target){

let count=0;

const speed=target/80;

const update=()=>{

count+=speed;

if(count<target){

element.innerHTML=Math.floor(count);

requestAnimationFrame(update);

}
else{

element.innerHTML=target;

}

}

update();

}

window.addEventListener("load",()=>{

document.querySelectorAll(".overview-card h2").forEach(card=>{

let value=parseInt(card.innerText);

if(!isNaN(value)){

card.innerHTML="0";

animateCounter(card,value);

}

});

});

/*============ Toast Notification ============*/

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

},500);

},3000);

}

/*============ Upload Box ============*/

const uploadBox=document.querySelector(".upload-box");

if(uploadBox){

uploadBox.addEventListener("dragover",(e)=>{

e.preventDefault();

uploadBox.style.borderColor="#10b981";

uploadBox.style.background="#f0fdf4";

});

uploadBox.addEventListener("dragleave",()=>{

uploadBox.style.borderColor="#2563eb";

uploadBox.style.background="#fff";

});

uploadBox.addEventListener("drop",(e)=>{

e.preventDefault();

uploadBox.style.borderColor="#2563eb";

uploadBox.style.background="#fff";

showToast("Prescription Uploaded Successfully");

});

}

/*============ Upload Button ============*/

const uploadBtn=document.querySelector(".upload-box button");

if(uploadBtn){

uploadBtn.onclick=()=>{

showToast("Opening File Picker...");

};

}

/*============ AI Insight Button ============*/

document.querySelectorAll(".insight-card button").forEach(btn=>{

btn.onclick=()=>{

showToast("Medicine Refill Ordered Successfully");

};

});

/*============ Pharmacy Buttons ============*/

document.querySelectorAll(".pharmacy-card button").forEach(btn=>{

btn.onclick=()=>{

showToast("Redirecting to Pharmacy...");

};

});

/*============ Card Hover Effect ============*/

document.querySelectorAll(

".overview-card,.medicine-card,.schedule-card,.insight-card,.analytics-card,.pharmacy-card"

).forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-10px) scale(1.02)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0) scale(1)";

});

});

/*============ Fade In ============*/

window.onload=()=>{

document.body.style.opacity="0";

setTimeout(()=>{

document.body.style.transition="1s";

document.body.style.opacity="1";

},100);

};

/*============ Current Date ============*/

const today=new Date();

console.log("Today:",today.toDateString());

/*============ Keyboard Shortcut ============*/

document.addEventListener("keydown",(e)=>{

if(e.ctrlKey && e.key==="f"){

e.preventDefault();

document.querySelector(".search-box input").focus();

showToast("Search Activated");

}

});

/*============ ESC closes modal ============*/

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

const modal=document.getElementById("prescriptionModal");

if(modal){

modal.style.display="none";

document.body.style.overflow="auto";

}

}

});

/*============ Auto Refresh Demo ============*/

setInterval(()=>{

console.log("Prescription Dashboard Updated");

},60000);

/*=========================================
        END
==========================================*/

