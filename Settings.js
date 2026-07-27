/*=========================================
        MEDICARE+ SETTINGS
==========================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeSearch();
    initializeSave();
    initializeThemeButtons();
    initializeUploadPhoto();
    initializeDownload();
    initializeLogout();
    initializeDelete();
    initializeToggleSwitches();

});

/*=========================================
        SEARCH SETTINGS
==========================================*/

function initializeSearch(){

    const input=document.querySelector(".search-box input");

    if(!input) return;

    input.addEventListener("keyup",()=>{

        const value=input.value.toLowerCase();

        document.querySelectorAll(".section-header").forEach(section=>{

            const parent=section.parentElement;

            if(parent.innerText.toLowerCase().includes(value)){

                parent.style.display="block";

            }

            else{

                parent.style.display="none";

            }

        });

    });

}

/*=========================================
        SAVE SETTINGS
==========================================*/

function initializeSave(){

    const btn=document.querySelector(".save-btn");

    if(!btn) return;

    btn.addEventListener("click",()=>{

        showToast("Settings Saved Successfully");

    });

}

/*=========================================
        THEME BUTTONS
==========================================*/

function initializeThemeButtons(){

    const buttons=document.querySelectorAll(".theme-btn");

    buttons.forEach(btn=>{

        btn.addEventListener("click",()=>{

            buttons.forEach(b=>b.classList.remove("active-theme"));

            btn.classList.add("active-theme");

            const theme=btn.innerText.toLowerCase();

            if(theme.includes("dark")){

                document.body.style.background="#0f172a";
                document.body.style.color="#ffffff";

            }

            else if(theme.includes("green")){

                document.body.style.background="#ecfdf5";

            }

            else if(theme.includes("blue")){

                document.body.style.background="#eff6ff";

            }

            else{

                document.body.style.background="#f4f8fc";
                document.body.style.color="#1e293b";

            }

            showToast("Theme Updated");

        });

    });

}

/*=========================================
        PROFILE PHOTO
==========================================*/

function initializeUploadPhoto(){

    const upload=document.querySelector(".profile-card button");

    if(!upload) return;

    upload.addEventListener("click",()=>{

        const input=document.createElement("input");

        input.type="file";

        input.accept="image/*";

        input.click();

        input.onchange=()=>{

            const file=input.files[0];

            if(file){

                const reader=new FileReader();

                reader.onload=(e)=>{

                    document.querySelector(".profile-card img").src=e.target.result;

                };

                reader.readAsDataURL(file);

                showToast("Profile Photo Updated");

            }

        };

    });

}

/*=========================================
        DOWNLOAD DATA
==========================================*/

function initializeDownload(){

    const btn=document.querySelector(".download-btn");

    if(!btn) return;

    btn.addEventListener("click",()=>{

        const text="Patient Medical Data\n\nGenerated from Medicare+";

        const blob=new Blob([text],{type:"text/plain"});

        const link=document.createElement("a");

        link.href=URL.createObjectURL(blob);

        link.download="MedicalData.txt";

        link.click();

        showToast("Medical Data Downloaded");

    });

}

/*=========================================
        LOGOUT
==========================================*/

function initializeLogout(){

    const btn=document.querySelector(".logout-btn");

    if(!btn) return;

    btn.addEventListener("click",()=>{

        if(confirm("Are you sure you want to logout?")){

            showToast("Logged Out");

            setTimeout(()=>{

                window.location.href="login.html";

            },1500);

        }

    });

}

/*=========================================
        DELETE ACCOUNT
==========================================*/

function initializeDelete(){

    const btn=document.querySelector(".delete-btn");

    if(!btn) return;

    btn.addEventListener("click",()=>{

        if(confirm("Delete your Medicare+ account permanently?")){

            showToast("Account Deleted");

        }

    });

}

/*=========================================
        TOGGLE SWITCHES
==========================================*/

function initializeToggleSwitches(){

    document.querySelectorAll(".switch input").forEach(toggle=>{

        toggle.addEventListener("change",()=>{

            if(toggle.checked){

                showToast("Enabled");

            }

            else{

                showToast("Disabled");

            }

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