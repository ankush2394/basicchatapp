import React, { Component } from 'react';
// import logo from './logo.svg';
//import './App.css';
// import firebase from './lib/fire'
// import Unsigned from './Unsigned';
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom'


class Profile extends Component {
    render() {
    	var { displayUser } = this.props;
        var photoURL = displayUser.photoURL || "https://static.pexels.com/photos/248797/pexels-photo-248797.jpeg";
        return (
            <div>
                <h3>Profile of user {displayUser.username}</h3>
                <p>Email {displayUser.useremail}</p>
                <img src={photoURL} height="500" />
                <br />
                <Link to="/">Back</Link>
            </div>
        );
    } 
}

export default Profile;