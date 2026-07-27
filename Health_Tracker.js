/*=========================================
        MEDICARE+ HEALTH TRACKER
==========================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeSearch();
    initializeBMI();
    initializeCounters();
    initializeChart();
    initializeDevices();
    initializeButtons();

});

/*=========================================
        SEARCH
==========================================*/

function initializeSearch(){

    const input=document.querySelector(".search-box input");

    if(!input) return;

    input.addEventListener("keyup",()=>{

        const value=input.value.toLowerCase();

        document.querySelectorAll(".activity-card,.goal-card,.achievement-card").forEach(card=>{

            const text=card.innerText.toLowerCase();

            card.style.display=text.includes(value)
            ?"block":"none";

        });

    });

}

/*=========================================
        BMI CALCULATOR
==========================================*/

function initializeBMI(){

    const btn=document.getElementById("calculateBMI");

    if(!btn) return;

    btn.addEventListener("click",()=>{

        const height=parseFloat(document.getElementById("height").value);

        const weight=parseFloat(document.getElementById("weight").value);

        if(!height || !weight){

            showToast("Please enter Height & Weight");

            return;

        }

        const bmi=(weight/((height/100)*(height/100))).toFixed(1);

        let status="";

        if(bmi<18.5){

            status="Underweight";

        }else if(bmi<25){

            status="Normal";

        }else if(bmi<30){

            status="Overweight";

        }else{

            status="Obese";

        }

        document.getElementById("bmiResult").innerHTML=

        `Your BMI : <strong>${bmi}</strong> (${status})`;

        showToast("BMI Calculated Successfully");

    });

}

/*=========================================
        COUNTERS
==========================================*/

function initializeCounters(){

    document.querySelectorAll(".stat-card h2").forEach(counter=>{

        let text=counter.innerText;

        let number=parseInt(text.replace(/,/g,""));

        if(isNaN(number)) return;

        let current=0;

        let step=Math.ceil(number/80);

        let timer=setInterval(()=>{

            current+=step;

            if(current>=number){

                current=number;

                clearInterval(timer);

            }

            if(text.includes("BPM")){

                counter.innerText=current+" BPM";

            }

            else if(text.includes("L")){

                counter.innerText=(current/1000).toFixed(1)+" L";

            }

            else{

                counter.innerText=current.toLocaleString();

            }

        },20);

    });

}

/*=========================================
        CHART
==========================================*/

function initializeChart(){

    if(typeof Chart==="undefined") return;

    const canvas=document.getElementById("healthTrackerChart");

    if(!canvas) return;

    new Chart(canvas,{

        type:"line",

        data:{

            labels:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],

            datasets:[{

                label:"Health Score",

                data:[82,84,86,88,90,93,96],

                borderColor:"#2563eb",

                backgroundColor:"rgba(37,99,235,.15)",

                fill:true,

                tension:.4,

                pointRadius:5

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

                    beginAtZero:false,

                    min:70,

                    max:100

                }

            }

        }

    });

}

/*=========================================
        DEVICE CONNECTION
==========================================*/

function initializeDevices(){

    document.querySelectorAll(".device-card").forEach(card=>{

        card.addEventListener("click",()=>{

            const text=card.querySelector("p");

            if(text.innerText==="Connected"){

                text.innerText="Disconnected";

                showToast("Device Disconnected");

            }

            else{

                text.innerText="Connected";

                showToast("Device Connected");

            }

        });

    });

}

/*=========================================
        BUTTONS
==========================================*/

function initializeButtons(){

    document.querySelectorAll(".track-btn").forEach(btn=>{

        btn.addEventListener("click",()=>{

            showToast("Health Analysis Updated");

        });

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