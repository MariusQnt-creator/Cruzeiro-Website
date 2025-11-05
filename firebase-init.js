// Firebase initialization (compat SDK)
const firebaseConfig = 
{
  apiKey: "AIzaSyD-ctp9NTXxQ-MLzy5485ceE4ysFuljStE",
  authDomain: "cruzeiro-tracker-27401.firebaseapp.com",
  databaseURL: "https://cruzeiro-tracker-27401-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cruzeiro-tracker-27401",
  storageBucket: "cruzeiro-tracker-27401.firebasestorage.app",
  messagingSenderId: "1027951030553",
  appId: "1:1027951030553:web:d73616d70c498d791d1588"
};

firebase.initializeApp(firebaseConfig);

// compat auth & database (globals)
const auth = firebase.auth();
const database = firebase.database();

// expose to window so other scripts (login.js, dashboard.js) can use them
window.auth = auth;
window.database = database;

// helper to convert email to DB key (matches your DB rules)
window.emailToKey = function(email) {
  return (email || '').replace(/\./g, ',');
};