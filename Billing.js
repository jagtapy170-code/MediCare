/*=========================================
        MEDICARE+ BILLING
==========================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeSearch();
    initializeCounters();
    initializeButtons();
    initializeChart();
    initializePayment();
    initializeMethods();

});

/*=========================================
        SEARCH
==========================================*/

function initializeSearch(){

    const input=document.querySelector(".search-box input");

    if(!input) return;

    input.addEventListener("keyup",()=>{

        const value=input.value.toLowerCase();

        document.querySelectorAll(".invoice-card").forEach(card=>{

            const text=card.innerText.toLowerCase();

            card.style.display=text.includes(value)
            ?"block":"none";

        });

    });

}

/*=========================================
        COUNTER
==========================================*/

function initializeCounters(){

    document.querySelectorAll(".stat-card h2").forEach(counter=>{

        let original=counter.innerText;

        let target=parseInt(original);

        if(isNaN(target)) return;

        let current=0;

        let timer=setInterval(()=>{

            current++;

            counter.innerText=current+(original.includes("%")?"%":"");

            if(current>=target){

                clearInterval(timer);

            }

        },25);

    });

}

/*=========================================
        BUTTONS
==========================================*/

function initializeButtons(){

    document.querySelectorAll(".buttons button").forEach(button=>{

        button.addEventListener("click",()=>{

            showToast(button.innerText+" successful");

        });

    });

}

/*=========================================
        PAYMENT BUTTON
==========================================*/

function initializePayment(){

    const pay=document.querySelector(".pay-btn");

    if(!pay) return;

    pay.addEventListener("click",()=>{

        showToast("Redirecting to Payment Gateway...");

    });

}

/*=========================================
        PAYMENT METHODS
==========================================*/

function initializeMethods(){

    document.querySelectorAll(".method-card").forEach(card=>{

        card.addEventListener("click",()=>{

            showToast(card.querySelector("h3").innerText+" Selected");

        });

    });

}

/*=========================================
        CHART
==========================================*/

function initializeChart(){

    if(typeof Chart==="undefined") return;

    const canvas=document.getElementById("expenseChart");

    if(!canvas) return;

    new Chart(canvas,{

        type:"bar",

        data:{

            labels:[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun"
            ],

            datasets:[{

                label:"Expenses",

                data:[
                    12000,
                    9000,
                    15000,
                    8000,
                    17000,
                    13000
                ],

                backgroundColor:[
                    "#2563eb",
                    "#3b82f6",
                    "#60a5fa",
                    "#93c5fd",
                    "#1d4ed8",
                    "#06b6d4"
                ],

                borderRadius:10

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            plugins:{

                legend:{
                    display:false
                }

            },

            scales:{

                y:{

                    beginAtZero:true

                }

            }

        }

    });

}

/*=========================================
        TOAST
==========================================*/

function showToast(message){

    let toast=document.createElement("div");

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