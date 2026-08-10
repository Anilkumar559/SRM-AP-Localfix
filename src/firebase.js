import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBSg1wdHa0N5x-rTOYkoAhba6DRlQoesUA",
  authDomain: "srm-university-ap-422f7.firebaseapp.com",
  projectId: "srm-university-ap-422f7",
  storageBucket: "srm-university-ap-422f7.firebasestorage.app",
  messagingSenderId: "1036860363554",
  appId: "1:1036860363554:web:52c5fee789a30b75110b7b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);