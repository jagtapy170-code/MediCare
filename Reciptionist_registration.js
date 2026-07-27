/*==================================================
        Medicare+
        Receptionist Registration
==================================================*/


// ======================================
// PASSWORD SHOW / HIDE
// ======================================

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const togglePassword = document.getElementById("togglePassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

if(togglePassword){

togglePassword.addEventListener("click",()=>{

if(password.type==="password"){

password.type="text";

togglePassword.classList.replace("fa-eye","fa-eye-slash");

}else{

password.type="password";

togglePassword.classList.replace("fa-eye-slash","fa-eye");

}

});

}


if(toggleConfirmPassword){

toggleConfirmPassword.addEventListener("click",()=>{

if(confirmPassword.type==="password"){

confirmPassword.type="text";

toggleConfirmPassword.classList.replace("fa-eye","fa-eye-slash");

}else{

confirmPassword.type="password";

toggleConfirmPassword.classList.replace("fa-eye-slash","fa-eye");

}

});

}



// ======================================
// PASSWORD STRENGTH
// ======================================

password.addEventListener("input",()=>{

const value=password.value;

if(value.length<6){

password.style.borderColor="#dc2626";

}

else if(value.length<10){

password.style.borderColor="#f59e0b";

}

else{

password.style.borderColor="#16a34a";

}

});




// ======================================
// REGISTER FORM
// ======================================

const form=document.getElementById("receptionRegisterForm");

form.addEventListener("submit",async(e)=>{

e.preventDefault();

const firstName=document.getElementById("firstName").value.trim();

const lastName=document.getElementById("lastName").value.trim();

const email=document.getElementById("email").value.trim();

const mobile=document.getElementById("mobile").value.trim();

const employeeId=document.getElementById("employeeId").value.trim();

const branch=document.getElementById("branch").value.trim();

const shift=document.getElementById("shift").value;

const terms=document.getElementById("terms").checked;


// Validation

if(firstName===""){

showToast("Enter First Name","error");

return;

}

if(lastName===""){

showToast("Enter Last Name","error");

return;

}

if(email===""){

showToast("Enter Email","error");

return;

}

if(mobile.length<10){

showToast("Invalid Mobile Number","error");

return;

}

if(employeeId===""){

showToast("Enter Employee ID","error");

return;

}

if(branch===""){

showToast("Enter Hospital Branch","error");

return;

}

if(shift===""){

showToast("Select Shift","error");

return;

}

if(password.value.length<8){

showToast("Password must be at least 8 characters","error");

return;

}

if(password.value!==confirmPassword.value){

showToast("Passwords do not match","error");

return;

}

if(!terms){

showToast("Accept Terms & Conditions","error");

return;

}


// Loading Button

const button=document.querySelector(".register-btn");

button.disabled=true;

button.innerHTML=`
<i class="fa-solid fa-spinner fa-spin"></i>
Creating Account...
`;


// Backend Ready Function

const result=await registerReceptionist({

firstName,

lastName,

email,

mobile,

employeeId,

branch,

shift,

password:password.value

});


if(result.success){

showToast("Registration Successful","success");

setTimeout(()=>{

window.location.href="receptionist-login.html";

},1800);

}

else{

showToast(result.message,"error");

button.disabled=false;

button.innerHTML=`
Create Account
<i class="fa-solid fa-arrow-right"></i>
`;

}

});




// ======================================
// BACKEND READY
// ======================================

async function registerReceptionist(data){

/*

Replace with your backend later

const response=await fetch(

"http://localhost:5000/api/reception/register",

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


console.log("Reception Registration");

console.table(data);


// Demo Success

return{

success:true,

message:"Registered"

};

}




// ======================================
// TOAST
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
// GOOGLE BUTTON
// ======================================

const googleBtn=document.querySelector(".google-btn");

if(googleBtn){

googleBtn.addEventListener("click",()=>{

showToast("Google Registration Coming Soon","success");

});

}



// ======================================
// READY
// ======================================

console.log("Receptionist Registration Ready");