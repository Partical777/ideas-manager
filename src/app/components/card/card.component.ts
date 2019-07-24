import {Component, OnInit, Input} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { FirebaseService } from '../../services/firebase.service';
import { Idea } from '../../idea.model';

/**
 * @title Card with multiple sections
 */
@Component({
  selector: 'card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.css'],
})


export class CardComponent {
  @Input('data') data:Object;

  addsub = 10;  //add or substract number

  ideas: Idea[];
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(){
    
  }

  update(idea: Idea){
    this.firebaseService.updateIdeas(idea);
  }

  delete(id: string){
    if (confirm("Are you sure deleting this Idea?")) {
      this.firebaseService.deleteIdeas(id);
    }
  }


  removeLink(index){
    if (confirm("Deleting this Url?")) {
      this.data.Link.splice(index, 1);
      this.update(this.data);
    }
  }


  // ProjectName = ["Hand Draw Ideas", "Fuck", "Number 2"];
  // UserName = ["Partical", "Fuck", "Mia"];
  // progress = [35, 75, 60];
  // image = ["https://picsum.photos/300/200?random", "https://picsum.photos/300/200?random", "https://picsum.photos/300/200?random"];
  // Descripe = ["The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.", "Hi, there!", "How are you!"];
}