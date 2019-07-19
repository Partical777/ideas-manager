import {Component} from '@angular/core';

/**
 * @title Menu positioning
 */
@Component({
  selector: 'menu-position',
  templateUrl: 'menu-position.component.html',
  styleUrls: ['menu-position.component.css'],
})
export class MenuPosition {
  z = 2;
  arr = [1, 2];

  addCard(){
    this.arr.push(this.z += 1);
    console.log(this.arr);
  }

  removeCard(i){
    this.arr = this.arr.filter(inarr => inarr !== i);
    console.log(this.arr);
  }
}


/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */