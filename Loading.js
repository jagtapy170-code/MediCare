const progress = document.getElementById("progressBar");
const percent = document.getElementById("percent");
const text = document.getElementById("loadingText");

const messages = [
    "Initializing System...",
    "Loading Doctors...",
    "Loading Patients...",
    "Fetching Medical Records...",
    "Preparing Dashboard...",
    "Almost Ready..."
];

let value = 0;
let messageIndex = 0;

const loading = setInterval(() => {

    value++;

    progress.style.width = value + "%";
    percent.innerHTML = value + "%";

    if (value % 20 === 0 && messageIndex < messages.length) {
        text.innerHTML = messages[messageIndex];
        messageIndex++;
    }

    if (value >= 100) {

        clearInterval(loading);

        document.getElementById("loader").classList.add("fade-out");

        setTimeout(() => {

            window.location.href="../Medicare+/index.html";

        },1000);

    }

},40);