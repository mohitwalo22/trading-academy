import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";


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

const db = getFirestore(app);


const adminEmail = "mohit891770@gmail.com";

const adminEmailText =
document.getElementById("adminEmail");

const logoutBtn =
document.getElementById("logoutBtn");

const courseForm =
document.getElementById("courseForm");

const courseMessage =
document.getElementById("courseMessage");


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


  adminEmailText.innerHTML =
  "📧 " + user.email;

});


courseForm.addEventListener("submit", async (e) => {

  e.preventDefault();


  const courseName =
  document.getElementById("courseName").value;

  const courseDescription =
  document.getElementById("courseDescription").value;

  const coursePrice =
  document.getElementById("coursePrice").value;


  try {

    await addDoc(collection(db, "courses"), {

      name: courseName,

      description: courseDescription,

      price: Number(coursePrice),

      createdAt: serverTimestamp()

    });


    courseMessage.innerHTML =
    "✅ Course Successfully Added!";


    courseForm.reset();


  } catch (error) {

    courseMessage.innerHTML =
    "❌ Error: " + error.message;

  }

});


logoutBtn.addEventListener("click", () => {

  signOut(auth).then(() => {

    window.location.href =
    "login.html";

  });

});
