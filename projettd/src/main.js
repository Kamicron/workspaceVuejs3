import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'



  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC3hxMugeAmvplDPPdIqdAJ6xURDAxiWEg",
    authDomain: "gen-firebase-vuejs3.firebaseapp.com",
    projectId: "gen-firebase-vuejs3",
    storageBucket: "gen-firebase-vuejs3.appspot.com",
    messagingSenderId: "496415357640",
    appId: "1:496415357640:web:3df7d04ea95c87bc3503fd"
};

  // Initialize Firebase
  const appFirebase = initializeApp(firebaseConfig);


const app = createApp(App)

app.use(router)

app.mount('#app')
