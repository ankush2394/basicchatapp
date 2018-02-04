
import React, { Component } from 'react';
import firebase from './lib/fire'

var db = firebase.database();
var authFire = firebase.auth();

class Unsigned extends Component {

	login() {

      var provider = new firebase.auth.GoogleAuthProvider();

//signInwithPopup retuurns a promise that either it will fail or succeeed and depending upon that if succeeds then.then is called elese 
//.catch is called
      authFire.signInWithPopup(provider)
      .then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(token +" "+ user);
        console.log(user);
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
      
    }

	render() {

		return (

			<div className="#d1c4e9 deep-purple lighten-4">

			<h1>Hello everyone.</h1>
			<br />
			<h3>Welcome to the basic chatting application.</h3>
			<br />
			<br />
			<h4>You are seeing this page because you are not signedin. </h4>
			<br />
			<center><button className="btn" align="center" onClick={()=>{this.login();}}>login</button></center>

			</div>




			);
	}
	
}

export default Unsigned;



