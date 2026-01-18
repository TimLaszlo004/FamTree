import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  getDatabase,
  ref,
  get,
  update,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { firebaseConfig } from "./config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

const loginBtn = document.getElementById("login-btn");
const dataSection = document.getElementById("data-section");
const authSection = document.getElementById("auth-section");
const jsonInput = document.getElementById("json-input");

onAuthStateChanged(auth, (user) => {
  if (user) {
    authSection.style.display = "none";
    dataSection.style.display = "block";
  } else {
    authSection.style.display = "block";
    dataSection.style.display = "none";
  }
});

// Login Logic
loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Logged in!");
  } catch (error) {
    console.error("Login failed", error.message);
  }
});

document
  .getElementById("fetch-data-btn")
  .addEventListener("click", async () => {
    const dbRef = ref(db, "sharedConfig"); // Pointing to the 'sharedConfig' node
    try {
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        console.log("Data fetched successfully!");
        jsonInput.value = JSON.stringify(snapshot.val(), null, 2);
      } else {
        console.log("No data available");
      }
    } catch (error) {
      alert("Read failed: " + error.message);
    }
  });

// --- UPDATE DATA ---
document
  .getElementById("update-data-btn")
  .addEventListener("click", async () => {
    try {
      const newData = JSON.parse(jsonInput.value); // Convert string back to JSON object
      const dbRef = ref(db, "sharedConfig");

      // 'update' merges data; 'set' overwrites the whole path
      await update(dbRef, newData);
      alert("Data updated successfully!");
    } catch (error) {
      alert(
        "Update failed! Make sure your JSON is valid and you have permission.",
      );
    }
  });

document.getElementById("logout-btn").addEventListener("click", async () => {
  try {
    await signOut(auth);
    alert("Logged out!");
  } catch (error) {
    alert("Something went wrong! Try again later.");
  }
});
