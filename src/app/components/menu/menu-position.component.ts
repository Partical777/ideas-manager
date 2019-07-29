import {Component} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../services/auth.service';
import { Idea } from '../../idea.model';

/**
 * @title Menu positioning
 */
@Component({
  selector: 'menu-position',
  templateUrl: 'menu-position.component.html',
  styleUrls: ['menu-position.component.css'],
})
export class MenuPosition {

  ideas: Idea[];
  constructor(private firebaseService: FirebaseService, private authService:AuthService) { }

  afAuth = this.authService.getafAuth();

  login(){
    this.authService.login();
  }
  logout(){
    this.authService.logout();
  }
  // private ideaCollection: AngularFirestoreCollection<Idea>;
  // ideas: Observable<IdeaId[]>;
  // constructor(private db: AngularFirestore) {
  //   this.ideaCollection = db.collection<Idea>('item');
  //   this.ideas = this.ideaCollection.snapshotChanges().pipe(
  //     map(actions => actions.map(a => {
  //       const data = a.payload.doc.data() as Idea;
  //       const id = a.payload.doc.id;
  //       return { id, ...data };
  //     }))
  //   );
  // }

  ngOnInit(){
    this.firebaseService.getIdeas().subscribe(data => {
      this.ideas = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Idea;
      })
      //Sort by Date
      this.ideas = this.ideas.sort(function (a, b){
        return a.LastTime < b.LastTime ? 1: -1;
      });
    });
  }

  setID(id){
    this.firebaseService.setUserID(id); 
    this.ngOnInit();    //Reload you view sign
  }

  getID(){
    return this.firebaseService.getUserID();
  }

  

}


/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */