import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Idea } from './../idea.model';

@Injectable()

export class FirebaseService {

  LabelID = 'nqic4VqSI9axVAkH4G9a6XJF39w2';

  userIdea = this.db.doc("users" + '/' + this.LabelID);
  
  getUserID() {
    return this.LabelID;
  }

  setUserID(userid) {
    this.LabelID = userid;
  }

  private ideaCollection: AngularFirestoreCollection<Idea>;
  ideas: Observable<Idea[]>;

  constructor(private db: AngularFirestore) {
    this.ideaCollection = db.collection<Idea>(this.LabelID);
    this.ideas = this.ideaCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Idea;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getIdeas() {
    return this.userIdea.collection("ideas").snapshotChanges();
  }

  createIdeas(idea: Idea){
    return this.userIdea.collection("ideas").add(idea);
  }

  updateIdeas(idea: Idea){
    idea.LastTime = new Date();
    this.userIdea.collection("ideas").doc(idea.id).update(idea);
  }
  
  deleteIdeas(ideaId: string){
    this.userIdea.collection("ideas").doc(ideaId).delete();
  }

}
