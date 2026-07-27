/*=========================================
        MEDICARE+ NOTIFICATIONS
==========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    initializeSearch();
    initializeReadButtons();
    initializeDeleteButtons();
    initializeClearButton();
    initializeQuickActions();
    updateCounter();

});

/*=========================================
        SEARCH
==========================================*/

function initializeSearch(){

    const input=document.querySelector(".search-box input");

    if(!input) return;

    input.addEventListener("keyup",()=>{

        const value=input.value.toLowerCase();

        document.querySelectorAll(".notification-card").forEach(card=>{

            const text=card.innerText.toLowerCase();

            card.style.display=text.includes(value)
            ?"flex":"none";

        });

    });

}

/*=========================================
        MARK AS READ
==========================================*/

function initializeReadButtons(){

    document.querySelectorAll(".read-btn").forEach(btn=>{

        btn.addEventListener("click",()=>{

            const card=btn.closest(".notification-card");

            card.style.opacity=".65";

            card.style.background="#f8fafc";

            btn.innerHTML='<i class="fa-solid fa-check-double"></i>';

            showToast("Notification Marked as Read");

            updateCounter();

        });

    });

}

/*=========================================
        DELETE
==========================================*/

function initializeDeleteButtons(){

    document.querySelectorAll(".delete-btn").forEach(btn=>{

        btn.addEventListener("click",()=>{

            btn.closest(".notification-card").remove();

            showToast("Notification Deleted");

            updateCounter();

        });

    });

}

/*=========================================
        CLEAR ALL
==========================================*/

function initializeClearButton(){

    const clear=document.querySelector(".clear-btn");

    if(!clear) return;

    clear.addEventListener("click",()=>{

        document.querySelectorAll(".notification-card").forEach(card=>{

            card.remove();

        });

        updateCounter();

        showToast("All Notifications Cleared");

    });

}

/*=========================================
        QUICK ACTIONS
==========================================*/

function initializeQuickActions(){

    document.querySelectorAll(".action-btn").forEach(button=>{

        button.addEventListener("click",()=>{

            const text=button.innerText.trim();

            switch(text){

                case "Mark All Read":

                    document.querySelectorAll(".notification-card").forEach(card=>{

                        card.style.opacity=".65";
                        card.style.background="#f8fafc";

                    });

                    showToast("All Notifications Marked Read");

                break;

                case "Delete Read":

                    document.querySelectorAll(".notification-card").forEach(card=>{

                        if(card.style.opacity==".65"){

                            card.remove();

                        }

                    });

                    updateCounter();

                    showToast("Read Notifications Deleted");

                break;

                case "Export Notifications":

                    exportNotifications();

                break;

                default:

                    showToast("Opening Notification Settings...");

            }

        });

    });

}

/*=========================================
        EXPORT
==========================================*/

function exportNotifications(){

    let text="Medicare+ Notification Report\n\n";

    document.querySelectorAll(".notification-card").forEach(card=>{

        text+=card.innerText+"\n\n";

    });

    const blob=new Blob([text],{type:"text/plain"});

    const a=document.createElement("a");

    a.href=URL.createObjectURL(blob);

    a.download="notifications.txt";

    a.click();

    showToast("Notifications Exported");

}

/*=========================================
        COUNTER
==========================================*/

function updateCounter(){

    const total=document.querySelectorAll(".notification-card").length;

    const number=document.querySelector(".notify-card h2");

    if(number){

        number.innerText=total;

    }

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