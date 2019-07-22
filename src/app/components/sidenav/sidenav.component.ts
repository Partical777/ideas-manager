import {Component} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.css'],
})
export class SideNav {
  ProjectName;
  UserName;
  ImageUrl;
  Descripe;
  
  constructor(private db: AngularFirestore) { }

  addCard(){
    this.db.collection('item').add({
      ProjectName : this.ProjectName,
      UserName : this.UserName,
      progress : 0,
      image : (this.ImageUrl) ? this.ImageUrl : "https://picsum.photos/300/200?random",
      Descripe : this.Descripe,
      LastTime : new Date()
    });

    this.ProjectName = "";
    this.UserName = "";
    this.ImageUrl = "";
    this.Descripe = "";
    alert("Succeful Adding!");
  }
}