import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable()

export class AuthService {

  constructor(public afAuth: AngularFireAuth) { 
    this.afAuth.authState.subscribe((data) => {
      // console.log(data);
    });
  }
  
  getafAuth(){
    return this.afAuth;
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}