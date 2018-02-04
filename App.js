import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import firebase from './lib/fire'
import Unsigned from './Unsigned';
import Groups from './components/Groups'
var db = firebase.database();
// var authFire = firebase.auth();
var dict ={}
class App extends Component {
    constructor(props){
        super(props);
        this.state={
            val:"",
            operations:[],
            isUserLoggedIn:"false",
            dictForGettingUids:{},
            flagForStoringUserInDb:true
        }
    }

    createUserIFNotExists(currentUser) {
        console.log(currentUser);
        //user has signed in but he is not in the db so store it in forebase db
        //by the id of uid provided by the gogle and not by the rndom id provided by the firebase
        var userUid = firebase.auth().currentUser.uid;
        var callBack = function(snapshot) {
            var users = snapshot.val();
            console.log(users)
            var foundUser = false;
            if (users) {
                for (var key in users) {
                    var user = users[key];
                    if(user.useremail == currentUser.email) {
                        console.log("FOUND USER IN DB");
                        foundUser = true;
                        break;
                    }
                }
            }
            if (!foundUser) {
                console.log("NOT FOUND");
                var newOpRef = db.ref('users1').child(userUid);
                //custom made our key usingset value 
                newOpRef.set({
                    username: currentUser.displayName,
                    useremail: currentUser.email,
                    usergroupkeys:[]
                });
            }
        }

        db.ref('users1').once('value').then(callBack);
    }



    storeData() {
        
        var opRef = db.ref('textinfo');
        var newOpRef = opRef.push();
        console.log(new Date());
        if(this.state.val!="") {
          newOpRef.set({
              input1:this.state.val,
              currHours:(new Date()).getHours(),
              currMinutes:(new Date()).getMinutes(),
              //timing: (new Date()).getTime()
              timing: firebase.database.ServerValue.TIMESTAMP

        });
      }
        this.setState({val:""});
    }

    readData() {
        var starCountRef = db.ref('textinfo').orderByChild('timing').limitToLast(18);
        var callBack = function(snapshot) {
          //updateStarCount(postElement, snapshot.val());
          //--------snapshot is json object--------
          //console.log(snapshot.val());
          var newops = []
          var data = snapshot.val();
          console.log(data);
          for (var key in data) {
            var op = data[key];
            //op.key = key;
            //console.log(op.input1);
            var nlist=[]
            nlist.push(op.input1);
            nlist.push(op.currHours);
            nlist.push(op.currMinutes);
            nlist.push(op.timing);
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
//------------------------------------------------------------------------------------------

  deleteText(input1,mins,hrs) {
    console.log("deleting");
    
    db.ref('textinfo').on("value", snap => {
        const foo = snap.val();
        if (foo !== null) {
          Object.keys(foo).forEach(key => {
            // The ID is the key
            //console.log(key);
            dict[foo[key].input1 + foo[key].currMinutes +foo[key].currHours]=key;
          });
          
        }
        
      });
    var path = input1+mins+hrs;
    var key1 = dict[path];
    console.log(dict);
    console.log(path);
    console.log(key1);
    //var response = confirm("are you sure you want to delete this group");
    
    if(key1!=undefined)
      db.ref('textinfo').child(key1).remove();
    console.log("deleted");

  }

  //-----------------------------------------------------------------------------------------

    componentDidMount() {
        //console.log(new Date(String(new Date())));

        //console.log("Mounted");
        this.readData();
        //listener
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log("User is signed in.", user);
                this.setState({isUserLoggedIn:true});
                //var user = firebase.auth().currentUser;
                //console.log(user,this.state.flagForStoringUserInDb);
                if(user){

                    this.createUserIFNotExists(user);

                } else {
                    console.log("Not signed in.");
                    this.setState({isUserLoggedIn:false});
                }
            }
        }.bind(this));
    }

    render() {

        var user = firebase.auth().currentUser;
        console.log(user);
        if(user) {
        return (
        
            //<div className="#ccff90 light-green accent-1">

              // <Header photoURL={user.photoURL} 
              //         uid={user.uid}></Header>
            
              // <div className="container">

                
                
              //   <ul className="collection with-header" >
              //   {

              //     this.state.operations.map((op, i)=>{
              //       return (
              //         <li key={i} className="collection-item" >
              //           <div>
              //             {op[0] + " - " + op[1] + " : " + op[2]}
              //             <a href="#!" onClick={()=>{
              //               this.deleteText(op[0],op[2],op[1]);
              //             }} className="secondary-content">
              //               <i className="material-icons">clear</i>
              //             </a>
              //           </div>
              //         </li>
              //       );
              //     })
              //   }
                  
              //   </ul>
              //   <div className="fixed-action-btn">
              //     <a className="btn-floating btn-large red">
              //       <i className="large material-icons">mode_edit</i>
              //     </a>
              //   </div>
              // </div>
              <Groups />
              
               // <input type = "text" id ="input1" value={this.state.val} onChange={(e)=>{
               //    this.setState(   {val:e.target.value}); }} onKeyPress=
               //    {this._handleKeyPress} text-color="yellow" />
              //</div>
                
            //</div>
          
        );
    }
    else {
      return (
        <Unsigned />
        );
    }
  }  
}

export default App;