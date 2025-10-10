// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: "mern-estate-a4f80.firebaseapp.com",
//   projectId: "mern-estate-a4f80",
// //   storageBucket: "mern-estate-a4f80.firebasestorage.app",
//   storageBucket: "mern-estate-a4f80.firebasestorage.app",
//   messagingSenderId: "214115758365",
//   appId: "1:214115758365:web:6c8dcee30a91ba090771f4"
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);



import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-a4f80.firebaseapp.com",
  projectId: "mern-estate-a4f80",
  storageBucket: "mern-estate-a4f80.appspot.com",
  messagingSenderId: "214115758365",
  appId: "1:214115758365:web:6c8dcee30a91ba090771f4"
};

export const app = initializeApp(firebaseConfig);
