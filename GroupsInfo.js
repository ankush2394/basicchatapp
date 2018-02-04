import React, { Component } from 'react';

import firebase from '../lib/fire'
// import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Messages from '../components/Messages'
import AddButton from '../components/AddButton'
class GroupsInfo extends Component {
	constructor(props){
        super(props);
        this.state={
           groupId:"",
           currentUser:null,
           groupName:"",
           val:"",
           messagesList:[]
        }
    }
    readMessageFromDb(groupId) {

    	var mref = firebase.database().ref('messageInfo/'+groupId);

    

    }
    getGroupName(groupId) {


    	var ref = firebase.database().ref('groupsinfo/'+groupId);
    	var data="";
    	 var callback = function(snapshot) {

    	 	data = snapshot.val().groupname;
    	 	console.log(data)
    	}
    	ref.once('value').then(callback);
    	console.log(ref);
    	return data;

    }
    getAllMessagesFromCloud(groupId) {

    	
    	var callback = function(snapshot) {
    		var list=[]
    		console.log(list)

    		var data = snapshot.val();
    		for(var key in data) {

    			var op = data[key];
    			list.push(op);
    		}
    		console.log(list)
    		this.setState({messagesList:list});
    	}.bind(this)
    	firebase.database().ref('messageInfo/'+groupId).on('value',callback);


    }
    saveDataInDb() {
    	console.log(this.state.groupId)
    	if(this.state.val) {
    	var mref = firebase.database().ref('messageInfo/'+this.state.groupId);
    	var nmref = mref.push();
    	var sender = this.state.currentUser
    	console.log(sender)
    	nmref.set({

    	 	message:this.state.val,
    	 	timeofmessage: firebase.database.ServerValue.TIMESTAMP,
    	 	sendBy: this.state.currentUser.displayName

    	 });
    	// this.getAllMessagesFromCloud(this.state.groupId);
    	this.setState({val:""});
    	}
    	else{
    		alert("kindly type something to save")
    	}

    }
	componentDidMount() {
		var { match } = this.props;
		var groupId = match.params.groupId;
		this.setState({groupId:match.params.groupId});
		this.getAllMessagesFromCloud(groupId);

		firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		    // User is signed in.
		    var groupname = this.getGroupName(groupId);
		    
		    this.readMessageFromDb(groupId);
		    this.setState({currentUser:user,groupId:groupId});
		    console.log(this.state.groupId,this.state.currentUser);
		  } else {
		    // No user is signed in.
		    this.setState({currentUser:null});

		  }
		}.bind(this));
			

	}
	takemeback() {
		console.log("cool")
		window.location.assign('/');
	}

	render() {
		var currentUser = firebase.auth().currentUser;
		var { match } = this.props;
		var groupId = match.params.groupId;
		//console.log(match)
		if(currentUser) {
			return (
				<div className="grey lighten-5">
					<Header photoURL={currentUser.photoURL} uid={currentUser.uid} ></Header>
					<h4>Hello  {currentUser.displayName} </h4>
					<br />
					<AddButton groupId={groupId}></AddButton>
					<a className='dropdown-button btn' href='#' data-activates='dropdown1'>Drop Me!</a>

				  <ul id='dropdown1' className='dropdown-content'>
				    <li><a href="#!">one</a></li>
				    <li><a href="#!">two</a></li>
				    <li className="divider"></li>
				    <li><a href="#!">three</a></li>
				    <li><a href="#!"><i className="material-icons">view_module</i>four</a></li>
				    <li><a href="#!"><i className="material-icons">cloud</i>five</a></li>
				  </ul>
					{
					//<a href=""><i className="material-icons">add_box</i></a>
					
						// <br />
						// <br />
						// <br />
						// <ul className="collection with-header">
						// {
							
						// 	this.state.messagesList.map(function(op,i){
						// 		return(
						// 		<div>
						// 		<li className ="yellow collection-item" key={i}> {op.message}><a href="#">
						// 		<i>{op.sendBy}</i></a></li>
						// 		</div>
						// 		);

						// 	})
							

						// }
						// </ul>
					}
					<Messages groupId={groupId} ></Messages>
					
					<div className="#e1f5fe" style={{position:"fixed", bottom:0, width:"100%"}}>
						<input type ="text" value={this.state.val} onChange={(e)=>
							{this.setState({val:e.target.value});}}  ></input>
						<center><button onClick={()=>{this.saveDataInDb();}}>Click</button></center>
					</div>	
					<br />
					<br />
					<Link to="/">Back</Link>
					

				</div>
				);
		}
		else {
			return (<div>No user</div>);
		}
	}




}
export default GroupsInfo