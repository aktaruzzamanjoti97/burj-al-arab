import React, { useContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  let history = useHistory();
  let location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const handleGoogleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { displayName, email } = result.user;
        const signedInUser = { name: displayName, email: email };
        setLoggedInUser(signedInUser);
        history.replace(from);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });
  };
  return (
    <div>
      <h1>This is Login</h1>
      <button onClick={handleGoogleSignIn}>This is button</button>
    </div>
  );
};

export default Login;
