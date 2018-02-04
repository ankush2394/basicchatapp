import React, { Component } from 'react';

import firebase from '../lib/fire'
// import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom'

class Messages extends Component {


	constructor(props){
        super(props);
        this.state={
           groupId:"",
           messagesList:[]
        }
    }

    getAllMessagesFromCloud(groupId) {

    	
    	var callback = function(snapshot) {

    		var list=[]

    		var data = snapshot.val();
    		for(var key in data) {

    			var op = data[key];
    			if(op.message)
    				list.push(op);
    		}
    		this.setState({messagesList:list});
    		console.log(list)
    	}.bind(this)
    	firebase.database().ref('messageInfo/'+groupId).on('value',callback);


    }

	componentDidMount() {
		var {groupId}=this.props;
		this.setState({groupId:groupId});
		this.getAllMessagesFromCloud(groupId);
	}

	render() {
		return (
				<ul className="collection with-header">
				{
					this.state.messagesList.map(function(op,i){
						console.log(op)
						return(
						<div>
						<li key={i} className ="collection-item" >{op.message +"-"+ op.sendBy}</li>
						</div>
						);
					})
				}
				</ul>
			);

	}




}
export default Messages