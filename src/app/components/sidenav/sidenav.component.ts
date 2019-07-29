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
  
  ideas: Idea[];
  
  idea: Idea = {
    ProjectName : "",
    UserName : "",
    image : "",
    Descripe : "",
    List : [],
    Link : [],
    progress : 0,
    LastTime : new Date(),
    CreateTime : new Date(),
    CustomIndex : 0
  };
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(){
    this.firebaseService.getIdeas().subscribe(data => {
      this.ideas = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Idea;
      })
    });
  }

  create(idea: Idea){
    this.idea.LastTime = new Date();
    this.idea.CreateTime = new Date();
    // this.idea.image = (this.idea.image) ? this.idea.image : "https://picsum.photos/300/200?random";
    this.idea.CustomIndex = this.ideas.length;
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