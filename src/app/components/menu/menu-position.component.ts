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

  sortIndex = localStorage.getItem('SortIndex') ? localStorage.getItem('SortIndex') : 0;
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
      //Sort
      if(this.sortIndex == 0){
        this.ideas = this.LastDateSort();
      }else if(this.sortIndex == 1){
        this.ideas = this.CreateDateSort();
      }else if(this.sortIndex == 2){
        this.ideas = this.CustomIndexSort();
      }
    });
  }

  //============Sort===========
  LastDateSort(){
    localStorage.setItem('SortIndex', 0);
    return this.ideas.sort(function (a, b){
        return a.LastTime < b.LastTime ? 1: -1;
      });
  }
  CreateDateSort(){
    localStorage.setItem('SortIndex', 1);
    return this.ideas.sort(function (a, b){
        return a.CreateTime < b.CreateTime ? 1: -1;
      });
  }
  CustomIndexSort(){
    localStorage.setItem('SortIndex', 2);
    return this.ideas.sort(function (a, b){
        return a.CustomIndex < b.CustomIndex ? 1: -1;
      });
  }
  //===========================


  setID(id){
    this.firebaseService.setLabelID(id); 
    this.ngOnInit();    //Reload you view sign
  }

  getID(){
    return this.firebaseService.getLabelID();
  }

  

  positionIndex = [];

  // Waterfall Layout
  resizeAllMasonryItems(){
    // Get all item class objects in one list
    let allItems = document.getElementsByClassName('masonryItem');
    let arr4 = [0, 0, 0, 0];

    for(var i=0;i<allItems.length;i++){
      let tmpMin = this.findtheMin(arr4);
      console.log(tmpMin);

      arr4[tmpMin] += allItems[i].offsetHeight;
      this.positionIndex.push(tmpMin);
    }
    console.log(this.positionIndex)
  }

  findtheMin(arr){
    let min = arr[0];
    let minIndex = 0;
    arr.forEach(function(v, index){
      if(v < min){
        min = v;
        minIndex = index;
      }
    });
    return minIndex;
  }
  
}


/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */