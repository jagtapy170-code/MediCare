/*==================================================
        MEDICARE+ AI ASSISTANT
        JAVASCRIPT PART 1
CHAT • DARK MODE • VOICE • QUICK ACTIONS
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*========================================
            CHAT ELEMENTS
    ========================================*/

    const chatBox = document.querySelector(".chat-box");
    const input = document.querySelector(".chat-input input");
    const sendButton = document.querySelector(".chat-input button");

    /*========================================
            AI RESPONSES
    ========================================*/

    const aiResponses = {

        fever:
        "🤖 Fever may be caused by a viral or bacterial infection. Stay hydrated, monitor your temperature, and consult a doctor if it persists for more than 48 hours.",

        headache:
        "🤖 Headaches may occur due to stress, dehydration, migraine, or lack of sleep. Drink water and rest. Seek medical advice if severe.",

        cough:
        "🤖 A cough may result from allergies, viral infection, or cold. Warm fluids and rest are recommended.",

        diabetes:
        "🤖 Maintain a healthy diet, exercise regularly, and monitor your blood sugar as advised by your doctor.",

        bp:
        "🤖 Maintain a low-salt diet, regular exercise, stress management, and routine blood pressure monitoring.",

        default:
        "🤖 I'm still learning. Please consult a healthcare professional for medical advice."
    };

    /*========================================
            SEND MESSAGE
    ========================================*/

    function sendMessage() {

        const text = input.value.trim();

        if (text === "") return;

        const userMessage = document.createElement("div");

        userMessage.className = "message user";

        userMessage.innerHTML = `

            <div class="bubble user-bubble">

                ${text}

            </div>

            <div class="avatar">

                😊

            </div>

        `;

        chatBox.appendChild(userMessage);

        input.value = "";

        chatBox.scrollTop = chatBox.scrollHeight;

        setTimeout(() => {

            reply(text.toLowerCase());

        }, 800);

    }

    /*========================================
            AI REPLY
    ========================================*/

    function reply(question) {

        let answer = aiResponses.default;

        if (question.includes("fever"))
            answer = aiResponses.fever;

        else if (question.includes("headache"))
            answer = aiResponses.headache;

        else if (question.includes("cough"))
            answer = aiResponses.cough;

        else if (question.includes("diabetes"))
            answer = aiResponses.diabetes;

        else if (question.includes("bp") || question.includes("blood pressure"))
            answer = aiResponses.bp;

        const aiMessage = document.createElement("div");

        aiMessage.className = "message ai";

        aiMessage.innerHTML = `

            <div class="avatar">

                🤖

            </div>

            <div class="bubble">

                ${answer}

            </div>

        `;

        chatBox.appendChild(aiMessage);

        chatBox.scrollTop = chatBox.scrollHeight;

    }

    sendButton.addEventListener("click", sendMessage);

    input.addEventListener("keypress", function(e){

        if(e.key==="Enter"){

            sendMessage();

        }

    });

    /*========================================
            DARK MODE
    ========================================*/

    const themeToggle = document.getElementById("themeToggle");

    if(themeToggle){

        if(localStorage.getItem("theme")==="light"){

            document.body.classList.add("light");

            themeToggle.checked=true;

        }

        themeToggle.addEventListener("change",()=>{

            document.body.classList.toggle("light");

            localStorage.setItem(

                "theme",

                document.body.classList.contains("light")

                ? "light"

                : "dark"

            );

        });

    }

    /*========================================
            QUICK QUESTIONS
    ========================================*/

    document.querySelectorAll(".suggestion-btn").forEach(button=>{

        button.addEventListener("click",()=>{

            input.value=button.innerText;

            input.focus();

        });

    });

    /*========================================
            VOICE RECOGNITION
    ========================================*/

    const voiceButton=document.querySelector(".voice-btn");

    if(

        "webkitSpeechRecognition" in window ||

        "SpeechRecognition" in window

    ){

        const SpeechRecognition=window.SpeechRecognition||

        window.webkitSpeechRecognition;

        const recognition=new SpeechRecognition();

        recognition.lang="en-US";

        recognition.continuous=false;

        recognition.interimResults=false;

        voiceButton.addEventListener("click",()=>{

            recognition.start();

            voiceButton.innerHTML="🎙 Listening...";

        });

        recognition.onresult=(event)=>{

            input.value=event.results[0][0].transcript;

            voiceButton.innerHTML="🎤 Start Listening";

        };

        recognition.onend=()=>{

            voiceButton.innerHTML="🎤 Start Listening";

        };

    }

});
/*==================================================
        MEDICARE+ AI ASSISTANT
        JAVASCRIPT PART 2
CHARTS • UPLOAD • NOTIFICATIONS • SOS • ANIMATIONS
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*========================================
            HEART RATE CHART
    ========================================*/

    const heartCanvas = document.getElementById("heartChart");

    if (heartCanvas) {

        new Chart(heartCanvas, {

            type: "line",

            data: {

                labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],

                datasets: [{

                    label: "Heart Rate",

                    data: [74,76,75,78,77,76,74],

                    borderColor: "#3b82f6",

                    backgroundColor: "rgba(59,130,246,.15)",

                    fill: true,

                    tension: .4,

                    borderWidth: 3,

                    pointRadius: 4

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {

                        display: false

                    }

                },

                scales: {

                    x: {

                        ticks: {

                            color: "#9fb0c6"

                        }

                    },

                    y: {

                        ticks: {

                            color: "#9fb0c6"

                        }

                    }

                }

            }

        });

    }

    /*========================================
            HEALTH PROGRESS CHART
    ========================================*/

    const progressCanvas = document.getElementById("progressChart");

    if (progressCanvas) {

        new Chart(progressCanvas, {

            type: "bar",

            data: {

                labels: ["Sleep","Exercise","Water","Diet","Medication"],

                datasets: [{

                    data: [92,84,96,88,100],

                    backgroundColor: [

                        "#2563eb",

                        "#22c55e",

                        "#06b6d4",

                        "#f59e0b",

                        "#8b5cf6"

                    ],

                    borderRadius: 12

                }]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {

                        display: false

                    }

                },

                scales: {

                    x: {

                        ticks: {

                            color:"#9fb0c6"

                        }

                    },

                    y: {

                        beginAtZero:true,

                        max:100,

                        ticks:{

                            color:"#9fb0c6"

                        }

                    }

                }

            }

        });

    }

    /*========================================
            FILE UPLOAD
    ========================================*/

    const upload = document.getElementById("reportUpload");

    if(upload){

        upload.addEventListener("change",function(){

            if(this.files.length>0){

                alert("📄 Uploaded: " + this.files[0].name);

            }

        });

    }

    /*========================================
            BOOK APPOINTMENT
    ========================================*/

    document.querySelectorAll(".doctor-card .action-btn").forEach(button=>{

        button.addEventListener("click",()=>{

            button.innerHTML="✔ Appointment Requested";

            button.style.background="#22c55e";

        });

    });

    /*========================================
            APPOINTMENT VIEW
    ========================================*/

    document.querySelectorAll(".appointment-card .action-btn").forEach(button=>{

        button.addEventListener("click",()=>{

            alert("Opening appointment details...");

        });

    });

    /*========================================
            EMERGENCY BUTTON
    ========================================*/

    const sos=document.querySelector(".sos-btn");

    if(sos){

        sos.addEventListener("click",()=>{

            const confirmSOS=confirm(

                "Are you sure you want to contact emergency services?"

            );

            if(confirmSOS){

                alert("🚑 Emergency request sent successfully.");

            }

        });

    }

    /*========================================
            SUPPORT BUTTON
    ========================================*/

    const support=document.querySelector(".support-card .action-btn");

    if(support){

        support.addEventListener("click",()=>{

            alert("Healthcare Support is available 24/7.");

        });

    }

    /*========================================
            TYPING EFFECT
    ========================================*/

    const hero=document.querySelector(".hero h2");

    if(hero){

        const text=hero.innerText;

        hero.innerHTML="";

        let i=0;

        function typing(){

            if(i<text.length){

                hero.innerHTML+=text.charAt(i);

                i++;

                setTimeout(typing,60);

            }

        }

        typing();

    }

    /*========================================
            CARD HOVER ANIMATION
    ========================================*/

    document.querySelectorAll(

        ".action-card,.summary-card,.doctor-card,.prediction-card,.hospital-card"

    ).forEach(card=>{

        card.addEventListener("mouseenter",()=>{

            card.style.transform="translateY(-10px) scale(1.02)";

        });

        card.addEventListener("mouseleave",()=>{

            card.style.transform="translateY(0) scale(1)";

        });

    });

    /*========================================
            WELCOME NOTIFICATION
    ========================================*/

    setTimeout(()=>{

        alert("👋 Welcome to Medicare+ AI Assistant!");

    },1000);

});
/*==================================================
        MEDICARE+ AI ASSISTANT
        JAVASCRIPT PART 3 (FINAL)
LOCAL STORAGE • LOADER • SCROLL • CLOCK
NOTIFICATIONS • PREMIUM FEATURES
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*========================================
            SAVE CHAT HISTORY
    ========================================*/

    const chatBox = document.querySelector(".chat-box");

    function saveChat() {

        if(chatBox){

            localStorage.setItem(

                "medicare_chat",

                chatBox.innerHTML

            );

        }

    }

    function loadChat() {

        const history = localStorage.getItem("medicare_chat");

        if(history && chatBox){

            chatBox.innerHTML = history;

        }

    }

    loadChat();

    document.addEventListener("click", () => {

        saveChat();

    });

    /*========================================
            LIVE DATE & TIME
    ========================================*/

    const topbar = document.querySelector(".topbar");

    if(topbar){

        const clock = document.createElement("div");

        clock.className = "live-clock";

        clock.style.fontSize = "15px";
        clock.style.fontWeight = "600";
        clock.style.color = "#60a5fa";

        topbar.appendChild(clock);

        function updateClock(){

            const now = new Date();

            clock.innerHTML = now.toLocaleString();

        }

        updateClock();

        setInterval(updateClock,1000);

    }

    /*========================================
            AI TYPING INDICATOR
    ========================================*/

    function typingIndicator(){

        if(!chatBox) return;

        const typing = document.createElement("div");

        typing.className="message ai";

        typing.id="typing";

        typing.innerHTML=`

            <div class="avatar">

                🤖

            </div>

            <div class="bubble">

                AI is typing...

            </div>

        `;

        chatBox.appendChild(typing);

        chatBox.scrollTop=chatBox.scrollHeight;

        setTimeout(()=>{

            typing.remove();

        },1500);

    }

    document.querySelector(".chat-input button")?.addEventListener("click",typingIndicator);

    /*========================================
            NOTIFICATION BADGE
    ========================================*/

    const bell=document.querySelector(".top-icons button:first-child");

    if(bell){

        const badge=document.createElement("span");

        badge.innerHTML="3";

        badge.style.position="absolute";
        badge.style.top="-6px";
        badge.style.right="-4px";
        badge.style.width="20px";
        badge.style.height="20px";
        badge.style.borderRadius="50%";
        badge.style.background="#ef4444";
        badge.style.color="#fff";
        badge.style.display="flex";
        badge.style.alignItems="center";
        badge.style.justifyContent="center";
        badge.style.fontSize="11px";

        bell.style.position="relative";

        bell.appendChild(badge);

    }

    /*========================================
            SCROLL TO TOP BUTTON
    ========================================*/

    const topButton=document.createElement("button");

    topButton.innerHTML='<i class="fas fa-arrow-up"></i>';

    topButton.style.position="fixed";
    topButton.style.right="30px";
    topButton.style.bottom="30px";
    topButton.style.width="55px";
    topButton.style.height="55px";
    topButton.style.borderRadius="50%";
    topButton.style.border="none";
    topButton.style.background="#2563eb";
    topButton.style.color="white";
    topButton.style.cursor="pointer";
    topButton.style.display="none";
    topButton.style.zIndex="999";

    document.body.appendChild(topButton);

    window.addEventListener("scroll",()=>{

        if(window.scrollY>300){

            topButton.style.display="block";

        }else{

            topButton.style.display="none";

        }

    });

    topButton.addEventListener("click",()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

    /*========================================
            LOADING EFFECT
    ========================================*/

    document.body.style.opacity="0";

    window.addEventListener("load",()=>{

        document.body.style.transition="opacity .7s";

        document.body.style.opacity="1";

    });

    /*========================================
            AUTO HEALTH REMINDER
    ========================================*/

    setInterval(()=>{

        console.log("💧 Drink Water Reminder");

    },60000);

    /*========================================
            RANDOM HEALTH TIP
    ========================================*/

    const tips=[

        "🥗 Eat more vegetables today.",

        "🚶 Walk for at least 30 minutes.",

        "💧 Drink enough water.",

        "😴 Sleep 7-8 hours.",

        "🧘 Practice meditation for 10 minutes.",

        "🍎 Eat fresh fruits daily."

    ];

    const heroText=document.querySelector(".hero p");

    if(heroText){

        setInterval(()=>{

            const random=Math.floor(Math.random()*tips.length);

            heroText.innerHTML=tips[random];

        },7000);

    }

    /*========================================
            FADE-IN ANIMATION
    ========================================*/

    const sections=document.querySelectorAll("section");

    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.style.opacity="1";

                entry.target.style.transform="translateY(0)";

            }

        });

    });

    sections.forEach(section=>{

        section.style.opacity="0";

        section.style.transform="translateY(40px)";

        section.style.transition=".8s";

        observer.observe(section);

    });

    console.log("✅ Medicare+ AI Assistant Loaded Successfully");

});