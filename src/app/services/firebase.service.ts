import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Idea } from './../idea.model';

@Injectable()

// export interface Idea { 
//   ProjectName : string;
//   UserName : string;
//   progress : number;
//   image : string;
//   Descripe : string;
//   LastTime : Date;
// }

// export interface IdeaId extends Idea { id: string; }

export class FirebaseService {

  private ideaCollection: AngularFirestoreCollection<Idea>;
  ideas: Observable<Idea[]>;

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

  getPolicies() {
    return this.db.collection('item').snapshotChanges();
  }

}


/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */