import React, { Component } from 'react';
// import logo from './logo.svg';
//import './App.css';
import firebase from '../lib/fire'
// import Unsigned from './Unsigned';
// import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom'
import $ from "jquery";

var db = firebase.database();
var authFire = firebase.auth();
var dict ={}
class Header extends Component {

    logout() {
        firebase.auth().signOut().then(function() {
          console.log("signout");
          // Sign-out successful.
        }).catch(function(error) {
          console.log("this will only tell the error occured in the function ");
          // An error happened.
        });
        window.location.assign('/'); // Use something like Routes.push
    }
    func() {

      $.get("https://api.github.com/search/repositories?q=ankush2394", function(data, status){
        console.log(data)
        console.log(status);
      });

    }
    render() {
    	var { photoURL, uid } = this.props;
        return (
           <div className="navbar-fixed">
            <nav className="teal">
            <div className="nav-wrapper">
              <a href="#" className="brand-logo">Chatting App</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li><a onClick={()=>{this.func();}}><i className="material-icons" >info</i></a></li>
                  <li><Link to="/"><i className="material-icons" >home</i></Link></li>
                  <li><Link to="/newgroup"><i className="material-icons" >create_new_folder</i></Link></li>
                  <li><Link to="/groups"><i className="material-icons" >chat</i></Link></li>
                  <li><Link to="/delete"><i className="material-icons" >delete</i></Link></li>
                  <li><a onClick={()=>{this.logout();}}>Logout</a></li>
                  <li><Link to={"/profile/"+uid}>
                    <img className="circle responsive-img" 
                        src={photoURL} height="55" width="55"/>
                    </Link>
                  </li>
                </ul>
            </div>
          </nav>
         </div> 
        );
    } 
}

export default Header;