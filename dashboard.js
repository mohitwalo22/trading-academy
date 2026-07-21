import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
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


const userEmail =
document.getElementById("userEmail");

const logoutBtn =
document.getElementById("logoutBtn");

const myCourses =
document.getElementById("myCourses");


onAuthStateChanged(auth, async (user) => {

  if (!user) {

    window.location.href =
    "login.html";

    return;
  }


  userEmail.innerHTML =
  "📧 " + user.email;


  loadMyCourses(user.uid);

});


async function loadMyCourses(userId) {

  try {

    const coursesQuery =
    query(

      collection(db, "enrollments"),

      where("userId", "==", userId)

    );


    const querySnapshot =
    await getDocs(coursesQuery);


    myCourses.innerHTML = "";


    if (querySnapshot.empty) {

      myCourses.innerHTML =
      "<p>📚 No course purchased yet.</p>";

      return;

    }


    querySnapshot.forEach((doc) => {

      const course =
      doc.data();


      const courseCard =
      document.createElement("div");


      courseCard.className =
      "course-card";


      courseCard.innerHTML = `

  <h3>📚 ${course.courseName}</h3>

  <p>${course.description}</p>

  <button class="start-learning-btn">
  🎓 Start Learning
  </button>

`;

      const startLearningBtn =
courseCard.querySelector(".start-learning-btn");

startLearningBtn.addEventListener("click", () => {

  window.location.href =
  "learn-course.html?id=" + course.courseId;

});

      myCourses.appendChild(courseCard);

    });

  }

  catch (error) {

    myCourses.innerHTML =
    "❌ Error loading courses.";

    console.error(error);

  }

}


logoutBtn.addEventListener("click", () => {

  signOut(auth).then(() => {

    alert("Logged Out Successfully");

    window.location.href =
    "login.html";

  });

});
