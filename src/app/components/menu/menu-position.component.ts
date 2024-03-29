import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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
  LabelLists;
  selectedLabel;
  constructor(private firebaseService: FirebaseService, private authService:AuthService, public dialog: MatDialog) { }

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
    
    // get LabelList
    this.firebaseService.getLabelList().subscribe(data => {
      this.LabelLists = data.map(e => {
        return {id: e.payload.doc.id};
      })
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
    this.selectedLabel = this.firebaseService.getLabelID();
    return this.firebaseService.getLabelID();
  }



  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '80%',
      maxWidth: 450,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

@Component({
  selector: 'dialog-overview',
  templateUrl: "dialog-overview.html",
  styleUrls: ['dialog-overview.css'],
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */