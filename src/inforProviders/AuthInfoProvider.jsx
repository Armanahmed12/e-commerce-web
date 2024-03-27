import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';
export const AuthenticationData = createContext();

const AuthInfoProvider = ({children}) => {

     const [user, setUser] = useState("raju");
    const auth = getAuth(app);

    //  user log In
    const userLogIn = (email,password) =>{

       return signInWithEmailAndPassword(auth, email, password);

    }

    //   user log Out
  
      const userLogOut = () =>{
         
            return signOut(auth);
            
      }
 
    // create User With Email And Password 
    const createNewUser = (email,password) =>{

       return createUserWithEmailAndPassword(auth,email,password);

    }

    // Create New user with Google
    const googleProvider = new GoogleAuthProvider();
    const createUserWithGoogle = () =>{
        
        return signInWithPopup(auth, googleProvider);

    };

     // user profile info update
     const userInfoUndate = (userName) =>{

        updateProfile(auth.currentUser,{

             displayName : userName
             
        }).then(() => {
         // Profile updated!
         // ...
       }).catch((error) => {
         // An error occurred
         // ...
       });
 }
 
   //  Reset password with your email address
   const resetPassword = (email) =>{

         return sendPasswordResetEmail(auth, email);
   }

  // observing the user after log In Or registering
  useEffect(()=>{
    
    const  unsubscribe = onAuthStateChanged(auth, (currentUser) =>{

           setUser(currentUser);
    });

    return () => unsubscribe();

  },[]);
  
  console.log(user);

    const authInfo = {user,setUser,createNewUser,createUserWithGoogle,userLogIn, userInfoUndate, resetPassword, userLogOut};
    return (
        <AuthenticationData.Provider value={authInfo}>
              {children}
              
        </AuthenticationData.Provider>
    );
};

export default AuthInfoProvider;