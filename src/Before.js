import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

const URL = 'https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=Qn1evzYK9YNljQcAmFVD8eIYbmjsL4JA';

firebase.initializeApp({
  apiKey: "AIzaSyCPGWWjVyorS74VTmWit-X-Md3ZSccAM84",
  authDomain: "webtechfinal-35464.firebaseapp.com"
})

class App extends Component {
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  constructor(props){

    super(props)

    this.state = { 
      data: {},
      isSignedIn: false 
    }
  
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
    axios.get(URL).then(response => {
      this.setState({data : response.data})
      console.log(response.data)
    })
  }
    
  renderBooks() {
    return _.map(this.state.data.results, book => {
      return (
        <li className="list-group-item">
          <div className="row">
            <div className="col s3"/>
            <div className="col s6">
              <div className="card yellow darken-4">
                <div className="card-content white-text">
                  <span className="card-title">{book.display_name}.</span>
                    First Publish : {book.oldest_published_date}<br/>
                    Updated in {book.updated}<br/>
                </div>
              </div>
            </div>
          </div>
            
        </li>
      )
    })
  }
   
  render() {
    return (
      <div>
        {this.state.isSignedIn ? (
          // this is the state where account is signed in
          <span>
            <nav>
              <div className="nav-wrapper">
                <a className="brand-logo">Books Showcase</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li>{firebase.auth().currentUser.displayName}</li>
                  <li><a onClick={() => firebase.auth().signOut()}>Sign out!</a></li>
                </ul>
              </div>
            </nav>
            <ul className="list-group">
              {this.renderBooks()}
            </ul>
          </span>
        ) : (
          // this is the state where account not sign in
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}

        {/* <nav>
          <div class="nav-wrapper">
            <a class="brand-logo">Books Showcase</a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li><a >Login</a></li>
            </ul>
          </div>
        </nav>
        <ul className="list-group">
         {this.renderBooks()}
        </ul> */}

      </div>
    );
  }

}
export default App;

// var config = {
//   apiKey: "AIzaSyCPGWWjVyorS74VTmWit-X-Md3ZSccAM84",
//   authDomain: "webtechfinal-35464.firebaseapp.com",
//   databaseURL: "https://webtechfinal-35464.firebaseio.com",
//   projectId: "webtechfinal-35464",
//   storageBucket: "webtechfinal-35464.appspot.com",
//   messagingSenderId: "1038646748852"
// };