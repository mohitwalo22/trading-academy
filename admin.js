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
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
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

const adminEmailText = document.getElementById("adminEmail");
const logoutBtn = document.getElementById("logoutBtn");

const courseForm = document.getElementById("courseForm");
const courseMessage = document.getElementById("courseMessage");

const adminCoursesList =
document.getElementById("adminCoursesList");


// ADMIN SECURITY

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

  loadCourses();

});


// ADD COURSE

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

    loadCourses();

  }

  catch (error) {

    courseMessage.innerHTML =
    "❌ Error: " + error.message;

  }

});


// LOAD COURSES

async function loadCourses() {

  adminCoursesList.innerHTML =
  "<p>Loading courses...</p>";

  const querySnapshot =
  await getDocs(collection(db, "courses"));

  adminCoursesList.innerHTML = "";


  querySnapshot.forEach((courseDoc) => {

    const course =
    courseDoc.data();

    const courseBox =
    document.createElement("div");

    courseBox.className =
    "card";


    courseBox.innerHTML = `

      <h3>📚 ${course.name}</h3>

      <p>${course.description}</p>

      <p>💰 Price: ₹${course.price}</p>

      <button class="edit-btn">
      ✏️ Edit
      </button>

      <button class="delete-btn">
      🗑️ Delete
      </button>

    `;


    const editBtn =
    courseBox.querySelector(".edit-btn");

    const deleteBtn =
    courseBox.querySelector(".delete-btn");


    editBtn.addEventListener("click", () => {

      editCourse(courseDoc.id, course);

    });


    deleteBtn.addEventListener("click", () => {

      deleteCourse(courseDoc.id);

    });


    adminCoursesList.appendChild(courseBox);

  });

}


// DELETE COURSE

async function deleteCourse(courseId) {

  const confirmDelete =
  confirm("Are you sure you want to delete this course?");

  if (!confirmDelete) return;


  await deleteDoc(
    doc(db, "courses", courseId)
  );


  alert("Course Deleted Successfully!");

  loadCourses();

}


// EDIT COURSE

async function editCourse(courseId, course) {

  const newName =
  prompt("Enter new course name:", course.name);

  if (newName === null) return;


  const newDescription =
  prompt(
    "Enter new description:",
    course.description
  );

  if (newDescription === null) return;


  const newPrice =
  prompt(
    "Enter new price:",
    course.price
  );

  if (newPrice === null) return;


  await updateDoc(

    doc(db, "courses", courseId),

    {

      name: newName,

      description: newDescription,

      price: Number(newPrice)

    }

  );


  alert("Course Updated Successfully!");

  loadCourses();

}


// LOGOUT

logoutBtn.addEventListener("click", () => {

  signOut(auth).then(() => {

    window.location.href =
    "login.html";

  });

});
