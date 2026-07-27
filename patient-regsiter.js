/*==================================
 Medicare+
 Patient Registration
==================================*/


const registerForm =
document.getElementById(
"registerForm"
);



if(registerForm){


registerForm.addEventListener(
"submit",
async(e)=>{


e.preventDefault();



let name =
document.getElementById(
"name"
).value;



let email =
document.getElementById(
"registerEmail"
).value;



let phone =
document.getElementById(
"phone"
).value;



let password =
document.getElementById(
"registerPassword"
).value;



let confirmPassword =
document.getElementById(
"confirmPassword"
).value;






if(password !== confirmPassword){


alert(
"Passwords do not match"
);


return;


}






let patientData={


name:name,

email:email,

phone:phone,

password:password


};






let result =
await registerPatientAPI(
patientData
);





if(result.success){



alert(
"Account created successfully!"
);



window.location.href =
"patient-login.html";



}

else{


alert(
"Registration failed"
);


}



});


}







// Backend Ready Function


async function registerPatientAPI(data){



console.log(
"Patient Registration:",
data
);



/*

Later connect:

fetch(
"http://localhost:5000/api/patient/register",
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:
JSON.stringify(data)

}

)

*/


return{


success:true


};



}