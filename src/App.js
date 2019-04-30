import React, { Component } from 'react';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import ArticleList from './components/ArticleList'

const URL = 'https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=Qn1evzYK9YNljQcAmFVD8eIYbmjsL4JA';

firebase.initializeApp({
  apiKey: "AIzaSyCPGWWjVyorS74VTmWit-X-Md3ZSccAM84",
  authDomain: "webtechfinal-35464.firebaseapp.com"
})

class App extends Component {
  
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  constructor(props){

    super(props)

    this.state = {
      isSignedIn: false 
    }
  
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
  }
   
  render() {
    return (
      <div>
        {this.state.isSignedIn ? (
          // this is the state where account is signed in
          <span>
            <nav className="light-blue darken-1">
              <div className="nav-wrapper">
                <a className="brand-logo">Times Newswire</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li>{firebase.auth().currentUser.displayName}</li>
                  <li><a onClick={() => firebase.auth().signOut()}>Sign out!</a></li>
                </ul>
              </div>
            </nav>
            <ArticleList url_api = {URL}/>
          </span>
        ) : (
          // this is the state where account not sign in
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}

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