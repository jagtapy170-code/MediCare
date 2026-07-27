/*==================================================
        Medicare+
        Receptionist Login
==================================================*/


// ======================================
// PASSWORD SHOW / HIDE
// ======================================

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

if(togglePassword && passwordInput){

    togglePassword.addEventListener("click",()=>{

        if(passwordInput.type==="password"){

            passwordInput.type="text";

            togglePassword.classList.remove("fa-eye");
            togglePassword.classList.add("fa-eye-slash");

        }

        else{

            passwordInput.type="password";

            togglePassword.classList.remove("fa-eye-slash");
            togglePassword.classList.add("fa-eye");

        }

    });

}



// ======================================
// LOGIN FORM
// ======================================

const loginForm=document.getElementById("receptionLoginForm");

if(loginForm){

loginForm.addEventListener("submit",async(e)=>{

e.preventDefault();

const email=document.getElementById("email").value.trim();

const password=document.getElementById("password").value.trim();

if(email===""){

showToast("Please enter Receptionist Email","error");

return;

}

if(password===""){

showToast("Please enter Password","error");

return;

}

const button=document.querySelector(".login-btn");

button.disabled=true;

button.innerHTML=`
<i class="fa-solid fa-spinner fa-spin"></i>
Logging In...
`;

const result=await receptionistLogin({

email,

password

});

if(result.success){

localStorage.setItem("receptionLoggedIn","true");

localStorage.setItem("receptionEmail",email);

showToast("Login Successful","success");

setTimeout(()=>{

window.location.href="receptionist-dashboard.html";

},1500);

}

else{

showToast("Invalid Email or Password","error");

button.disabled=false;

button.innerHTML=`
Login
<i class="fa-solid fa-arrow-right"></i>
`;

}

});

}



// ======================================
// BACKEND READY FUNCTION
// ======================================

async function receptionistLogin(data){

/*

Replace later with your backend

const response=await fetch(

"http://localhost:5000/api/reception/login",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(data)

}

);

return await response.json();

*/

console.log("Reception Login",data);


// Demo Credentials

if(

data.email==="reception@medicare.com"

&&

data.password==="reception123"

){

return{

success:true

};

}

return{

success:false

};

}



// ======================================
// REMEMBER ME
// ======================================

const remember=document.querySelector(".options input");

if(remember){

remember.addEventListener("change",()=>{

if(remember.checked){

localStorage.setItem(

"rememberReception",

"true"

);

}

else{

localStorage.removeItem(

"rememberReception"

);

}

});

}



if(localStorage.getItem("rememberReception")){

const savedEmail=

localStorage.getItem(

"receptionEmail"

);

if(savedEmail){

document.getElementById("email").value=savedEmail;

}

}



// ======================================
// TOAST MESSAGE
// ======================================

function showToast(message,type){

const old=document.querySelector(".toast");

if(old){

old.remove();

}

const toast=document.createElement("div");

toast.className=`toast ${type}`;

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



// ======================================
// SESSION CHECK
// ======================================

window.addEventListener("DOMContentLoaded",()=>{

if(localStorage.getItem("receptionLoggedIn")==="true"){

console.log("Receptionist Session Active");

}

});



// ======================================
// READY
// ======================================

console.log("Medicare+ Receptionist Login Ready");