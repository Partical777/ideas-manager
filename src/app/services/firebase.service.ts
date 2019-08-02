import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Idea } from './../idea.model';

@Injectable()

export class FirebaseService {

  UserID = localStorage.getItem('UserID') ? localStorage.getItem('UserID') : "GuestsBoard";
  LabelID = localStorage.getItem('LabelID') ? localStorage.getItem('LabelID') : "ideas";

  userIdea = this.db.doc("users" + '/' + this.UserID);

  // getUserID() {
  //   return this.UserID;
  // }

  // setUserID(userid) {
  //   this.UserID = userid;
  // }

  getLabelID() {
    return this.LabelID;
  }

  setLabelID(labelid) {
    this.LabelID = labelid;
    localStorage.setItem('LabelID', labelid);
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
    return this.userIdea.collection(this.LabelID).snapshotChanges();
  }

  createIdeas(idea: Idea){
    return this.userIdea.collection(this.LabelID).add(idea);
  }

  updateIdeas(idea: Idea){
    idea.LastTime = new Date();
    this.userIdea.collection(this.LabelID).doc(idea.id).update(idea);
  }
  
  deleteIdeas(ideaId: string){
    this.userIdea.collection(this.LabelID).doc(ideaId).delete();
  }

  

  getLabelList(){
    return this.userIdea.collection("LabelList0123456789").snapshotChanges();
  }
}
