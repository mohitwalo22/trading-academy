const button = document.querySelector("button");

button.addEventListener("click", function(){

const name = document.querySelector('input[type="text"]').value;
const email = document.querySelector('input[type="email"]').value;

const password = document.querySelectorAll('input[type="password"]')[0].value;
const confirm = document.querySelectorAll('input[type="password"]')[1].value;

if(name==="" || email==="" || password===""){
alert("Please fill all fields.");
return;
}

if(password!==confirm){
alert("Passwords do not match.");
return;
}

alert("Account Created Successfully!");

});