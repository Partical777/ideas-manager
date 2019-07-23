import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Idea } from './../idea.model';

@Injectable()

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

  getIdeas() {
    return this.db.collection('item').snapshotChanges();
  }

  createIdeas(idea: Idea){
    return this.db.collection('policies').add(idea);
  }

  updateIdeas(idea: Idea){
    this.db.doc('item/' + idea.id).update(idea);
  }
  
  deleteIdeas(ideaId: string){
    this.db.doc('item/' + ideaId).delete();
  }

}
