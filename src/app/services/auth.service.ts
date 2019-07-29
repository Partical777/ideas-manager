import { Injectable } from '@angular/core';
import { User } from './user.model.ts';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import * as firebase from 'firebase/app';

@Injectable()

export class AuthService {

  user$: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
        private afs: AngularFirestore) { 
    this.afAuth.authState.subscribe((data) => {
      // console.log(data);
    });

    // Get the auth state, then fetch the Firestore user document or return null
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
            // Logged in
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            // Logged out
            return of(null);
          }
        })
      )
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = { 
      uid : user.uid,
      displayName: user.displayName,
      email : user.email,
      photoURL : user.photoURL,
      lastSignInTime : user.metadata.lastSignInTime,
      creationTime : user.metadata.creationTime
    } 

    return userRef.set(data, { merge: true })
  }
  
  getafAuth(){
    return this.afAuth;
  }

  async login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    this.updateUserData(credential.user);
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}