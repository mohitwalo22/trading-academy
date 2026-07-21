import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

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

const adminEmail = "mohit891770@gmail.com";
const adminEmailText = document.getElementById("adminEmail");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  if (user.email !== adminEmail) {
    alert("Access Denied! Admin Only.");
    window.location.href = "dashboard.html";
    return;
  }

  adminEmailText.innerHTML = "📧 " + user.email;
});

logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
});
