import React, { Component } from 'react';
// import logo from './logo.svg';
//import './App.css';
// import firebase from './lib/fire'
// import Unsigned from './Unsigned';
// import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom'
import firebase from '../lib/fire'
import Header from '../components/Header'
import Profile from '../components/Profile'


class ProfileContainer extends Component {
    constructor(props){
        super(props);
        this.state={
            currentUser: null,
            displayUser: null
        }
    }
    componentDidMount() {
      var { match } = this.props;
      var userId = match.params.userId;

      if (userId) {
          // Show profile of userId
          this.getProfileFromCloud(userId);
      } else {
          // Show profile of currently logged in user
          firebase.auth().onAuthStateChanged(function(currentUser) {
            if (currentUser) {
                this.setState({currentUser: currentUser});              
                userId = currentUser.uid;
                this.getProfileFromCloud(userId);
            }
          }.bind(this));
          var currentUser = firebase.auth().currentUser;
          if (currentUser) {
            userId = currentUser.uid;
            this.setState({currentUser: currentUser});
            this.getProfileFromCloud(userId);
          }

      }
    }
    getProfileFromCloud(userId) {
        var callback = function(snapshot) {
            var user = snapshot.val();
            this.setState({
                displayUser: user
            });
        }.bind(this);
        firebase.database().ref('users1/'+userId).once('value').then(callback);
    }
    render() {
    	   var displayUser = this.state.displayUser;
        return (
            <div className="light-green accent-1">

              {
                displayUser?
                  <div>
                    <Header photoURL={displayUser.photoURL} 
                      uid={displayUser.userid}></Header>
                  
                    <div className="container">
                      <Profile displayUser={displayUser} />
                    </div>
                  </div>
                  :
                  <h3>No user</h3>
              }
              
                
            </div>
          
        );
    } 
}

export default ProfileContainer;


