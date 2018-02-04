import React, { Component } from 'react';

import firebase from '../lib/fire'
// import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom'
import Header from './Header'
class Groups extends Component {
	constructor(props) {
		super(props);
		this.state={
			groupsname:[],
			currentUser:null,
			grouplist:[],
			userKey1:"",
			user: null,
			groups: {}
		}
	}

	getGroupInfoFromCloud(groupId) {
		console.log(groupId)
		var callback = function(snaphshot) {
			var group = snaphshot.val();
			if (group) {
				console.log(group)
				var groups = this.state.groups;
				groups[groupId] = group;
				this.setState({
					groups: groups
				})
			}
		}.bind(this);
		firebase.database().ref('groupsinfo/'+groupId).once('value').then(callback);
	}
	getAllGroupInfosFromCloud(groupIdList) {

		console.log(groupIdList)
		for (var groupId in groupIdList) {
			//for(var groupkey in groupId) {
			console.log(groupId)
			this.getGroupInfoFromCloud(groupId);
			//}
		}
	}
	getUserFromCloud(uid) {
		console.log(uid)
		var callback = function(snaphshot) {
			var user = snaphshot.val();
			if (user) {
				console.log(user)
				this.setState({
					user: user
				});
				var groupIdList = user.usergroupkeys;
				console.log(groupIdList)
				this.getAllGroupInfosFromCloud(groupIdList)
			}
		}.bind(this);
		firebase.database().ref('users1/'+uid).once('value').then(callback);
	}
	// getGroupInfo() {
	// 	var list=[]
	// 	var currentUserEmail = firebase.auth().currentUser.email;
	// 	var userKey="" ;
	// 	//console.log(currentUserEmail)
	// 	var callback1 = function(snaphshot) {
 //       		var data = snaphshot.val();
 //       		//var userKey="" ;
 //       		console.log(data)
 //       		for (var key in data) {
 //       			var op = data[key];
 //       			console.log(key)
 //       			if(op.useremail = currentUserEmail) {
 //       				userKey = key;
 //       				break;
 //       			}
 //       		}
 //       			//console.log(userKey)
 //       			this.setState({userKey1:userKey});
 //       	}.bind(this)
 //       	firebase.database().ref('users1').once('value',callback1);
 //       	console.log(userKey)
	// 	var ref1 = firebase.database().ref('users1/'+ this.state.userKey1 + '/usergroupkeys');
	// 	var callBack = function(snapshot) {
          
 //          //--------snapshot is json object--------
 //          var data = snapshot.val();
          
 //          console.log(data);
 //          var list=[]
 //          for (var key in data) {

 //          	var op = data[key];
 //          	console.log(op)
 //          	list.push(op.newGroupCreatedKey);
            
 //            	}
 //            	console.log(list)
 //            	this.setState({grouplist:list});
           
 //          }.bind(this)

 //        ref1.on('value', callBack);

	// }
	componentDidMount() {
		//console.log("componentDidMount")
		//var c_user = firebase.auth().currentUser;never set state in render becauseit wil be an infinite loop
		firebase.auth().onAuthStateChanged(function(user) {
		 	//console.log(user)
		 	if(user) {
			 	this.setState({currentUser : user});
				//this.getGroupInfo();
				this.getUserFromCloud(user.uid);
			 }
		 }.bind(this));
		
		console.log("hello",this.state.grouplist)
	}
	render() {
		var c_user = firebase.auth().currentUser;
		console.log(this.state.groups)
		return (
			<div className="light-green">
			{
				c_user?	
					<div>
					<Header photoURL={c_user.photoURL} 
                      uid={c_user.uid}></Header>
					<h3>Hello {c_user.displayName}</h3>
					<br />
					<h4>Your current groups:</h4>
					
					<ul className="collection with-header" type= "disc">
					{

     					Object.keys(this.state.groups).map(function(groupId, i){
     						console.log(groupId);
     						var group = this.state.groups[groupId];
       					  	return (
       					  		<div>
       					  	
	       					  		<li className ="yellow collection-item" key={i}>
	       					  			
	       					  			<div >{group.groupname}
	       					  			<Link to={"/groups/"+groupId} className="secondary-content"><i className="material-icons">
	       					  			send</i>
	       					  			</Link>
	       					  			</div>
	       					  		</li>
	       					  	</div>
       					  	);
     					}, this)
     				}
						 {
						 	this.state.grouplist.map(function(op, i){
						 		console.log(op);
				// 			  	return (<li key={i}>{op}</li>);
						 	})
						 }
   					</ul>
					
				    <Link to="/">Back</Link>
				    </div>
					:
					<h3> No user</h3>
			}
			</div>
		);
	}




}

export default Groups;