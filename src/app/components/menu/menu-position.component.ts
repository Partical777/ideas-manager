import {Component} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Idea { 
  ProjectName : string;
  UserName : string;
  progress : number;
  image : string;
  Descripe : string;
  LastTime : string;
}

export interface IdeaId extends Idea { id: string; }
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

  private ideaCollection: AngularFirestoreCollection<Idea>;
  ideas: Observable<IdeaId[]>;
  constructor(private db: AngularFirestore) {
    this.ideaCollection = db.collection<Idea>('item');
    this.ideas = this.ideaCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Idea;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  ngOnInit(){}

}


/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */