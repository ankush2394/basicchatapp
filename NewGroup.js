import React, { Component } from 'react';
// import logo from './logo.svg';
//import './App.css';
import firebase from '../lib/fire'
// import Unsigned from './Unsigned';
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom'


class NewGroup extends Component {

//page refreshing is not working here
	constructor(props){
        super(props);
        this.state={
            groupname:"",
            members:"",
            currentUser:null,
            newGroupCreatedKey:""
        }
    }
    componentDidMount() {

    	firebase.auth().onAuthStateChanged(function(user) {
			console.log(user)
			this.setState({currentUser : user});    
      //console.log(this.state.currentUser.uid)

			
		    }.bind(this));		

    }
    
    save() {
       //as oon as the new group is created lets mark the group id in the list of logged in user as user groups 
       var opRef = firebase.database().ref('groupsinfo');
       
       var newOpRef = opRef.push();
       var newGroupCreatedKey = newOpRef.key;
       //because setstate is not working
       //console.log(newOpRef.key);
       //this.setState({newGroupCreatedKey:newOpRef.key});
       console.log(this.state.newGroupCreatedKey);

        if(this.state.groupname!="") {
          newOpRef.set({
              groupname:this.state.groupname,
              members:this.state.members,
              newGroupCreatedKey:newOpRef.key,
              timingofcreation: firebase.database.ServerValue.TIMESTAMP
              //because we need to store the value when the record is stored in the database
        });

        var messageRef = firebase.database().ref('messageInfo').child(newGroupCreatedKey);
        messageRef.set({
          timingofcreation: firebase.database.ServerValue.TIMESTAMP

        });  

        // to avoid 2 calls just use . key toget the current one

       //var currentUserID=firebase.auth().currentUser.uid;
       //this uid is different so restricting to the snaphot ethod to get al the keys of the useers
       
       // var callback1 = function(snaphshot) {
       //    var newgroupkey="";
       //    var data = snaphshot.val();
       //    console.log("hello",data);
       //    for(var key in data){
       //      newgroupkey= key;
       //    }
       //    this.setState({newGroupCreatedKey:newgroupkey});
       //    }.bind(this)
       // firebase.database().ref('groupsinfo').orderByChild('timing').limitToLast(1).once('value',callback1);
       // //console.log(newgroupkey)

       var currentUserEmail = firebase.auth().currentUser.email;
       var currentUserName = firebase.auth().currentUser.displayName;
       var userKey = firebase.auth().currentUser.uid;
       var userRef = firebase.database().ref('users1');
       console.log(userKey)
       console.log(this.state.newGroupCreatedKey)
       //initially we need a listener and the snaphshot because we need to get the key of the current
       //user but after setting that key to the google uid whilestorig the user in db we 
       //candirectly access the key of the signed in user by uid
       // var callback = function(snaphshot) {

       // 		var data = snaphshot.val();
       // 		var userKey="" ;
       // 		for (var key in data) {

       // 			var op = data[key];
       // 			if(op.useremail = currentUserEmail) {
       // 				userKey = key;
       // 				break;
       // 			}
       // 		}

       		var opRef1 = firebase.database().ref('users1/'+userKey+'/usergroupkeys')
          .child(newGroupCreatedKey);
          
          opRef1.set({
              newGroupCreatedKey:newGroupCreatedKey
          });
       	
       //}.bind(this);

       //userRef.once('value', callback);
       
      
      
      console.log("saved");
      
      //this.setState({groupname:"",members:""});
      window.location.assign('/newgroup/acknowledgement/'+ this.state.groupname);
      alert("Info is saved")
  	}
  	else {
  		alert("cant save empty fields")
  	}
      //this.redirectFunc();

    }
	    render() {
	    	var c_user = this.state.currentUser;
	    	if(c_user) {
		        return (
		            <div className="#f8bbd0 pink lighten-4">
		                <p>Welcome {c_user.displayName}</p>
		                <br />
		                Enter the group Name:
		                <br />
		                <input className="brown-text darken-4"type = "text" value={this.state.groupname} onChange={(e)=>{this.setState({groupname:e.target.value});}} />
		                <br />

		                Enter the group members name separated by commas and max upto 4:
		                <br />
		                <input type = "text" value={this.state.members} onChange={(e)=>{this.setState({members:e.target.value});}} />
		                <br />
		                <center><button className="btn" onClick={()=>{this.save();}} >Click to Save </button></center>
		                <br />

		                <Link to="/">Back</Link>
		            </div>
		        );
		    }
			else {
				
			        return (
			            <div>
			                <p>Sign in First to log in </p>
			                <Link to="/">Back</Link>
			            </div>
			        );
			    }
		}    

}

export default NewGroup;