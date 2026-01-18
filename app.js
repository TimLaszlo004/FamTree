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

// 1. Your Firebase configuration (Visible, and that's okay!)
const firebaseConfig = {
  apiKey: "AIzaSyA4O5x8OEkTC7qhGRV_SUo-oHR1Oo7TLKI",
  authDomain: "famtree-e7f51.firebaseapp.com",
  projectId: "famtree-e7f51",
  storageBucket: "famtree-e7f51.firebasestorage.app",
  messagingSenderId: "671703137374",
  appId: "1:671703137374:web:5e022f7b2e97192bf9c8cf",
  measurementId: "G-EKCCH17KTY",
};

// 2. Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 3. UI Elements
const loginBtn = document.getElementById("login-btn");
const dataSection = document.getElementById("data-section");
const authSection = document.getElementById("auth-section");

// 4. Handle Authentication State
onAuthStateChanged(auth, (user) => {
  if (user) {
    authSection.style.display = "none";
    dataSection.style.display = "block";
  } else {
    authSection.style.display = "block";
    dataSection.style.display = "none";
  }
});

// 5. Login Logic
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

// 6. Fetch Data (The "Query")
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
