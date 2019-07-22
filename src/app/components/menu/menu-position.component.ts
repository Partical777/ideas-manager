import {Component} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

/**
 * @title Menu positioning
 */
@Component({
  selector: 'menu-position',
  templateUrl: 'menu-position.component.html',
  styleUrls: ['menu-position.component.css'],
})
export class MenuPosition {
  z;
  count = 1;
  arr = [];

  constructor(private db: AngularFirestore) {}

  ngOnInit(){
    this.db.collection('item').valueChanges().subscribe(val => {
      this.count = 1;
      this.arr = []
      this.z = val.length;
      val.forEach (a => {
        this.arr.push( this.count );
        this.count++;
      });
      console.log(this.z);
      console.log(this.arr);
    });
    
  }


  

  removeCard(i){
    this.arr = this.arr.filter(inarr => inarr !== i);
    console.log(this.arr);
  }
}


/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */