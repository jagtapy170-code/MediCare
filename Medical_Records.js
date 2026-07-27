/*=========================================
        MEDICARE+ MEDICAL RECORDS JS
==========================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==============================
        RECORD MODAL
    ==============================*/

    const modal = document.getElementById("recordModal");

    const viewButtons = document.querySelectorAll(".view-btn");

    const closeModal = document.querySelector(".close-modal");

    viewButtons.forEach(button => {

        button.addEventListener("click", () => {

            modal.style.display = "flex";

            document.body.style.overflow = "hidden";

        });

    });

    if (closeModal) {

        closeModal.addEventListener("click", () => {

            modal.style.display = "none";

            document.body.style.overflow = "auto";

        });

    }

    window.addEventListener("click", (e) => {

        if (e.target === modal) {

            modal.style.display = "none";

            document.body.style.overflow = "auto";

        }

    });

    /*==============================
        DOWNLOAD BUTTON
    ==============================*/

    document.querySelectorAll(".download-btn").forEach(button => {

        button.addEventListener("click", () => {

            alert("Downloading Medical Record...");

        });

    });

    /*==============================
        PRINT BUTTON
    ==============================*/

    document.querySelectorAll(".print-btn").forEach(button => {

        button.addEventListener("click", () => {

            window.print();

        });

    });

    /*==============================
        SHARE BUTTON
    ==============================*/

    document.querySelectorAll(".share-btn").forEach(button => {

        button.addEventListener("click", () => {

            if (navigator.share) {

                navigator.share({

                    title: "Medical Record",

                    text: "Sharing Medical Record",

                    url: window.location.href

                });

            } else {

                alert("Sharing is not supported on this browser.");

            }

        });

    });

    /*==============================
        SEARCH RECORDS
    ==============================*/

    const searchInputs = document.querySelectorAll("input[type='text']");

    searchInputs.forEach(input => {

        input.addEventListener("keyup", () => {

            const value = input.value.toLowerCase();

            const rows = document.querySelectorAll(".records-table tbody tr");

            rows.forEach(row => {

                row.style.display = row.innerText.toLowerCase().includes(value)
                    ? ""
                    : "none";

            });

        });

    });

    /*==============================
        FILTER DROPDOWNS
    ==============================*/

    document.querySelectorAll("select").forEach(select => {

        select.addEventListener("change", () => {

            console.log("Filter:", select.value);

        });

    });

    /*==============================
        REFILL BUTTON
    ==============================*/

    document.querySelectorAll(".refill-btn").forEach(button => {

        button.addEventListener("click", () => {

            button.innerHTML = "✓ Request Sent";

            button.style.background = "#10b981";

        });

    });

    /*==============================
        UPLOAD BUTTON
    ==============================*/

    const uploadButton = document.querySelector(".upload-box button");

    if (uploadButton) {

        uploadButton.addEventListener("click", () => {

            alert("File Upload Window");

        });

    }

});
/*=========================================
        PREMIUM FEATURES
==========================================*/

/*============ Animated Counters ============*/

function animateCounter(element, target) {

    let count = 0;

    const speed = target / 80;

    const update = () => {

        count += speed;

        if (count < target) {

            element.innerHTML = Math.floor(count);

            requestAnimationFrame(update);

        }

        else {

            element.innerHTML = target;

        }

    }

    update();

}

window.addEventListener("load", () => {

    document.querySelectorAll(".overview-card h2").forEach(card => {

        const value = parseInt(card.innerText);

        if (!isNaN(value)) {

            card.innerHTML = "0";

            animateCounter(card, value);

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

/*============ Download ============*/

document.querySelectorAll(".download-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

showToast("Medical Record Download Started");

});

});

/*============ Share ============*/

document.querySelectorAll(".share-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

showToast("Record Shared Successfully");

});

});

/*============ Upload Button ============*/

const upload=document.querySelector(".upload-box button");

if(upload){

upload.onclick=()=>{

showToast("Upload Window Opened");

};

}

/*============ Refill ============*/

document.querySelectorAll(".refill-btn").forEach(btn=>{

btn.onclick=()=>{

btn.innerHTML="✓ Requested";

btn.style.background="#10b981";

showToast("Medicine Refill Requested");

};

});

/*============ Hero Buttons ============*/

document.querySelector(".primary-btn").onclick=()=>{

showToast("Upload New Medical Record");

};

document.querySelector(".secondary-btn").onclick=()=>{

showToast("Preparing PDF Download");

};

/*============ Card Hover Animation ============*/

document.querySelectorAll(".overview-card,.lab-card,.medicine-card,.analytics-card,.insight-card").forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-10px) scale(1.02)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0) scale(1)";

});

});

/*============ Drag & Drop Upload ============*/

const uploadBox=document.querySelector(".upload-box");

if(uploadBox){

uploadBox.addEventListener("dragover",(e)=>{

e.preventDefault();

uploadBox.style.borderColor="#10b981";

});

uploadBox.addEventListener("dragleave",()=>{

uploadBox.style.borderColor="#2563eb";

});

uploadBox.addEventListener("drop",(e)=>{

e.preventDefault();

uploadBox.style.borderColor="#2563eb";

showToast("File Uploaded Successfully");

});

}

/*============ Health Score Animation ============*/

document.querySelectorAll(".analytics-card h1").forEach(card=>{

card.style.opacity="0";

setTimeout(()=>{

card.style.transition=".8s";

card.style.opacity="1";

},300);

});

/*============ Auto Date ============*/

const today=new Date();

console.log("Today's Date :",today.toDateString());

/*============ Loading Effect ============*/

window.onload=()=>{

document.body.style.opacity="0";

setTimeout(()=>{

document.body.style.transition="1s";

document.body.style.opacity="1";

},100);

};

/*=========================================
        END
==========================================*/