import React, { Component } from 'react';
// import logo from './logo.svg';
//import './App.css';
import firebase from '../lib/fire'
// import Unsigned from './Unsigned';
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom'
import $ from "jquery";

import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

class AddButton extends Component {
    constructor(props){
        super(props);
        this.state={
           val:"",
           userExist:false,
           options:[]
        }
    }
  //   $('.dropdown-button').dropdown({
  //     inDuration: 300,
  //     outDuration: 225,
  //     constrainWidth: false, // Does not change width of dropdown to that of the activator
  //     hover: true, // Activate on hover
  //     gutter: 0, // Spacing from edge
  //     belowOrigin: false, // Displays dropdown below the button
  //     alignment: 'left', // Displays dropdown with edge aligned to the left of button
  //     stopPropagation: false // Stops event propagation
  //   }
  // );

    func(groupId) {
        console.log(groupId)

        //alert("you have pressed the add member button")
        //console.log(this.state.val)
        
        
            //add the user with the given email
            var opRef = firebase.database().ref('users1');
            var callback = function(snapshot) {
                var list=[];
                var data = snapshot.val();
                for (var key in data) {
                    var op = data[key];
                    if(op.useremail !=firebase.auth().currentUser.email)
                    {
                        var grouplist = [];
                        grouplist = op.usergroupkeys;
                        //logic for not adding same user to one group
                        if(grouplist){

                        var flag = false;
                        for(var key in grouplist){
                            if(key == groupId){
                                alert("already added in the group");
                                flag = true;
                            }
                        }
                        if(!flag)list.push(op.username)
                    }
                        
                    }
                }
                this.setState({options:list});
                //console.log(exist)
                
            }.bind(this)

            opRef.once('value').then(callback);

        
    }

    
    componentDidMount() {
        console.log("componentDidMount");
        var { groupId } = this.props;
        this.func(groupId);
        console.log(this.state.userExist)
        declare var $: $
       //   $('.dropdown-button').dropdown({
       //     inDuration: 300,
       //     outDuration: 225,
       //     constrainWidth: false, // Does not change width of dropdown to that of the activator
       //     hover: false, // Activate on hover
       //     gutter: 0, // Spacing from edge
       //     belowOrigin: false, // Displays dropdown below the button
       //     alignment: 'left', // Displays dropdown with edge aligned to the left of button
       //     stopPropagation: false // Stops event propagation
       //   }
       // );
    
         

    }
    render() {
    	
        var { groupId } = this.props;
        console.log("render");
        
        const defaultOption = "Add User";


        console.log(groupId);
        
            if(!this.state.options)return(<div className="progress">
                  <div className="indeterminate"></div>
                   </div>);
            else return(
            <span>
                <div>
              {//this._onSelect
              
                //     <Dropdown options={this.state.options} 
                //     onChange={()=>{
                        
                //         console.log("value")

                //     }
                // }
                
                //      value={this.state.val} placeholder="Add an user" />
                // </div>
                }
               
        
                </div>
            
            </span>
        );
    }
}

export default AddButton;