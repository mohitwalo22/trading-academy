const button = document.querySelector("button");

button.addEventListener("click", function () {

    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    if(email === "" || password === ""){
        alert("Please enter your email and password.");
    }else{
        alert("Login Successful!");
    }

});