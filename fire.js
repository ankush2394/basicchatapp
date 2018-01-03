import firebase from 'firebase'

//<script src="https://www.gstatic.com/firebasejs/4.8.1/firebase.js"></script>

    
    // Initialize Firebase
    const config = {
      apiKey: "AIzaSyCw2RA-8N9wt8zFqKQZC4jlQ_iggOu6eQ8",
      authDomain: "tandoorinaan-a79c7.firebaseapp.com",
      databaseURL: "https://tandoorinaan-a79c7.firebaseio.com",
      projectId: "tandoorinaan-a79c7",
      storageBucket: "",
      messagingSenderId: "261862845443"
    };
    firebase.initializeApp(config);
   
    export const db = firebase.database()