import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Idea } from './../idea.model';

@Injectable()

export class FirebaseService {

  UserID = 'item';
  
  getUserID() {
    return this.UserID;
  }

  setUserID(userid) {
    this.UserID = userid;
  }

  private ideaCollection: AngularFirestoreCollection<Idea>;
  ideas: Observable<Idea[]>;

  constructor(private db: AngularFirestore) {
    this.ideaCollection = db.collection<Idea>(this.UserID);
    this.ideas = this.ideaCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Idea;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getIdeas() {
    return this.db.collection(this.UserID).snapshotChanges();
  }

  createIdeas(idea: Idea){
    return this.db.collection(this.UserID).add(idea);
  }

  updateIdeas(idea: Idea){
    idea.LastTime = new Date();
    this.db.doc(this.UserID + '/' + idea.id).update(idea);
  }
  
  deleteIdeas(ideaId: string){
    this.db.doc(this.UserID + '/' + ideaId).delete();
  }

  createUserProfile(user){
    this.db.collection(user.uid).add(user);
  }

}
