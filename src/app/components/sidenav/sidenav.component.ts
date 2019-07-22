import {Component} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.css'],
})
export class SideNav {
  
  constructor(private db: AngularFirestore) { }

  addCard(){
    this.db.collection('item').add({
      ProjectName : "string",
      UserName : "string",
      progress : 50,
      image : "https://picsum.photos/300/200?random",
      Descripe : "string",
      LastTime : new Date()
    });
  }
}