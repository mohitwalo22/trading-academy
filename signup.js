import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC7vAXcLBd7f9rbTeo49p_Gf97CGUZ9_3M",
  authDomain: "trading-academy-39b6c.firebaseapp.com",
  projectId: "trading-academy-39b6c",
  storageBucket: "trading-academy-39b6c.firebasestorage.app",
  messagingSenderId: "722885461662",
  appId: "1:722885461662:web:69197ea422cfc2d7ed5d8f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const button = document.querySelector("button");

button.addEventListener("click", function () {
  const email = document.querySelector('input[type="email"]').value;
  const password = document.querySelectorAll('input[type="password"]')[0].value;
  const confirm = document.querySelectorAll('input[type="password"]')[1].value;

  if (password !== confirm) {
    alert("Passwords do not match!");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Account Created Successfully!");
      window.location.href = "login.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});
