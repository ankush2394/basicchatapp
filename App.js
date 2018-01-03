import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {db} from './lib/fire'
//import materialize from 'materialize'
//import * as firebase from 'firebase'
//var firebase = require('firebase');
class App extends Component {
    constructor(props){
        super(props);
        this.state={
            val:"",
            operations:[[]]
        }
    }
    storeData() {
        
        //var firebase = require('firebase');
        
        var opRef = db.ref('textinfo');
        var newOpRef = opRef.push();
        if(this.state.val!="") {
          newOpRef.set({
              input1:this.state.val,
              currHours:(new Date()).getHours(),
              currMinutes:(new Date()).getMinutes()

        });
      }
        //Firebase.database.ref('operations')
        //opRef.set({input:this.state.val});
        this.setState({val:""});
    }
    readData() {
        var starCountRef = db.ref('textinfo');
        var callBack = function(snapshot) {
          //updateStarCount(postElement, snapshot.val());
          //--------snapshot is json object--------
          //console.log(snapshot.val());
          var newops = [[]]
          var data = snapshot.val();
          for (var key in data) {
            var op = data[key];
            //console.log(op.input1);
            var nlist=[]
            nlist.push(op.input1);
            nlist.push(op.currHours);
            nlist.push(op.currMinutes);
            newops.push(nlist);
          }
          this.setState({operations:newops});
        }.bind(this)

        starCountRef.on('value', callBack);
    }
    _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.storeData();
      //console.log('do validate');
    }
  }
    componentDidMount() {
        //console.log("Mounted");
        this.readData();
    }
    render() {

        //console.log("Rendered");
        return (
            <div className="center">
              <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
              </header>
              <p className="App-intro">

              </p>
              <div className="container">
                <h2>Chatting App</h2>
                <input type = "text" id ="input1" value={this.state.val} onChange={(e)=>{
                  this.setState(   {val:e.target.value}); }} onKeyPress=
                  {this._handleKeyPress}
              />
                 <br />
                 <button className="btn" disabled ="true" onClick={()=>{
                    this.storeData();
                  }}>click me</button> 
                <br/>
                <br/>
                <br/>
                <div className="collection with-header">
                {

                  this.state.operations.map((op, i)=>{
                    // return (
                    //  <div key={i} onClick={()=>{
                    //    console.log(op);
                    //  }} className="collection-item">{i + " : " + op}</div>
                    // );
                    return (
                      <a key={i} target="_blank" className="collection-item">
                      {op[0] + " - " + op[1] + " : " + op[2]
                       }</a>
                    );
                  })
                }
                </div>
              </div>
            </div>
        );
    }
}

export default App;
