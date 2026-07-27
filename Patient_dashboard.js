/*=====================================================
        MEDICARE+ PATIENT DASHBOARD
        JAVASCRIPT PART 1
======================================================*/

document.addEventListener("DOMContentLoaded", function () {

    /*========================================
            DARK MODE
    ========================================*/

    const moonBtn = document.querySelector(".top-actions button:nth-child(3)");

    if (moonBtn) {

        moonBtn.addEventListener("click", () => {

            document.body.classList.toggle("light");

            if (document.body.classList.contains("light")) {

                moonBtn.innerHTML = '<i class="fas fa-sun"></i>';

            } else {

                moonBtn.innerHTML = '<i class="fas fa-moon"></i>';

            }

        });

    }

    /*========================================
            SCROLL TO TOP
    ========================================*/

    const scrollBtn = document.getElementById("scrollTop");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            scrollBtn.style.display = "flex";

        } else {

            scrollBtn.style.display = "none";

        }

    });

    scrollBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

    /*========================================
            FLOATING AI BUTTON
    ========================================*/

    const aiButton = document.querySelector(".ai-float");

    aiButton.addEventListener("click", () => {

        alert("🤖 AI Health Assistant\n\nComing Soon!\n\nFuture Features:\n• Symptom Analysis\n• Medicine Suggestions\n• AI Health Prediction\n• Chat with AI Doctor");

    });

    /*========================================
            SEARCH
    ========================================*/

    const search = document.querySelector(".search-box input");

    search.addEventListener("keyup", function () {

        let value = search.value.toLowerCase();

        let cards = document.querySelectorAll(

            ".overview-card,.doctor-card,.medicine-card,.community-card"

        );

        cards.forEach(card => {

            if (card.innerText.toLowerCase().includes(value)) {

                card.style.display = "";

            }

            else {

                card.style.display = "none";

            }

        });

    });

    /*========================================
            BUTTON EFFECT
    ========================================*/

    document.querySelectorAll(".primary-btn").forEach(button => {

        button.addEventListener("mouseenter", () => {

            button.style.transform = "scale(1.05)";

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform = "scale(1)";

        });

    });

});
/*=====================================================
        MEDICARE+ PATIENT DASHBOARD
        JAVASCRIPT PART 2
        CHART • COUNTERS • PROGRESS • NOTIFICATIONS
======================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*========================================
            HEALTH CHART
    ========================================*/

    const chartCanvas = document.getElementById("healthChart");

    if (chartCanvas) {

        new Chart(chartCanvas, {

            type: "line",

            data: {

                labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],

                datasets: [{

                    label: "Health Score",

                    data: [78,82,84,86,90,92,94],

                    borderColor: "#3b82f6",

                    backgroundColor: "rgba(59,130,246,.15)",

                    fill: true,

                    borderWidth: 3,

                    tension: .4,

                    pointRadius: 5,

                    pointBackgroundColor:"#3b82f6"

                }]

            },

            options: {

                responsive:true,

                maintainAspectRatio:false,

                plugins:{

                    legend:{

                        display:false

                    }

                },

                scales:{

                    y:{

                        min:70,

                        max:100,

                        grid:{

                            color:"rgba(255,255,255,.08)"

                        },

                        ticks:{

                            color:"#9fb0c6"

                        }

                    },

                    x:{

                        grid:{

                            display:false

                        },

                        ticks:{

                            color:"#9fb0c6"

                        }

                    }

                }

            }

        });

    }

    /*========================================
            COUNT UP ANIMATION
    ========================================*/

    document.querySelectorAll(".health-score h1,.score-box h1").forEach(counter=>{

        let target=parseInt(counter.innerText);

        if(isNaN(target)) return;

        let value=0;

        let speed=Math.max(10,Math.floor(1500/target));

        let interval=setInterval(()=>{

            value++;

            counter.innerHTML=value+"%";

            if(value>=target){

                clearInterval(interval);

            }

        },speed);

    });

    /*========================================
            PROGRESS ANIMATION
    ========================================*/

    document.querySelectorAll("progress").forEach(bar=>{

        let finalValue=bar.value;

        bar.value=0;

        let progress=0;

        let animate=setInterval(()=>{

            progress++;

            bar.value=progress;

            if(progress>=finalValue){

                clearInterval(animate);

            }

        },15);

    });

    /*========================================
            NOTIFICATION BADGE
    ========================================*/

    const bell=document.querySelector(".top-actions button:first-child");

    if(bell){

        const badge=document.createElement("span");

        badge.innerText="3";

        badge.style.position="absolute";
        badge.style.marginLeft="28px";
        badge.style.marginTop="-18px";
        badge.style.background="#ef4444";
        badge.style.color="#fff";
        badge.style.width="18px";
        badge.style.height="18px";
        badge.style.borderRadius="50%";
        badge.style.display="flex";
        badge.style.alignItems="center";
        badge.style.justifyContent="center";
        badge.style.fontSize="11px";

        bell.style.position="relative";

        bell.appendChild(badge);

    }

    /*========================================
            LIVE DATE
    ========================================*/

    const hero=document.querySelector(".hero-content");

    if(hero){

        const date=document.createElement("p");

        date.style.marginTop="15px";

        date.style.color="#60a5fa";

        const today=new Date();

        date.innerHTML="<strong>Today:</strong> "+today.toDateString();

        hero.appendChild(date);

    }

    /*========================================
            MEDICINE REMINDER
    ========================================*/

    setTimeout(()=>{

        alert("💊 Reminder\n\nDon't forget to take Vitamin D3 at 1:30 PM.");

    },5000);

});
/*=====================================================
        MEDICARE+ PATIENT DASHBOARD
        JAVASCRIPT PART 3
        FINAL FEATURES
======================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==============================
        SAVE DARK MODE
==============================*/

    const themeButton = document.querySelector(".top-actions button:nth-child(3)");

    if(localStorage.getItem("theme") === "light"){
        document.body.classList.add("light");
        if(themeButton){
            themeButton.innerHTML='<i class="fas fa-sun"></i>';
        }
    }

    if(themeButton){
        themeButton.addEventListener("click",()=>{

            if(document.body.classList.contains("light")){
                localStorage.setItem("theme","light");
            }else{
                localStorage.setItem("theme","dark");
            }

        });
    }

    /*==============================
        FADE IN ON SCROLL
==============================*/

    const cards=document.querySelectorAll(
        ".overview-card,.progress-card,.doctor-card,.medicine-card,.hospital-card,.achievement-card,.goal-card,.device-card,.community-card,.timeline-item,.appointment-item"
    );

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.style.opacity="1";
                entry.target.style.transform="translateY(0)";
                observer.unobserve(entry.target);

            }

        });

    },{

        threshold:.15

    });

    cards.forEach(card=>{

        card.style.opacity="0";
        card.style.transform="translateY(50px)";
        card.style.transition="all .8s ease";

        observer.observe(card);

    });

    /*==============================
        EMERGENCY BUTTON
==============================*/

    const sos=document.querySelector(".sos-btn");

    if(sos){

        sos.addEventListener("click",()=>{

            if(confirm("🚑 Do you want to contact Emergency Services?")){

                alert("Emergency request has been sent successfully.");

            }

        });

    }

    /*==============================
        COMMUNITY BUTTONS
==============================*/

    document.querySelectorAll(".community-card button").forEach(button=>{

        button.addEventListener("click",()=>{

            button.innerHTML="Joined ✓";
            button.style.background="#22c55e";

        });

    });

    /*==============================
        BOOK APPOINTMENT
==============================*/

    document.querySelectorAll(".doctor-card .primary-btn").forEach(button=>{

        button.addEventListener("click",()=>{

            alert("Appointment request submitted successfully.");

        });

    });

    /*==============================
        DOWNLOAD REPORT
==============================*/

    document.querySelectorAll(".table-btn").forEach(button=>{

        button.addEventListener("click",()=>{

            alert("Report download started.");

        });

    });

    /*==============================
        RIPPLE EFFECT
==============================*/

    document.querySelectorAll("button").forEach(button=>{

        button.addEventListener("click",function(e){

            const circle=document.createElement("span");

            const diameter=Math.max(this.clientWidth,this.clientHeight);

            circle.style.width=diameter+"px";
            circle.style.height=diameter+"px";
            circle.style.left=e.offsetX-diameter/2+"px";
            circle.style.top=e.offsetY-diameter/2+"px";

            circle.style.position="absolute";
            circle.style.borderRadius="50%";
            circle.style.background="rgba(255,255,255,.4)";
            circle.style.transform="scale(0)";
            circle.style.animation="ripple .6s linear";

            this.style.position="relative";
            this.style.overflow="hidden";

            this.appendChild(circle);

            setTimeout(()=>{
                circle.remove();
            },600);

        });

    });

    /*==============================
        LOADER
==============================*/

    window.addEventListener("load",()=>{

        document.body.style.opacity="0";

        setTimeout(()=>{

            document.body.style.transition="opacity .7s";
            document.body.style.opacity="1";

        },200);

    });

});

/*==============================
        RIPPLE ANIMATION
==============================*/

const style=document.createElement("style");

style.innerHTML=`

@keyframes ripple{

from{

transform:scale(0);

opacity:1;

}

to{

transform:scale(4);

opacity:0;

}

}

`;

document.head.appendChild(style);