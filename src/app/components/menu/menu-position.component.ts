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

  async login(){
    await this.authService.login();
    window.location.reload();
  }
  async logout(){
    await this.authService.logout();
    window.location.reload();
  }
  
  

  ngOnInit(){
    this.firebaseService.getIdeas().subscribe(data => {
      this.ideas = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Idea;
      })
      // //Sort by Date
      // this.ideas = this.ideas.sort(function (a, b){
      //   return a.LastTime < b.LastTime ? 1: -1;
      // });
      // //Sort by CreateDate
      // this.ideas = this.ideas.sort(function (a, b){
      //   return a.CreateTime < b.CreateTime ? 1: -1;
      // });
      //Sort by CustomIndex
      this.ideas = this.ideas.sort(function (a, b){
        return a.CustomIndex < b.CustomIndex ? 1: -1;
      });
    });
  }

  setID(id){
    this.firebaseService.setLabelID(id); 
    this.ngOnInit();    //Reload you view sign
  }

  getID(){
    return this.firebaseService.getLabelID();
  }

  

}


/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */