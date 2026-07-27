/*==================================================
        Medicare+
        Patient Login
        JavaScript
==================================================*/



// ==========================================
// PASSWORD SHOW / HIDE
// ==========================================


const showPassword =
document.getElementById("showPassword");


const passwordInput =
document.getElementById("password");



if(showPassword){


    showPassword.addEventListener(
    "click",
    ()=>{


        if(passwordInput.type === "password"){


            passwordInput.type="text";


            showPassword.classList.remove(
            "fa-eye"
            );


            showPassword.classList.add(
            "fa-eye-slash"
            );


        }


        else{


            passwordInput.type="password";


            showPassword.classList.remove(
            "fa-eye-slash"
            );


            showPassword.classList.add(
            "fa-eye"
            );


        }


    });


}








// ==========================================
// PATIENT LOGIN FORM
// ==========================================


const loginForm =
document.getElementById(
"patientLoginForm"
);



if(loginForm){



loginForm.addEventListener(
"submit",
async(e)=>{


    e.preventDefault();




    const email =
    document.getElementById(
    "email"
    ).value.trim();



    const password =
    document.getElementById(
    "password"
    ).value.trim();





    if(email===""){


        showMessage(
        "Please enter email address",
        "error"
        );


        return;


    }





    if(password===""){


        showMessage(
        "Please enter password",
        "error"
        );


        return;


    }






    const loginButton =
    document.querySelector(
    ".login-btn"
    );



    loginButton.innerHTML =

    `

    <i class="fa-solid fa-spinner fa-spin"></i>

    Logging in...

    `;



    loginButton.disabled=true;






    // Backend API Ready Function


    const response =
    await patientLoginAPI({

        email:email,

        password:password

    });







    if(response.success){



        localStorage.setItem(

            "patientLoggedIn",

            "true"

        );



        localStorage.setItem(

            "patientEmail",

            email

        );





        showMessage(

        "Login successful",

        "success"

        );




        setTimeout(()=>{


            window.location.href =
            "patient-dashboard.html";


        },1500);



    }



    else{


        showMessage(

        "Invalid email or password",

        "error"

        );



        loginButton.innerHTML =

        `

        Login

        <i class="fa-solid fa-arrow-right"></i>

        `;



        loginButton.disabled=false;


    }




});


}








// ==========================================
// LOGIN API FUNCTION
// BACKEND CONNECTION READY
// ==========================================



async function patientLoginAPI(data){



    /*


    Later replace this with:


    fetch(
    "http://localhost:5000/api/patient/login",
    {
        method:"POST",

        headers:{
            "Content-Type":
            "application/json"
        },

        body:
        JSON.stringify(data)

    })


    */





    console.log(
    "Patient Login Data:",
    data
    );





    // Temporary Demo Authentication


    if(

        data.email === 
        "patient@gmail.com"

        &&

        data.password ===
        "123456"

    ){


        return{

            success:true

        };


    }



    return{


        success:false


    };



}








// ==========================================
// MESSAGE SYSTEM
// ==========================================


function showMessage(
message,
type
){



    const old =
    document.querySelector(
    ".login-message"
    );



    if(old){

        old.remove();

    }






    const msg =
    document.createElement(
    "div"
    );



    msg.className =
    "login-message";



    msg.innerHTML = message;





    if(type==="success"){


        msg.style.background =
        "#10b981";


    }

    else{


        msg.style.background =
        "#ef4444";


    }





    document.body.appendChild(
    msg
    );





    setTimeout(()=>{


        msg.classList.add(
        "show"
        );


    },100);





    setTimeout(()=>{


        msg.remove();


    },3000);



}








// ==========================================
// REMEMBER ME
// ==========================================


const remember =
document.querySelector(
".options input"
);



if(remember){



remember.addEventListener(
"change",
()=>{


    if(remember.checked){


        localStorage.setItem(
        "rememberPatient",
        "true"
        );


    }


    else{


        localStorage.removeItem(
        "rememberPatient"
        );


    }



});


}







// Restore Email


if(
localStorage.getItem(
"rememberPatient"
)
){


const savedEmail =
localStorage.getItem(
"patientEmail"
);



if(savedEmail){


document.getElementById(
"email"
).value=savedEmail;


}


}






// ==========================================
// PAGE LOAD CHECK
// ==========================================


window.addEventListener(
"DOMContentLoaded",
()=>{


if(
localStorage.getItem(
"patientLoggedIn"
)
==="true"
){


console.log(
"Patient session active"
);


}



});








fetch("http://localhost:5000/api/auth/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    email: email,
    password: password
  })
})
.then(res => res.json())
.then(data => {
  console.log(data);
});