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
import { firebaseConfig } from "./config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const loginBtn = document.getElementById("login-btn");
const dataSection = document.getElementById("data-section");
const authSection = document.getElementById("auth-section");

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

// Fetch Data (The "Query")
document
  .getElementById("fetch-data-btn")
  .addEventListener("click", async () => {
    try {
      // Example: Fetching a document called 'config' from the 'settings' collection
      const docRef = doc(db, "settings", "config");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        document.getElementById("output").textContent = JSON.stringify(
          docSnap.data(),
          null,
          2,
        );
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      alert("Permission denied! Check your Security Rules.");
    }
  });
