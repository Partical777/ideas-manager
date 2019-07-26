import {Component} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { FirebaseService } from '../../services/firebase.service';
import { Idea } from '../../idea.model';


@Component({
  selector: 'sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.css'],
})
export class SideNav {
  
  
  idea: Idea = {
    ProjectName : "",
    UserName : "",
    image : "",
    Descripe : "",
    List : [],
    Link : [],
    progress : 0,
    LastTime : new Date()
  };
  constructor(private firebaseService: FirebaseService) { }

  create(idea: Idea){
    this.idea.LastTime = new Date();
    this.idea.image = (this.idea.image) ? this.idea.image : "https://picsum.photos/300/200?random",
    this.firebaseService.createIdeas(idea);

    this.idea.ProjectName = "";
    this.idea.UserName = "";
    this.idea.image = "";
    this.idea.Descripe = "";
  }

  // addCard(){
  //   this.db.collection('item').add({
  //     ProjectName : this.ProjectName,
  //     UserName : this.UserName,
  //     progress : 0,
  //     image : (this.ImageUrl) ? this.ImageUrl : "https://picsum.photos/300/200?random",
  //     Descripe : this.Descripe,
  //     LastTime : new Date()
  //   });

  //   this.ProjectName = "";
  //   this.UserName = "";
  //   this.ImageUrl = "";
  //   this.Descripe = "";
  //   alert("Succeful Adding!");
  // }
}